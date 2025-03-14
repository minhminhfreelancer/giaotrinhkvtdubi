import React from "react";
import TopNavigation from "../dashboard/layout/TopNavigation";
import Sidebar from "../dashboard/layout/Sidebar";
import ProgressDashboard from "../progress-tracking/ProgressDashboard";

export default function ProgressPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <TopNavigation />
      <div className="flex h-[calc(100vh-64px)] mt-16">
        <Sidebar activeItem="Progress" />
        <main className="flex-1 overflow-auto">
          <ProgressDashboard />
        </main>
      </div>
    </div>
  );
}
