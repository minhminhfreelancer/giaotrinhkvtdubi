import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

interface Chapter3Props {
  assessments: SelfAssessment[];
  handleAssessmentChange: (index: number, value: string, week?: string) => void;
}

export default function Chapter3({
  assessments,
  handleAssessmentChange,
}: Chapter3Props) {
  const grades = ["A", "B", "C", "D", "F"];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">
          CHƯƠNG 3: KIỂM ĐIỂM BẢN THÂN
        </CardTitle>
        <p className="text-sm text-gray-600 italic">
          I Timôthê 4:7 … và tập tành sự tin kính.
          <br />
          II Phierơ 1:4-7 … hầu cho nhờ đó anh em được lánh khỏi sự hư nát của
          thế gian bởi tư dục đến, mà trở nên người dự phần bổn tánh Đức Chúa
          Trời. Vậy nên, về phần anh em, phải gắng hết sức thêm cho đức tin mình
          sự nhân đức... thêm cho nhịn nhục sự tin kính, thêm cho tin kính tình
          yêu thương anh em, thêm cho tình yêu thương anh em lòng yêu mến.
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  PHÂN LOẠI
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  NỘI DUNG KIỂM ĐIỂM
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Tuần 1
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Tuần 2
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Tuần 3
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Tuần 4
                </th>
              </tr>
            </thead>
            <tbody>
              {assessments.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  {index === 0 ||
                  assessments[index - 1].category !== item.category ? (
                    <td
                      className="border border-gray-300 px-4 py-2 font-medium"
                      rowSpan={
                        assessments.filter((a) => a.category === item.category)
                          .length
                      }
                    >
                      {item.category}
                    </td>
                  ) : null}
                  <td className="border border-gray-300 px-4 py-2">
                    {item.content}
                  </td>
                  <td className="border border-gray-300 px-2 py-2 text-center">
                    <Select
                      value={item.week1 || "none"}
                      onValueChange={(value) =>
                        handleAssessmentChange(index, value, "week1")
                      }
                    >
                      <SelectTrigger className="w-16 h-8">
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
                  </td>
                  <td className="border border-gray-300 px-2 py-2 text-center">
                    <Select
                      value={item.week2 || "none"}
                      onValueChange={(value) =>
                        handleAssessmentChange(index, value, "week2")
                      }
                    >
                      <SelectTrigger className="w-16 h-8">
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
                  </td>
                  <td className="border border-gray-300 px-2 py-2 text-center">
                    <Select
                      value={item.week3 || "none"}
                      onValueChange={(value) =>
                        handleAssessmentChange(index, value, "week3")
                      }
                    >
                      <SelectTrigger className="w-16 h-8">
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
                  </td>
                  <td className="border border-gray-300 px-2 py-2 text-center">
                    <Select
                      value={item.week4 || "none"}
                      onValueChange={(value) =>
                        handleAssessmentChange(index, value, "week4")
                      }
                    >
                      <SelectTrigger className="w-16 h-8">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-6">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Lưu
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
