import { useState, useRef, useEffect } from "react";
import { ChatMessage, type Message } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { ProjectForm, ProjectFormData } from "./ProjectForm";
import { useToast } from "@/hooks/use-toast";
import { Bot } from "lucide-react";

const WEBHOOK_URL = "https://rustlingly-unmusked-laveta.ngrok-free.dev/webhook/2bddfbe3-ffed-429a-831f-0487fa998f77";

export const ChatContainer = () => {
  const [projectData, setProjectData] = useState<ProjectFormData | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleProjectSubmit = async (formData: ProjectFormData) => {
    setProjectData(formData);
    setIsLoading(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "project_info",
          projectData: formData,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const botMessage: Message = {
        id: Date.now().toString(),
        content: data.message || data.response || "프로젝트 정보가 접수되었습니다. 무엇을 도와드릴까요?",
        role: "bot",
        timestamp: new Date(),
      };

      setMessages([botMessage]);
    } catch (error) {
      console.error("Error submitting project:", error);
      toast({
        title: "오류가 발생했습니다",
        description: "프로젝트 정보 제출 중 문제가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
      setProjectData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (content: string, file?: File) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: content || "PDF 파일 전송",
      role: "user",
      timestamp: new Date(),
      ...(file && {
        file: {
          name: file.name,
          size: file.size,
          type: file.type,
        },
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      let response;

      if (file) {
        // FormData로 파일과 메시지 전송
        const formData = new FormData();
        formData.append("file", file);
        formData.append("message", content);
        if (projectData) {
          formData.append("projectData", JSON.stringify(projectData));
        }

        response = await fetch(WEBHOOK_URL, {
          method: "POST",
          body: formData,
        });
      } else {
        // JSON으로 텍스트만 전송
        response = await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            message: content,
            projectData: projectData,
          }),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message || data.response || JSON.stringify(data),
        role: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "오류가 발생했습니다",
        description: "메시지를 전송하는 중 문제가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "죄송합니다. 메시지를 처리하는 중 오류가 발생했습니다.",
        role: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!projectData) {
    return <ProjectForm onSubmit={handleProjectSubmit} isLoading={isLoading} />;
  }

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border bg-card shadow-sm">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
          <Bot className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-foreground">{projectData.projectName}</h1>
          <p className="text-sm text-muted-foreground">
            {isLoading ? "입력 중..." : "프로젝트 분석 중"}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Bot className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              대화를 시작해보세요
            </h2>
            <p className="text-muted-foreground max-w-sm">
              궁금한 것을 물어보시면 AI가 답변해드립니다.
            </p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};
