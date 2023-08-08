import { Controller } from "react-hook-form";
import Button from "../../../../components/Button";
import DatePickerInput from "../../../../components/DatePickerInput";
import Input from "../../../../components/Input";
import InputCurrency from "../../../../components/InputCurrency";
import Modal from "../../../../components/Modal";
import Select from "../../../../components/Select";
import useEditTransactionModalController from "./useEditTransactionModalController";
import { Transaction } from "../../../../../app/entities/Transaction";
import ConfirmDeleteModal from "../../../../components/ConfirmDeleteModal";
import TrashIcon from "../../../../components/icons/TrashIcon";

interface EditTransactionModalProps {
  transaction: Transaction | null;
  open: boolean;
  onClose: () => void;
}

export default function EditTransactionModal({
  transaction,
  open,
  onClose,
}: EditTransactionModalProps) {
  const {
    control,
    errors,
    isLoading,
    categories,
    handleSubmit,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
    handleDeleteTransaction,
    isDeleteModalOpen,
    isLoadingDelete,
    accounts,
    register,
  } = useEditTransactionModalController(transaction, onClose);

  const isExpense = transaction?.type === "EXPENSE";

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        isLoading={isLoadingDelete}
        title={`Tem certeza que deseja excluir essa ${
          isExpense ? "despesa" : "receita"
        }?`}
        onConfirm={handleDeleteTransaction}
        onClose={handleCloseDeleteModal}
      />
    );
  }

  return (
    <Modal
      title={isExpense ? "Editar Despesa" : "Editar Receita"}
      open={open}
      onClose={onClose}
      rightAction={
        <button onClick={handleOpenDeleteModal}>
          <TrashIcon className='w-6 h-6 text-red-900' />
        </button>
      }
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
          Salvar
        </Button>
      </form>
    </Modal>
  );
}
