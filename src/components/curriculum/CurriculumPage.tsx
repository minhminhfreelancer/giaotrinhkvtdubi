import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "../../../supabase/supabase";
import { useAuth } from "../../../supabase/auth";
import CurriculumMonthSelector from "./CurriculumMonthSelector";
import CurriculumForm from "./CurriculumForm";
import { Save, CheckCircle, AlertCircle } from "lucide-react";

export default function CurriculumPage() {
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const checkCompletionStatus = async () => {
      if (!user) return;

      try {
        // Direct query instead of RPC, but don't use single() which requires exactly one row
        const { data, error } = await supabase
          .from("curriculum")
          .select("is_completed")
          .eq("user_id", user.id)
          .eq("month", selectedMonth);

        if (error) {
          console.error("Error checking completion status:", error);
          return;
        }

        // Check if we have any data and get the first item if it exists
        setIsCompleted(data && data.length > 0 ? data[0].is_completed : false);
      } catch (error) {
        console.error("Error in completion check:", error);
      }
    };

    checkCompletionStatus();
  }, [user, selectedMonth]);

  const validateCurriculumData = async () => {
    if (!user) return false;

    try {
      // Get the current curriculum data
      const { data, error } = await supabase
        .from("curriculum")
        .select("*")
        .eq("user_id", user.id)
        .eq("month", selectedMonth);

      if (error) throw error;

      // If no data exists, curriculum is not filled
      if (!data || data.length === 0) {
        toast({
          title: "Chưa thể hoàn thành",
          description:
            "Anh chị em cần nhập dữ liệu trước khi đánh dấu hoàn thành",
          variant: "destructive",
        });
        return false;
      }

      const curriculumData = data[0];
      const incompleteItems = [];

      // Check required fields in Chapter 1
      if (!curriculumData.evangelism_goal) {
        incompleteItems.push("Mục tiêu truyền đạo (Chương 1)");
      }
      if (!curriculumData.evangelism_plan) {
        incompleteItems.push("Phương án truyền đạo (Chương 1)");
      }
      if (!curriculumData.education_goal) {
        incompleteItems.push("Mục tiêu giáo dục (Chương 1)");
      }
      if (!curriculumData.education_plan) {
        incompleteItems.push("Phương án giáo dục (Chương 1)");
      }
      if (!curriculumData.management_plan) {
        incompleteItems.push("Phương án quản lý khu vực (Chương 1)");
      }

      // Check weekly schedules in Chapter 2
      if (!curriculumData.weekly_schedules) {
        incompleteItems.push("Lịch trình sinh hoạt (Chương 2)");
      } else {
        // Check if wake up and bed times are filled for each week
        const weeks = ["week1", "week2", "week3", "week4"];
        for (const week of weeks) {
          const weekData = curriculumData.weekly_schedules[week];
          if (!weekData) {
            incompleteItems.push(
              `Lịch trình ${week === "week1" ? "tuần 1" : week === "week2" ? "tuần 2" : week === "week3" ? "tuần 3" : "tuần 4"} (Chương 2)`,
            );
            continue;
          }

          // Check if all days have wake up and bed times
          const missingWakeUpTimes = weekData.filter(
            (day) => !day.wakeUpTime,
          ).length;
          const missingBedTimes = weekData.filter((day) => !day.bedTime).length;

          if (missingWakeUpTimes > 0) {
            incompleteItems.push(
              `Giờ thức dậy cho ${missingWakeUpTimes} ngày trong ${week === "week1" ? "tuần 1" : week === "week2" ? "tuần 2" : week === "week3" ? "tuần 3" : "tuần 4"} (Chương 2)`,
            );
          }

          if (missingBedTimes > 0) {
            incompleteItems.push(
              `Giờ đi ngủ cho ${missingBedTimes} ngày trong ${week === "week1" ? "tuần 1" : week === "week2" ? "tuần 2" : week === "week3" ? "tuần 3" : "tuần 4"} (Chương 2)`,
            );
          }
        }
      }

      // Check assessments in Chapter 3
      if (!curriculumData.assessments) {
        incompleteItems.push("Kiểm điểm bản thân (Chương 3)");
      } else {
        // Check if 100% of assessments have scores for at least one week
        const assessmentsWithScores = curriculumData.assessments.filter(
          (a) => a.week1 || a.week2 || a.week3 || a.week4,
        );

        if (assessmentsWithScores.length < curriculumData.assessments.length) {
          const missingCount =
            curriculumData.assessments.length - assessmentsWithScores.length;
          incompleteItems.push(
            `Kiểm điểm bản thân - còn ${missingCount} mục chưa được điền (Chương 3)`,
          );
        }
      }

      // Check truth book reflections in Chapter 4
      if (!curriculumData.truth_book_reflections) {
        incompleteItems.push("Cảm nhận sách lẽ thật (Chương 4)");
      } else {
        if (!curriculumData.truth_book_reflections.reflection1) {
          incompleteItems.push("Cảm nhận sách lẽ thật - chủ đề 1 (Chương 4)");
        }
        if (!curriculumData.truth_book_reflections.reflection2) {
          incompleteItems.push("Cảm nhận sách lẽ thật - chủ đề 2 (Chương 4)");
        }
        if (!curriculumData.truth_book_reflections.reflection3) {
          incompleteItems.push("Cảm nhận sách lẽ thật - chủ đề 3 (Chương 4)");
        }
        if (!curriculumData.truth_book_reflections.reflection4) {
          incompleteItems.push("Cảm nhận sách lẽ thật - chủ đề 4 (Chương 4)");
        }
      }

      // Check sermon book reflections in Chapter 6
      if (!curriculumData.sermon_book_reflections) {
        incompleteItems.push("Cảm nhận tập giảng đạo (Chương 6)");
      } else {
        if (!curriculumData.sermon_book_reflections.reflection1) {
          incompleteItems.push("Cảm nhận tập giảng đạo - chủ đề 1 (Chương 6)");
        }
        if (!curriculumData.sermon_book_reflections.reflection2) {
          incompleteItems.push("Cảm nhận tập giảng đạo - chủ đề 2 (Chương 6)");
        }
        if (!curriculumData.sermon_book_reflections.reflection3) {
          incompleteItems.push("Cảm nhận tập giảng đạo - chủ đề 3 (Chương 6)");
        }
        if (!curriculumData.sermon_book_reflections.reflection4) {
          incompleteItems.push("Cảm nhận tập giảng đạo - chủ đề 4 (Chương 6)");
        }
      }

      // If there are incomplete items, show them to the user
      if (incompleteItems.length > 0) {
        toast({
          title: "Chưa thể hoàn thành",
          description: (
            <div>
              <p>Anh chị em cần hoàn thành các mục sau:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                {incompleteItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          ),
          variant: "destructive",
          duration: 10000, // Longer duration to read the list
        });
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error validating curriculum data:", error);
      toast({
        title: "Lỗi",
        description: "Không thể kiểm tra dữ liệu. Vui lòng thử lại sau.",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleMarkAsComplete = async () => {
    if (!user) {
      toast({
        title: "Lỗi",
        description: "Anh chị em cần đăng nhập để hoàn thành giáo trình",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Validate curriculum data first
      const isValid = await validateCurriculumData();
      if (!isValid) {
        setIsSubmitting(false);
        return;
      }

      // Direct query to check if curriculum exists
      const { data: existingData, error: fetchError } = await supabase
        .from("curriculum")
        .select("id")
        .eq("user_id", user.id)
        .eq("month", selectedMonth);

      if (fetchError) {
        console.error("Error checking existing curriculum:", fetchError);
        throw fetchError;
      }

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

      setIsCompleted(true);
      toast({
        title: "Thành công",
        description: `Đã đánh dấu hoàn thành tháng ${selectedMonth}`,
      });

      // If current month is completed, automatically select next month if available
      if (selectedMonth < 6) {
        setSelectedMonth(selectedMonth + 1);
      }
    } catch (error) {
      console.error("Error marking as complete:", error);
      toast({
        title: "Lỗi",
        description: "Không thể đánh dấu hoàn thành. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Giáo Trình Khu Vực Trưởng Dự Bị
          </h1>
          <p className="text-gray-600">
            Quản lý và theo dõi tiến độ học tập của anh chị em
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={async () => {
              // Run validation without marking as complete
              await validateCurriculumData();
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 flex items-center gap-2"
          >
            <AlertCircle className="h-4 w-4" />
            Kiểm tra hoàn thành
          </Button>

          {!isCompleted ? (
            <Button
              onClick={handleMarkAsComplete}
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2 flex items-center gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              {isSubmitting ? "Đang xử lý..." : "Đánh dấu hoàn thành"}
            </Button>
          ) : (
            <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Đã hoàn thành</span>
            </div>
          )}
        </div>
      </div>

      <CurriculumMonthSelector
        selectedMonth={selectedMonth}
        onSelectMonth={setSelectedMonth}
      />

      <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">
            Giáo Trình Tháng Thứ {selectedMonth}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CurriculumForm month={selectedMonth} />
        </CardContent>
      </Card>
    </div>
  );
}
