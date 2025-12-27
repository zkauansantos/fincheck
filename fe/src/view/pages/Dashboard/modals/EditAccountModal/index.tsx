import { Controller } from "react-hook-form";
import Button from "@/view/components/Button";
import ColorsDropdownInput from "@/view/components/ColorsDropdownInput";
import Input from "@/view/components/Input";
import InputCurrency from "@/view/components/InputCurrency";
import Modal from "@/view/components/Modal";
import Select from "@/view/components/Select";
import useEditAccountModalController from "./useEditAccountModalController";
import ConfirmDeleteModal from "@/view/components/ConfirmDeleteModal";
import TrashIcon from "@/view/components/icons/TrashIcon";

export default function EditAccountModal() {
  const {
    closeEditAccountModal,
    errors,
    control,
    isLoading,
    isEditAccountModalOpen,
    isDeleteModalOpen,
    isLoadingDelete,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleSubmit,
    handleDeleteAccount,
    register,
  } = useEditAccountModalController();

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        isLoading={isLoadingDelete}
        title='Tem certeza que deseja excluir essa conta?'
        onConfirm={handleDeleteAccount}
        onClose={handleCloseDeleteModal}
        description='Ao excluir a conta, também serão excluídos todos os registros de
        receita e despesas relacionados.'
      />
    );
  }

  return (
    <Modal
      title='Editar Conta'
      open={isEditAccountModalOpen}
      onClose={closeEditAccountModal}
      rightAction={
        <button onClick={handleOpenDeleteModal}>
          <TrashIcon className='w-6 h-6 text-red-900' />
        </button>
      }
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className='text-gray-800 text-xs tracking-[0.5px]'>
            Saldo inicial
          </span>

          <div className='flex items-center gap-2'>
            <span className='text-gray-800 text-lg tracking-[0.5px]'>R$</span>

            <Controller
              control={control}
              name='initialBalance'
              defaultValue={0}
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  error={errors.initialBalance?.message}
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
            placeholder='Nome da Conta'
            error={errors.name?.message}
            {...register("name")}
          />

          <Controller
            control={control}
            name='type'
            defaultValue='CHECKING'
            render={({ field: { onChange, value } }) => (
              <Select
                onChange={onChange}
                value={value}
                error={errors.type?.message}
                options={[
                  { value: "INVESTMENT", label: "Investimentos" },
                  { value: "CHECKING", label: "Conta Corrente" },
                  { value: "CASH", label: "Dinheiro Físico" },
                ]}
                placeholder='Tipo'
              />
            )}
          />

          <Controller
            control={control}
            name='color'
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <ColorsDropdownInput
                onChange={onChange}
                value={value}
                error={errors.color?.message}
              />
            )}
          />
        </div>

        <Button type='submit' className='w-full mt-6' isLoading={isLoading}>
          Salvar
        </Button>
      </form>
    </Modal>
  );
}
