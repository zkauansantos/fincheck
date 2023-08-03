import * as RdxDialog from "@radix-ui/react-dialog";
import cn from "../../app/utils/cn";
import { Cross2Icon } from "@radix-ui/react-icons";

interface ModalProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  rightAction?: React.ReactNode;
  onClose?: () => void;
}

export default function Modal({
  children,
  open,
  title,
  rightAction,
  onClose,
}: ModalProps) {
  return (
    <RdxDialog.Root open={open} onOpenChange={onClose}>
      <RdxDialog.Portal>
        <RdxDialog.Overlay
          className={cn(
            "fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-black/70 backdrop-blur-sm z-50",
            "data-[state=open]:animate-overlay-show"
          )}
        >
          <RdxDialog.Content
            className={cn(
              "outline-none w-full max-w-[400px]",
              "p-6 space-y-10 bg-white rounded-2xl z-[51]",
              "data-[state=open]:animate-content-show",
              "shadow-[0px_11px_20px_0px_rgba(0,0,0,0.2)]"
            )}
          >
            <header className='h-12 flex items-center justify-between text-gray-800'>
              <button
                className='h-12 w-12 flex items-center justify-center outline-none'
                onClick={onClose}
              >
                <Cross2Icon className='w-6 h-6' />
              </button>

              <span className='text-lg font-bold tracking-[-1px]'>{title}</span>

              <div className='h-12 w-12 flex items-center justify-center'>
                {rightAction}
              </div>
            </header>

            <div>{children}</div>
          </RdxDialog.Content>
        </RdxDialog.Overlay>
      </RdxDialog.Portal>
    </RdxDialog.Root>
  );
}
