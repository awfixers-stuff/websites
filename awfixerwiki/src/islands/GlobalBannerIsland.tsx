import { X } from "react-feather";

export interface GlobalBannerProps {
  variant: "primary" | "secondary" | "info" | "danger" | "success" | "warning";
  message: string;
  onDismiss: () => void;
  className?: string;
  textContainerStyles?: string;
}

const containerStyles: Record<string, string> = {
  primary: "text-pink-800 bg-pink-100 border border-pink-200",
  secondary: "text-gray-800 bg-gray-100 border border-gray-200",
  info: "text-blue-800 bg-blue-100 border border-blue-200",
  danger: "text-red-800 bg-red-100 border border-red-200",
  success: "text-green-800 bg-green-100 border border-green-200",
  warning: "text-yellow-800 bg-yellow-100 border border-yellow-200",
};

export const GlobalBannerIsland = ({
  variant,
  message,
  onDismiss,
  className = "",
  textContainerStyles = "",
}: GlobalBannerProps) => {
  return (
    <div
      className={`flex items-center py-3 px-4 border rounded-md space-x-3 ${containerStyles[variant]} ${className}`}
    >
      <div className={`text-container ${textContainerStyles}`}>{message}</div>

      <button
        type="button"
        title="Dismiss"
        className="absolute top-3 right-0 focus:outline-none text-gray-500 hover:text-gray-700"
        onClick={onDismiss}
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};

export default GlobalBannerIsland;
