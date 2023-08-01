import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useSwiper } from "swiper/react";

export default function SliderNavigation() {
  const swiper = useSwiper();

  return (
    <>
      <button
        className='absolute left-0 top-1/2 -translate-y-1/2  bg-gradient-to-r from-gray-100 to-transparent z-10 w-12 h-12 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed'
        onClick={() => swiper.slidePrev()}
        disabled={swiper.isBeginning}
      >
        <ChevronLeftIcon className='w-6 h-6 text-gray-800' />
      </button>
      <button
        className='absolute right-0 top-1/2 -translate-y-1/2  bg-gradient-to-l from-gray-100 to-transparent z-10 w-12 h-12 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed'
        disabled={swiper.isEnd}
        onClick={() => swiper.slideNext()}
      >
        <ChevronRightIcon className='w-6 h-6  text-gray-800' />
      </button>
    </>
  );
}
