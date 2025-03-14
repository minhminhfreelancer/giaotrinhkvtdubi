import { useState, useEffect } from "react";
import MobileHeader from "../components/MobileHeader";
import MobileBottomNav from "../components/MobileBottomNav";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  BarChart2,
  Calendar,
  Award,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import { supabase } from "../../../supabase/supabase";
import { useAuth } from "../../../supabase/auth";

export default function MobileProgress() {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [completedMonths, setCompletedMonths] = useState<number[]>([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCompletedMonths();
    }
  }, [user]);

  const fetchCompletedMonths = async () => {
    if (!user) return;

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
      console.error("Error fetching completed months:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleModule = (moduleId: string) => {
    if (expandedModule === moduleId) {
      setExpandedModule(null);
    } else {
      setExpandedModule(moduleId);
    }
  };

  // Sample modules data
  const modules = [
    {
      id: "chapter1",
      title: "Truyền Đạo Học",
      description: "Học tập các nguyên tắc truyền đạo hiệu quả",
      progress: completedMonths.includes(1) ? 100 : 75,
      icon: <BookOpen className="h-5 w-5" />,
      path: "/curriculum",
      lessons: [
        { id: "1", title: "Mục tiêu truyền đạo", completed: true },
        { id: "2", title: "Phương án truyền đạo", completed: true },
        { id: "3", title: "Mục tiêu giáo dục", completed: true },
        {
          id: "4",
          title: "Phương án quản lý khu vực",
          completed: completedMonths.includes(1),
        },
      ],
    },
    {
      id: "chapter2",
      title: "Sinh Hoạt Truyền Giáo",
      description: "Lịch trình sinh hoạt hàng tuần",
      progress: completedMonths.includes(2) ? 100 : 50,
      icon: <Calendar className="h-5 w-5" />,
      path: "/curriculum",
      lessons: [
        { id: "1", title: "Tuần 1", completed: true },
        { id: "2", title: "Tuần 2", completed: true },
        { id: "3", title: "Tuần 3", completed: completedMonths.includes(2) },
        { id: "4", title: "Tuần 4", completed: completedMonths.includes(2) },
      ],
    },
    {
      id: "chapter3",
      title: "Kiểm Điểm Bản Thân",
      description: "Tự đánh giá và phát triển cá nhân",
      progress: completedMonths.includes(3) ? 100 : 30,
      icon: <BarChart2 className="h-5 w-5" />,
      path: "/curriculum",
      lessons: [
        { id: "1", title: "Đức tin", completed: true },
        { id: "2", title: "Đức hạnh", completed: completedMonths.includes(3) },
        { id: "3", title: "Đời sống", completed: completedMonths.includes(3) },
      ],
    },
    {
      id: "chapter4",
      title: "Sách Lẽ Thật",
      description: "Học tập và phản ánh về sách lẽ thật",
      progress: completedMonths.includes(4) ? 100 : 60,
      icon: <BookOpen className="h-5 w-5" />,
      path: "/curriculum",
      lessons: [
        { id: "1", title: "Đọc sách", completed: true },
        { id: "2", title: "Hương khí sau khi đọc", completed: true },
        {
          id: "3",
          title: "Phản ánh cá nhân",
          completed: completedMonths.includes(4),
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-16 pt-14">
      <MobileHeader title="Tiến Độ Học Tập" />

      <div className="p-4">
        <Tabs
          defaultValue="overview"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-2 h-auto p-1 bg-gray-100 rounded-lg mb-4">
            <TabsTrigger
              value="overview"
              className="rounded-md py-2 px-4 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Tổng quan
            </TabsTrigger>
            <TabsTrigger
              value="modules"
              className="rounded-md py-2 px-4 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Mô-đun
            </TabsTrigger>
          </TabsList>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
            </div>
          ) : (
            <>
              <TabsContent value="overview" className="space-y-4">
                {/* Summary Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <Card className="p-3 rounded-xl bg-white shadow-sm">
                    <div className="flex flex-col items-center justify-center text-center p-2">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                        <BarChart2 className="h-5 w-5 text-blue-600" />
                      </div>
                      <p className="text-2xl font-semibold">
                        {overallProgress}%
                      </p>
                      <p className="text-xs text-gray-500">Tiến độ tổng thể</p>
                    </div>
                  </Card>

                  <Card className="p-3 rounded-xl bg-white shadow-sm">
                    <div className="flex flex-col items-center justify-center text-center p-2">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                        <Award className="h-5 w-5 text-green-600" />
                      </div>
                      <p className="text-2xl font-semibold">
                        {completedMonths.length}/6
                      </p>
                      <p className="text-xs text-gray-500">Tháng hoàn thành</p>
                    </div>
                  </Card>
                </div>

                {/* Module Progress Cards */}
                <div className="space-y-3">
                  {modules.map((module) => (
                    <Card
                      key={module.id}
                      className="p-3 rounded-xl bg-white shadow-sm"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          {module.icon}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{module.title}</p>
                          <p className="text-xs text-gray-500">
                            {module.description}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Tiến độ</span>
                          <span className="font-medium">
                            {module.progress}%
                          </span>
                        </div>
                        <Progress
                          value={module.progress}
                          className="h-2 bg-gray-100"
                        />
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="modules" className="space-y-4">
                {modules.map((module) => (
                  <Card
                    key={module.id}
                    className="rounded-xl bg-white shadow-sm overflow-hidden"
                  >
                    <div
                      className="p-3 flex items-center justify-between cursor-pointer"
                      onClick={() => toggleModule(module.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          {module.icon}
                        </div>
                        <div>
                          <p className="font-medium">{module.title}</p>
                          <p className="text-xs text-gray-500">
                            {module.progress}% hoàn thành
                          </p>
                        </div>
                      </div>
                      <ChevronRight
                        className={`h-5 w-5 text-gray-400 transition-transform ${expandedModule === module.id ? "rotate-90" : ""}`}
                      />
                    </div>

                    {expandedModule === module.id && (
                      <div className="border-t border-gray-100 bg-gray-50 p-3">
                        <div className="space-y-2">
                          {module.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="flex items-center justify-between p-2 bg-white rounded-lg border border-gray-100"
                            >
                              <div className="flex items-center gap-2">
                                <div
                                  className={`h-6 w-6 rounded-full flex items-center justify-center ${lesson.completed ? "bg-green-100" : "bg-gray-100"}`}
                                >
                                  {lesson.completed ? (
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                  ) : (
                                    <span className="h-2 w-2 rounded-full bg-gray-400"></span>
                                  )}
                                </div>
                                <span
                                  className={`text-sm ${lesson.completed ? "text-gray-700" : "text-gray-600"}`}
                                >
                                  {lesson.title}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>

      <MobileBottomNav />
    </div>
  );
}
