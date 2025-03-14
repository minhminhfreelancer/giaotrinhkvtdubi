import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface SelfAssessment {
  category: string;
  content: string;
  score: string;
}

interface Chapter3Props {
  assessments: SelfAssessment[];
  handleAssessmentChange: (index: number, value: string) => void;
}

export default function Chapter3({
  assessments,
  handleAssessmentChange,
}: Chapter3Props) {
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
                <th className="border border-gray-300 px-4 py-2 text-center w-24">
                  ĐÁNH GIÁ (A,B,C,D,F)
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
                    <Input
                      value={item.score}
                      onChange={(e) =>
                        handleAssessmentChange(index, e.target.value)
                      }
                      className="w-16 mx-auto text-center"
                      maxLength={1}
                      placeholder="A-F"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
