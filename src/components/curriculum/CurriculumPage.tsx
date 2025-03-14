import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "../../../supabase/supabase";
import { useAuth } from "../../../supabase/auth";
import CurriculumMonthSelector from "./CurriculumMonthSelector";
import CurriculumForm from "./CurriculumForm";
import { Save, CheckCircle } from "lucide-react";

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

  const handleMarkAsComplete = async () => {
    if (!user) {
      toast({
        title: "Lỗi",
        description: "Bạn cần đăng nhập để hoàn thành giáo trình",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Direct query to check if curriculum exists
      const { data: existingData, error: fetchError } = await supabase
        .from("curriculum")
        .select("id")
        .eq("user_id", user.id)
        .eq("month", selectedMonth)
        .single();

      if (fetchError) {
        console.error("Error checking existing curriculum:", fetchError);
        // Continue with null existingData
      }

      let result;
      if (existingData?.id) {
        // Update existing curriculum
        result = await supabase
          .from("curriculum")
          .update({ is_completed: true })
          .eq("id", existingData.id);
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
            Quản lý và theo dõi tiến độ học tập của bạn
          </p>
        </div>

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
