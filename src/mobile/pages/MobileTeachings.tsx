import { useState } from "react";
import MobileHeader from "../components/MobileHeader";
import MobileBottomNav from "../components/MobileBottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface Teaching {
  id: number;
  content: string;
  source: string;
}

export default function MobileTeachings() {
  const [randomTeaching, setRandomTeaching] = useState<Teaching | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Sample teachings data
  const teachings: Teaching[] = [
    {
      id: 1,
      content:
        "Như Ðức Chúa Trời luôn luôn ban sự yêu thương, người yêu thương được phước hơn người nhận yêu thương.",
      source: "https://watv.org/vi/faith_life/teachings-of-mother-1",
    },
    {
      id: 2,
      content:
        "Khi dâng vinh hiển lên Ðức Chúa Trời thì sự vinh hiển ấy được trở lại và thuộc về mình.",
      source: "https://watv.org/vi/faith_life/teachings-of-mother-2",
    },
    {
      id: 3,
      content:
        "Tấm lòng đẹp không chứa sự ghen ghét và luôn đạt được tình yêu thương trọn vẹn.",
      source: "https://watv.org/vi/faith_life/teachings-of-mother-3",
    },
    // More teachings would be added here
  ];

  const getRandomTeaching = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * teachings.length);
      setRandomTeaching(teachings[randomIndex]);
      setIsAnimating(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 pt-14">
      <MobileHeader title="Giáo Huấn Của Mẹ" />

      <div className="p-4 space-y-6">
        {/* Random Teaching Card */}
        <Card className="p-4 rounded-xl bg-white shadow-sm">
          <h3 className="text-lg font-semibold text-center mb-4 text-purple-700">
            Xin Đức Chúa Trời ban giáo huấn
          </h3>

          <div className="flex flex-col items-center justify-center space-y-4 py-4">
            <p className="text-gray-700 text-center text-sm mb-2">
              Hãy cầu nguyện với Đức Chúa Trời và nhấn nút để nhận giáo huấn cho
              hôm nay
            </p>

            <Button
              onClick={getRandomTeaching}
              className={`inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-full shadow-md ${isAnimating ? "animate-pulse" : ""}`}
              disabled={isAnimating}
            >
              <Sparkles
                className={`h-4 w-4 ${isAnimating ? "animate-spin" : ""}`}
              />
              {isAnimating
                ? "Đang nhận giáo huấn..."
                : "Nhận giáo huấn hôm nay"}
            </Button>
          </div>

          {randomTeaching && (
            <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-100">
              <p className="text-gray-700 italic text-center">
                "Giáo huấn thứ {randomTeaching.id} của Mẹ:{" "}
                {randomTeaching.content}"
              </p>
              <div className="mt-4 text-center">
                <a
                  href={randomTeaching.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-purple-600 hover:underline"
                >
                  <span>Đọc thêm</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-external-link"
                  >
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14 21 3"></path>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  </svg>
                </a>
              </div>
            </div>
          )}
        </Card>

        {/* List of Teachings */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Tất Cả Giáo Huấn</h3>

          {teachings.map((teaching) => (
            <Card
              key={teaching.id}
              className="p-4 rounded-xl bg-white shadow-sm"
            >
              <h4 className="font-semibold text-purple-700 mb-2">
                Giáo huấn thứ {teaching.id} của Mẹ
              </h4>
              <p className="text-gray-700 italic mb-3">"{teaching.content}"</p>
              <a
                href={teaching.source}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-purple-600 hover:underline"
              >
                <span>Đọc thêm</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-external-link"
                >
                  <path d="M15 3h6v6"></path>
                  <path d="M10 14 21 3"></path>
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                </svg>
              </a>
            </Card>
          ))}
        </div>
      </div>

      <MobileBottomNav />
    </div>
  );
}
