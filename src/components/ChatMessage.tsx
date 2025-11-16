import { cn } from "@/lib/utils";

export interface Message {
  id: string;
  content: string;
  role: "user" | "bot";
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex w-full mb-4 animate-in fade-in-0 slide-in-from-bottom-2 duration-300",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 shadow-sm",
          isUser
            ? "bg-chat-user-bg text-chat-user-fg rounded-br-md"
            : "bg-chat-bot-bg text-chat-bot-fg rounded-bl-md border border-border"
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {message.content}
        </p>
        <span className="text-xs opacity-60 mt-1 block">
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};
