
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div 
      className="fixed top-0 z-[100] flex flex-col items-end gap-2 p-4 max-h-screen w-full"
      data-toast-provider
    >
      {toasts.map(({ id, title, description, variant, action }) => (
        <div
          key={id}
          className={cn(
            "flex w-full max-w-sm items-start overflow-hidden rounded-lg border shadow-lg p-4",
            "animate-fade-in bg-white text-gray-900",
            variant === "destructive" && "bg-red-500 text-white",
            variant === "success" && "bg-green-500 text-white"
          )}
        >
          <div className="flex-1 space-y-1">
            {title && <p className="font-medium">{title}</p>}
            {description && <p className="text-sm opacity-90">{description}</p>}
          </div>
          {action && <div className="ml-2 flex shrink-0">{action}</div>}
          <button
            onClick={() => dismiss(id)}
            className="ml-4 self-start text-gray-400 hover:text-gray-800"
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
}
