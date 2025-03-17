
import * as React from "react";

// Simple toast types
export type ToastProps = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactElement;
  variant?: "default" | "destructive" | "success";
};

type State = {
  toasts: ToastProps[];
};

// Create a simple context
const ToastContext = React.createContext<{
  toasts: ToastProps[];
  toast: (props: Omit<ToastProps, "id">) => void;
  dismiss: (id: string) => void;
}>({
  toasts: [],
  toast: () => {},
  dismiss: () => {},
});

// Simple ID generator
let toastCount = 0;
function generateId() {
  return `toast-${++toastCount}`;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<State>({ toasts: [] });

  const toast = React.useCallback((props: Omit<ToastProps, "id">) => {
    const id = generateId();
    setState((prev) => ({
      toasts: [{ id, ...props }, ...prev.toasts].slice(0, 5), // Keep max 5 toasts
    }));
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setState((prev) => ({
        toasts: prev.toasts.filter((t) => t.id !== id),
      }));
    }, 5000);
  }, []);

  const dismiss = React.useCallback((id: string) => {
    setState((prev) => ({
      toasts: prev.toasts.filter((t) => t.id !== id),
    }));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts: state.toasts, toast, dismiss }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

// Simple toast function for direct use
export const toastUtils = {
  default: (props: Omit<ToastProps, "id" | "variant">) => {
    const event = new CustomEvent("toast", { 
      detail: { ...props, variant: "default" } 
    });
    window.dispatchEvent(event);
  },
  success: (props: Omit<ToastProps, "id" | "variant">) => {
    const event = new CustomEvent("toast", { 
      detail: { ...props, variant: "success" } 
    });
    window.dispatchEvent(event);
  },
  destructive: (props: Omit<ToastProps, "id" | "variant">) => {
    const event = new CustomEvent("toast", { 
      detail: { ...props, variant: "destructive" } 
    });
    window.dispatchEvent(event);
  },
};

// Export toast as an alias of toastUtils for backward compatibility
export const toast = toastUtils;

// Listen for toast events
if (typeof window !== "undefined") {
  window.addEventListener("toast", ((e: CustomEvent) => {
    const contextToast = document.querySelector("[data-toast-provider]");
    if (contextToast) {
      // If a provider exists, let it handle the toast
      return;
    }
    
    // Fallback simple toast implementation
    const { detail } = e;
    const id = generateId();
    const toastElement = document.createElement("div");
    toastElement.id = id;
    toastElement.className = "fixed top-4 right-4 z-50 max-w-md";
    toastElement.innerHTML = `
      <div class="bg-white rounded shadow-lg p-4 mb-3 flex items-start">
        <div class="flex-1">
          ${detail.title ? `<p class="font-semibold">${detail.title}</p>` : ''}
          ${detail.description ? `<p class="text-sm text-gray-500">${detail.description}</p>` : ''}
        </div>
        <button class="ml-4 text-gray-400 hover:text-gray-800">&times;</button>
      </div>
    `;
    
    document.body.appendChild(toastElement);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (document.getElementById(id)) {
        document.getElementById(id)?.remove();
      }
    }, 5000);
    
    // Close button
    const closeBtn = toastElement.querySelector("button");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        document.getElementById(id)?.remove();
      });
    }
  }) as EventListener);
}
