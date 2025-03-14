import { useState } from "react";
import MobileHeader from "../components/MobileHeader";
import MobileBottomNav from "../components/MobileBottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Lock, Mail, Shield, LogOut } from "lucide-react";
import { useAuth } from "../../../supabase/auth";
import { useNavigate } from "react-router-dom";

export default function MobileAccount() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-center text-gray-500">
          Vui lòng đăng nhập để xem thông tin tài khoản
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16 pt-14">
      <MobileHeader
        title="Tài Khoản"
        rightAction={
          <button onClick={handleLogout} className="text-gray-500">
            <LogOut size={20} />
          </button>
        }
      />

      <div className="p-4 space-y-6">
        {/* User Profile Card */}
        <Card className="p-4 rounded-xl bg-white shadow-sm">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-gray-200">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                alt={user.email || ""}
              />
              <AvatarFallback className="text-xl">
                {user.email?.[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-1">
              <h3 className="text-lg font-medium">
                {user.user_metadata?.full_name || "Chưa cập nhật tên"}
              </h3>
              <p className="text-sm text-gray-500">{user.email}</p>
              <div className="flex items-center mt-1">
                <Shield className="h-3 w-3 text-blue-500 mr-1" />
                <span className="text-xs text-blue-600 font-medium">
                  Khu vực trưởng dự bị
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Account Tabs */}
        <Tabs
          defaultValue="profile"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 w-full bg-gray-100 rounded-lg p-1 mb-4">
            <TabsTrigger
              value="profile"
              className="rounded-md py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <User className="h-4 w-4 mr-1" />
              Hồ sơ
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="rounded-md py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <Lock className="h-4 w-4 mr-1" />
              Bảo mật
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="rounded-md py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <Mail className="h-4 w-4 mr-1" />
              Thông báo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card className="p-4 rounded-xl bg-white shadow-sm">
              <h3 className="font-semibold mb-4">Thông tin cá nhân</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Họ và tên</Label>
                  <Input
                    id="fullName"
                    value={user.user_metadata?.full_name || ""}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user.email || ""}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card className="p-4 rounded-xl bg-white shadow-sm">
              <h3 className="font-semibold mb-4">Đổi mật khẩu</h3>

              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                  <Input id="currentPassword" type="password" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Mật khẩu mới</Label>
                  <Input id="newPassword" type="password" required />
                  <p className="text-xs text-gray-500">
                    Mật khẩu phải có ít nhất 8 ký tự
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                  <Input id="confirmPassword" type="password" required />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Cập nhật mật khẩu
                </Button>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card className="p-4 rounded-xl bg-white shadow-sm">
              <h3 className="font-semibold mb-4">Cài đặt thông báo</h3>
              <p className="text-gray-500 italic">
                Tính năng đang được phát triển
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <MobileBottomNav />
    </div>
  );
}
