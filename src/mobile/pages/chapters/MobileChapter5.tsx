import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
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

interface MobileChapter5Props {
  month: number;
}

export default function MobileChapter5({ month }: MobileChapter5Props) {
  const [dates, setDates] = useState<{ [key: string]: Date | undefined }>({});
  const [showDatePicker, setShowDatePicker] = useState<string | null>(null);

  const handleDateSelect = (dateKey: string, date: Date | undefined) => {
    setDates((prev) => ({
      ...prev,
      [dateKey]: date,
    }));
    setShowDatePicker(null);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        CHƯƠNG 5: THỰC HÀNH GIẢNG ĐẠO & ĐẠO CƠ ĐỐC DỐI
      </h3>

      <div className="space-y-4">
        <div className="border border-gray-200 rounded-lg p-3">
          <h4 className="font-medium text-gray-900 mb-3">1. Phát biểu</h4>
          <div className="space-y-3">
            <div className="space-y-1">
              <Label className="text-xs font-medium">Giai đoạn</Label>
              <Input
                value={getStageByMonth(month)}
                disabled
                className="bg-gray-50 h-9"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-medium">Phạm vi</Label>
              <Input
                value={getChapterRangeByMonth(month)}
                disabled
                className="bg-gray-50 h-9"
              />
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-3">
          <h4 className="font-medium text-gray-900 mb-2">
            2. Ô xác minh Thực hành giảng đạo
          </h4>
          <p className="text-xs text-gray-600 mb-3">
            1) Phát biểu với Địa vực trưởng (Trong trường hợp không có địa vực
            trưởng thì phát biểu cho khu vực trưởng có quyền chấm thi)
          </p>

          <div className="space-y-3">
            {[
              { id: "1-9", index: 0 },
              { id: "1-10", index: 1 },
              { id: "2-1", index: 2 },
              { id: "2-2", index: 3 },
            ].map((item) => (
              <div
                key={item.index}
                className="border border-gray-200 rounded-lg p-2"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Chủ đề {item.id}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs font-medium mb-1 block">
                      Ngày tháng
                    </Label>
                    <Button
                      variant={"outline"}
                      className="w-full justify-start text-left font-normal h-9 text-sm"
                      onClick={() => setShowDatePicker(`topic-${item.id}`)}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dates[`topic-${item.id}`] ? (
                        format(
                          dates[`topic-${item.id}`] as Date,
                          "dd/MM/yyyy",
                          { locale: vi },
                        )
                      ) : (
                        <span className="text-gray-400">Chọn ngày</span>
                      )}
                    </Button>
                  </div>
                  <div>
                    <Label className="text-xs font-medium mb-1 block">
                      Người chấm thi
                    </Label>
                    <Input className="h-9" placeholder="Người chấm thi" />
                  </div>
                </div>

                {showDatePicker === `topic-${item.id}` && (
                  <MobileDatePicker
                    date={dates[`topic-${item.id}`]}
                    onSelect={(date) =>
                      handleDateSelect(`topic-${item.id}`, date)
                    }
                    onClose={() => setShowDatePicker(null)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-3">
          <h4 className="font-medium text-gray-900 mb-3">
            3. Tiến độ của cây gậy của Môise bản trích dẫn
          </h4>
          <div className="space-y-3">
            <div className="space-y-1">
              <Label className="text-xs font-medium">Giai đoạn</Label>
              <Input
                value={getMosesStaffBookByMonth(month)}
                disabled
                className="bg-gray-50 h-9"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-medium">Phạm vi</Label>
              <Input
                value={getMosesStaffChaptersByMonth(month)}
                disabled
                className="bg-gray-50 h-9"
              />
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-3">
          <h4 className="font-medium text-gray-900 mb-2">
            4. Ô xác minh phát biểu Đạo cơ đốc dối
          </h4>

          <div className="space-y-3">
            {[
              { id: "6-4", index: 0 },
              { id: "6-5", index: 1 },
              { id: "6-6", index: 2 },
            ].map((item) => (
              <div
                key={item.index}
                className="border border-gray-200 rounded-lg p-2"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Chủ đề {item.id}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs font-medium mb-1 block">
                      Ngày tháng
                    </Label>
                    <Button
                      variant={"outline"}
                      className="w-full justify-start text-left font-normal h-9 text-sm"
                      onClick={() => setShowDatePicker(`doctrine-${item.id}`)}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dates[`doctrine-${item.id}`] ? (
                        format(
                          dates[`doctrine-${item.id}`] as Date,
                          "dd/MM/yyyy",
                          { locale: vi },
                        )
                      ) : (
                        <span className="text-gray-400">Chọn ngày</span>
                      )}
                    </Button>
                  </div>
                  <div>
                    <Label className="text-xs font-medium mb-1 block">
                      Người chấm thi
                    </Label>
                    <Input className="h-9" placeholder="Người chấm thi" />
                  </div>
                </div>

                {showDatePicker === `doctrine-${item.id}` && (
                  <MobileDatePicker
                    date={dates[`doctrine-${item.id}`]}
                    onSelect={(date) =>
                      handleDateSelect(`doctrine-${item.id}`, date)
                    }
                    onClose={() => setShowDatePicker(null)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface MobileDatePickerProps {
  date: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  onClose: () => void;
}

function MobileDatePicker({ date, onSelect, onClose }: MobileDatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<string>(
    date ? format(date, "yyyy-MM-dd") : "",
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleSubmit = () => {
    if (selectedDate) {
      onSelect(new Date(selectedDate));
    } else {
      onSelect(undefined);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 rounded-lg w-64"
        onClick={(e) => e.stopPropagation()}
      >
        <h4 className="text-center font-medium mb-3">Chọn ngày</h4>
        <input
          type="date"
          className="w-full h-10 px-3 border border-gray-300 rounded-md"
          value={selectedDate}
          onChange={handleChange}
        />
        <div className="flex justify-end mt-3 gap-2">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Hủy
          </Button>
          <Button size="sm" onClick={handleSubmit}>
            Xong
          </Button>
        </div>
      </div>
    </div>
  );
}
