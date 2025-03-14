import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Helper functions to get content based on month
const getSermonBookByMonth = (month: number): string => {
  switch (month) {
    case 1:
      return "Hãy đến cùng thánh linh và vợ mới";
    case 2:
      return "Sự Mầu Nhiệm Của Đức Chúa Trời và Đức Chúa Jêsus Christ";
    case 3:
      return "Sự Mầu Nhiệm Của Đức Chúa Trời và Đức Thánh Linh";
    case 4:
      return "Sự Mầu Nhiệm Của Đức Chúa Trời và Hội Thánh";
    case 5:
      return "Sự Mầu Nhiệm Của Đức Chúa Trời và Nước Thiên Đàng";
    case 6:
      return "Sự Mầu Nhiệm Của Đức Chúa Trời và Sự Sống Đời Đời";
    default:
      return "Hãy đến cùng thánh linh và vợ mới";
  }
};

const getSermonChaptersByMonth = (month: number): string => {
  switch (month) {
    case 1:
      return "Chương 1,2,3,4";
    case 2:
      return "Chương 5,6,7,8";
    case 3:
      return "Chương 9,10,11,12";
    case 4:
      return "Chương 13,14,15,16";
    case 5:
      return "Chương 17,18,19,20";
    case 6:
      return "Chương 21,22,23,24";
    default:
      return "Chương 1,2,3,4";
  }
};

const getSermonTheme1ByMonth = (month: number): string => {
  switch (month) {
    case 1:
      return "Chủ đề 1: Thánh Linh và Vợ Mới";
    case 2:
      return "Chủ đề 1: Sự Giáng Sinh của Đức Chúa Jêsus";
    case 3:
      return "Chủ đề 1: Đức Thánh Linh và Lễ Ngũ Tuần";
    case 4:
      return "Chủ đề 1: Hội Thánh và Sự Cứu Rỗi";
    case 5:
      return "Chủ đề 1: Nước Thiên Đàng và Sự Công Bình";
    case 6:
      return "Chủ đề 1: Sự Sống Đời Đời và Sự Phán Xét";
    default:
      return "Chủ đề 1: Thánh Linh và Vợ Mới";
  }
};

const getSermonTheme2ByMonth = (month: number): string => {
  switch (month) {
    case 1:
      return "Chủ đề 2: Sự Cứu Rỗi và Nước Thiên Đàng";
    case 2:
      return "Chủ đề 2: Sự Chết của Đức Chúa Jêsus";
    case 3:
      return "Chủ đề 2: Đức Thánh Linh và Sự Tái Sinh";
    case 4:
      return "Chủ đề 2: Hội Thánh và Sự Thánh Khiết";
    case 5:
      return "Chủ đề 2: Nước Thiên Đàng và Sự Thánh Khiết";
    case 6:
      return "Chủ đề 2: Sự Sống Đời Đời và Sự Cứu Rỗi";
    default:
      return "Chủ đề 2: Sự Cứu Rỗi và Nước Thiên Đàng";
  }
};

const getSermonTheme3ByMonth = (month: number): string => {
  switch (month) {
    case 1:
      return "Chủ đề 3: Sự Tái Lâm và Sự Cất Lên";
    case 2:
      return "Chủ đề 3: Sự Phục Sinh của Đức Chúa Jêsus";
    case 3:
      return "Chủ đề 3: Đức Thánh Linh và Sự Thánh Hóa";
    case 4:
      return "Chủ đề 3: Hội Thánh và Sự Truyền Giáo";
    case 5:
      return "Chủ đề 3: Nước Thiên Đàng và Sự Phục Vụ";
    case 6:
      return "Chủ đề 3: Sự Sống Đời Đời và Sự Thờ Phượng";
    default:
      return "Chủ đề 3: Sự Tái Lâm và Sự Cất Lên";
  }
};

const getSermonTheme4ByMonth = (month: number): string => {
  switch (month) {
    case 1:
      return "Chủ đề 4: Sự Phán Xét và Sự Sống Đời Đời";
    case 2:
      return "Chủ đề 4: Sự Thăng Thiên của Đức Chúa Jêsus";
    case 3:
      return "Chủ đề 4: Đức Thánh Linh và Sự Cầu Thay";
    case 4:
      return "Chủ đề 4: Hội Thánh và Sự Hiệp Một";
    case 5:
      return "Chủ đề 4: Nước Thiên Đàng và Sự Vinh Hiển";
    case 6:
      return "Chủ đề 4: Sự Sống Đời Đời và Sự Vinh Hiển";
    default:
      return "Chủ đề 4: Sự Phán Xét và Sự Sống Đời Đời";
  }
};

interface MobileChapter6Props {
  month: number;
  sermonBookReflection1: string;
  setSermonBookReflection1: (value: string) => void;
  sermonBookReflection2: string;
  setSermonBookReflection2: (value: string) => void;
  sermonBookReflection3: string;
  setSermonBookReflection3: (value: string) => void;
  sermonBookReflection4: string;
  setSermonBookReflection4: (value: string) => void;
}

export default function MobileChapter6({
  month,
  sermonBookReflection1,
  setSermonBookReflection1,
  sermonBookReflection2,
  setSermonBookReflection2,
  sermonBookReflection3,
  setSermonBookReflection3,
  sermonBookReflection4,
  setSermonBookReflection4,
}: MobileChapter6Props) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        CHƯƠNG 6: TẬP GIẢNG ĐẠO
      </h3>

      <div className="space-y-4">
        <div className="border border-gray-200 rounded-lg p-3">
          <h4 className="font-medium text-gray-900 mb-3">1. Đọc giảng đạo</h4>
          <div className="space-y-3">
            <div className="space-y-1">
              <Label className="text-xs font-medium">Sách</Label>
              <Input
                value={getSermonBookByMonth(month)}
                disabled
                className="bg-gray-50 h-9"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-medium">Phạm vi</Label>
              <Input
                value={getSermonChaptersByMonth(month)}
                disabled
                className="bg-gray-50 h-9"
              />
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-3">
          <h4 className="font-medium text-gray-900 mb-3">
            2. Hương khí sau khi đọc sách lẽ thật
          </h4>
          <div className="space-y-3">
            <div className="space-y-1">
              <Label className="text-xs font-medium">
                {getSermonTheme1ByMonth(month)}
              </Label>
              <Textarea
                value={sermonBookReflection1}
                onChange={(e) => setSermonBookReflection1(e.target.value)}
                className="min-h-[80px] border-gray-300 rounded-lg"
                placeholder="Nhập hương khí của anh chị em..."
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-medium">
                {getSermonTheme2ByMonth(month)}
              </Label>
              <Textarea
                value={sermonBookReflection2}
                onChange={(e) => setSermonBookReflection2(e.target.value)}
                className="min-h-[80px] border-gray-300 rounded-lg"
                placeholder="Nhập hương khí của anh chị em..."
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-medium">
                {getSermonTheme3ByMonth(month)}
              </Label>
              <Textarea
                value={sermonBookReflection3}
                onChange={(e) => setSermonBookReflection3(e.target.value)}
                className="min-h-[80px] border-gray-300 rounded-lg"
                placeholder="Nhập hương khí của anh chị em..."
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-medium">
                {getSermonTheme4ByMonth(month)}
              </Label>
              <Textarea
                value={sermonBookReflection4}
                onChange={(e) => setSermonBookReflection4(e.target.value)}
                className="min-h-[80px] border-gray-300 rounded-lg"
                placeholder="Nhập hương khí của anh chị em..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
