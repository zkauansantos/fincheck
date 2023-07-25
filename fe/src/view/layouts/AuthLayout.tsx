import { Outlet } from "react-router-dom";

import illustration from "../../assets/illustration.png";
import Logo from "../components/Logo";

export default function AuthLayout() {
  return (
    <div className='flex w-full items-center h-full'>
      <div className=' lg:w-1/2 w-full h-full flex flex-col items-center justify-center'>
        <Logo className='text-gray-500 h-6' />

        <div className='mt-16 w-full max-w-[504px] px-8'>
          <Outlet />
        </div>
      </div>

      <div className=' w-1/2 h-full lg:flex items-center justify-center p-8 relative hidden'>
        <img
          src={illustration}
          alt='illustration'
          className=' object-cover h-full w-full max-w-[656px] max-h-[960px] select-none rounded-[32px]'
        />

        <div className='max-w-[656px] bottom-8 w-full bg-white p-10 absolute rounded-b-[32px] text-red-500'>
          <Logo className='text-teal-900 h-8' />

          <p className='text-gray-700 font-medium text-xl mt-6'>
            Gerencie suas finanças pessoais de uma forma simples com o fincheck,
            e o melhor, totalmente de graça!
          </p>
        </div>
      </div>
    </div>
  );
}
