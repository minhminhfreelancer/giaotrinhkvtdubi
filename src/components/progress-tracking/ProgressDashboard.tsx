import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, BarChart2, Award, Calendar } from "lucide-react";
import ProgressCard from "./ProgressCard";
import ModuleList from "./ModuleList";

export default function ProgressDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Learning Progress
          </h1>
          <p className="text-gray-600">
            Track your progress across all learning modules
          </p>
        </div>
        <Tabs
          defaultValue="overview"
          className="w-full md:w-auto"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full md:w-auto grid-cols-2 h-auto p-1 bg-gray-100 rounded-lg">
            <TabsTrigger
              value="overview"
              className="rounded-md py-2 px-4 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="modules"
              className="rounded-md py-2 px-4 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Modules
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {activeTab === "overview" ? (
        <div className="space-y-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white border border-gray-100 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium text-gray-900">
                  Overall Progress
                </CardTitle>
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <BarChart2 className="h-4 w-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold text-gray-900">51%</div>
                <p className="text-sm text-gray-500 mt-1">Across all modules</p>
              </CardContent>
            </Card>
            <Card className="bg-white border border-gray-100 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium text-gray-900">
                  Modules Completed
                </CardTitle>
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Award className="h-4 w-4 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold text-gray-900">1/7</div>
                <p className="text-sm text-gray-500 mt-1">
                  Spiritual Disciplines
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white border border-gray-100 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium text-gray-900">
                  Lessons Completed
                </CardTitle>
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold text-gray-900">
                  15/28
                </div>
                <p className="text-sm text-gray-500 mt-1">Across all modules</p>
              </CardContent>
            </Card>
            <Card className="bg-white border border-gray-100 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium text-gray-900">
                  Next Deadline
                </CardTitle>
                <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-orange-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold text-gray-900">
                  May 15
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Teaching Methods module
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Module Progress Cards */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Module Progress
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProgressCard
                title="Scripture Study"
                description="Master the principles of effective scripture study and teaching"
                progress={75}
                color="blue"
                icon={<BookOpen className="h-4 w-4" />}
              />
              <ProgressCard
                title="Teaching Methods"
                description="Learn effective teaching techniques for various audiences"
                progress={50}
                color="purple"
                icon={<Award className="h-4 w-4" />}
              />
              <ProgressCard
                title="Pastoral Care"
                description="Develop skills for counseling and supporting community members"
                progress={30}
                color="orange"
                icon={<Award className="h-4 w-4" />}
              />
              <ProgressCard
                title="Leadership Development"
                description="Build essential leadership skills for religious communities"
                progress={60}
                color="green"
                icon={<Award className="h-4 w-4" />}
              />
              <ProgressCard
                title="Community Outreach"
                description="Learn strategies for effective community engagement"
                progress={40}
                color="red"
                icon={<Award className="h-4 w-4" />}
              />
              <ProgressCard
                title="Spiritual Disciplines"
                description="Deepen personal spiritual practices for ministry effectiveness"
                progress={85}
                color="blue"
                icon={<Award className="h-4 w-4" />}
              />
              <ProgressCard
                title="Digital Ministry"
                description="Leverage technology for effective ministry in the digital age"
                progress={20}
                color="purple"
                icon={<Award className="h-4 w-4" />}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Learning Modules
          </h2>
          <ModuleList />
        </div>
      )}
    </div>
  );
}
