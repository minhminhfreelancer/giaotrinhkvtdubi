import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
        <div className="flex justify-end mt-6">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Lưu
          </Button>
        </div>
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
              <Input
                type="time"
                value={day.wakeUpTime}
                onChange={(e) =>
                  handleWeeklyScheduleChange(
                    weekKey,
                    index,
                    "wakeUpTime",
                    e.target.value,
                  )
                }
                className="w-full"
              />
            </div>
            <div className="w-1/2">
              <Label className="text-sm font-medium mb-2">Giờ đi ngủ</Label>
              <Input
                type="time"
                value={day.bedTime}
                onChange={(e) =>
                  handleWeeklyScheduleChange(
                    weekKey,
                    index,
                    "bedTime",
                    e.target.value,
                  )
                }
                className="w-full"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Sáng (AM)</Label>
              <div className="flex gap-2">
                <Input
                  type="time"
                  value={day.morningTime}
                  onChange={(e) =>
                    handleWeeklyScheduleChange(
                      weekKey,
                      index,
                      "morningTime",
                      e.target.value,
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
                <Input
                  type="time"
                  value={day.afternoonTime}
                  onChange={(e) =>
                    handleWeeklyScheduleChange(
                      weekKey,
                      index,
                      "afternoonTime",
                      e.target.value,
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
                <Input
                  type="time"
                  value={day.eveningTime}
                  onChange={(e) =>
                    handleWeeklyScheduleChange(
                      weekKey,
                      index,
                      "eveningTime",
                      e.target.value,
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
