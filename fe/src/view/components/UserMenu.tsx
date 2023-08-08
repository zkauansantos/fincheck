import { ExitIcon } from "@radix-ui/react-icons";

import { DropdownMenu } from "./DropdownMenu";

import useAuth from "../../app/hooks/useAuth";

export default function UserMenu() {
  const { signout, user } = useAuth();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className='bg-teal-50 border border-teal-200 h-12 w-12 rounded-full flex items-center justify-center'>
          <span className='text-teal-900 font-medium tracking-[-0.5px] text-sm'>
            {user?.name.slice(0, 2).toUpperCase()}
          </span>
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className='w-32 mr-4'>
        <DropdownMenu.Item className='justify-between gap-2' onSelect={signout}>
          <span>Sair</span>
          <ExitIcon className='w-4 h-4' />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
