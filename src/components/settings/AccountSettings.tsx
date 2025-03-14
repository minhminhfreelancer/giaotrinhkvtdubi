import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "../../../supabase/supabase";
import { useAuth } from "../../../supabase/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Lock, Mail, Shield } from "lucide-react";

export default function AccountSettings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: "Lỗi",
        description: "Anh chị em cần đăng nhập để thực hiện thao tác này",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Lỗi",
        description: "Mật khẩu mới và xác nhận mật khẩu không khớp",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 8) {
      toast({
        title: "Lỗi",
        description: "Mật khẩu mới phải có ít nhất 8 ký tự",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      // First verify the current password by attempting to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email || "",
        password: currentPassword,
      });

      if (signInError) {
        toast({
          title: "Lỗi",
          description: "Mật khẩu hiện tại không chính xác",
          variant: "destructive",
        });
        return;
      }

      // Update the password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) throw updateError;

      toast({
        title: "Thành công",
        description: "Mật khẩu đã được cập nhật",
      });

      // Reset form
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error changing password:", error);
      toast({
        title: "Lỗi",
        description: `Không thể cập nhật mật khẩu: ${error instanceof Error ? error.message : String(error)}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-gray-500">
              Vui lòng đăng nhập để xem thông tin tài khoản của anh chị em
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Quản lý tài khoản
          </h1>
          <p className="text-gray-600">
            Quản lý thông tin và bảo mật tài khoản của anh chị em
          </p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md bg-gray-100 rounded-lg p-1 mb-6">
          <TabsTrigger
            value="profile"
            className="rounded-md py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <User className="h-4 w-4 mr-2" />
            Hồ sơ
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="rounded-md py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <Lock className="h-4 w-4 mr-2" />
            Bảo mật
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="rounded-md py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <Mail className="h-4 w-4 mr-2" />
            Thông báo
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Thông tin cá nhân
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <Avatar className="h-20 w-20 border-2 border-gray-200">
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                    alt={user.email || ""}
                  />
                  <AvatarFallback className="text-2xl">
                    {user.email?.[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="text-lg font-medium">
                    {user.user_metadata?.full_name || "Chưa cập nhật tên"}
                  </h3>
                  <p className="text-gray-500">{user.email}</p>
                  <div className="flex items-center mt-2">
                    <Shield className="h-4 w-4 text-blue-500 mr-1" />
                    <span className="text-sm text-blue-600 font-medium">
                      Khu vực trưởng dự bị
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Đổi mật khẩu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    className="max-w-md"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Mật khẩu mới</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="max-w-md"
                  />
                  <p className="text-xs text-gray-500">
                    Mật khẩu phải có ít nhất 8 ký tự
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="max-w-md"
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={loading}
                >
                  {loading ? "Đang xử lý..." : "Cập nhật mật khẩu"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Cài đặt thông báo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 italic">
                Tính năng đang được phát triển
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
