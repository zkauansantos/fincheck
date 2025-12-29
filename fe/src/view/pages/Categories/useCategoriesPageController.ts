import { Category } from "@/app/entities/Category";
import { TransactionType } from "@/app/entities/Transaction";
import { useErrorHandler } from "@/app/hooks/useErrorHandler";
import useCategories from "@/app/services/categories/hooks/useCategories";
import { useDeleteCategoryMutation } from "@/app/services/categories/hooks/useDeleteCategoryMutation";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function useCategoriesPageController() {
  const [selectedType, setSelectedType] = useState<TransactionType>(TransactionType.EXPENSE);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [categoryBeingEdited, setCategoryBeingEdited] = useState<Category | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { categories: categories, isFetching } = useCategories({
    type: selectedType,
  });

  const queryClient = useQueryClient();
  const { handleError } = useErrorHandler();

  const { deleteCategory, isDeleting } = useDeleteCategoryMutation()

  function handleOpenCreateCategory() {
    setIsCreatingCategory(true);
    setCategoryBeingEdited(null);
  }

  function handleOpenEditCategory(category: Category) {
    setIsEditingCategory(true);
    setCategoryBeingEdited(category);
  }

  function handleCloseCategory() {
    setIsCreatingCategory(false);
    setIsEditingCategory(false);
    setCategoryBeingEdited(null);
  }

  function handleOpenSubcategories(category: Category) {
    setSelectedCategory(category);
  }

  function handleCloseSubcategories() {
    setSelectedCategory(null);
  }

  function handleOpenDeleteModal(category: Category) {
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setCategoryToDelete(null);
    setIsDeleteModalOpen(false);
  }

  async function handleDeleteCategory() {
    if (!categoryToDelete) return;

    try {
      await deleteCategory(categoryToDelete.id);
      toast.success("Categoria excluída com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      handleCloseDeleteModal();
    } catch (error) {
      handleError(error);
    }
  }

  const hasCategories = categories.length > 0;

  return {
    categories,
    isLoading: isFetching,
    selectedType,
    setSelectedType,
    isCreatingCategory,
    isEditingCategory,
    categoryBeingEdited,
    handleOpenCreateCategory,
    handleOpenEditCategory,
    handleCloseCategory,
    handleOpenSubcategories,
    handleCloseSubcategories,
    selectedCategory,
    handleDeleteCategory,
    isDeleting,
    isDeleteModalOpen,
    hasCategories,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
  };
}
