import { Plus, Edit, Trash2 } from "lucide-react";
import Button from "@/view/components/Button";
import Input from "@/view/components/Input";
import Modal from "@/view/components/Modal";
import { Category } from "@/app/entities/Category";
import useSubcategoriesModalController from "./useSubcategoriesModalController";
import ConfirmDeleteModal from "@/view/components/ConfirmDeleteModal";

interface SubcategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: Category;
}

export default function SubcategoriesModal({
  isOpen,
  onClose,
  category,
}: SubcategoriesModalProps) {
  const {
    subcategories,
    isLoading,
    isCreating,
    isEditing,
    editingSubcategory,
    newSubcategoryName,
    setNewSubcategoryName,
    editSubcategoryName,
    setEditSubcategoryName,
    handleCreateSubcategory,
    handleStartEdit,
    handleUpdateSubcategory,
    handleCancelEdit,
    isDeleting,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleConfirmDelete,
  } = useSubcategoriesModalController({ category, isOpen });

  return (
    <>
      <Modal
        title={`Subcategorias - ${category.name}`}
        open={isOpen}
        onClose={onClose}
      >
        <div className="space-y-4">
          {/* Add new subcategory */}
          <div className="flex gap-2">
            <Input
              name="newSubcategory"
              type="text"
              placeholder="Nova subcategoria"
              value={newSubcategoryName}
              onChange={(e) => setNewSubcategoryName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleCreateSubcategory();
                }
              }}
            />
            <Button
              onClick={handleCreateSubcategory}
              disabled={!newSubcategoryName.trim() || isCreating}
              isLoading={isCreating}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/* Subcategories list */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-600" />
              </div>
            ) : subcategories.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                Nenhuma subcategoria cadastrada
              </p>
            ) : (
              subcategories.map((subcategory) => (
                <div
                  key={subcategory.id}
                  className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  {isEditing && editingSubcategory?.id === subcategory.id ? (
                    <>
                      <Input
                        name="editSubcategory"
                        type="text"
                        placeholder="Nome da subcategoria"
                        value={editSubcategoryName}
                        onChange={(e) => setEditSubcategoryName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleUpdateSubcategory();
                          }
                          if (e.key === "Escape") {
                            handleCancelEdit();
                          }
                        }}
                        className="flex-1"
                        autoFocus
                      />
                      <Button
                        onClick={handleUpdateSubcategory}
                        disabled={!editSubcategoryName.trim()}
                      >
                        Salvar
                      </Button>
                      <Button
                        onClick={handleCancelEdit}
                        variant="ghost"
                      >
                        Cancelar
                      </Button>
                    </>
                  ) : (
                    <>
                      <span className="flex-1 text-gray-900 dark:text-gray-100">
                        {subcategory.name}
                      </span>
                      <button
                        onClick={() => handleStartEdit(subcategory)}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </button>
                      <button
                        onClick={() => handleOpenDeleteModal(subcategory)}
                        className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                        title="Excluir"
                      >
                        <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                      </button>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </Modal>

      <ConfirmDeleteModal
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        title="Tem certeza que deseja excluir esta subcategoria?"
        description="Esta ação não pode ser desfeita."
        onClose={handleCloseDeleteModal}
        isOpen={isDeleteModalOpen}
      />
    </>
  );
}
