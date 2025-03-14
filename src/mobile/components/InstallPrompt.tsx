import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [installable, setInstallable] = useState(false);

  useEffect(() => {
    // Check if already installed
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)",
    ).matches;
    if (isStandalone) return;

    // Check if user has already dismissed or installed
    const hasPrompted = localStorage.getItem("install-prompt-shown");
    if (hasPrompted === "true") return;

    // Listen for the beforeinstallprompt event
    const handler = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Store the event for later use
      window.deferredPrompt = e;
      setInstallable(true);

      // Show our custom prompt after a delay
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Listen for app installed event
    window.addEventListener("appinstalled", () => {
      setShowPrompt(false);
      setInstallable(false);
      localStorage.setItem("install-prompt-shown", "true");
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!window.deferredPrompt) return;

    // Show the install prompt
    window.deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await window.deferredPrompt.userChoice;

    // We no longer need the prompt
    window.deferredPrompt = null;

    // Hide our custom prompt
    setShowPrompt(false);
    setInstallable(false);

    // Mark as prompted regardless of outcome
    localStorage.setItem("install-prompt-shown", "true");
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem("install-prompt-shown", "true");
  };

  if (!showPrompt || !installable) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 bg-white rounded-xl shadow-lg p-4 z-50 animate-fade-in">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
          <Download className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">Cài đặt ứng dụng</h3>
          <p className="text-sm text-gray-600 mt-1">
            Cài đặt ứng dụng này lên thiết bị của bạn để truy cập nhanh hơn và
            trải nghiệm tốt hơn
          </p>
          <div className="flex gap-2 mt-3">
            <Button
              onClick={handleInstall}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-medium flex-1"
            >
              Cài đặt ngay
            </Button>
            <Button
              onClick={handleDismiss}
              variant="outline"
              className="text-gray-600 rounded-lg px-4 py-2 text-sm"
            >
              Để sau
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
