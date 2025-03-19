import { useEffect, useState } from "react";
import { isMobileDevice } from "@/utils/deviceDetection";
import { Button } from "./ui/button";

interface MobileRedirectProps {
  mobileUrl?: string;
  message?: string;
  buttonText?: string;
  showCloseButton?: boolean;
}

export default function MobileRedirect({
  mobileUrl = "/mobile",
  message = "Chúng tôi phát hiện bạn đang sử dụng thiết bị di động. Bạn có muốn chuyển sang phiên bản tối ưu cho di động không?",
  buttonText = "Chuyển sang phiên bản di động",
  showCloseButton = true,
}: MobileRedirectProps) {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if user has previously dismissed the banner
    const hasDismissed = localStorage.getItem("mobile-redirect-dismissed");
    if (hasDismissed === "true") {
      setDismissed(true);
      return;
    }

    // Only show on mobile devices and when not already on mobile version
    const isMobile = isMobileDevice();
    const isAlreadyOnMobile = window.location.pathname.startsWith(mobileUrl);

    setShow(isMobile && !isAlreadyOnMobile);
  }, [mobileUrl]);

  const handleRedirect = () => {
    window.location.href = mobileUrl + "/dashboard";
  };

  const handleDismiss = () => {
    setShow(false);
    setDismissed(true);
    localStorage.setItem("mobile-redirect-dismissed", "true");
  };

  if (!show || dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-blue-600 text-white p-4 z-50 shadow-lg">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-center sm:text-left">{message}</p>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleRedirect}
            className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md text-sm font-medium"
          >
            {buttonText}
          </Button>
          {showCloseButton && (
            <Button
              onClick={handleDismiss}
              variant="ghost"
              className="text-white hover:bg-blue-700 px-2 py-2 rounded-md text-sm"
            >
              Đóng
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
