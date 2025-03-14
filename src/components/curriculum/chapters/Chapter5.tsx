import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Helper functions to get content based on month
const getStageByMonth = (month: number): string => {
  switch (month) {
    case 1:
      return "Giai đoạn 1";
    case 2:
      return "Giai đoạn 1, Giai đoạn 2";
    case 3:
      return "Giai đoạn 2";
    case 4:
      return "Giai đoạn 2";
    case 5:
      return "Giai đoạn 3";
    case 6:
      return "Giai đoạn 3";
    default:
      return "Giai đoạn 1";
  }
};

const getChapterRangeByMonth = (month: number): string => {
  switch (month) {
    case 1:
      return "Chương 1,2,3,4,5,6,7,8 (GĐ1)";
    case 2:
      return "Chương 9,10 (GĐ1) --> Chương 1,2,3,4,5,6 (GĐ2)";
    case 3:
      return "Chương 1,2,3,4,5,6,7,8 (GĐ2)";
    case 4:
      return "Chương 9,10,11,12,13,14,15,16 (GĐ2)";
    case 5:
      return "Chương 1,2,3,4,5,6,7,8 (GĐ3)";
    case 6:
      return "Chương 9,10,11,12,13,14,15,16 (GĐ3)";
    default:
      return "Chương 1,2,3,4,5,6,7,8 (GĐ1)";
  }
};

const getMosesStaffBookByMonth = (month: number): string => {
  switch (month) {
    case 1:
      return "Cây gậy Moise Quyển 1";
    case 2:
      return "Cây gậy Moise Quyển 1";
    case 3:
      return "Cây gậy Moise Quyển 2";
    case 4:
      return "Cây gậy Moise Quyển 2";
    case 5:
      return "Cây gậy Moise Quyển 3";
    case 6:
      return "Cây gậy Moise Quyển 3";
    default:
      return "Cây gậy Moise Quyển 1";
  }
};

const getMosesStaffChaptersByMonth = (month: number): string => {
  switch (month) {
    case 1:
      return "Chương 1,2,3";
    case 2:
      return "Chương 4,5,6";
    case 3:
      return "Chương 1,2,3";
    case 4:
      return "Chương 4,5,6";
    case 5:
      return "Chương 1,2,3";
    case 6:
      return "Chương 4,5,6";
    default:
      return "Chương 1,2,3";
  }
};

interface Chapter5Props {
  month: number;
}

export default function Chapter5({ month }: Chapter5Props) {
  const [dates, setDates] = React.useState<{ [key: string]: Date | undefined }>(
    {},
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">
          CHƯƠNG 5: THỰC HÀNH GIẢNG ĐẠO & ĐẠO CƠ ĐỐC DỐI
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-4">1. Phát biểu</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Giai đoạn</Label>
              <Input
                value={getStageByMonth(month)}
                disabled
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Phạm vi</Label>
              <Input
                value={getChapterRangeByMonth(month)}
                disabled
                className="bg-gray-50"
              />
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-4">
            2. Ô xác minh Thực hành giảng đạo
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            1) Phát biểu với Địa vực trưởng (Trong trường hợp không có địa vực
            trưởng thì phát biểu cho khu vực trưởng có quyền chấm thi)
            <br />
            2) Phương pháp đánh giá, người chấm điểm, nhập kết quả đánh giá
            v.v.. đồng nhất với đánh giá phát biểu 50 chủ đề.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Chủ đề
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Ngày tháng
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Người chấm thi
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: "1-9", index: 0 },
                  { id: "1-10", index: 1 },
                  { id: "2-1", index: 2 },
                  { id: "2-2", index: 3 },
                  { id: "2-3", index: 4 },
                  { id: "2-4", index: 5 },
                  { id: "2-5", index: 6 },
                  { id: "2-6", index: 7 },
                ].map((item) => (
                  <tr
                    key={item.index}
                    className={item.index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      {item.id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <DatePicker
                        date={dates[`topic-${item.id}`]}
                        setDate={(date) => {
                          setDates((prev) => ({
                            ...prev,
                            [`topic-${item.id}`]: date,
                          }));
                        }}
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <Input className="h-8" placeholder="Người chấm thi" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-4">
            3. Tiến độ của cây gậy của Môise bản trích dẫn
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Giai đoạn</Label>
              <Input
                value={getMosesStaffBookByMonth(month)}
                disabled
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Phạm vi</Label>
              <Input
                value={getMosesStaffChaptersByMonth(month)}
                disabled
                className="bg-gray-50"
              />
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-4">
            4. Ô xác minh phát biểu Đạo cơ đốc dối
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Chủ đề
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Ngày tháng
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Người chấm thi
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: "6-4", index: 0 },
                  { id: "6-5", index: 1 },
                  { id: "6-6", index: 2 },
                ].map((item) => (
                  <tr
                    key={item.index}
                    className={item.index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      {item.id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <DatePicker
                        date={dates[`doctrine-${item.id}`]}
                        setDate={(date) => {
                          setDates((prev) => ({
                            ...prev,
                            [`doctrine-${item.id}`]: date,
                          }));
                        }}
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <Input className="h-8" placeholder="Người chấm thi" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Save button removed - using main save button instead */}
      </CardContent>
    </Card>
  );
}

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

function DatePicker({ date, setDate }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal h-8",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "dd/MM/yyyy", { locale: vi })
          ) : (
            <span>Chọn ngày</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          locale={vi}
        />
      </PopoverContent>
    </Popover>
  );
}

const Label = ({
  children,
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement> & { className?: string }) => (
  <label className={`text-sm font-medium ${className || ""}`} {...props}>
    {children}
  </label>
);
