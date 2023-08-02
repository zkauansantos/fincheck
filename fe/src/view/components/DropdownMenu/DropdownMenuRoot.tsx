import * as RdxDropdownMenu from "@radix-ui/react-dropdown-menu";

interface DropdownMenuRootProps {
  children: React.ReactNode;
}

export default function DropdownMenuRoot({ children }: DropdownMenuRootProps) {
  return <RdxDropdownMenu.Root>{children}</RdxDropdownMenu.Root>;
}
