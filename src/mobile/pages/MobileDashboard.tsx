import { useState, useEffect, useRef } from "react";
import MobileHeader from "../components/MobileHeader";
import MobileBottomNav from "../components/MobileBottomNav";
import { useAuth } from "../../../supabase/auth";
import { supabase } from "../../../supabase/supabase";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  BarChart2,
  Calendar,
  Award,
  ChevronRight,
  Bell,
  RefreshCw,
} from "lucide-react";

export default function MobileDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [completedMonths, setCompletedMonths] = useState<number[]>([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const startY = useRef(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Fetch data on mount
  useEffect(() => {
    if (user) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      // Get completed months
      const { data, error } = await supabase
        .from("curriculum")
        .select("month, is_completed")
        .eq("user_id", user.id);

      if (error) throw error;

      // Filter completed months
      const completed =
        data?.filter((item) => item.is_completed).map((item) => item.month) ||
        [];
      setCompletedMonths(completed);

      // Calculate overall progress
      if (data && data.length > 0) {
        // Count months with any data
        const monthsWithData = new Set(data.map((item) => item.month)).size;
        // Calculate progress as percentage of total 6 months
        const progress = Math.round((completed.length / 6) * 100);
        setOverallProgress(progress);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Pull to refresh functionality
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (content.scrollTop <= 0) {
        startY.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (content.scrollTop <= 0 && e.touches[0].clientY > startY.current) {
        const distance = Math.min(80, e.touches[0].clientY - startY.current);
        setPullDistance(distance);
        if (distance > 0) {
          e.preventDefault();
        }
      }
    };

    const handleTouchEnd = () => {
      if (pullDistance > 60) {
        // Trigger refresh
        handleRefresh();
      }
      setPullDistance(0);
    };

    content.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    content.addEventListener("touchmove", handleTouchMove, { passive: false });
    content.addEventListener("touchend", handleTouchEnd);

    return () => {
      content.removeEventListener("touchstart", handleTouchStart);
      content.removeEventListener("touchmove", handleTouchMove);
      content.removeEventListener("touchend", handleTouchEnd);
    };
  }, [pullDistance]);

  const handleRefresh = () => {
    setRefreshing(true);
    // Refresh data
    fetchUserData().then(() => {
      setRefreshing(false);
      // Add haptic feedback if available
      if (navigator.vibrate) {
        navigator.vibrate(10);
      }
    });
  };

  const handleModuleClick = (path: string) => {
    // Add haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(5);
    }
    navigate(path);
  };

  // Sample modules data with dynamic progress
  const modules = [
    {
      name: "Truyền Đạo Học",
      progress: completedMonths.includes(1) ? 100 : 75,
      icon: <BookOpen className="h-5 w-5" />,
      path: "/curriculum",
    },
    {
      name: "Sinh Hoạt Truyền Giáo",
      progress: completedMonths.includes(2) ? 100 : 50,
      icon: <Calendar className="h-5 w-5" />,
      path: "/curriculum",
    },
    {
      name: "Kiểm Điểm Bản Thân",
      progress: completedMonths.includes(3) ? 100 : 30,
      icon: <BarChart2 className="h-5 w-5" />,
      path: "/curriculum",
    },
    {
      name: "Sách Lẽ Thật",
      progress: completedMonths.includes(4) ? 100 : 60,
      icon: <BookOpen className="h-5 w-5" />,
      path: "/curriculum",
    },
  ];

  // Recent activity based on completed months
  const recentActivities = [
    ...completedMonths.map((month) => ({
      title: "Hoàn thành tháng",
      subtitle: `Tháng ${month} đã hoàn thành`,
      time: "Gần đây",
      color: "bg-green-100",
      textColor: "text-green-600",
      icon: <CheckCircle className="h-4 w-4" />,
    })),
    {
      title: "Cập nhật tiến độ",
      subtitle: "Kiểm Điểm Bản Thân - Tuần 2",
      time: "Gần đây",
      color: "bg-blue-100",
      textColor: "text-blue-600",
      icon: <BarChart2 className="h-4 w-4" />,
    },
    {
      title: "Bắt đầu mô-đun mới",
      subtitle: "Sách Lẽ Thật",
      time: "Gần đây",
      color: "bg-purple-100",
      textColor: "text-purple-600",
      icon: <BookOpen className="h-4 w-4" />,
    },
  ].slice(0, 3); // Only show 3 most recent activities

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-14 overflow-hidden">
      <MobileHeader
        title="Bảng Điều Khiển"
        rightAction={
          <button className="p-2 rounded-full active:bg-gray-100">
            <Bell size={20} className="text-gray-600" />
          </button>
        }
      />

      {/* Pull to refresh indicator */}
      <div
        className="pull-to-refresh"
        style={{
          transform:
            pullDistance > 0
              ? `translateY(${pullDistance - 60}px)`
              : "translateY(-100%)",
        }}
      >
        <div
          className={`pull-indicator ${refreshing ? "animate-spin" : ""}`}
        ></div>
      </div>

      <div
        ref={contentRef}
        className="p-4 space-y-6 overflow-auto h-[calc(100vh-80px)] pb-20"
        style={{
          transform:
            pullDistance > 0
              ? `translateY(${pullDistance}px)`
              : "translateY(0)",
        }}
      >
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
          </div>
        ) : (
          <>
            {/* Welcome Card */}
            <Card className="p-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl shadow-md overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/4"></div>

              <h2 className="text-xl font-semibold relative z-10">
                Xin chào, {user?.user_metadata?.full_name || "Học viên"}
              </h2>
              <p className="text-sm opacity-90 mt-1 relative z-10">
                Chào mừng trở lại với giáo trình của anh chị em
              </p>

              <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-lg p-4 relative z-10">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Tiến độ tổng thể</span>
                  <span className="font-bold">{overallProgress}%</span>
                </div>
                <Progress
                  value={overallProgress}
                  className="h-3 bg-white/30 rounded-full"
                />
              </div>
            </Card>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="p-4 rounded-xl bg-white shadow-sm overflow-hidden relative">
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-green-50 rounded-full"></div>
                <div className="flex items-center gap-3 relative z-10">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center shadow-sm">
                    <Award className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">
                      Hoàn thành
                    </p>
                    <p className="text-xl font-bold">
                      {completedMonths.length}/6
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 rounded-xl bg-white shadow-sm overflow-hidden relative">
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-purple-50 rounded-full"></div>
                <div className="flex items-center gap-3 relative z-10">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center shadow-sm">
                    <BookOpen className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Bài học</p>
                    <p className="text-xl font-bold">
                      {Math.round(overallProgress / 10)}/28
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Module Progress */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">Tiến Độ Học Tập</h3>
                <button
                  className="text-blue-600 text-sm font-medium flex items-center active:opacity-70"
                  onClick={() => navigate("/progress")}
                >
                  Xem tất cả <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-3">
                {modules.map((module, index) => (
                  <Card
                    key={index}
                    className="p-4 rounded-xl bg-white shadow-sm active:bg-gray-50 transition-colors duration-150"
                    onClick={() => handleModuleClick(module.path)}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center shadow-sm">
                        {module.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{module.name}</p>
                      </div>
                      <span className="text-sm font-bold">
                        {module.progress}%
                      </span>
                    </div>
                    <Progress
                      value={module.progress}
                      className="h-2.5 bg-gray-100 rounded-full"
                      indicatorClassName={`${module.progress > 70 ? "bg-green-500" : module.progress > 40 ? "bg-blue-500" : "bg-orange-500"}`}
                    />
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">Hoạt Động Gần Đây</h3>
                <button className="text-blue-600 text-sm font-medium flex items-center active:opacity-70">
                  Tất cả <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <Card className="divide-y divide-gray-100 rounded-xl bg-white shadow-sm overflow-hidden">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="p-4 active:bg-gray-50 transition-colors duration-150"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`h-8 w-8 rounded-full ${activity.color} flex items-center justify-center ${activity.textColor} mt-0.5 shadow-sm`}
                      >
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.title}</p>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-sm text-gray-500">
                            {activity.subtitle}
                          </p>
                          <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                            {activity.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Card>
            </div>

            {/* Spacer for bottom nav */}
            <div className="h-16"></div>
          </>
        )}
      </div>

      {/* Refreshing indicator */}
      {refreshing && (
        <div className="fixed top-16 left-0 right-0 flex justify-center items-center py-2 bg-blue-500 text-white text-sm font-medium z-40">
          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          Đang cập nhật...
        </div>
      )}

      <MobileBottomNav />
    </div>
  );
}

// CheckCircle component for recent activities
function CheckCircle({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
