import { EyeIcon } from "../../../../components/icons/EyeIcon";
import AccountCard from "./AccountCard";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import AccountsSliderNavigation from "./AccountsSliderNavigation";
import useAccountsController from "./useAccountsController";
import formatCurrency from "../../../../../app/utils/formatCurrency";
import cn from "../../../../../app/utils/cn";
import Spinner from "../../../../components/Spinner";
import { PlusIcon } from "@radix-ui/react-icons";

export default function Accounts() {
  const {
    sliderState,
    areValuesVisible,
    width,
    isLoading,
    currentBalance,
    accounts,
    setSliderState,
    openNewAccountModal,
    toggleValuesVisibility,
  } = useAccountsController();

  return (
    <div className='bg-teal-900 flex flex-col rounded-2xl h-full w-full md:p-10 px-4 py-8'>
      {isLoading && (
        <div className='w-full h-full flex items-center justify-center'>
          <Spinner classname='text-teal-950/50 fill-white w-10 h-10' />
        </div>
      )}

      {!isLoading && (
        <>
          <div>
            <span className='text-white tracking-[-0.5px] block'>
              Saldo total
            </span>

            <div className='flex items-center gap-2'>
              <strong
                className={cn(
                  "text-2xl tracking-[-1px] text-white",
                  !areValuesVisible && "blur-md"
                )}
              >
                {formatCurrency(currentBalance)}
              </strong>

              <button
                className='flex items-center justify-center w-8 h-8'
                onClick={toggleValuesVisibility}
              >
                <EyeIcon open={!areValuesVisible} />
              </button>
            </div>
          </div>

          <div className='flex-1 flex flex-col justify-end'>
            {accounts.length === 0 && (
              <>
                <div className='mb-4' slot='container-start'>
                  <strong className='tracking-[-1px] text-white text-lg'>
                    Minhas Contas
                  </strong>

                  <button
                    className='mt-4 h-52 rounded-2xl border-2 border-dashed border-teal-600 flex flex-col items-center justify-center gap-4 text-white w-full hover:bg-teal-950/10 transition-colors'
                    onClick={openNewAccountModal}
                  >
                    <div className='w-11 h-11 rounded-full border-2 border-dashed border-white flex flex-col items-center justify-center'>
                      <PlusIcon className='w-6 h-6' />
                    </div>
                    <span className='font-medium tracking-[-0.5px] block w-32 text-center'>
                      Cadastre uma nova conta
                    </span>
                  </button>
                </div>
              </>
            )}

            {accounts.length > 0 && (
              <div>
                <Swiper
                  spaceBetween={16}
                  slidesPerView={width >= 500 ? 2.1 : 1}
                  grabCursor
                  onSlideChange={(swiper) =>
                    setSliderState({
                      isBeginning: swiper.isBeginning,
                      isEnd: swiper.isEnd,
                    })
                  }
                >
                  <div
                    className='flex items-center w-full justify-between mb-4'
                    slot='container-start'
                  >
                    <strong className='tracking-[-1px] text-white text-lg'>
                      Minhas Contas
                    </strong>

                    <AccountsSliderNavigation
                      isBeginning={sliderState.isBeginning}
                      isEnd={sliderState.isEnd}
                    />
                  </div>

                  {accounts.map((account) => (
                    <SwiperSlide key={account.id}>
                      <AccountCard data={account} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
