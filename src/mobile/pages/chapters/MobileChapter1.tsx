import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface MobileChapter1Props {
  evangelismGoal: string;
  setEvangelismGoal: (value: string) => void;
  evangelismPlan: string;
  setEvangelismPlan: (value: string) => void;
  educationGoal: string;
  setEducationGoal: (value: string) => void;
  educationPlan: string;
  setEducationPlan: (value: string) => void;
  managementPlan: string;
  setManagementPlan: (value: string) => void;
}

export default function MobileChapter1({
  evangelismGoal,
  setEvangelismGoal,
  evangelismPlan,
  setEvangelismPlan,
  educationGoal,
  setEducationGoal,
  educationPlan,
  setEducationPlan,
  managementPlan,
  setManagementPlan,
}: MobileChapter1Props) {
  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          CHƯƠNG 1: TRUYỀN ĐẠO HỌC
        </h3>
        <p className="text-xs text-gray-600 italic mb-4">
          *Tại thời điểm kết thúc một tháng và bắt đầu tháng mới, hãy lập kế
          hoạch Tin Lành của riêng bản thân mình.
          <br />
          *Tập trung ghi chép các ý tưởng mới mẻ hơn là ghi chép tất thảy mọi
          hoạt động Tin Lành.
        </p>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="evangelismGoal" className="text-sm font-medium">
              1. Mục tiêu truyền đạo
            </Label>
            <Textarea
              id="evangelismGoal"
              value={evangelismGoal}
              onChange={(e) => setEvangelismGoal(e.target.value)}
              className="min-h-[100px] border-gray-300 rounded-lg"
              placeholder="Nhập mục tiêu truyền đạo của anh chị em..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="evangelismPlan" className="text-sm font-medium">
              2. Phương án truyền đạo
            </Label>
            <Textarea
              id="evangelismPlan"
              value={evangelismPlan}
              onChange={(e) => setEvangelismPlan(e.target.value)}
              className="min-h-[100px] border-gray-300 rounded-lg"
              placeholder="Nhập phương án truyền đạo của anh chị em..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="educationGoal" className="text-sm font-medium">
              3. Mục tiêu giáo dục
            </Label>
            <Textarea
              id="educationGoal"
              value={educationGoal}
              onChange={(e) => setEducationGoal(e.target.value)}
              className="min-h-[100px] border-gray-300 rounded-lg"
              placeholder="Nhập mục tiêu giáo dục của anh chị em..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="educationPlan" className="text-sm font-medium">
              4. Phương án giáo dục
            </Label>
            <Textarea
              id="educationPlan"
              value={educationPlan}
              onChange={(e) => setEducationPlan(e.target.value)}
              className="min-h-[100px] border-gray-300 rounded-lg"
              placeholder="Nhập phương án giáo dục của anh chị em..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="managementPlan" className="text-sm font-medium">
              5. Phương án quản lý khu vực đảm nhiệm
            </Label>
            <Textarea
              id="managementPlan"
              value={managementPlan}
              onChange={(e) => setManagementPlan(e.target.value)}
              className="min-h-[100px] border-gray-300 rounded-lg"
              placeholder="Nhập phương án quản lý khu vực đảm nhiệm của anh chị em..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
