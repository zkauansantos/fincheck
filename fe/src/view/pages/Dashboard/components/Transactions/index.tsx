import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { MONTHS } from "../../../../../app/config/constants";
import SliderOption from "./SliderOption";
import SliderNavigation from "./SliderNavigation";
import formatCurrency from "../../../../../app/utils/formatCurrency";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import useTransactionsController from "./useTransactionsController";
import cn from "../../../../../app/utils/cn";
import Spinner from "../../../../components/Spinner";

import emptyStateImage from "../../../../../assets/empty-state.svg";
import TransactionTypeDropdown from "./TransactionTypeDropdown";
import FiltersModal from "./FiltersModal";
import formatDate from "../../../../../app/utils/formatDate";
import EditTransactionModal from "../../modals/EditTransactionModal";

export default function Transactions() {
  const {
    areValuesVisible,
    isLoading,
    isInitialLoading,
    transactions,
    isFiltersModalOpen,
    filters,
    setSliderState,
    handleChangeFilters,
    handleApplyFilters,
    handleCloseFiltersModal,
    handleOpenFiltersModal,
    handleCloseEditModal,
    handleOpenEditModal,
    isEditModalOpen,
    transactionBeingEdited,
  } = useTransactionsController();

  const hasTransactions = transactions.length > 0;

  return (
    <div className='bg-gray-100 rounded-2xl h-full w-full md:p-10 px-4 py-8 flex flex-col'>
      {isInitialLoading && (
        <div className='w-full h-full flex items-center justify-center'>
          <Spinner />
        </div>
      )}

      {!isInitialLoading && (
        <>
          <FiltersModal
            onApplyFilters={handleApplyFilters}
            open={isFiltersModalOpen}
            onClose={handleCloseFiltersModal}
          />

          <header>
            <div className='flex items-center justify-between'>
              <TransactionTypeDropdown
                onSelect={handleChangeFilters("type")}
                selectedType={filters.type}
              />

              <button onClick={handleOpenFiltersModal}>
                <FilterIcon />
              </button>
            </div>

            <div className='mt-6 relative'>
              <Swiper
                initialSlide={filters.month}
                slidesPerView={3}
                centeredSlides
                grabCursor
                onSlideChange={(swiper) => {
                  handleChangeFilters("month")(swiper.realIndex);
                  setSliderState({
                    isBeginning: swiper.isBeginning,
                    isEnd: swiper.isEnd,
                  });
                }}
              >
                <SliderNavigation />
                {MONTHS.map((month, index) => (
                  <SwiperSlide key={month}>
                    {({ isActive }) => (
                      <SliderOption
                        isActive={isActive}
                        month={month}
                        index={index}
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </header>

          <div className='mt-4 space-y-2 flex-1 overflow-y-auto'>
            {isLoading && (
              <div className='flex flex-col h-full items-center justify-center gap-4'>
                <Spinner />
              </div>
            )}

            {!hasTransactions && !isLoading && (
              <div className='flex flex-col h-full items-center justify-center gap-4'>
                <img src={emptyStateImage} alt='empty-state' />
                <p className='text-gray-700'>
                  Não encontramos nenhuma transação
                </p>
              </div>
            )}

            {hasTransactions && !isLoading && (
              <>
                {transactionBeingEdited && (
                  <EditTransactionModal
                    open={isEditModalOpen}
                    onClose={handleCloseEditModal}
                    transaction={transactionBeingEdited}
                  />
                )}

                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className='bg-white p-4 rounded-2xl flex items-center justify-between gap-4'
                    role='button'
                    onClick={() => handleOpenEditModal(transaction)}
                  >
                    <div className='flex-1 flex items-center gap-3'>
                      <CategoryIcon
                        type={
                          transaction.type === "EXPENSE" ? "expense" : "income"
                        }
                        category={transaction.category?.icon}
                      />

                      <div>
                        <strong className='tracking-[-0.5px] block font-bold'>
                          {transaction.name}
                        </strong>
                        <span className='text-sm text-gray-600'>
                          {formatDate(new Date(transaction.date))}
                        </span>
                      </div>
                    </div>
                    <span
                      className={cn(
                        " tracking-[-0.5px] font-medium",
                        transaction.type === "EXPENSE"
                          ? "text-red-800"
                          : "text-green-800",
                        !areValuesVisible && "blur-sm"
                      )}
                    >
                      {transaction.type === "EXPENSE" ? "-" : "+"}R${" "}
                      {formatCurrency(transaction.value)}
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
