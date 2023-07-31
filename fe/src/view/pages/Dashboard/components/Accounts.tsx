import { EyeIcon } from "../../../components/icons/EyeIcon";
import AccountCard from "./AccountCard";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import AccountsSliderNavigation from "./AccountsSliderNavigation";

export default function Accounts() {
  return (
    <div className='bg-teal-900 flex flex-col rounded-2xl h-full w-full md:p-10 px-4 py-8'>
      <div>
        <span className='text-white tracking-[-0.5px] block'>Saldo total</span>

        <div className='flex items-center gap-2'>
          <strong className='text-2xl tracking-[-1px] text-white'>
            R$ 1000,00
          </strong>

          <button className='flex items-center justify-center w-8 h-8'>
            <EyeIcon open />
          </button>
        </div>
      </div>

      <div className='flex-1 flex flex-col justify-end'>
        <div>
          <Swiper 
            spaceBetween={16}
            slidesPerView={2.1}
            grabCursor
          >
            <div
              className='flex items-center w-full justify-between mb-4'
              slot='container-start'
            >
              <strong className='tracking-[-1px] text-white text-lg'>
                Minhas Contas
              </strong>

              <AccountsSliderNavigation />
            </div>

            <SwiperSlide>
              <AccountCard
                color='#7950F2'
                name='Nubank'
                type='CHECKING'
                balance={100.23}
              />
            </SwiperSlide>

            <SwiperSlide>
              <AccountCard
                color='#333'
                name='XP Investimentos'
                type='INVESTMENT'
                balance={100.23}
              />
            </SwiperSlide>

            <SwiperSlide>
              <AccountCard
                color='#0F0'
                name='Carteira'
                type='CASH'
                balance={100.23}
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
