import * as RdxPopover from "@radix-ui/react-popover";
import cn from "../../../app/utils/cn";

interface PopoverRootProps {
  children: React.ReactNode;
}

function PopoverRoot({ children }: PopoverRootProps) {
  return <RdxPopover.Root>{children}</RdxPopover.Root>;
}

interface PopoverTriggerProps {
  children: React.ReactNode;
  className?: string;
}

function PopoverTrigger({ children, className }: PopoverTriggerProps) {
  return (
    <RdxPopover.Trigger asChild className={cn(className)}>
      {children}
    </RdxPopover.Trigger>
  );
}

interface PopoverContentProps {
  children: React.ReactNode;
  className?: string;
}

function PopoverContent({ children, className }: PopoverContentProps) {
  return (
    <RdxPopover.Portal>
      <RdxPopover.Content
        className={cn(
          "rounded-2xl p-4 bg-white space-y-2",
          "shadow-[0px_11px_20px_0px_rgba(0,0,0,0.2)] z-[99]",
          "data-[side=bottom]:animate-slide-up-and-fade",
          "data-[side=top]:animate-slide-down-and-fade",
          className
        )}
      >
        {children}
      </RdxPopover.Content>
    </RdxPopover.Portal>
  );
}

export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent,
};
