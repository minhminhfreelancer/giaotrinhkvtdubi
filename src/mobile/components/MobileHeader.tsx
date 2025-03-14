import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MobileHeaderProps {
  title: string;
  showBackButton?: boolean;
  rightAction?: React.ReactNode;
}

export default function MobileHeader({
  title,
  showBackButton = false,
  rightAction,
}: MobileHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 flex items-center justify-between h-14 px-4 z-50 mobile-safe-area-top shadow-sm">
      <div className="w-10">
        {showBackButton && (
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 active:bg-gray-100 rounded-full"
            aria-label="Quay lại"
          >
            <ChevronLeft size={24} />
          </button>
        )}
      </div>

      <h1 className="text-lg font-semibold text-center flex-1 truncate px-2">
        {title}
      </h1>

      <div className="w-10 flex justify-end">{rightAction}</div>
    </div>
  );
}
