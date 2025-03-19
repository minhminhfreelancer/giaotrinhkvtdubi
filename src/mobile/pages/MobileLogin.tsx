import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../../supabase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, Link } from "react-router-dom";
import { LogIn, Eye, EyeOff } from "lucide-react";
import { redirectToDesktopVersionIfNeeded } from "@/utils/deviceDetection";

export default function MobileLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  // Focus email input on mount
  useEffect(() => {
    if (emailInputRef.current) {
      setTimeout(() => {
        emailInputRef.current?.focus();
      }, 500);
    }
  }, []);

  // Force staying on mobile version
  useEffect(() => {
    // Ensure we're on the mobile path
    if (!window.location.pathname.startsWith("/mobile")) {
      window.location.href = "/mobile/login";
    }

    // Prevent any navigation away from mobile
    const preventRedirection = () => {
      const currentPath = window.location.pathname;
      if (!currentPath.startsWith("/mobile")) {
        window.location.href = "/mobile/login";
      }
    };

    // Check frequently
    const intervalId = setInterval(preventRedirection, 100);

    return () => clearInterval(intervalId);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signIn(email, password);
      setLoginSuccess(true);

      // Add haptic feedback if available
      if (navigator.vibrate) {
        navigator.vibrate([15, 30, 15]);
      }

      // Delay navigation for animation, but stay in mobile version
      setTimeout(() => {
        // Explicitly navigate to mobile dashboard with full path
        window.location.href = "/mobile/dashboard";
      }, 500);
    } catch (error) {
      setError("Email hoặc mật khẩu không hợp lệ");
      // Add haptic feedback for error
      if (navigator.vibrate) {
        navigator.vibrate(100);
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    // Focus back on password input after toggling
    setTimeout(() => {
      passwordInputRef.current?.focus();
    }, 10);
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col mobile-safe-area-top mobile-safe-area-bottom">
      <div className="flex-1 flex flex-col justify-center px-6 py-12">
        <div className="text-center mb-8 mobile-slide-up">
          <h2 className="text-3xl font-bold tracking-tight">
            Giáo trình khu vực trưởng
          </h2>
          <p className="text-lg font-medium text-gray-500 mt-2">
            Đăng nhập để truy cập tài khoản
          </p>
        </div>

        <div className="w-full max-w-sm mx-auto">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 mobile-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 rounded-xl border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-gray-50/80"
                autoComplete="email"
                disabled={loading || loginSuccess}
                ref={emailInputRef}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Mật khẩu
                </Label>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-blue-600 active:text-blue-800"
                >
                  Quên mật khẩu?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu của bạn"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 rounded-xl border-gray-300 focus:ring-blue-500 focus:border-blue-500 pr-10 bg-gray-50/80"
                  autoComplete="current-password"
                  disabled={loading || loginSuccess}
                  ref={passwordInputRef}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 active:text-gray-700"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl mobile-pulse">
                <p className="text-sm text-red-600 font-medium">{error}</p>
              </div>
            )}
            <Button
              type="submit"
              className={`w-full h-12 rounded-full bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 text-base font-medium flex items-center justify-center gap-2 shadow-md transition-all duration-300 ${loginSuccess ? "bg-green-600 hover:bg-green-600 scale-95 opacity-90" : ""}`}
              disabled={loading || loginSuccess}
            >
              {loading ? (
                <>
                  <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                  <span>Đang đăng nhập...</span>
                </>
              ) : loginSuccess ? (
                <>
                  <svg
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Đăng nhập thành công</span>
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  <span>Đăng nhập</span>
                </>
              )}
            </Button>

            <div className="text-sm text-center text-gray-600 mt-6">
              Chưa có tài khoản?{" "}
              <Link
                to="/signup"
                className="text-blue-600 active:text-blue-800 font-medium"
              >
                Đăng ký
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
