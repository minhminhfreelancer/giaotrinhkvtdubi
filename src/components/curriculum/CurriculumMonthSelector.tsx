import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "../../../supabase/supabase";
import { useAuth } from "../../../supabase/auth";
import { useToast } from "@/components/ui/use-toast";
import { Lock, CheckCircle, Circle } from "lucide-react";

interface CurriculumMonthSelectorProps {
  selectedMonth: number;
  onSelectMonth: (month: number) => void;
}

export default function CurriculumMonthSelector({
  selectedMonth,
  onSelectMonth,
}: CurriculumMonthSelectorProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [completedMonths, setCompletedMonths] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompletedMonths = async () => {
      if (!user) return;

      try {
        setLoading(true);
        // Direct query instead of RPC
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
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedMonths();
  }, [user]);

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

    onSelectMonth(month);
  };

  const months = [
    { number: 1, name: "Tháng thứ nhất" },
    { number: 2, name: "Tháng thứ hai" },
    { number: 3, name: "Tháng thứ ba" },
    { number: 4, name: "Tháng thứ tư" },
    { number: 5, name: "Tháng thứ năm" },
    { number: 6, name: "Tháng thứ sáu" },
  ];

  if (loading) {
    return (
      <div className="flex justify-center space-x-2 py-4">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
        <span className="text-sm text-gray-500">Đang tải...</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      {months.map((month) => {
        const available = isMonthAvailable(month.number);
        const completed = isMonthCompleted(month.number);
        const isSelected = selectedMonth === month.number;

        return (
          <Button
            key={month.number}
            onClick={() => handleMonthSelect(month.number)}
            variant={isSelected ? "default" : "outline"}
            className={`h-auto py-3 px-4 flex flex-col items-center justify-center gap-2 ${isSelected ? "bg-blue-600 text-white" : available ? "bg-white" : "bg-gray-100 text-gray-500"} ${!available ? "cursor-not-allowed opacity-70" : ""}`}
            disabled={!available}
          >
            <div className="flex items-center justify-center h-8 w-8 rounded-full border-2 border-current">
              {completed ? (
                <CheckCircle className="h-5 w-5" />
              ) : available ? (
                <Circle className="h-5 w-5" />
              ) : (
                <Lock className="h-4 w-4" />
              )}
            </div>
            <span className="text-sm font-medium">{month.name}</span>
          </Button>
        );
      })}
    </div>
  );
}
