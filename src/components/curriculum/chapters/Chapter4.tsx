import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// Helper functions to get content based on month
const getBookByMonth = (month: number): string => {
  switch (month) {
    case 1:
      return "Màu Nhiệm Của Đức Chúa Trời và Ngọn Suối Nước Sự Sống";
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
      return "Màu Nhiệm Của Đức Chúa Trời và Ngọn Suối Nước Sự Sống";
  }
};

const getChaptersByMonth = (month: number): string => {
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

const getTheme1ByMonth = (month: number): string => {
  switch (month) {
    case 1:
      return "Chủ đề: 1 Tháo Ấn Sự Mầu Nhiệm của Bảy Tiếng Sấm";
    case 2:
      return "Chủ đề: Sự Mầu Nhiệm của Đức Chúa Jêsus Christ";
    case 3:
      return "Chủ đề: Sự Mầu Nhiệm của Đức Thánh Linh";
    case 4:
      return "Chủ đề: Sự Mầu Nhiệm của Hội Thánh";
    case 5:
      return "Chủ đề: Sự Mầu Nhiệm của Nước Thiên Đàng";
    case 6:
      return "Chủ đề: Sự Mầu Nhiệm của Sự Sống Đời Đời";
    default:
      return "Chủ đề: 1 Tháo Ấn Sự Mầu Nhiệm của Bảy Tiếng Sấm";
  }
};

const getTheme2ByMonth = (month: number): string => {
  switch (month) {
    case 1:
      return "Chủ đề: 3 kỳ 7 lễ trọng thể";
    case 2:
      return "Chủ đề: Sự Giáng Sinh của Đức Chúa Jêsus";
    case 3:
      return "Chủ đề: Sự Báp-têm của Đức Thánh Linh";
    case 4:
      return "Chủ đề: Sự Thành Lập Hội Thánh";
    case 5:
      return "Chủ đề: Sự Chuẩn Bị cho Nước Thiên Đàng";
    case 6:
      return "Chủ đề: Sự Phán Xét Cuối Cùng";
    default:
      return "Chủ đề: 3 kỳ 7 lễ trọng thể";
  }
};

const getTheme3ByMonth = (month: number): string => {
  switch (month) {
    case 1:
      return "Chủ đề: Trái sự sống và Mười Ðiều Răn";
    case 2:
      return "Chủ đề: Sự Chết và Sự Phục Sinh của Đức Chúa Jêsus";
    case 3:
      return "Chủ đề: Các Ân Tứ của Đức Thánh Linh";
    case 4:
      return "Chủ đề: Các Chức Vụ trong Hội Thánh";
    case 5:
      return "Chủ đề: Sự Chuẩn Bị cho Sự Tái Lâm";
    case 6:
      return "Chủ đề: Sự Sống Đời Đời và Sự Chết Đời Đời";
    default:
      return "Chủ đề: Trái sự sống và Mười Ðiều Răn";
  }
};

const getTheme4ByMonth = (month: number): string => {
  switch (month) {
    case 1:
      return "Chủ đề: 4 Môise và Ðức Chúa Jêsus";
    case 2:
      return "Chủ đề: Sự Thăng Thiên của Đức Chúa Jêsus";
    case 3:
      return "Chủ đề: Trái của Đức Thánh Linh";
    case 4:
      return "Chủ đề: Sự Tăng Trưởng của Hội Thánh";
    case 5:
      return "Chủ đề: Sự Cất Lên của Hội Thánh";
    case 6:
      return "Chủ đề: Sự Sáng Tạo Mới";
    default:
      return "Chủ đề: 4 Môise và Ðức Chúa Jêsus";
  }
};

interface Chapter4Props {
  month: number;
  truthBookReflection1: string;
  setTruthBookReflection1: (value: string) => void;
  truthBookReflection2: string;
  setTruthBookReflection2: (value: string) => void;
  truthBookReflection3: string;
  setTruthBookReflection3: (value: string) => void;
  truthBookReflection4: string;
  setTruthBookReflection4: (value: string) => void;
}

export default function Chapter4({
  month,
  truthBookReflection1,
  setTruthBookReflection1,
  truthBookReflection2,
  setTruthBookReflection2,
  truthBookReflection3,
  setTruthBookReflection3,
  truthBookReflection4,
  setTruthBookReflection4,
}: Chapter4Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">
          CHƯƠNG 4: SÁCH LẼ THẬT
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-4">1. Đọc sách</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Sách</Label>
              <Input
                value={getBookByMonth(month)}
                disabled
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Phạm vi</Label>
              <Input
                value={getChaptersByMonth(month)}
                disabled
                className="bg-gray-50"
              />
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-4">
            2. Hương khí sau khi đọc sách lẽ thật
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                {getTheme1ByMonth(month)}
              </Label>
              <Textarea
                value={truthBookReflection1}
                onChange={(e) => setTruthBookReflection1(e.target.value)}
                className="min-h-[100px] border-gray-300 rounded-lg"
                placeholder="Nhập cảm nhận của anh chị em..."
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                {getTheme2ByMonth(month)}
              </Label>
              <Textarea
                value={truthBookReflection2}
                onChange={(e) => setTruthBookReflection2(e.target.value)}
                className="min-h-[100px] border-gray-300 rounded-lg"
                placeholder="Nhập cảm nhận của anh chị em..."
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                {getTheme3ByMonth(month)}
              </Label>
              <Textarea
                value={truthBookReflection3}
                onChange={(e) => setTruthBookReflection3(e.target.value)}
                className="min-h-[100px] border-gray-300 rounded-lg"
                placeholder="Nhập cảm nhận của anh chị em..."
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                {getTheme4ByMonth(month)}
              </Label>
              <Textarea
                value={truthBookReflection4}
                onChange={(e) => setTruthBookReflection4(e.target.value)}
                className="min-h-[100px] border-gray-300 rounded-lg"
                placeholder="Nhập cảm nhận của anh chị em..."
              />
            </div>
          </div>
        </div>
        {/* Save button removed - using main save button instead */}
      </CardContent>
    </Card>
  );
}
