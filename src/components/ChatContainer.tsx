import { useState } from "react";
import { ProjectForm, ProjectFormData } from "./ProjectForm";
import { useToast } from "@/hooks/use-toast";
import { Bot, FileText } from "lucide-react";

const WEBHOOK_URL = "http://localhost:5678/webhook-test/2bddfbe3-ffed-429a-831f-0487fa998f77";

export const ChatContainer = () => {
  const [projectData, setProjectData] = useState<ProjectFormData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [reportHtml, setReportHtml] = useState<string>("");
  const { toast } = useToast();

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

      const html = await response.text();
      setReportHtml(html);
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


  if (!projectData) {
    return <ProjectForm onSubmit={handleProjectSubmit} isLoading={isLoading} />;
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border bg-card shadow-sm">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
          <FileText className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-foreground">{projectData.projectName}</h1>
          <p className="text-sm text-muted-foreground">
            {isLoading ? "리포트 생성 중..." : "프로젝트 분석 리포트"}
          </p>
        </div>
      </div>

      {/* Report Content */}
      <div className="flex-1 overflow-hidden">
        {reportHtml ? (
          <iframe
            className="w-full h-full border-0"
            style={{
              background: "white"
            }}
            srcDoc={reportHtml}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              리포트 생성 대기 중
            </h2>
            <p className="text-muted-foreground max-w-sm">
              프로젝트 정보가 제출되면 분석 리포트가 여기에 표시됩니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
