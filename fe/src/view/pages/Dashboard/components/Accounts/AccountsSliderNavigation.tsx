import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useSwiper } from "swiper/react";

interface AccountsSliderNavigationProps {
  isBeginning: boolean;
  isEnd: boolean;
}

export default function AccountsSliderNavigation({
  isBeginning,
  isEnd,
}: AccountsSliderNavigationProps) {
  const swiper = useSwiper();

  return (
    <div className='flex items-center'>
      <button
        className='py-3 pl-2.5 pr-3.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40'
        onClick={() => swiper.slidePrev()}
        disabled={isBeginning}
      >
        <ChevronLeftIcon className='text-white h-6 w-6' />
      </button>
      <button
        className='py-3 pl-2.5 pr-3.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40'
        onClick={() => swiper.slideNext()}
        disabled={isEnd}
      >
        <ChevronRightIcon className='text-white h-6 w-6' />
      </button>
    </div>
  );
}
