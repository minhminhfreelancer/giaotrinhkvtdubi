import React from "react";
import TopNavigation from "../dashboard/layout/TopNavigation";
import Sidebar from "../dashboard/layout/Sidebar";
import CurriculumPage from "../curriculum/CurriculumPage";

export default function Curriculum() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <TopNavigation />
      <div className="flex h-[calc(100vh-64px)] mt-16">
        <Sidebar activeItem="Giáo trình" />
        <main className="flex-1 overflow-auto">
          <CurriculumPage />
        </main>
      </div>
    </div>
  );
}
