import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface MobileHeaderProps {
  title: string;
  showBackButton?: boolean;
  rightAction?: React.ReactNode;
  transparent?: boolean;
  onTitleClick?: () => void;
}

export default function MobileHeader({
  title,
  showBackButton = false,
  rightAction,
  transparent = false,
  onTitleClick,
}: MobileHeaderProps) {
  const navigate = useNavigate();
  const [isTouchingBack, setIsTouchingBack] = useState(false);

  const handleBackClick = () => {
    // Add haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(5);
    }
    navigate(-1);
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 ${transparent ? "bg-transparent" : "bg-white/95 backdrop-blur-md"} border-b border-gray-200/80 flex items-center justify-between h-14 px-4 z-50 mobile-safe-area-top ${transparent ? "" : "shadow-sm"}`}
    >
      <div className="w-10">
        {showBackButton && (
          <button
            onClick={handleBackClick}
            onTouchStart={() => setIsTouchingBack(true)}
            onTouchEnd={() => setIsTouchingBack(false)}
            onTouchCancel={() => setIsTouchingBack(false)}
            className={`p-2 -ml-2 rounded-full transition-transform duration-150 ${isTouchingBack ? "scale-90 bg-gray-100/80" : ""}`}
            aria-label="Quay lại"
          >
            <ChevronLeft size={24} />
          </button>
        )}
      </div>

      <h1
        className={`text-lg font-semibold text-center flex-1 truncate px-2 ${onTitleClick ? "cursor-pointer active:opacity-70" : ""}`}
        onClick={onTitleClick}
      >
        {title}
        {onTitleClick && (
          <span className="inline-block ml-1 opacity-60 text-xs">▼</span>
        )}
      </h1>

      <div className="w-10 flex justify-end">{rightAction}</div>
    </div>
  );
}
