import { useState } from "react";
import { useAuth } from "../../../supabase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "../../../supabase/supabase";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(email, password, fullName);

      // Assign default role as trainee_district_leader
      try {
        // Get the user ID from the newly created user
        const { data: userData } = await supabase.auth.getUser();
        if (userData?.user) {
          // Get the role ID for trainee_district_leader
          const { data: roleData } = await supabase
            .from("roles")
            .select("id")
            .eq("name", "trainee_district_leader")
            .single();

          if (roleData) {
            // Assign the role to the user
            await supabase.from("user_roles").insert({
              user_id: userData.user.id,
              role_id: roleData.id,
            });
          }
        }
      } catch (roleError) {
        console.error("Error assigning default role:", roleError);
        // Continue with signup process even if role assignment fails
      }

      toast({
        title: "Tạo tài khoản thành công",
        description:
          "Vui lòng kiểm tra email của anh chị em để xác minh tài khoản.",
        duration: 5000,
      });
      // Navigate to login page
      navigate("/login");
    } catch (error) {
      setError("Lỗi khi tạo tài khoản");
    }
  };

  return (
    <AuthLayout>
      <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="fullName"
              className="text-sm font-medium text-gray-700"
            >
              Họ và tên
            </Label>
            <Input
              id="fullName"
              placeholder="Nguyễn II Nam"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="h-12 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Mật khẩu
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Tạo mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Mật khẩu phải có ít nhất 8 ký tự
            </p>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button
            type="submit"
            className="w-full h-12 rounded-full bg-black text-white hover:bg-gray-800 text-sm font-medium"
          >
            Tạo tài khoản
          </Button>

          <div className="text-xs text-center text-gray-500 mt-6">
            Bằng cách tạo tài khoản, anh chị em đồng ý với{" "}
            <Link to="/" className="text-blue-600 hover:underline">
              Điều khoản dịch vụ
            </Link>{" "}
            và{" "}
            <Link to="/" className="text-blue-600 hover:underline">
              Chính sách bảo mật
            </Link>
          </div>

          <div className="text-sm text-center text-gray-600 mt-6">
            Đã có tài khoản?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Đăng nhập
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
