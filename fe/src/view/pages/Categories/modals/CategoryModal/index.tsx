import Button from "@/view/components/Button";
import Input from "@/view/components/Input";
import Modal from "@/view/components/Modal";
import { Category } from "@/app/entities/Category";
import { TransactionType } from "@/app/entities/Transaction";
import useCategoryModalController from "./useCategoryModalController";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: Category | null;
  type: TransactionType;
}

export default function CategoryModal({
  isOpen,
  onClose,
  category,
  type,
}: CategoryModalProps) {
  const {
    register,
    errors,
    isLoading,
    handleSubmit,
  } = useCategoryModalController({ category, type, onClose });

  const isEditing = !!category;

  return (
    <Modal
      title={isEditing ? "Editar Categoria" : "Nova Categoria"}
      open={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Nome da categoria"
            error={errors.name?.message}
            {...register("name")}
          />
        </div>

        <div>
          <Input
            type="text"
            placeholder="Ícone (ex: food, transport, salary)"
            error={errors.icon?.message}
            {...register("icon")}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Ícones disponíveis: food, transport, home, health, education, fun, travel, clothing, expense, income, other
          </p>
        </div>

        <div className="flex gap-2 pt-4">
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
          >
            {isEditing ? "Salvar" : "Criar"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
