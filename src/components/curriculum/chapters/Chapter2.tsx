import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Clock } from "lucide-react";
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

interface Chapter2Props {
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

export default function Chapter2({
  weeklySchedules,
  handleWeeklyScheduleChange,
}: Chapter2Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">
          CHƯƠNG 2: SINH HOẠT TRUYỀN GIÁO
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="week1" className="w-full">
          <TabsList className="grid grid-cols-4 w-full bg-gray-100 rounded-lg p-1 mb-6">
            <TabsTrigger
              value="week1"
              className="rounded-md py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Tuần 1
            </TabsTrigger>
            <TabsTrigger
              value="week2"
              className="rounded-md py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Tuần 2
            </TabsTrigger>
            <TabsTrigger
              value="week3"
              className="rounded-md py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Tuần 3
            </TabsTrigger>
            <TabsTrigger
              value="week4"
              className="rounded-md py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Tuần 4
            </TabsTrigger>
          </TabsList>

          {/* Tuần 1 */}
          <TabsContent value="week1">
            <WeekSchedule
              weekData={weeklySchedules.week1}
              weekKey="week1"
              handleWeeklyScheduleChange={handleWeeklyScheduleChange}
            />
          </TabsContent>

          {/* Tuần 2 */}
          <TabsContent value="week2">
            <WeekSchedule
              weekData={weeklySchedules.week2}
              weekKey="week2"
              handleWeeklyScheduleChange={handleWeeklyScheduleChange}
            />
          </TabsContent>

          {/* Tuần 3 */}
          <TabsContent value="week3">
            <WeekSchedule
              weekData={weeklySchedules.week3}
              weekKey="week3"
              handleWeeklyScheduleChange={handleWeeklyScheduleChange}
            />
          </TabsContent>

          {/* Tuần 4 */}
          <TabsContent value="week4">
            <WeekSchedule
              weekData={weeklySchedules.week4}
              weekKey="week4"
              handleWeeklyScheduleChange={handleWeeklyScheduleChange}
            />
          </TabsContent>
        </Tabs>
        {/* Save button removed - using main save button instead */}
      </CardContent>
    </Card>
  );
}

interface WeekScheduleProps {
  weekData: WeeklySchedule[];
  weekKey: string;
  handleWeeklyScheduleChange: (
    week: string,
    index: number,
    field: keyof WeeklySchedule,
    value: string,
  ) => void;
}

function WeekSchedule({
  weekData,
  weekKey,
  handleWeeklyScheduleChange,
}: WeekScheduleProps) {
  return (
    <div className="space-y-6">
      {weekData.map((day, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-4">{day.day}</h3>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-1/2">
              <Label className="text-sm font-medium mb-2">Giờ thức dậy</Label>
              <TimePicker
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
            <div className="w-1/2">
              <Label className="text-sm font-medium mb-2">Giờ đi ngủ</Label>
              <TimePicker
                value={day.bedTime}
                onChange={(value) =>
                  handleWeeklyScheduleChange(weekKey, index, "bedTime", value)
                }
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Sáng (AM)</Label>
              <div className="flex gap-2">
                <TimePicker
                  value={day.morningTime}
                  onChange={(value) =>
                    handleWeeklyScheduleChange(
                      weekKey,
                      index,
                      "morningTime",
                      value,
                    )
                  }
                  className="w-1/4"
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
                  className="w-3/4"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Chiều (PM)</Label>
              <div className="flex gap-2">
                <TimePicker
                  value={day.afternoonTime}
                  onChange={(value) =>
                    handleWeeklyScheduleChange(
                      weekKey,
                      index,
                      "afternoonTime",
                      value,
                    )
                  }
                  className="w-1/4"
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
                  className="w-3/4"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Tối</Label>
              <div className="flex gap-2">
                <TimePicker
                  value={day.eveningTime}
                  onChange={(value) =>
                    handleWeeklyScheduleChange(
                      weekKey,
                      index,
                      "eveningTime",
                      value,
                    )
                  }
                  className="w-1/4"
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
                  className="w-3/4"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

function TimePicker({ value, onChange, className }: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Format time for display
  const formatTimeForDisplay = (timeString: string) => {
    if (!timeString) return "Chọn giờ";

    try {
      const [hours, minutes] = timeString.split(":");
      return `${hours}:${minutes}`;
    } catch (e) {
      return timeString;
    }
  };

  // Generate hours and minutes options
  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0"),
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0"),
  );

  // Handle time selection
  const handleTimeSelection = (
    type: "hour" | "minute",
    selectedValue: string,
  ) => {
    const [currentHour, currentMinute] = value
      ? value.split(":")
      : ["00", "00"];

    if (type === "hour") {
      onChange(`${selectedValue}:${currentMinute || "00"}`);
    } else {
      onChange(`${currentHour || "00"}:${selectedValue}`);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal h-9 text-sm",
            !value && "text-muted-foreground",
            className,
          )}
          onClick={() => setIsOpen(true)}
        >
          <Clock className="mr-2 h-3 w-3" />
          {formatTimeForDisplay(value)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3 flex gap-3">
          <div className="space-y-1">
            <p className="text-xs font-medium">Giờ</p>
            <div className="h-[150px] overflow-y-auto pr-1 w-16">
              {hours.map((hour) => (
                <Button
                  key={hour}
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "w-full justify-start text-left mb-1 h-7 text-xs px-2",
                    value?.startsWith(hour + ":") &&
                      "bg-blue-100 text-blue-600",
                  )}
                  onClick={() => handleTimeSelection("hour", hour)}
                >
                  {hour}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium">Phút</p>
            <div className="h-[150px] overflow-y-auto pr-1 w-16">
              {minutes.map((minute) => (
                <Button
                  key={minute}
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "w-full justify-start text-left mb-1 h-7 text-xs px-2",
                    value?.endsWith(":" + minute) &&
                      "bg-blue-100 text-blue-600",
                  )}
                  onClick={() => handleTimeSelection("minute", minute)}
                >
                  {minute}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
