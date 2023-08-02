import * as RdxDropdownMenu from "@radix-ui/react-dropdown-menu";
import cn from "../../../app/utils/cn";

interface DropdownMenuTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export default function DropdownMenuTrigger({ children, className }: DropdownMenuTriggerProps) {
  return (
    <RdxDropdownMenu.Trigger
      className={cn("outline-none", className)}
      asChild
    >
      {children}
    </RdxDropdownMenu.Trigger>
  );
}
