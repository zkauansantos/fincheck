import * as RdxPopover from "@radix-ui/react-popover";
import cn from "../../../app/utils/cn";

interface PopoverTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export default function PopoverTrigger({
  children,
  className,
}: PopoverTriggerProps) {
  return (
    <RdxPopover.Trigger asChild className={cn(className)}>
      {children}
    </RdxPopover.Trigger>
  );
}
