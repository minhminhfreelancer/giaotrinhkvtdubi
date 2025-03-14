import { useState } from "react";
import MobileHeader from "../components/MobileHeader";
import MobileBottomNav from "../components/MobileBottomNav";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  BarChart2,
  Award,
  Calendar,
  ChevronRight,
  CheckCircle,
} from "lucide-react";

export default function MobileProgress() {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

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
      id: "scripture-study",
      title: "Truyền Đạo Học",
      description: "Học tập các nguyên tắc truyền đạo hiệu quả",
      progress: 75,
      icon: <BookOpen className="h-5 w-5" />,
      lessons: [
        { id: "1", title: "Mục tiêu truyền đạo", completed: true },
        { id: "2", title: "Phương án truyền đạo", completed: true },
        { id: "3", title: "Mục tiêu giáo dục", completed: true },
        { id: "4", title: "Phương án quản lý khu vực", completed: false },
      ],
    },
    {
      id: "teaching-methods",
      title: "Sinh Hoạt Truyền Giáo",
      description: "Lịch trình sinh hoạt hàng tuần",
      progress: 50,
      icon: <Calendar className="h-5 w-5" />,
      lessons: [
        { id: "1", title: "Tuần 1", completed: true },
        { id: "2", title: "Tuần 2", completed: true },
        { id: "3", title: "Tuần 3", completed: false },
        { id: "4", title: "Tuần 4", completed: false },
      ],
    },
    {
      id: "pastoral-care",
      title: "Kiểm Điểm Bản Thân",
      description: "Tự đánh giá và phát triển cá nhân",
      progress: 30,
      icon: <BarChart2 className="h-5 w-5" />,
      lessons: [
        { id: "1", title: "Đức tin", completed: true },
        { id: "2", title: "Đức hạnh", completed: false },
        { id: "3", title: "Đời sống", completed: false },
      ],
    },
    {
      id: "leadership-development",
      title: "Sách Lẽ Thật",
      description: "Học tập và phản ánh về sách lẽ thật",
      progress: 60,
      icon: <BookOpen className="h-5 w-5" />,
      lessons: [
        { id: "1", title: "Đọc sách", completed: true },
        { id: "2", title: "Hương khí sau khi đọc", completed: true },
        { id: "3", title: "Phản ánh cá nhân", completed: false },
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

          <TabsContent value="overview" className="space-y-4">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="p-3 rounded-xl bg-white shadow-sm">
                <div className="flex flex-col items-center justify-center text-center p-2">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                    <BarChart2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <p className="text-2xl font-semibold">51%</p>
                  <p className="text-xs text-gray-500">Tiến độ tổng thể</p>
                </div>
              </Card>

              <Card className="p-3 rounded-xl bg-white shadow-sm">
                <div className="flex flex-col items-center justify-center text-center p-2">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                    <Award className="h-5 w-5 text-green-600" />
                  </div>
                  <p className="text-2xl font-semibold">1/6</p>
                  <p className="text-xs text-gray-500">Mô-đun hoàn thành</p>
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
                      <span className="font-medium">{module.progress}%</span>
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
        </Tabs>
      </div>

      <MobileBottomNav />
    </div>
  );
}
