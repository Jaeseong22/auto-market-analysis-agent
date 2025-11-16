import { cn } from "@/lib/utils";

export interface Message {
  id: string;
  content: string;
  role: "user" | "bot";
  timestamp: Date;
  file?: {
    name: string;
    size: number;
    type: string;
  };
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
        {message.file && (
          <div className="mb-2 p-2 rounded-lg bg-background/50 border border-border/50 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-destructive shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                clipRule="evenodd"
              />
            </svg>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">{message.file.name}</p>
              <p className="text-xs opacity-60">
                {(message.file.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
        )}
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
