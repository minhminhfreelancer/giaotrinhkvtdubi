import { useState, useEffect } from "react";
import MobileHeader from "../components/MobileHeader";
import MobileBottomNav from "../components/MobileBottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "../../../supabase/supabase";
import { useAuth } from "../../../supabase/auth";
import { Lock, CheckCircle, Circle } from "lucide-react";
import {
  MobileChapter1,
  MobileChapter2,
  MobileChapter3,
  MobileChapter4,
  MobileChapter5,
  MobileChapter6,
} from "./chapters";
import {
  CurriculumFormData,
  SelfAssessment,
  WeeklySchedule,
} from "@/components/curriculum/types";

export default function MobileCurriculum() {
  const [activeTab, setActiveTab] = useState("chapter1");
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [completedMonths, setCompletedMonths] = useState<number[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();

  // Form data state
  const [formData, setFormData] = useState<CurriculumFormData>({
    evangelismGoal: "",
    evangelismPlan: "",
    educationGoal: "",
    educationPlan: "",
    managementPlan: "",
    weeklySchedules: {
      week1: Array.from({ length: 7 }, (_, i) => ({
        day: [
          "Chủ Nhật",
          "Thứ Hai",
          "Thứ Ba",
          "Thứ Tư",
          "Thứ Năm",
          "Thứ Sáu",
          "Thứ Bảy",
        ][i],
        wakeUpTime: "",
        morning: "",
        morningTime: "",
        afternoon: "",
        afternoonTime: "",
        evening: "",
        eveningTime: "",
        bedTime: "",
      })),
      week2: Array.from({ length: 7 }, (_, i) => ({
        day: [
          "Chủ Nhật",
          "Thứ Hai",
          "Thứ Ba",
          "Thứ Tư",
          "Thứ Năm",
          "Thứ Sáu",
          "Thứ Bảy",
        ][i],
        wakeUpTime: "",
        morning: "",
        morningTime: "",
        afternoon: "",
        afternoonTime: "",
        evening: "",
        eveningTime: "",
        bedTime: "",
      })),
      week3: Array.from({ length: 7 }, (_, i) => ({
        day: [
          "Chủ Nhật",
          "Thứ Hai",
          "Thứ Ba",
          "Thứ Tư",
          "Thứ Năm",
          "Thứ Sáu",
          "Thứ Bảy",
        ][i],
        wakeUpTime: "",
        morning: "",
        morningTime: "",
        afternoon: "",
        afternoonTime: "",
        evening: "",
        eveningTime: "",
        bedTime: "",
      })),
      week4: Array.from({ length: 7 }, (_, i) => ({
        day: [
          "Chủ Nhật",
          "Thứ Hai",
          "Thứ Ba",
          "Thứ Tư",
          "Thứ Năm",
          "Thứ Sáu",
          "Thứ Bảy",
        ][i],
        wakeUpTime: "",
        morning: "",
        morningTime: "",
        afternoon: "",
        afternoonTime: "",
        evening: "",
        eveningTime: "",
        bedTime: "",
      })),
    },
    assessments: [
      {
        category: "TRUYỀN ĐẠO",
        content:
          "1. Có lập tốt kế hoạch truyền đạo và thực hiện hiệu quả không?",
        score: "",
      },
      {
        category: "TRUYỀN ĐẠO",
        content:
          "2. Có luôn truyền đạo bằng tấm lòng vui mừng và cảm tạ lên Đức Chúa Trời không?",
        score: "",
      },
      {
        category: "TRUYỀN ĐẠO",
        content:
          "3. Có siêng năng cầu nguyện sớm tối vì trái của Tin Lành không?",
        score: "",
      },
      {
        category: "LỄ NGHĨA",
        content: "4. Khi gặp bất cứ ai, có hay chào hỏi vui vẻ trước không?",
        score: "",
      },
      {
        category: "LỄ NGHĨA",
        content: "5. Có hay chào hỏi vui vẻ trước dù gặp mấy lần không?",
        score: "",
      },
      {
        category: "LỄ NGHĨA",
        content:
          "6. Có chào hỏi trước đối với cả những thánh đồ mình không biết rõ không?",
        score: "",
      },
      {
        category: "LỄ NGHĨA",
        content:
          "7. Có chào hỏi bằng cách cúi mình chứ không chỉ gật đầu nhẹ không?",
        score: "",
      },
      {
        category: "LỄ NGHĨA",
        content: "8. Không ra oai, cũng không hành động cẩu thả",
        score: "",
      },
      {
        category: "LỄ NGHĨA",
        content:
          "9. Có giữ tốt lễ nghĩa tùy theo sự khác biệt tuổi tác phần xác thịt không?",
        score: "",
      },
      {
        category: "LỄ NGHĨA",
        content: "10. Có giữ tốt lễ nghĩa với địa vực trưởng không?",
        score: "",
      },
    ],
    truthBookReflections: {
      reflection1: "",
      reflection2: "",
      reflection3: "",
      reflection4: "",
    },
    sermonBookReflections: {
      reflection1: "",
      reflection2: "",
      reflection3: "",
      reflection4: "",
    },
  });

  // Load curriculum data when month changes
  useEffect(() => {
    if (user) {
      loadCurriculumData();
      fetchCompletedMonths();
    }
  }, [user, selectedMonth]);

  const fetchCompletedMonths = async () => {
    if (!user) return;

    try {
      // Get completed months
      const { data, error } = await supabase
        .from("curriculum")
        .select("month")
        .eq("user_id", user.id)
        .eq("is_completed", true);

      if (error) throw error;

      const completed = data?.map((item) => item.month) || [];
      setCompletedMonths(completed);
    } catch (error) {
      console.error("Error fetching completed months:", error);
      // Default to month 1 being available
      setCompletedMonths([]);
    }
  };

  const isMonthAvailable = (month: number) => {
    // Month 1 is always available
    if (month === 1) return true;

    // Other months are available if the previous month is completed
    return completedMonths.includes(month - 1);
  };

  const isMonthCompleted = (month: number) => {
    return completedMonths.includes(month);
  };

  const handleMonthSelect = (month: number) => {
    if (!isMonthAvailable(month)) {
      toast({
        title: "Tháng này chưa được mở khóa",
        description: "Anh chị em cần hoàn thành tháng trước đó trước.",
        variant: "destructive",
      });
      return;
    }

    setSelectedMonth(month);
  };

  const loadCurriculumData = async () => {
    if (!user) return;

    try {
      setLoading(true);
      // Query the curriculum table
      const { data: curriculumData, error } = await supabase
        .from("curriculum")
        .select("*")
        .eq("user_id", user.id)
        .eq("month", selectedMonth);

      if (error) {
        console.error("Error loading curriculum data:", error);
        return;
      }

      if (curriculumData && curriculumData.length > 0) {
        const data = curriculumData[0];
        setFormData({
          evangelismGoal: data.evangelism_goal || "",
          evangelismPlan: data.evangelism_plan || "",
          educationGoal: data.education_goal || "",
          educationPlan: data.education_plan || "",
          managementPlan: data.management_plan || "",
          weeklySchedules: data.weekly_schedules || formData.weeklySchedules,
          assessments: data.assessments || formData.assessments,
          truthBookReflections: data.truth_book_reflections || {
            reflection1: "",
            reflection2: "",
            reflection3: "",
            reflection4: "",
          },
          sermonBookReflections: data.sermon_book_reflections || {
            reflection1: "",
            reflection2: "",
            reflection3: "",
            reflection4: "",
          },
        });
      } else {
        // Reset form to default values if no data found
        setFormData({
          evangelismGoal: "",
          evangelismPlan: "",
          educationGoal: "",
          educationPlan: "",
          managementPlan: "",
          weeklySchedules: {
            week1: Array.from({ length: 7 }, (_, i) => ({
              day: [
                "Chủ Nhật",
                "Thứ Hai",
                "Thứ Ba",
                "Thứ Tư",
                "Thứ Năm",
                "Thứ Sáu",
                "Thứ Bảy",
              ][i],
              wakeUpTime: "",
              morning: "",
              morningTime: "",
              afternoon: "",
              afternoonTime: "",
              evening: "",
              eveningTime: "",
              bedTime: "",
            })),
            week2: Array.from({ length: 7 }, (_, i) => ({
              day: [
                "Chủ Nhật",
                "Thứ Hai",
                "Thứ Ba",
                "Thứ Tư",
                "Thứ Năm",
                "Thứ Sáu",
                "Thứ Bảy",
              ][i],
              wakeUpTime: "",
              morning: "",
              morningTime: "",
              afternoon: "",
              afternoonTime: "",
              evening: "",
              eveningTime: "",
              bedTime: "",
            })),
            week3: Array.from({ length: 7 }, (_, i) => ({
              day: [
                "Chủ Nhật",
                "Thứ Hai",
                "Thứ Ba",
                "Thứ Tư",
                "Thứ Năm",
                "Thứ Sáu",
                "Thứ Bảy",
              ][i],
              wakeUpTime: "",
              morning: "",
              morningTime: "",
              afternoon: "",
              afternoonTime: "",
              evening: "",
              eveningTime: "",
              bedTime: "",
            })),
            week4: Array.from({ length: 7 }, (_, i) => ({
              day: [
                "Chủ Nhật",
                "Thứ Hai",
                "Thứ Ba",
                "Thứ Tư",
                "Thứ Năm",
                "Thứ Sáu",
                "Thứ Bảy",
              ][i],
              wakeUpTime: "",
              morning: "",
              morningTime: "",
              afternoon: "",
              afternoonTime: "",
              evening: "",
              eveningTime: "",
              bedTime: "",
            })),
          },
          assessments: formData.assessments,
          truthBookReflections: {
            reflection1: "",
            reflection2: "",
            reflection3: "",
            reflection4: "",
          },
          sermonBookReflections: {
            reflection1: "",
            reflection2: "",
            reflection3: "",
            reflection4: "",
          },
        });
      }
    } catch (error) {
      console.error("Error loading curriculum data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handler functions for form data changes
  const handleWeeklyScheduleChange = (
    week: string,
    index: number,
    field: keyof WeeklySchedule,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      weeklySchedules: {
        ...prev.weeklySchedules,
        [week]: prev.weeklySchedules[
          week as keyof typeof prev.weeklySchedules
        ].map((day, i) => (i === index ? { ...day, [field]: value } : day)),
      },
    }));
  };

  const handleAssessmentChange = (
    index: number,
    value: string,
    week?: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      assessments: prev.assessments.map((assessment, i) => {
        if (i === index) {
          if (week) {
            return { ...assessment, [week]: value };
          } else {
            return { ...assessment, score: value };
          }
        }
        return assessment;
      }),
    }));
  };

  const saveCurriculumData = async () => {
    if (!user) {
      toast({
        title: "Lỗi",
        description: "Anh chị em cần đăng nhập để lưu dữ liệu",
        variant: "destructive",
      });
      return;
    }

    try {
      setSaving(true);

      // Check if curriculum exists for this month
      const { data: existingData, error: fetchError } = await supabase
        .from("curriculum")
        .select("id")
        .eq("user_id", user.id)
        .eq("month", selectedMonth);

      const curriculumData = {
        user_id: user.id,
        month: selectedMonth,
        evangelism_goal: formData.evangelismGoal,
        evangelism_plan: formData.evangelismPlan,
        education_goal: formData.educationGoal,
        education_plan: formData.educationPlan,
        management_plan: formData.managementPlan,
        weekly_schedules: formData.weeklySchedules,
        assessments: formData.assessments,
        truth_book_reflections: formData.truthBookReflections,
        sermon_book_reflections: formData.sermonBookReflections,
        updated_at: new Date().toISOString(),
      };

      let result;
      if (existingData && existingData.length > 0) {
        // Update existing curriculum
        result = await supabase
          .from("curriculum")
          .update(curriculumData)
          .eq("id", existingData[0].id);
      } else {
        // Insert new curriculum
        result = await supabase.from("curriculum").insert({
          ...curriculumData,
          created_at: new Date().toISOString(),
        });
      }

      if (result.error) throw result.error;

      toast({
        title: "Thành công",
        description: "Đã lưu dữ liệu thành công",
      });

      // Add haptic feedback if available
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    } catch (error) {
      console.error("Error saving curriculum data:", error);
      toast({
        title: "Lỗi",
        description: "Không thể lưu dữ liệu. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const markAsComplete = async () => {
    if (!user) {
      toast({
        title: "Lỗi",
        description: "Anh chị em cần đăng nhập để hoàn thành giáo trình",
        variant: "destructive",
      });
      return;
    }

    try {
      setSaving(true);

      // Check if curriculum exists for this month
      const { data: existingData, error: fetchError } = await supabase
        .from("curriculum")
        .select("id")
        .eq("user_id", user.id)
        .eq("month", selectedMonth);

      let result;
      if (existingData && existingData.length > 0) {
        // Update existing curriculum
        result = await supabase
          .from("curriculum")
          .update({ is_completed: true })
          .eq("id", existingData[0].id);
      } else {
        // Insert new curriculum with completed status
        result = await supabase.from("curriculum").insert({
          user_id: user.id,
          month: selectedMonth,
          is_completed: true,
          created_at: new Date().toISOString(),
        });
      }

      if (result.error) throw result.error;

      toast({
        title: "Thành công",
        description: `Đã đánh dấu hoàn thành tháng ${selectedMonth}`,
      });

      // Refresh completed months
      fetchCompletedMonths();

      // If current month is completed, automatically select next month if available
      if (selectedMonth < 6) {
        setSelectedMonth(selectedMonth + 1);
      }

      // Add haptic feedback if available
      if (navigator.vibrate) {
        navigator.vibrate([15, 30, 15]);
      }
    } catch (error) {
      console.error("Error marking as complete:", error);
      toast({
        title: "Lỗi",
        description: "Không thể đánh dấu hoàn thành. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 pt-14">
      <MobileHeader title="Giáo Trình" />

      <div className="p-4 space-y-6">
        {/* Month Selector */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[1, 2, 3, 4, 5, 6].map((month) => {
            const available = isMonthAvailable(month);
            const completed = isMonthCompleted(month);
            const isSelected = selectedMonth === month;

            return (
              <Button
                key={month}
                variant={isSelected ? "default" : "outline"}
                className={`h-auto py-2 px-3 text-sm flex flex-col items-center gap-1 ${isSelected ? "bg-blue-600" : available ? "bg-white" : "bg-gray-100 text-gray-500"} ${!available ? "cursor-not-allowed opacity-70" : ""}`}
                onClick={() => handleMonthSelect(month)}
                disabled={loading || !available}
              >
                <div className="flex items-center justify-center h-5 w-5">
                  {completed ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : available ? (
                    <Circle className="h-4 w-4" />
                  ) : (
                    <Lock className="h-3.5 w-3.5" />
                  )}
                </div>
                <span>Tháng {month}</span>
              </Button>
            );
          })}
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-center py-4">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
          </div>
        )}

        {/* Chapter Tabs */}
        {!loading && (
          <Card className="p-0 overflow-hidden">
            <Tabs
              defaultValue="chapter1"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="overflow-x-auto">
                <TabsList className="flex w-full bg-gray-100 rounded-none p-1 mb-0 min-w-max">
                  <TabsTrigger
                    value="chapter1"
                    className="rounded-md py-2 px-3 data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs"
                  >
                    Ch. 1
                  </TabsTrigger>
                  <TabsTrigger
                    value="chapter2"
                    className="rounded-md py-2 px-3 data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs"
                  >
                    Ch. 2
                  </TabsTrigger>
                  <TabsTrigger
                    value="chapter3"
                    className="rounded-md py-2 px-3 data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs"
                  >
                    Ch. 3
                  </TabsTrigger>
                  <TabsTrigger
                    value="chapter4"
                    className="rounded-md py-2 px-3 data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs"
                  >
                    Ch. 4
                  </TabsTrigger>
                  <TabsTrigger
                    value="chapter5"
                    className="rounded-md py-2 px-3 data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs"
                  >
                    Ch. 5
                  </TabsTrigger>
                  <TabsTrigger
                    value="chapter6"
                    className="rounded-md py-2 px-3 data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs"
                  >
                    Ch. 6
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="chapter1" className="p-4 bg-white">
                <MobileChapter1
                  evangelismGoal={formData.evangelismGoal}
                  setEvangelismGoal={(value) =>
                    setFormData((prev) => ({ ...prev, evangelismGoal: value }))
                  }
                  evangelismPlan={formData.evangelismPlan}
                  setEvangelismPlan={(value) =>
                    setFormData((prev) => ({ ...prev, evangelismPlan: value }))
                  }
                  educationGoal={formData.educationGoal}
                  setEducationGoal={(value) =>
                    setFormData((prev) => ({ ...prev, educationGoal: value }))
                  }
                  educationPlan={formData.educationPlan}
                  setEducationPlan={(value) =>
                    setFormData((prev) => ({ ...prev, educationPlan: value }))
                  }
                  managementPlan={formData.managementPlan}
                  setManagementPlan={(value) =>
                    setFormData((prev) => ({ ...prev, managementPlan: value }))
                  }
                />
              </TabsContent>

              <TabsContent value="chapter2" className="p-4 bg-white">
                <MobileChapter2
                  weeklySchedules={formData.weeklySchedules}
                  handleWeeklyScheduleChange={handleWeeklyScheduleChange}
                />
              </TabsContent>

              <TabsContent value="chapter3" className="p-4 bg-white">
                <MobileChapter3
                  assessments={formData.assessments || []}
                  handleAssessmentChange={handleAssessmentChange}
                />
              </TabsContent>

              <TabsContent value="chapter4" className="p-4 bg-white">
                <MobileChapter4
                  month={selectedMonth}
                  truthBookReflection1={
                    formData.truthBookReflections?.reflection1 || ""
                  }
                  setTruthBookReflection1={(value) =>
                    setFormData({
                      ...formData,
                      truthBookReflections: {
                        ...(formData.truthBookReflections || {}),
                        reflection1: value,
                      },
                    })
                  }
                  truthBookReflection2={
                    formData.truthBookReflections?.reflection2 || ""
                  }
                  setTruthBookReflection2={(value) =>
                    setFormData({
                      ...formData,
                      truthBookReflections: {
                        ...(formData.truthBookReflections || {}),
                        reflection2: value,
                      },
                    })
                  }
                  truthBookReflection3={
                    formData.truthBookReflections?.reflection3 || ""
                  }
                  setTruthBookReflection3={(value) =>
                    setFormData({
                      ...formData,
                      truthBookReflections: {
                        ...(formData.truthBookReflections || {}),
                        reflection3: value,
                      },
                    })
                  }
                  truthBookReflection4={
                    formData.truthBookReflections?.reflection4 || ""
                  }
                  setTruthBookReflection4={(value) =>
                    setFormData({
                      ...formData,
                      truthBookReflections: {
                        ...(formData.truthBookReflections || {}),
                        reflection4: value,
                      },
                    })
                  }
                />
              </TabsContent>

              <TabsContent value="chapter5" className="p-4 bg-white">
                <MobileChapter5 month={selectedMonth} />
              </TabsContent>

              <TabsContent value="chapter6" className="p-4 bg-white">
                <MobileChapter6
                  month={selectedMonth}
                  sermonBookReflection1={
                    formData.sermonBookReflections?.reflection1 || ""
                  }
                  setSermonBookReflection1={(value) =>
                    setFormData({
                      ...formData,
                      sermonBookReflections: {
                        ...(formData.sermonBookReflections || {}),
                        reflection1: value,
                      },
                    })
                  }
                  sermonBookReflection2={
                    formData.sermonBookReflections?.reflection2 || ""
                  }
                  setSermonBookReflection2={(value) =>
                    setFormData({
                      ...formData,
                      sermonBookReflections: {
                        ...(formData.sermonBookReflections || {}),
                        reflection2: value,
                      },
                    })
                  }
                  sermonBookReflection3={
                    formData.sermonBookReflections?.reflection3 || ""
                  }
                  setSermonBookReflection3={(value) =>
                    setFormData({
                      ...formData,
                      sermonBookReflections: {
                        ...(formData.sermonBookReflections || {}),
                        reflection3: value,
                      },
                    })
                  }
                  sermonBookReflection4={
                    formData.sermonBookReflections?.reflection4 || ""
                  }
                  setSermonBookReflection4={(value) =>
                    setFormData({
                      ...formData,
                      sermonBookReflections: {
                        ...(formData.sermonBookReflections || {}),
                        reflection4: value,
                      },
                    })
                  }
                />
              </TabsContent>
            </Tabs>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="sticky bottom-20 pt-2 space-y-2">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2"
            onClick={saveCurriculumData}
            disabled={saving || loading}
          >
            {saving ? (
              <>
                <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2"></div>
                Đang lưu...
              </>
            ) : (
              "Lưu Thay Đổi"
            )}
          </Button>

          {!isMonthCompleted(selectedMonth) && (
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg py-2"
              onClick={markAsComplete}
              disabled={saving || loading}
            >
              {saving ? (
                <>
                  <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2"></div>
                  Đang xử lý...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Đánh dấu hoàn thành
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      <MobileBottomNav />
    </div>
  );
}
