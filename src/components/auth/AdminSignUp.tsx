import { useState } from "react";
import { supabase } from "../../../supabase/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminSignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("trainee_district_leader");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Create the user in auth.users
      const { data: userData, error: signUpError } = await supabase.auth.signUp(
        {
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        },
      );

      if (signUpError) throw signUpError;
      if (!userData.user) throw new Error("User creation failed");

      // 2. Get the role ID
      const { data: roleData, error: roleError } = await supabase
        .from("roles")
        .select("id")
        .eq("name", role)
        .single();

      if (roleError) throw roleError;

      // 3. Assign the role to the user
      const { error: roleAssignError } = await supabase
        .from("user_roles")
        .insert({
          user_id: userData.user.id,
          role_id: roleData.id,
        });

      if (roleAssignError) throw roleAssignError;

      toast({
        title: "Tài khoản đã được tạo",
        description: `Tài khoản ${email} đã được tạo với vai trò ${role === "trainee_district_leader" ? "Khu vực trưởng dự bị" : role}`,
        duration: 5000,
      });

      // Reset form
      setEmail("");
      setPassword("");
      setFullName("");
      setRole("trainee_district_leader");
    } catch (error) {
      console.error("Error creating admin user:", error);
      toast({
        title: "Lỗi",
        description: `Không thể tạo tài khoản: ${error instanceof Error ? error.message : String(error)}`,
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Tạo tài khoản</h2>
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
            placeholder="Nguyễn Văn A"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="h-12 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
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
        </div>
        <div className="space-y-2">
          <Label htmlFor="role" className="text-sm font-medium text-gray-700">
            Vai trò
          </Label>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger className="h-12 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500">
              <SelectValue placeholder="Chọn vai trò" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="trainee_district_leader">
                Khu vực trưởng dự bị
              </SelectItem>
              <SelectItem value="district_leader">Khu vực trưởng</SelectItem>
              <SelectItem value="admin">Quản trị viên</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          type="submit"
          className="w-full h-12 rounded-full bg-black text-white hover:bg-gray-800 text-sm font-medium"
          disabled={loading}
        >
          {loading ? "Đang tạo..." : "Tạo tài khoản"}
        </Button>
      </form>
    </div>
  );
}
