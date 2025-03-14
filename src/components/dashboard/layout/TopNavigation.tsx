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
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Bell, Home, Search, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../supabase/auth";
import { useUserRole } from "@/hooks/useUserRole";

interface TopNavigationProps {
  onSearch?: (query: string) => void;
  notifications?: Array<{ id: string; title: string }>;
}

const TopNavigation = ({
  onSearch = () => {},
  notifications = [
    { id: "1", title: "Dự án mới được giao" },
    { id: "2", title: "Nhắc nhở cuộc họp" },
  ],
}: TopNavigationProps) => {
  const { user, signOut } = useAuth();
  const { isDistrictLeader, isTraineeDistrictLeader } = useUserRole();

  if (!user) return null;

  return (
    <div className="w-full h-16 border-b border-gray-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-6 fixed top-0 z-50 shadow-sm">
      <div className="flex items-center gap-4 flex-1">
        <Link
          to="/"
          className="text-gray-900 hover:text-gray-700 transition-colors"
        >
          <Home className="h-5 w-5" />
        </Link>
        <div className="relative w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm dự án..."
            className="pl-9 h-10 rounded-full bg-gray-100 border-0 text-sm focus:ring-2 focus:ring-gray-200 focus-visible:ring-gray-200 focus-visible:ring-offset-0"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative rounded-full h-9 w-9 bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <Bell className="h-4 w-4 text-gray-700" />
                      {notifications.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-medium border border-white">
                          {notifications.length}
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="rounded-xl overflow-hidden p-2 border border-gray-200 shadow-lg"
                  >
                    <DropdownMenuLabel className="text-sm font-medium text-gray-900 px-2">
                      Thông báo
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="my-1 bg-gray-100" />
                    {notifications.map((notification) => (
                      <DropdownMenuItem
                        key={notification.id}
                        className="rounded-lg text-sm py-2 focus:bg-gray-100"
                      >
                        {notification.title}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </span>
            </TooltipTrigger>
            <TooltipContent className="rounded-lg bg-gray-900 text-white text-xs px-3 py-1.5">
              <p>Thông báo</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 hover:cursor-pointer">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                alt={user.email || ""}
              />
              <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="rounded-xl border-none shadow-lg"
          >
            <DropdownMenuLabel className="text-xs text-gray-500">
              {user.email}
              {isDistrictLeader && (
                <span className="ml-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                  Khu vực trưởng
                </span>
              )}
              {isTraineeDistrictLeader && (
                <span className="ml-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                  Khu vực trưởng dự bị
                </span>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={() => (window.location.href = "/account")}
            >
              <User className="mr-2 h-4 w-4" />
              Hồ sơ
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={() => (window.location.href = "/account")}
            >
              <Settings className="mr-2 h-4 w-4" />
              Cài đặt
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={() => signOut()}
            >
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TopNavigation;
