import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  ChevronRight,
  BookOpen,
  Video,
  FileText,
  Users,
  MessageCircle,
  Calendar,
  Award,
} from "lucide-react";

interface Module {
  id: string;
  title: string;
  description: string;
  progress: number;
  lessons: Lesson[];
  icon: React.ReactNode;
}

interface Lesson {
  id: string;
  title: string;
  completed: boolean;
  duration: string;
}

export default function ModuleList() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const modules: Module[] = [
    {
      id: "scripture-study",
      title: "Scripture Study",
      description:
        "Master the principles of effective scripture study and teaching",
      progress: 75,
      icon: <BookOpen className="h-5 w-5" />,
      lessons: [
        {
          id: "1",
          title: "Foundational Principles of Scripture Study",
          completed: true,
          duration: "45 min",
        },
        {
          id: "2",
          title: "Contextual Analysis Methods",
          completed: true,
          duration: "60 min",
        },
        {
          id: "3",
          title: "Application Techniques for Modern Audiences",
          completed: true,
          duration: "50 min",
        },
        {
          id: "4",
          title: "Advanced Interpretation Strategies",
          completed: false,
          duration: "75 min",
        },
      ],
    },
    {
      id: "teaching-methods",
      title: "Teaching Methods",
      description: "Learn effective teaching techniques for various audiences",
      progress: 50,
      icon: <Users className="h-5 w-5" />,
      lessons: [
        {
          id: "1",
          title: "Engaging Different Learning Styles",
          completed: true,
          duration: "60 min",
        },
        {
          id: "2",
          title: "Creating Interactive Lessons",
          completed: true,
          duration: "45 min",
        },
        {
          id: "3",
          title: "Facilitating Meaningful Discussions",
          completed: false,
          duration: "55 min",
        },
        {
          id: "4",
          title: "Addressing Difficult Questions",
          completed: false,
          duration: "70 min",
        },
      ],
    },
    {
      id: "pastoral-care",
      title: "Pastoral Care",
      description:
        "Develop skills for counseling and supporting community members",
      progress: 30,
      icon: <MessageCircle className="h-5 w-5" />,
      lessons: [
        {
          id: "1",
          title: "Foundations of Pastoral Counseling",
          completed: true,
          duration: "65 min",
        },
        {
          id: "2",
          title: "Active Listening Techniques",
          completed: false,
          duration: "50 min",
        },
        {
          id: "3",
          title: "Crisis Intervention Basics",
          completed: false,
          duration: "75 min",
        },
        {
          id: "4",
          title: "Ethical Boundaries in Pastoral Care",
          completed: false,
          duration: "60 min",
        },
      ],
    },
    {
      id: "leadership-development",
      title: "Leadership Development",
      description:
        "Build essential leadership skills for religious communities",
      progress: 60,
      icon: <Award className="h-5 w-5" />,
      lessons: [
        {
          id: "1",
          title: "Vision Casting and Strategic Planning",
          completed: true,
          duration: "70 min",
        },
        {
          id: "2",
          title: "Team Building and Delegation",
          completed: true,
          duration: "55 min",
        },
        {
          id: "3",
          title: "Conflict Resolution in Religious Settings",
          completed: true,
          duration: "65 min",
        },
        {
          id: "4",
          title: "Developing Future Leaders",
          completed: false,
          duration: "60 min",
        },
      ],
    },
    {
      id: "community-outreach",
      title: "Community Outreach",
      description: "Learn strategies for effective community engagement",
      progress: 40,
      icon: <Users className="h-5 w-5" />,
      lessons: [
        {
          id: "1",
          title: "Needs Assessment and Program Development",
          completed: true,
          duration: "55 min",
        },
        {
          id: "2",
          title: "Building Community Partnerships",
          completed: true,
          duration: "50 min",
        },
        {
          id: "3",
          title: "Sustainable Outreach Programs",
          completed: false,
          duration: "65 min",
        },
        {
          id: "4",
          title: "Measuring Impact and Effectiveness",
          completed: false,
          duration: "60 min",
        },
      ],
    },
    {
      id: "spiritual-disciplines",
      title: "Spiritual Disciplines",
      description:
        "Deepen personal spiritual practices for ministry effectiveness",
      progress: 85,
      icon: <FileText className="h-5 w-5" />,
      lessons: [
        {
          id: "1",
          title: "Contemplative Prayer Practices",
          completed: true,
          duration: "45 min",
        },
        {
          id: "2",
          title: "Sabbath and Rest in Ministry",
          completed: true,
          duration: "50 min",
        },
        {
          id: "3",
          title: "Spiritual Reading and Reflection",
          completed: true,
          duration: "55 min",
        },
        {
          id: "4",
          title: "Retreat Planning and Facilitation",
          completed: true,
          duration: "60 min",
        },
      ],
    },
    {
      id: "digital-ministry",
      title: "Digital Ministry",
      description:
        "Leverage technology for effective ministry in the digital age",
      progress: 20,
      icon: <Video className="h-5 w-5" />,
      lessons: [
        {
          id: "1",
          title: "Social Media Strategy for Religious Leaders",
          completed: true,
          duration: "50 min",
        },
        {
          id: "2",
          title: "Creating Engaging Video Content",
          completed: false,
          duration: "65 min",
        },
        {
          id: "3",
          title: "Online Community Building",
          completed: false,
          duration: "55 min",
        },
        {
          id: "4",
          title: "Digital Ethics and Boundaries",
          completed: false,
          duration: "45 min",
        },
      ],
    },
  ];

  const toggleModule = (moduleId: string) => {
    if (selectedModule === moduleId) {
      setSelectedModule(null);
    } else {
      setSelectedModule(moduleId);
    }
  };

  return (
    <div className="space-y-4">
      {modules.map((module) => (
        <Card
          key={module.id}
          className="bg-white border border-gray-100 shadow-sm overflow-hidden"
        >
          <div
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => toggleModule(module.id)}
          >
            <div className="flex items-center gap-3">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center ${module.progress >= 100 ? "bg-green-100" : "bg-blue-100"}`}
              >
                <span
                  className={
                    module.progress >= 100 ? "text-green-600" : "text-blue-600"
                  }
                >
                  {module.icon}
                </span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{module.title}</h3>
                <p className="text-sm text-gray-500">{module.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm font-medium text-gray-700">
                {module.progress}% Complete
              </div>
              <ChevronRight
                className={`h-5 w-5 text-gray-400 transition-transform ${selectedModule === module.id ? "rotate-90" : ""}`}
              />
            </div>
          </div>

          {selectedModule === module.id && (
            <CardContent className="border-t border-gray-100 bg-gray-50 p-4">
              <div className="space-y-3">
                {module.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-6 w-6 rounded-full flex items-center justify-center ${lesson.completed ? "bg-green-100" : "bg-gray-100"}`}
                      >
                        {lesson.completed ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <span className="h-2 w-2 rounded-full bg-gray-400"></span>
                        )}
                      </div>
                      <span
                        className={`text-sm font-medium ${lesson.completed ? "text-gray-700" : "text-gray-600"}`}
                      >
                        {lesson.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500">
                        {lesson.duration}
                      </span>
                      {!lesson.completed && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs rounded-full"
                        >
                          Start Lesson
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
}
