import { useState, useEffect } from "react";
import MobileHeader from "../components/MobileHeader";
import MobileBottomNav from "../components/MobileBottomNav";
import { useAuth } from "../../../supabase/auth";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, BarChart2, Calendar, Award } from "lucide-react";

export default function MobileDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  // Sample data for the dashboard
  const modules = [
    {
      name: "Truyền Đạo Học",
      progress: 75,
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      name: "Sinh Hoạt Truyền Giáo",
      progress: 50,
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      name: "Kiểm Điểm Bản Thân",
      progress: 30,
      icon: <BarChart2 className="h-4 w-4" />,
    },
    {
      name: "Sách Lẽ Thật",
      progress: 60,
      icon: <BookOpen className="h-4 w-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-16 pt-14">
      <MobileHeader title="Bảng Điều Khiển" />

      <div className="p-4 space-y-6">
        {/* Welcome Card */}
        <Card className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-md">
          <h2 className="text-xl font-semibold">
            Xin chào, {user?.user_metadata?.full_name || "Học viên"}
          </h2>
          <p className="text-sm opacity-90 mt-1">
            Chào mừng trở lại với giáo trình của anh chị em
          </p>

          <div className="mt-4 bg-white/20 rounded-lg p-3">
            <div className="flex justify-between text-sm mb-1">
              <span>Tiến độ tổng thể</span>
              <span>51%</span>
            </div>
            <Progress value={51} className="h-2 bg-white/30" />
          </div>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-3 rounded-xl bg-white shadow-sm">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <Award className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Hoàn thành</p>
                <p className="text-lg font-semibold">1/6</p>
              </div>
            </div>
          </Card>

          <Card className="p-3 rounded-xl bg-white shadow-sm">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Bài học</p>
                <p className="text-lg font-semibold">15/28</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Module Progress */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Tiến Độ Học Tập</h3>
          <div className="space-y-3">
            {modules.map((module, index) => (
              <Card key={index} className="p-3 rounded-xl bg-white shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    {module.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{module.name}</p>
                  </div>
                  <span className="text-sm font-medium">
                    {module.progress}%
                  </span>
                </div>
                <Progress value={module.progress} className="h-2 bg-gray-100" />
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Hoạt Động Gần Đây</h3>
          <Card className="divide-y divide-gray-100 rounded-xl bg-white shadow-sm overflow-hidden">
            {[
              {
                title: "Hoàn thành bài học",
                subtitle: "Truyền Đạo Học - Chương 1",
                time: "Hôm nay",
              },
              {
                title: "Cập nhật tiến độ",
                subtitle: "Kiểm Điểm Bản Thân - Tuần 2",
                time: "Hôm qua",
              },
              {
                title: "Bắt đầu mô-đun mới",
                subtitle: "Sách Lẽ Thật",
                time: "3 ngày trước",
              },
            ].map((activity, index) => (
              <div key={index} className="p-3">
                <p className="font-medium">{activity.title}</p>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-sm text-gray-500">{activity.subtitle}</p>
                  <span className="text-xs text-gray-400">{activity.time}</span>
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
