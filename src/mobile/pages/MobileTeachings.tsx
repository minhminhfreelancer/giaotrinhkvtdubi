import { useState, useEffect } from "react";
import MobileHeader from "../components/MobileHeader";
import MobileBottomNav from "../components/MobileBottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ExternalLink, Share2 } from "lucide-react";

interface Teaching {
  id: number;
  content: string;
  source: string;
}

export default function MobileTeachings() {
  const [randomTeaching, setRandomTeaching] = useState<Teaching | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);

  // Full teachings data
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
  ];

  const getRandomTeaching = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * teachings.length);
      setRandomTeaching(teachings[randomIndex]);
      setIsAnimating(false);
    }, 800);
  };

  const handleShare = (teaching: Teaching) => {
    if (navigator.share) {
      navigator
        .share({
          title: `Giáo huấn thứ ${teaching.id} của Mẹ`,
          text: `"${teaching.content}" - Giáo huấn thứ ${teaching.id} của Mẹ`,
          url: teaching.source,
        })
        .catch((err) => console.error("Không thể chia sẻ:", err));
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(
        `"${teaching.content}" - Giáo huấn thứ ${teaching.id} của Mẹ ${teaching.source}`,
      );
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2000);
    }
  };

  // Auto-hide share toast after 2 seconds
  useEffect(() => {
    if (showShareToast) {
      const timer = setTimeout(() => setShowShareToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showShareToast]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-14">
      <MobileHeader title="Giáo Huấn Của Mẹ" />

      <div className="p-4 space-y-6">
        {/* Random Teaching Card */}
        <Card className="p-5 rounded-xl bg-white shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 -mx-5 -mt-5 p-5 mb-5 text-white">
            <h3 className="text-lg font-semibold text-center mb-1">
              Xin Đức Chúa Trời ban giáo huấn
            </h3>
            <p className="text-white/80 text-center text-sm">
              Hãy cầu nguyện và nhận giáo huấn cho hôm nay
            </p>
          </div>

          <div className="flex flex-col items-center justify-center space-y-4">
            <Button
              onClick={getRandomTeaching}
              className={`inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 active:from-purple-800 active:to-blue-800 text-white px-6 py-3 rounded-full shadow-md h-auto ${isAnimating ? "animate-pulse" : ""}`}
              disabled={isAnimating}
            >
              <Sparkles
                className={`h-5 w-5 ${isAnimating ? "animate-spin" : ""}`}
              />
              <span className="text-base font-medium">
                {isAnimating
                  ? "Đang nhận giáo huấn..."
                  : "Nhận giáo huấn hôm nay"}
              </span>
            </Button>
          </div>

          {randomTeaching && (
            <div className="mt-6 p-5 bg-purple-50 rounded-xl border border-purple-100 relative">
              <div className="absolute top-3 right-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full text-purple-600 hover:bg-purple-100"
                  onClick={() => handleShare(randomTeaching)}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-gray-700 italic text-center text-lg leading-relaxed">
                "Giáo huấn thứ {randomTeaching.id} của Mẹ:{" "}
                {randomTeaching.content}"
              </p>
              <div className="mt-4 text-center">
                <a
                  href={randomTeaching.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-purple-600 font-medium hover:text-purple-800 active:text-purple-900"
                >
                  <span>Đọc thêm</span>
                  <ExternalLink className="h-3.5 w-3.5" />
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
              className="p-4 rounded-xl bg-white shadow-sm relative active:bg-gray-50"
            >
              <div className="absolute top-3 right-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-full text-purple-600 hover:bg-purple-100"
                  onClick={() => handleShare(teaching)}
                >
                  <Share2 className="h-3.5 w-3.5" />
                </Button>
              </div>
              <h4 className="font-semibold text-purple-700 mb-2 pr-8">
                Giáo huấn thứ {teaching.id} của Mẹ
              </h4>
              <p className="text-gray-700 italic mb-3">"{teaching.content}"</p>
              <a
                href={teaching.source}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-purple-600 font-medium hover:text-purple-800 active:text-purple-900"
              >
                <span>Đọc thêm</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Card>
          ))}
        </div>
      </div>

      {/* Share toast notification */}
      {showShareToast && (
        <div className="fixed bottom-20 left-0 right-0 mx-auto w-4/5 bg-gray-800 text-white py-3 px-4 rounded-lg shadow-lg text-center text-sm font-medium animate-fade-in">
          Đã sao chép giáo huấn vào bộ nhớ tạm
        </div>
      )}

      <MobileBottomNav />
    </div>
  );
}
