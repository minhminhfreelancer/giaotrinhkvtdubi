import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Helper functions to get content based on month
const getStageByMonth = (month: number): string => {
  switch (month) {
    case 1:
      return "Giai đoạn 1";
    case 2:
      return "Giai đoạn 1";
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
      return "Chương 9,10,11,12,13,14,15,16 (GĐ1)";
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
                    Phân Loại
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Người chấm thi
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 8 }).map((_, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="border border-gray-300 px-4 py-2">{`1-${index + 1}`}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Chữ ký:</span>
                          <Input className="h-8" />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Ngày Tháng:</span>
                          <Input className="h-8" />
                        </div>
                      </div>
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
                    Phân Loại
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Người chấm thi
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 3 }).map((_, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="border border-gray-300 px-4 py-2">{`6-${index + 1}`}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Chữ ký:</span>
                          <Input className="h-8" />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Ngày Tháng:</span>
                          <Input className="h-8" />
                        </div>
                      </div>
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

const Label = ({
  children,
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement> & { className?: string }) => (
  <label className={`text-sm font-medium ${className || ""}`} {...props}>
    {children}
  </label>
);
