import { Controller } from "react-hook-form";
import Button from "../../../../components/Button";
import DatePickerInput from "../../../../components/DatePickerInput";
import Input from "../../../../components/Input";
import InputCurrency from "../../../../components/InputCurrency";
import Modal from "../../../../components/Modal";
import Select from "../../../../components/Select";
import useNewTransactionModalController from "./useNewTransactionModalController";

export default function NewTransactionModal() {
  const {
    closeNewTransactionModal,
    isNewTransactionModalOpen,
    newTransactionType,
    control,
    errors,
    isLoading,
    categories,
    handleSubmit,
    accounts,
    register,
  } = useNewTransactionModalController();

  const isExpense = newTransactionType === "EXPENSE";

  return (
    <Modal
      title={isExpense ? "Nova Despesa" : "Nova Receita"}
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className='text-gray-800 text-xs tracking-[0.5px]'>
            Valor {isExpense ? "da despesa" : "da receita"}
          </span>
          <div className='flex items-center gap-2'>
            <span className='text-gray-800 text-lg tracking-[0.5px]'>R$</span>

            <Controller
              control={control}
              name='value'
              defaultValue='0'
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  error={errors.value?.message}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
        </div>

        <div className='mt-10 flex flex-col gap-4'>
          <Input
            type='text'
            placeholder={isExpense ? "Nome da Despesa" : "Nome da Receita"}
            {...register("name")}
            error={errors.name?.message}
          />

          <Controller
            control={control}
            name='categoryId'
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <Select
                error={errors.categoryId?.message}
                onChange={onChange}
                value={value}
                options={categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
                placeholder='Categoria'
              />
            )}
          />

          <Controller
            control={control}
            name='bankAccountId'
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <Select
                error={errors.bankAccountId?.message}
                onChange={onChange}
                value={value}
                options={accounts.map((account) => ({
                  value: account.id,
                  label: account.name,
                }))}
                placeholder={isExpense ? "Pagar com" : "Receber com"}
              />
            )}
          />

          <Controller
            control={control}
            name='date'
            defaultValue={new Date()}
            render={({ field: { value, onChange } }) => (
              <DatePickerInput onChange={onChange} value={value} />
            )}
          />
        </div>

        <Button isLoading={isLoading} type='submit' className='w-full mt-6'>
          Criar
        </Button>
      </form>
    </Modal>
  );
}
