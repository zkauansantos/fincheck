import { useTheme } from "@/app/contexts/ThemeContext";
import cn from "@/app/utils/cn";
import * as RdxDropdownMenu from "@radix-ui/react-dropdown-menu";

interface DropdownMenuItemProps {
  children: React.ReactNode;
  className?: string;
  onSelect?: () => void;
}

export default function DropdownMenuItem({
  children,
  className,
  onSelect,
}: DropdownMenuItemProps) {
  const { theme } = useTheme();

  return (
    <RdxDropdownMenu.Item
      onSelect={onSelect}
      className={cn(
        "transition-colors bg-white min-h-[48px] outline-none flex",
        "items-center py-2 px-4 text-sm text-gray-800",
        "data-highlighted:bg-gray-50 rounded-2xl cursor-pointer",
        theme === 'dark' && 'dark:bg-gray-100/80',
        className,
      )}
    >
      {children}
    </RdxDropdownMenu.Item>
  );
}
