import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WeeklySchedule {
  day: string;
  wakeUpTime: string;
  morning: string;
  morningTime: string;
  afternoon: string;
  afternoonTime: string;
  evening: string;
  eveningTime: string;
  bedTime: string;
}

interface MobileChapter2Props {
  weeklySchedules: {
    week1: WeeklySchedule[];
    week2: WeeklySchedule[];
    week3: WeeklySchedule[];
    week4: WeeklySchedule[];
  };
  handleWeeklyScheduleChange: (
    week: string,
    index: number,
    field: keyof WeeklySchedule,
    value: string,
  ) => void;
}

export default function MobileChapter2({
  weeklySchedules,
  handleWeeklyScheduleChange,
}: MobileChapter2Props) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        CHƯƠNG 2: SINH HOẠT TRUYỀN GIÁO
      </h3>

      <Tabs defaultValue="week1" className="w-full">
        <TabsList className="grid grid-cols-4 w-full bg-gray-100 rounded-lg p-1 mb-4">
          <TabsTrigger
            value="week1"
            className="rounded-md py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs"
          >
            Tuần 1
          </TabsTrigger>
          <TabsTrigger
            value="week2"
            className="rounded-md py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs"
          >
            Tuần 2
          </TabsTrigger>
          <TabsTrigger
            value="week3"
            className="rounded-md py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs"
          >
            Tuần 3
          </TabsTrigger>
          <TabsTrigger
            value="week4"
            className="rounded-md py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs"
          >
            Tuần 4
          </TabsTrigger>
        </TabsList>

        {/* Tuần 1 */}
        <TabsContent value="week1">
          <MobileWeekSchedule
            weekData={weeklySchedules.week1}
            weekKey="week1"
            handleWeeklyScheduleChange={handleWeeklyScheduleChange}
          />
        </TabsContent>

        {/* Tuần 2 */}
        <TabsContent value="week2">
          <MobileWeekSchedule
            weekData={weeklySchedules.week2}
            weekKey="week2"
            handleWeeklyScheduleChange={handleWeeklyScheduleChange}
          />
        </TabsContent>

        {/* Tuần 3 */}
        <TabsContent value="week3">
          <MobileWeekSchedule
            weekData={weeklySchedules.week3}
            weekKey="week3"
            handleWeeklyScheduleChange={handleWeeklyScheduleChange}
          />
        </TabsContent>

        {/* Tuần 4 */}
        <TabsContent value="week4">
          <MobileWeekSchedule
            weekData={weeklySchedules.week4}
            weekKey="week4"
            handleWeeklyScheduleChange={handleWeeklyScheduleChange}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface MobileWeekScheduleProps {
  weekData: WeeklySchedule[];
  weekKey: string;
  handleWeeklyScheduleChange: (
    week: string,
    index: number,
    field: keyof WeeklySchedule,
    value: string,
  ) => void;
}

function MobileWeekSchedule({
  weekData,
  weekKey,
  handleWeeklyScheduleChange,
}: MobileWeekScheduleProps) {
  return (
    <div className="space-y-4">
      {weekData.map((day, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-3">
          <h3 className="font-medium text-gray-900 mb-3">{day.day}</h3>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1">
              <Label className="text-xs font-medium mb-1 block">
                Giờ thức dậy
              </Label>
              <MobileTimePicker
                value={day.wakeUpTime}
                onChange={(value) =>
                  handleWeeklyScheduleChange(
                    weekKey,
                    index,
                    "wakeUpTime",
                    value,
                  )
                }
              />
            </div>
            <div className="flex-1">
              <Label className="text-xs font-medium mb-1 block">
                Giờ đi ngủ
              </Label>
              <MobileTimePicker
                value={day.bedTime}
                onChange={(value) =>
                  handleWeeklyScheduleChange(weekKey, index, "bedTime", value)
                }
              />
            </div>
          </div>
          <div className="space-y-3">
            <div className="space-y-1">
              <Label className="text-xs font-medium">Sáng (AM)</Label>
              <div className="flex gap-2">
                <MobileTimePicker
                  value={day.morningTime}
                  onChange={(value) =>
                    handleWeeklyScheduleChange(
                      weekKey,
                      index,
                      "morningTime",
                      value,
                    )
                  }
                  className="w-1/3"
                />
                <Input
                  placeholder="Hoạt động"
                  value={day.morning}
                  onChange={(e) =>
                    handleWeeklyScheduleChange(
                      weekKey,
                      index,
                      "morning",
                      e.target.value,
                    )
                  }
                  className="w-2/3 h-9"
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-medium">Chiều (PM)</Label>
              <div className="flex gap-2">
                <MobileTimePicker
                  value={day.afternoonTime}
                  onChange={(value) =>
                    handleWeeklyScheduleChange(
                      weekKey,
                      index,
                      "afternoonTime",
                      value,
                    )
                  }
                  className="w-1/3"
                />
                <Input
                  placeholder="Hoạt động"
                  value={day.afternoon}
                  onChange={(e) =>
                    handleWeeklyScheduleChange(
                      weekKey,
                      index,
                      "afternoon",
                      e.target.value,
                    )
                  }
                  className="w-2/3 h-9"
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-medium">Tối</Label>
              <div className="flex gap-2">
                <MobileTimePicker
                  value={day.eveningTime}
                  onChange={(value) =>
                    handleWeeklyScheduleChange(
                      weekKey,
                      index,
                      "eveningTime",
                      value,
                    )
                  }
                  className="w-1/3"
                />
                <Input
                  placeholder="Hoạt động"
                  value={day.evening}
                  onChange={(e) =>
                    handleWeeklyScheduleChange(
                      weekKey,
                      index,
                      "evening",
                      e.target.value,
                    )
                  }
                  className="w-2/3 h-9"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

interface MobileTimePickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

function MobileTimePicker({
  value,
  onChange,
  className,
}: MobileTimePickerProps) {
  const [showPicker, setShowPicker] = useState(false);

  // Format time for display
  const formatTimeForDisplay = (timeString: string) => {
    if (!timeString) return "--:--";

    try {
      const [hours, minutes] = timeString.split(":");
      return `${hours}:${minutes}`;
    } catch (e) {
      return timeString || "--:--";
    }
  };

  const handleTimeClick = () => {
    // On mobile, we'll use the native time input
    // This is a simplified version for the mobile experience
    setShowPicker(true);
  };

  return (
    <div className={cn("relative", className)}>
      <Button
        variant="outline"
        className={cn(
          "w-full justify-start text-left font-normal h-9 text-sm",
          !value && "text-muted-foreground",
        )}
        onClick={handleTimeClick}
      >
        <Clock className="mr-2 h-3.5 w-3.5" />
        {formatTimeForDisplay(value)}
      </Button>

      {showPicker && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          onClick={() => setShowPicker(false)}
        >
          <div
            className="bg-white p-4 rounded-lg w-64"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="text-center font-medium mb-3">Chọn giờ</h4>
            <input
              type="time"
              className="w-full h-10 px-3 border border-gray-300 rounded-md"
              value={value || ""}
              onChange={(e) => {
                onChange(e.target.value);
                setShowPicker(false);
              }}
            />
            <div className="flex justify-end mt-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPicker(false)}
              >
                Hủy
              </Button>
              <Button size="sm" onClick={() => setShowPicker(false)}>
                Xong
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
