import { Category } from "@/app/entities/Category";
import { SubCategory } from "@/app/entities/SubCategory";
import { useErrorHandler } from "@/app/hooks/useErrorHandler";
import useSubcategories from "@/app/services/categories/hooks/useSubcategories";
import { useCreateSubcategoryMutation } from "@/app/services/subcategories/hooks/useCreateSubcategoryMutation";
import { useDeleteSubcategoryMutation } from "@/app/services/subcategories/hooks/useDeleteSubcategoryMutation";
import { useUpdateSubcategoryMutation } from "@/app/services/subcategories/hooks/useUpdateSubcategoryMutation";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface UseSubcategoriesModalControllerParams {
  category: Category;
  isOpen: boolean;
}

export default function useSubcategoriesModalController({
  category,
  isOpen,
}: UseSubcategoriesModalControllerParams) {
  const [newSubcategoryName, setNewSubcategoryName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingSubcategory, setEditingSubcategory] = useState<SubCategory | null>(null);
  const [editSubcategoryName, setEditSubcategoryName] = useState("");
  const [subcategoryToDelete, setSubcategoryToDelete] = useState<SubCategory | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { subCategories, isFetching } = useSubcategories({
    categoryId: category.id,
  });

  const queryClient = useQueryClient();
  const { handleError } = useErrorHandler();

  const { createSubcategory, isCreating } = useCreateSubcategoryMutation()
  const { updateSubcategory, isUpdating } = useUpdateSubcategoryMutation();
  const { deleteSubcategory, isDeleting } = useDeleteSubcategoryMutation()


  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setNewSubcategoryName("");
      setIsEditing(false);
      setEditingSubcategory(null);
      setEditSubcategoryName("");
    }
  }, [isOpen]);

  async function handleCreateSubcategory() {
    if (!newSubcategoryName.trim()) return;

    try {
      await createSubcategory({
        categoryId: category.id,
        name: newSubcategoryName.trim(),
      });

      toast.success("Subcategoria criada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["subcategories", category.id] });
      setNewSubcategoryName("");
    } catch (error) {
      handleError(error);
    }
  }

  function handleStartEdit(subcategory: SubCategory) {
    setIsEditing(true);
    setEditingSubcategory(subcategory);
    setEditSubcategoryName(subcategory.name);
  }

  async function handleUpdateSubcategory() {
    if (!editingSubcategory || !editSubcategoryName.trim()) return;

    try {
      await updateSubcategory({
        categoryId: category.id,
        subcategoryId: editingSubcategory.id,
        name: editSubcategoryName.trim(),
      });

      toast.success("Subcategoria atualizada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["subcategories", category.id] });
      handleCancelEdit();
    } catch (error) {
      handleError(error);
    }
  }

  function handleCancelEdit() {
    setIsEditing(false);
    setEditingSubcategory(null);
    setEditSubcategoryName("");
  }

  function handleOpenDeleteModal(subcategory: SubCategory) {
    setSubcategoryToDelete(subcategory);
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setSubcategoryToDelete(null);
    setIsDeleteModalOpen(false);
  }

  async function handleConfirmDelete() {
    if (!subcategoryToDelete) return;

    try {
      await deleteSubcategory({
        categoryId: category.id,
        subcategoryId: subcategoryToDelete.id,
      });

      toast.success("Subcategoria excluída com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["subcategories", category.id] });
      handleCloseDeleteModal();
    } catch (error) {
      handleError(error);
    }
  }

  return {
    subcategories: subCategories,
    isLoading: isFetching,
    isCreating,
    isUpdating,
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
    handleDeleteSubcategory: handleConfirmDelete,
    isDeleting,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleConfirmDelete,
  };
}
