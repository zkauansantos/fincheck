import Button from "../../../../components/Button";
import ColorsDropdownInput from "../../../../components/ColorsDropdownInput";
import Input from "../../../../components/Input";
import InputCurrency from "../../../../components/InputCurrency";
import Modal from "../../../../components/Modal";
import Select from "../../../../components/Select";
import useNewAccountModalController from "./useNewAccountModalController";

export default function NewAccountModal() {
  const { closeNewAccountModal, isNewAccountModalOpen } =
    useNewAccountModalController();

  return (
    <Modal
      title='Nova Conta'
      open={isNewAccountModalOpen}
      onClose={closeNewAccountModal}
    >
      <form>
        <div>
          <span className='text-gray-800 text-xs tracking-[0.5px]'>Saldo</span>
          <div className='flex items-center gap-2'>
            <span className='text-gray-800 text-lg tracking-[0.5px]'>R$</span>
            <InputCurrency />
          </div>
        </div>

        <div className='mt-10 flex flex-col gap-4'>
          <Input type='text' name='name' placeholder='Nome da Conta' />

          <Select
            options={[
              { value: "INVESTMENT", label: "Investimentos" },
              { value: "CHECKING", label: "Conta Corrente" },
              { value: "CASH", label: "Dinheiro Físico" },
            ]}
            placeholder='Tipo'
          />

          <ColorsDropdownInput />
        </div>

        <Button type='submit' className='w-full mt-6'>
          Criar
        </Button>
      </form>
    </Modal>
  );
}
