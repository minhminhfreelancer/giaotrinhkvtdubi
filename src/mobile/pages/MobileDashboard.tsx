import { useState, useEffect } from "react";
import MobileHeader from "../components/MobileHeader";
import MobileBottomNav from "../components/MobileBottomNav";
import { useAuth } from "../../../supabase/auth";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  BarChart2,
  Calendar,
  Award,
  ChevronRight,
} from "lucide-react";

export default function MobileDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  // Sample data for the dashboard
  const modules = [
    {
      name: "Truyền Đạo Học",
      progress: 75,
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      name: "Sinh Hoạt Truyền Giáo",
      progress: 50,
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      name: "Kiểm Điểm Bản Thân",
      progress: 30,
      icon: <BarChart2 className="h-5 w-5" />,
    },
    {
      name: "Sách Lẽ Thật",
      progress: 60,
      icon: <BookOpen className="h-5 w-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-14">
      <MobileHeader title="Bảng Điều Khiển" />

      <div className="p-4 space-y-6">
        {/* Welcome Card */}
        <Card className="p-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl shadow-md">
          <h2 className="text-xl font-semibold">
            Xin chào, {user?.user_metadata?.full_name || "Học viên"}
          </h2>
          <p className="text-sm opacity-90 mt-1">
            Chào mừng trở lại với giáo trình của anh chị em
          </p>

          <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium">Tiến độ tổng thể</span>
              <span className="font-bold">51%</span>
            </div>
            <Progress value={51} className="h-3 bg-white/30 rounded-full" />
          </div>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4 rounded-xl bg-white shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <Award className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Hoàn thành</p>
                <p className="text-xl font-bold">1/6</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 rounded-xl bg-white shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Bài học</p>
                <p className="text-xl font-bold">15/28</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Module Progress */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">Tiến Độ Học Tập</h3>
            <button className="text-blue-600 text-sm font-medium flex items-center">
              Xem tất cả <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-3">
            {modules.map((module, index) => (
              <Card key={index} className="p-4 rounded-xl bg-white shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    {module.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{module.name}</p>
                  </div>
                  <span className="text-sm font-bold">{module.progress}%</span>
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
            <button className="text-blue-600 text-sm font-medium flex items-center">
              Tất cả <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <Card className="divide-y divide-gray-100 rounded-xl bg-white shadow-sm overflow-hidden">
            {[
              {
                title: "Hoàn thành bài học",
                subtitle: "Truyền Đạo Học - Chương 1",
                time: "Hôm nay",
                color: "bg-green-100",
                textColor: "text-green-600",
                icon: <BookOpen className="h-4 w-4" />,
              },
              {
                title: "Cập nhật tiến độ",
                subtitle: "Kiểm Điểm Bản Thân - Tuần 2",
                time: "Hôm qua",
                color: "bg-blue-100",
                textColor: "text-blue-600",
                icon: <BarChart2 className="h-4 w-4" />,
              },
              {
                title: "Bắt đầu mô-đun mới",
                subtitle: "Sách Lẽ Thật",
                time: "3 ngày trước",
                color: "bg-purple-100",
                textColor: "text-purple-600",
                icon: <BookOpen className="h-4 w-4" />,
              },
            ].map((activity, index) => (
              <div key={index} className="p-4 active:bg-gray-50">
                <div className="flex items-start gap-3">
                  <div
                    className={`h-8 w-8 rounded-full ${activity.color} flex items-center justify-center ${activity.textColor} mt-0.5`}
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
      </div>

      <MobileBottomNav />
    </div>
  );
}
