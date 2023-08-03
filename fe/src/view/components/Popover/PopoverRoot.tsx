import * as RdxPopover from "@radix-ui/react-popover";

interface PopoverRootProps {
  children: React.ReactNode;
}

export default function PopoverRoot({ children }: PopoverRootProps) {
  return <RdxPopover.Root>{children}</RdxPopover.Root>;
}
