import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelfAssessment {
  category: string;
  content: string;
  score: string;
  week1?: string;
  week2?: string;
  week3?: string;
  week4?: string;
}

interface MobileChapter3Props {
  assessments: SelfAssessment[];
  handleAssessmentChange: (index: number, value: string, week?: string) => void;
}

export default function MobileChapter3({
  assessments,
  handleAssessmentChange,
}: MobileChapter3Props) {
  const grades = ["A", "B", "C", "D", "F"];

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        CHƯƠNG 3: KIỂM ĐIỂM BẢN THÂN
      </h3>
      <p className="text-xs text-gray-600 italic mb-4">
        I Timôthê 4:7 … và tập tành sự tin kính.
        <br />
        II Phierơ 1:4-7 … hầu cho nhờ đó anh em được lánh khỏi sự hư nát của thế
        gian bởi tư dục đến, mà trở nên người dự phần bổn tánh Đức Chúa Trời.
      </p>

      <div className="space-y-4">
        {assessments.map((item, index) => {
          // Check if this is the first item of its category or a new category
          const isNewCategory =
            index === 0 || assessments[index - 1].category !== item.category;

          return (
            <div key={index} className="border border-gray-200 rounded-lg p-3">
              {isNewCategory && (
                <div className="bg-gray-100 -m-3 mb-3 p-2 rounded-t-lg">
                  <h4 className="font-medium text-gray-800">{item.category}</h4>
                </div>
              )}

              <div className="mb-2">
                <p className="text-sm">{item.content}</p>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div className="space-y-1">
                  <p className="text-xs text-center font-medium text-gray-500">
                    Tuần 1
                  </p>
                  <Select
                    value={item.week1 || "none"}
                    onValueChange={(value) =>
                      handleAssessmentChange(index, value, "week1")
                    }
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="-" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">-</SelectItem>
                      {grades.map((grade) => (
                        <SelectItem key={grade} value={grade}>
                          {grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-center font-medium text-gray-500">
                    Tuần 2
                  </p>
                  <Select
                    value={item.week2 || "none"}
                    onValueChange={(value) =>
                      handleAssessmentChange(index, value, "week2")
                    }
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="-" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">-</SelectItem>
                      {grades.map((grade) => (
                        <SelectItem key={grade} value={grade}>
                          {grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-center font-medium text-gray-500">
                    Tuần 3
                  </p>
                  <Select
                    value={item.week3 || "none"}
                    onValueChange={(value) =>
                      handleAssessmentChange(index, value, "week3")
                    }
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="-" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">-</SelectItem>
                      {grades.map((grade) => (
                        <SelectItem key={grade} value={grade}>
                          {grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-center font-medium text-gray-500">
                    Tuần 4
                  </p>
                  <Select
                    value={item.week4 || "none"}
                    onValueChange={(value) =>
                      handleAssessmentChange(index, value, "week4")
                    }
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="-" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">-</SelectItem>
                      {grades.map((grade) => (
                        <SelectItem key={grade} value={grade}>
                          {grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
