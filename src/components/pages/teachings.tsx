import React, { useState } from "react";
import TopNavigation from "../dashboard/layout/TopNavigation";
import Sidebar from "../dashboard/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface Teaching {
  id: number;
  content: string;
  source: string;
}

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
  {
    id: 4,
    content:
      "Giống như Ápraham được nhận phước lành tốt hơn khi nhường cho người cháu là Lót cái tốt đẹp, chúng ta cũng sẽ nhận phước lành tốt hơn khi nhường cho anh em cái tốt đẹp.",
    source: "https://watv.org/vi/faith_life/teachings-of-mother-4",
  },
  {
    id: 5,
    content: "Lòng hờn dỗi là lòng kiêu ngạo.",
    source: "https://watv.org/vi/faith_life/teachings-of-mother-5",
  },
  {
    id: 6,
    content:
      "Ðừng phàn nàn người khác không làm, hãy chú tâm vào công việc của chính mình một cách trung thành. Làm việc với tấm lòng người chủ sẽ không mệt nhọc và được hớn hở trong khi làm việc.",
    source: "https://watv.org/vi/faith_life/teachings-of-mother-6",
  },
  {
    id: 7,
    content:
      "Đầy bất mãn sinh ra lòng kiêu ngạo. Luôn luôn lấy lòng cảm tạ phụng sự Đức Chúa Trời thì bất mãn và kiêu ngạo sẽ bị biến mất, thay vào đó là lòng khiêm tốn.",
    source: "https://watv.org/vi/faith_life/teachings-of-mother-7",
  },
  {
    id: 8,
    content: "Khi khen anh em thì sự khen trở về mình.",
    source: "https://watv.org/vi/faith_life/teachings-of-mother-8",
  },
  {
    id: 9,
    content:
      "Giống như biển cả làm cho tinh sạch mọi sự dơ dáy chảy vào mình, tấm lòng rộng lớn như biển cả bao la khoan dung mọi sự lỗi lầm của anh chị em mới thật là tấm lòng đẹp.",
    source: "https://watv.org/vi/faith_life/teachings-of-mother-9",
  },
  {
    id: 10,
    content:
      "Người nào muốn được Chiên Con dẫn dắt, thì phải trở nên chiên nhỏ hơn Chiên Con.",
    source: "https://watv.org/vi/faith_life/teachings-of-mother-10",
  },
  {
    id: 11,
    content:
      "Hy sinh là quá trình được đòi hỏi để chúng ta trở thành chén lớn.",
    source: "https://watv.org/vi/faith_life/teachings-of-mother-11",
  },
  {
    id: 12,
    content:
      "Đức Chúa Trời đến thế gian để hầu việc. Tấm lòng hầu việc lẫn nhau chớ không muốn được hầu việc là tấm lòng Đức Chúa Trời đẹp ý.",
    source: "https://watv.org/vi/faith_life/teachings-of-mother-12",
  },
  {
    id: 13,
    content:
      "Sở dĩ kiên nhẫn và nhịn nhục gian nan hôm nay là vì đối với tôi có Nước Thiên Ðàng.",
    source: "https://watv.org/vi/faith_life/teachings-of-mother-13",
  },
];

export default function Teachings() {
  const [randomTeaching, setRandomTeaching] = useState<Teaching | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const getRandomTeaching = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * teachings.length);
      setRandomTeaching(teachings[randomIndex]);
      setIsAnimating(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <TopNavigation />
      <div className="flex h-[calc(100vh-64px)] mt-16">
        <Sidebar activeItem="Giáo huấn" />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6 space-y-8">
            <div className="max-w-3xl mx-auto">
              <div className="mb-8 text-center">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Giáo huấn của Mẹ
                </h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Mười ba giáo huấn của Đức Chúa Trời Mẹ. Chúng tôi học bổn tánh
                  thiên thượng trong sự dạy dỗ của tình yêu thương.
                </p>
              </div>

              <div className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-purple-200 dark:border-purple-800">
                <h3 className="text-xl font-semibold text-center mb-4 text-purple-700 dark:text-purple-300">
                  Xin Đức Chúa Trời ban giáo huấn
                </h3>
                <div className="flex flex-col items-center justify-center space-y-6 py-8">
                  <div className="text-center max-w-md mx-auto mb-4">
                    <p className="text-gray-700 dark:text-gray-300 italic">
                      Hãy cầu nguyện với Đức Chúa Trời và nhấn nút để nhận giáo
                      huấn cho hôm nay
                    </p>
                  </div>
                  <Button
                    onClick={getRandomTeaching}
                    className={`inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-9 gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-full shadow-md ${isAnimating ? "animate-pulse" : ""}`}
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
                  <div className="mt-8 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800">
                    <p className="text-gray-700 dark:text-gray-300 italic text-center text-lg">
                      "{randomTeaching.content}"
                    </p>
                    <div className="mt-4 text-center">
                      <a
                        href={randomTeaching.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400 hover:underline"
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
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {teachings.map((teaching) => (
                  <div
                    key={teaching.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-purple-100 dark:border-purple-900 hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-2 text-lg">
                      Giáo huấn thứ {teaching.id} trong Giáo huấn của Mẹ
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 italic mb-3">
                      "{teaching.content}"
                    </p>
                    <a
                      href={teaching.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400 hover:underline"
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
                ))}
              </div>

              <div className="mt-12 text-center">
                <a
                  href="https://watv.org/vi/category/faith-life-es/teachings-of-mother/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-md shadow-md transition-all"
                >
                  <span>Xem thêm Giáo huấn của Mẹ</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
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
          </div>
        </main>
      </div>
    </div>
  );
}
