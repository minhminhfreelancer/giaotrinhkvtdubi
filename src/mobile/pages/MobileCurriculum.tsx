import { useState } from "react";
import MobileHeader from "../components/MobileHeader";
import MobileBottomNav from "../components/MobileBottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, Lock } from "lucide-react";

export default function MobileCurriculum() {
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [activeChapter, setActiveChapter] = useState("chapter1");

  // Sample data for curriculum
  const months = [
    { number: 1, name: "Tháng 1", completed: false, available: true },
    { number: 2, name: "Tháng 2", completed: false, available: false },
    { number: 3, name: "Tháng 3", completed: false, available: false },
    { number: 4, name: "Tháng 4", completed: false, available: false },
    { number: 5, name: "Tháng 5", completed: false, available: false },
    { number: 6, name: "Tháng 6", completed: false, available: false },
  ];

  const chapters = [
    { id: "chapter1", title: "Chương 1", subtitle: "Truyền Đạo Học" },
    { id: "chapter2", title: "Chương 2", subtitle: "Sinh Hoạt Truyền Giáo" },
    { id: "chapter3", title: "Chương 3", subtitle: "Kiểm Điểm Bản Thân" },
    { id: "chapter4", title: "Chương 4", subtitle: "Sách Lẽ Thật" },
    { id: "chapter5", title: "Chương 5", subtitle: "Thực Hành Giảng Đạo" },
    { id: "chapter6", title: "Chương 6", subtitle: "Tập Giảng Đạo" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-16 pt-14">
      <MobileHeader title="Giáo Trình" />

      <div className="p-4 space-y-6">
        {/* Month Selector */}
        <div className="flex overflow-x-auto pb-2 -mx-4 px-4 space-x-2">
          {months.map((month) => (
            <Button
              key={month.number}
              onClick={() => month.available && setSelectedMonth(month.number)}
              variant={selectedMonth === month.number ? "default" : "outline"}
              className={`h-auto py-2 px-3 flex flex-col items-center justify-center gap-1 min-w-[80px] ${selectedMonth === month.number ? "bg-blue-600 text-white" : month.available ? "bg-white" : "bg-gray-100 text-gray-500"} ${!month.available ? "cursor-not-allowed opacity-70" : ""}`}
              disabled={!month.available}
            >
              <div className="flex items-center justify-center h-6 w-6 rounded-full border-2 border-current">
                {month.completed ? (
                  <CheckCircle className="h-4 w-4" />
                ) : month.available ? (
                  <span className="text-xs">{month.number}</span>
                ) : (
                  <Lock className="h-3 w-3" />
                )}
              </div>
              <span className="text-xs">{month.name}</span>
            </Button>
          ))}
        </div>

        {/* Chapter Tabs */}
        <Card className="rounded-xl overflow-hidden">
          <div className="bg-white p-3 border-b">
            <h2 className="font-semibold">Giáo Trình Tháng {selectedMonth}</h2>
          </div>

          <Tabs
            defaultValue="chapter1"
            value={activeChapter}
            onValueChange={setActiveChapter}
            className="w-full"
          >
            <div className="bg-white border-b overflow-x-auto">
              <TabsList className="flex w-max bg-transparent h-auto p-0">
                {chapters.map((chapter) => (
                  <TabsTrigger
                    key={chapter.id}
                    value={chapter.id}
                    className="py-3 px-4 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none bg-transparent"
                  >
                    {chapter.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Chapter 1 Content */}
            <TabsContent value="chapter1" className="p-4 bg-white">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="evangelismGoal"
                    className="text-sm font-medium"
                  >
                    1. Mục tiêu truyền đạo
                  </Label>
                  <Textarea
                    id="evangelismGoal"
                    className="min-h-[100px] border-gray-300 rounded-lg"
                    placeholder="Nhập mục tiêu truyền đạo của anh chị em..."
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="evangelismPlan"
                    className="text-sm font-medium"
                  >
                    2. Phương án truyền đạo
                  </Label>
                  <Textarea
                    id="evangelismPlan"
                    className="min-h-[100px] border-gray-300 rounded-lg"
                    placeholder="Nhập phương án truyền đạo của anh chị em..."
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="educationGoal"
                    className="text-sm font-medium"
                  >
                    3. Mục tiêu giáo dục
                  </Label>
                  <Textarea
                    id="educationGoal"
                    className="min-h-[100px] border-gray-300 rounded-lg"
                    placeholder="Nhập mục tiêu giáo dục của anh chị em..."
                  />
                </div>
              </div>
            </TabsContent>

            {/* Other chapters would be implemented similarly */}
            <TabsContent value="chapter2" className="p-4 bg-white">
              <p className="text-center text-gray-500 py-8">
                Nội dung Sinh Hoạt Truyền Giáo
              </p>
            </TabsContent>

            <TabsContent value="chapter3" className="p-4 bg-white">
              <p className="text-center text-gray-500 py-8">
                Nội dung Kiểm Điểm Bản Thân
              </p>
            </TabsContent>

            <TabsContent value="chapter4" className="p-4 bg-white">
              <p className="text-center text-gray-500 py-8">
                Nội dung Sách Lẽ Thật
              </p>
            </TabsContent>

            <TabsContent value="chapter5" className="p-4 bg-white">
              <p className="text-center text-gray-500 py-8">
                Nội dung Thực Hành Giảng Đạo
              </p>
            </TabsContent>

            <TabsContent value="chapter6" className="p-4 bg-white">
              <p className="text-center text-gray-500 py-8">
                Nội dung Tập Giảng Đạo
              </p>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Save Button */}
        <div className="sticky bottom-20 pt-2">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2">
            Lưu Thay Đổi
          </Button>
        </div>
      </div>

      <MobileBottomNav />
    </div>
  );
}
