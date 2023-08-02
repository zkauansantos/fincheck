import * as RdxDropdownMenu from "@radix-ui/react-dropdown-menu";
import cn from "../../../app/utils/cn";

interface DropdownMenuContentProps {
  children: React.ReactNode;
  className?: string;
}

export default function DropdownMenuContent({
  children,
  className,
}: DropdownMenuContentProps) {
  return (
    <RdxDropdownMenu.Portal>
      <RdxDropdownMenu.Content
        className={cn(
          "z-50",
          "rounded-2xl p-2 bg-white space-y-2",
          "data-[side=bottom]:animate-slide-up-and-fade",
          "data-[side=top]:animate-slide-down-and-fade",
          "shadow-[0px_11px_20px_0px_rgba(0,0,0,0.2)]",
          className
        )}
      >
        {children}
      </RdxDropdownMenu.Content>
    </RdxDropdownMenu.Portal>
  );
}
