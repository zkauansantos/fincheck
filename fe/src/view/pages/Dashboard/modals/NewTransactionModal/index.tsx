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
  } = useNewTransactionModalController();

  const isExpense = newTransactionType === "EXPENSE";
  
  return (
    <Modal
      title={isExpense ? "Nova Despesa" : "Nova Receita"}
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
    >
      <form>
        <div>
          <span className='text-gray-800 text-xs tracking-[0.5px]'>
            Valor {isExpense ? "da despesa" : "da receita"}
          </span>
          <div className='flex items-center gap-2'>
            <span className='text-gray-800 text-lg tracking-[0.5px]'>R$</span>
            <InputCurrency />
          </div>
        </div>

        <div className='mt-10 flex flex-col gap-4'>
          <Input
            type='text'
            name='name'
            placeholder={isExpense ? "Nome da Despesa" : "Nome da Receita"}
          />

          <Select
            options={[
              { value: "INVESTMENT", label: "Investimentos" },
              { value: "CHECKING", label: "Conta Corrente" },
              { value: "CASH", label: "Dinheiro Físico" },
            ]}
            placeholder='Categoria'
          />
          <Select
            options={[
              { value: "INVESTMENT", label: "Investimentos" },
              { value: "CHECKING", label: "Conta Corrente" },
              { value: "CASH", label: "Dinheiro Físico" },
            ]}
            placeholder={isExpense ? "Pagar com" : "Receber com"}
          />

          <DatePickerInput />
        </div>

        <Button type='submit' className='w-full mt-6'>
          Criar
        </Button>
      </form>
    </Modal>
  );
}
