import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "../../../supabase/supabase";
import { useAuth } from "../../../supabase/auth";
import { useToast } from "@/components/ui/use-toast";
import {
  Chapter1,
  Chapter2,
  Chapter3,
  Chapter4,
  Chapter5,
  Chapter6,
} from "./chapters";
import { CurriculumFormData, SelfAssessment, WeeklySchedule } from "./types";

interface CurriculumFormProps {
  month?: number;
}

export default function CurriculumForm({ month = 1 }: CurriculumFormProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("chapter1");
  const [loading, setLoading] = useState(false);
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
        category: "Đức tin",
        content: "1. Đức tin vào Đức Chúa Trời",
        score: "",
      },
      { category: "Đức tin", content: "2. Đức tin vào Lời Chúa", score: "" },
      { category: "Đức tin", content: "3. Đức tin vào sự cứu rỗi", score: "" },
      {
        category: "Đức tin",
        content: "4. Đức tin vào sự phục sinh",
        score: "",
      },
      { category: "Đức tin", content: "5. Đức tin vào sự tái lâm", score: "" },
      { category: "Đức hạnh", content: "6. Lòng yêu mến Chúa", score: "" },
      { category: "Đức hạnh", content: "7. Lòng yêu mến anh em", score: "" },
      {
        category: "Đức hạnh",
        content: "8. Lòng yêu mến người chưa tin",
        score: "",
      },
      { category: "Đức hạnh", content: "9. Lòng yêu mến kẻ thù", score: "" },
      { category: "Đức hạnh", content: "10. Lòng khiêm nhường", score: "" },
      { category: "Đức hạnh", content: "11. Lòng nhân từ", score: "" },
      { category: "Đức hạnh", content: "12. Lòng kiên nhẫn", score: "" },
      { category: "Đức hạnh", content: "13. Lòng trung tín", score: "" },
      { category: "Đức hạnh", content: "14. Lòng công bình", score: "" },
      { category: "Đức hạnh", content: "15. Lòng thương xót", score: "" },
      { category: "Đức hạnh", content: "16. Lòng tha thứ", score: "" },
      { category: "Đức hạnh", content: "17. Lòng biết ơn", score: "" },
      { category: "Đức hạnh", content: "18. Lòng vui mừng", score: "" },
      { category: "Đức hạnh", content: "19. Lòng bình an", score: "" },
      { category: "Đức hạnh", content: "20. Lòng tự chủ", score: "" },
      { category: "Đời sống", content: "21. Đời sống cầu nguyện", score: "" },
      {
        category: "Đời sống",
        content: "22. Đời sống đọc Kinh Thánh",
        score: "",
      },
      { category: "Đời sống", content: "23. Đời sống thờ phượng", score: "" },
      { category: "Đời sống", content: "24. Đời sống làm chứng", score: "" },
      { category: "Đời sống", content: "25. Đời sống phục vụ", score: "" },
      { category: "Đời sống", content: "26. Đời sống dâng hiến", score: "" },
      { category: "Đời sống", content: "27. Đời sống gia đình", score: "" },
      { category: "Đời sống", content: "28. Đời sống công việc", score: "" },
      { category: "Đời sống", content: "29. Đời sống xã hội", score: "" },
      { category: "Đời sống", content: "30. Đời sống thánh khiết", score: "" },
      { category: "Đời sống", content: "31. Đời sống trung tín", score: "" },
      { category: "Đời sống", content: "32. Đời sống khôn ngoan", score: "" },
      { category: "Đời sống", content: "33. Đời sống khiêm nhường", score: "" },
      {
        category: "Đời sống",
        content: "34. Đời sống đầy dẫy Thánh Linh",
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

  useEffect(() => {
    if (user) {
      loadCurriculumData();
    }
  }, [user, month]);

  const loadCurriculumData = async () => {
    if (!user) return;

    try {
      setLoading(true);
      // Directly query the curriculum table instead of using RPC
      const { data: curriculumData, error } = await supabase
        .from("curriculum")
        .select("*")
        .eq("user_id", user.id)
        .eq("month", month);

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
      }
    } catch (error) {
      console.error("Error in loadCurriculumData:", error);
    } finally {
      setLoading(false);
    }
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
      setLoading(true);

      // Check if curriculum exists for this month
      const { data: existingData, error: fetchError } = await supabase
        .from("curriculum")
        .select("id")
        .eq("user_id", user.id)
        .eq("month", month)
        .single();

      const curriculumData = {
        user_id: user.id,
        month: month,
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
      if (existingData?.id) {
        // Update existing curriculum
        result = await supabase
          .from("curriculum")
          .update(curriculumData)
          .eq("id", existingData.id);
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
    } catch (error) {
      console.error("Error saving curriculum data:", error);
      toast({
        title: "Lỗi",
        description: "Không thể lưu dữ liệu. Vui lòng thử lại sau.",
        variant: "destructive",
      });
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

  return (
    <div className="space-y-6">
      <Tabs
        defaultValue="chapter1"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full bg-gray-100 rounded-lg p-1">
          <TabsTrigger
            value="chapter1"
            className="rounded-md py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Chương 1
          </TabsTrigger>
          <TabsTrigger
            value="chapter2"
            className="rounded-md py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Chương 2
          </TabsTrigger>
          <TabsTrigger
            value="chapter3"
            className="rounded-md py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Chương 3
          </TabsTrigger>
          <TabsTrigger
            value="chapter4"
            className="rounded-md py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Chương 4
          </TabsTrigger>
          <TabsTrigger
            value="chapter5"
            className="rounded-md py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Chương 5
          </TabsTrigger>
          <TabsTrigger
            value="chapter6"
            className="rounded-md py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Chương 6
          </TabsTrigger>
        </TabsList>

        {/* Chương 1: Truyền Đạo Học */}
        <TabsContent value="chapter1" className="mt-6">
          <Chapter1
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

        {/* Chương 2: Sinh Hoạt Truyền Giáo */}
        <TabsContent value="chapter2" className="mt-6">
          <Chapter2
            weeklySchedules={formData.weeklySchedules}
            handleWeeklyScheduleChange={handleWeeklyScheduleChange}
          />
        </TabsContent>

        {/* Chương 3: Kiểm Điểm Bản Thân */}
        <TabsContent value="chapter3" className="mt-6">
          <Chapter3
            assessments={formData.assessments}
            handleAssessmentChange={handleAssessmentChange}
          />
        </TabsContent>

        {/* Chương 4: Sách Lẽ Thật */}
        <TabsContent value="chapter4" className="mt-6">
          <Chapter4
            month={month}
            truthBookReflection1={formData.truthBookReflections.reflection1}
            setTruthBookReflection1={(value) =>
              setFormData((prev) => ({
                ...prev,
                truthBookReflections: {
                  ...prev.truthBookReflections,
                  reflection1: value,
                },
              }))
            }
            truthBookReflection2={formData.truthBookReflections.reflection2}
            setTruthBookReflection2={(value) =>
              setFormData((prev) => ({
                ...prev,
                truthBookReflections: {
                  ...prev.truthBookReflections,
                  reflection2: value,
                },
              }))
            }
            truthBookReflection3={formData.truthBookReflections.reflection3}
            setTruthBookReflection3={(value) =>
              setFormData((prev) => ({
                ...prev,
                truthBookReflections: {
                  ...prev.truthBookReflections,
                  reflection3: value,
                },
              }))
            }
            truthBookReflection4={formData.truthBookReflections.reflection4}
            setTruthBookReflection4={(value) =>
              setFormData((prev) => ({
                ...prev,
                truthBookReflections: {
                  ...prev.truthBookReflections,
                  reflection4: value,
                },
              }))
            }
          />
        </TabsContent>

        {/* Chương 5: Thực Hành Giảng Đạo */}
        <TabsContent value="chapter5" className="mt-6">
          <Chapter5 month={month} />
        </TabsContent>

        {/* Chương 6: Tập Giảng Đạo */}
        <TabsContent value="chapter6" className="mt-6">
          <Chapter6
            month={month}
            sermonBookReflection1={formData.sermonBookReflections.reflection1}
            setSermonBookReflection1={(value) =>
              setFormData((prev) => ({
                ...prev,
                sermonBookReflections: {
                  ...prev.sermonBookReflections,
                  reflection1: value,
                },
              }))
            }
            sermonBookReflection2={formData.sermonBookReflections.reflection2}
            setSermonBookReflection2={(value) =>
              setFormData((prev) => ({
                ...prev,
                sermonBookReflections: {
                  ...prev.sermonBookReflections,
                  reflection2: value,
                },
              }))
            }
            sermonBookReflection3={formData.sermonBookReflections.reflection3}
            setSermonBookReflection3={(value) =>
              setFormData((prev) => ({
                ...prev,
                sermonBookReflections: {
                  ...prev.sermonBookReflections,
                  reflection3: value,
                },
              }))
            }
            sermonBookReflection4={formData.sermonBookReflections.reflection4}
            setSermonBookReflection4={(value) =>
              setFormData((prev) => ({
                ...prev,
                sermonBookReflections: {
                  ...prev.sermonBookReflections,
                  reflection4: value,
                },
              }))
            }
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
