import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen } from "lucide-react";

interface ProgressCardProps {
  title: string;
  description: string;
  progress: number;
  color?: string;
  icon?: React.ReactNode;
}

export default function ProgressCard({
  title,
  description,
  progress,
  color = "blue",
  icon = <BookOpen className="h-4 w-4" />,
}: ProgressCardProps) {
  const getColorClasses = () => {
    switch (color) {
      case "green":
        return {
          bg: "bg-green-50",
          iconBg: "bg-green-100",
          iconColor: "text-green-600",
          progressColor: "bg-green-500",
        };
      case "purple":
        return {
          bg: "bg-purple-50",
          iconBg: "bg-purple-100",
          iconColor: "text-purple-600",
          progressColor: "bg-purple-500",
        };
      case "orange":
        return {
          bg: "bg-orange-50",
          iconBg: "bg-orange-100",
          iconColor: "text-orange-600",
          progressColor: "bg-orange-500",
        };
      case "red":
        return {
          bg: "bg-red-50",
          iconBg: "bg-red-100",
          iconColor: "text-red-600",
          progressColor: "bg-red-500",
        };
      case "blue":
      default:
        return {
          bg: "bg-blue-50",
          iconBg: "bg-blue-100",
          iconColor: "text-blue-600",
          progressColor: "bg-blue-500",
        };
    }
  };

  const colors = getColorClasses();

  return (
    <Card
      className={`${colors.bg} border-0 shadow-sm hover:shadow-md transition-all duration-200`}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium text-gray-900">
          {title}
        </CardTitle>
        <div
          className={`h-8 w-8 rounded-full ${colors.iconBg} flex items-center justify-center`}
        >
          <span className={colors.iconColor}>{icon}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-3">{description}</p>
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-gray-500">Progress</span>
            <span className="text-gray-900">{progress}%</span>
          </div>
          <Progress
            value={progress}
            className="h-2 bg-gray-100 rounded-full"
            indicatorClassName={colors.progressColor}
          />
        </div>
      </CardContent>
    </Card>
  );
}
