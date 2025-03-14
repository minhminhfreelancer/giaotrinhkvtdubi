import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BookOpen,
  ChevronRight,
  FileText,
  MessageCircle,
  Settings,
  User,
  Calendar,
  BarChart2,
  BookMarked,
  Video,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../supabase/auth";

export default function LandingPage() {
  const { user, signOut } = useAuth();

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <header className="fixed top-0 z-50 w-full bg-[rgba(255,255,255,0.8)] backdrop-blur-md border-b border-[#f5f5f7]/30">
        <div className="max-w-[1200px] mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <Link to="/" className="font-medium text-xl">
              Giáo trình khu vực trưởng
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/dashboard">
                  <Button
                    variant="ghost"
                    className="text-sm font-medium hover:text-blue-600"
                  >
                    Bảng Điều Khiển
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-8 w-8 hover:cursor-pointer">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                        alt={user.email || ""}
                      />
                      <AvatarFallback>
                        {user.email?.[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="rounded-xl border-none shadow-lg"
                  >
                    <DropdownMenuLabel className="text-xs text-gray-500">
                      {user.email}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Hồ Sơ
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Cài Đặt
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onSelect={() => signOut()}
                    >
                      Đăng Xuất
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="text-sm font-medium hover:text-blue-600"
                  >
                    Đăng Nhập
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm px-4">
                    Bắt Đầu
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero section */}
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900">
                  Giáo trình khu vực trưởng
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-lg">
                  Nền tảng toàn diện giúp các nhà lãnh đạo tôn giáo theo dõi
                  tiến độ học tập, quản lý chương trình giảng dạy và nâng cao
                  hiệu quả giảng dạy.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Link to="/signup">
                    <Button className="w-full sm:w-auto rounded-lg bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-base font-medium">
                      Bắt Đầu
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto rounded-lg border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 text-base font-medium"
                    >
                      Đăng Nhập
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <img
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80"
                  alt="Nhà lãnh đạo tôn giáo đang giảng dạy"
                  className="rounded-2xl shadow-lg w-full max-w-lg mx-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Quản Lý Học Tập Toàn Diện
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Nền tảng của chúng tôi cung cấp tất cả các công cụ cần thiết để
                các nhà lãnh đạo tôn giáo phát triển trong sứ mệnh và phát triển
                cá nhân.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <BarChart2 className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Theo Dõi Tiến Độ
                </h3>
                <p className="text-gray-600">
                  Theo dõi tỷ lệ hoàn thành qua 7 mô-đun học tập chính với các
                  biểu đồ và phân tích chi tiết.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Tự Đánh Giá
                </h3>
                <p className="text-gray-600">
                  Hoàn thành các bài tự đánh giá với 34 tiêu chí và xem phân
                  tích so sánh tiến độ hàng tháng.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Lịch Trình Mục Vụ
                </h3>
                <p className="text-gray-600">
                  Quản lý lịch trình mục vụ với tích hợp Telegram để nhận thông
                  báo nhắc nhở lúc 6 giờ sáng.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <BookMarked className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Nộp Báo Cáo
                </h3>
                <p className="text-gray-600">
                  Nộp báo cáo với thang điểm A-B-C-D-F và nhận phản hồi chi tiết
                  từ giảng viên.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Resource Library Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                  Thư Viện Tài Nguyên Toàn Diện
                </h2>
                <p className="text-xl text-gray-600 mb-6">
                  Truy cập kho tài liệu giảng dạy phong phú, tài nguyên kinh
                  thánh và nội dung video để nâng cao mục vụ của bạn.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <svg
                        className="h-4 w-4 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">
                      Tài liệu kinh thánh được tổ chức theo chủ đề và bối cảnh
                      giảng dạy
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <svg
                        className="h-4 w-4 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">
                      Mẫu giảng dạy cho nhiều bối cảnh mục vụ và đối tượng khác
                      nhau
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <svg
                        className="h-4 w-4 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">
                      Tài nguyên video với khả năng tải lên để chia sẻ nội dung
                      của riêng bạn
                    </span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Link to="/signup">
                    <Button className="rounded-lg bg-blue-600 text-white hover:bg-blue-700 px-6 py-2.5 text-base font-medium">
                      Khám Phá Tài Nguyên
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 grid grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                  <BookOpen className="h-8 w-8 text-blue-600 mb-3" />
                  <h3 className="text-lg font-semibold mb-2">
                    Tài Liệu Kinh Thánh
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Truy cập tài liệu tham khảo kinh thánh và hướng dẫn học tập
                    có tổ chức
                  </p>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                  <FileText className="h-8 w-8 text-green-600 mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Mẫu Giảng Dạy</h3>
                  <p className="text-gray-600 text-sm">
                    Mẫu sẵn sàng sử dụng cho nhiều bối cảnh giảng dạy khác nhau
                  </p>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                  <Video className="h-8 w-8 text-purple-600 mb-3" />
                  <h3 className="text-lg font-semibold mb-2">
                    Tài Nguyên Video
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Xem và tải lên video hướng dẫn và bài giảng
                  </p>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                  <MessageCircle className="h-8 w-8 text-orange-600 mb-3" />
                  <h3 className="text-lg font-semibold mb-2">
                    Chia Sẻ Cộng Đồng
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Chia sẻ tài nguyên và kiến thức với các nhà lãnh đạo khác
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-[1200px] mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Sẵn Sàng Nâng Cao Mục Vụ Của Bạn?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Tham gia cùng hàng nghìn nhà lãnh đạo tôn giáo đang cải thiện hiệu
              quả giảng dạy và mục vụ của họ.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button className="w-full sm:w-auto rounded-lg bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-base font-medium">
                  Bắt Đầu
                </Button>
              </Link>
              <Link to="/">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto rounded-lg border-white text-white hover:bg-blue-700 px-8 py-3 text-base font-medium"
                >
                  Tìm Hiểu Thêm
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-lg mb-4">
                Đào Tạo Nhà Lãnh Đạo Tôn Giáo
              </h4>
              <p className="text-gray-400 text-sm mb-4">
                Trao quyền cho các nhà lãnh đạo tôn giáo với công cụ cho mục vụ
                hiệu quả và phát triển cá nhân.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Tính Năng</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Theo Dõi Tiến Độ
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Tự Đánh Giá
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Lịch Trình Mục Vụ
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Nộp Báo Cáo
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Tài Nguyên</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Tài Liệu Kinh Thánh
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Mẫu Giảng Dạy
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Tài Nguyên Video
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Cộng Đồng
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Hỗ Trợ</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Trung Tâm Trợ Giúp
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Liên Hệ
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Chính Sách Bảo Mật
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Điều Khoản Dịch Vụ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>© 2024 Giáo trình khu vực trưởng. Đã đăng ký bản quyền.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
