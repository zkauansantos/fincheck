import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Category } from "@/app/entities/Category";
import { SubCategory } from "@/app/entities/SubCategory";
import useSubcategories from "@/app/services/categories/hooks/useSubcategories";
import { subcategoriesService } from "@/app/services/subcategories";
import { useErrorHandler } from "@/app/hooks/useErrorHandler";

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

  const { isPending: isCreating, mutateAsync: createSubcategory } = useMutation({
    mutationFn: subcategoriesService.create,
  });

  const { mutateAsync: updateSubcategory } = useMutation({
    mutationFn: subcategoriesService.update,
  });

  const { isPending: isDeleting, mutateAsync: deleteSubcategory } = useMutation({
    mutationFn: subcategoriesService.delete,
  });

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
