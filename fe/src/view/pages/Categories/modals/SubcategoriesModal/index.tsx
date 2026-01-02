import { Category } from '@/app/entities/Category';
import Button from '@/view/components/Button';
import ConfirmDeleteModal from '@/view/components/ConfirmDeleteModal';
import { EmptyState } from '@/view/components/EmptyState';
import Input from '@/view/components/Input';
import Modal from '@/view/components/Modal';
import Spinner from '@/view/components/Spinner';
import { CheckCircle, Edit, Plus, Trash2, XCircle } from 'lucide-react';
import useSubcategoriesModalController from './useSubcategoriesModalController';

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
    hasSubcategories,
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
      <Modal title='Subcategorias' open={isOpen} onClose={onClose}>
        <div className='space-y-8'>
          <div className='flex w-full items-center gap-2'>
            <Input
              name='newSubcategory'
              type='text'
              placeholder='Nova subcategoria'
              value={newSubcategoryName}
              onChange={(e) => setNewSubcategoryName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleCreateSubcategory();
                }
              }}
            />

            <Button
              onClick={handleCreateSubcategory}
              disabled={!newSubcategoryName.trim()}
              isLoading={isCreating}
            >
              <Plus className='w-4 h-4' />
            </Button>
          </div>

          <div className='space-y-2 max-h-96  overflow-y-auto'>
            {!hasSubcategories && !isLoading && (
              <EmptyState message='Nenhuma subcategoria cadastrada.' />
            )}

            {isLoading && <Spinner classname='mx-auto' />}

            {hasSubcategories &&
              !isLoading &&
              subcategories.map((subcategory) => (
                <div
                  key={subcategory.id}
                  className='flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-100 rounded-lg'
                >
                  {isEditing && editingSubcategory?.id === subcategory.id ? (
                    <>
                      <Input
                        name='editSubcategory'
                        type='text'
                        placeholder='Nome da subcategoria'
                        value={editSubcategoryName}
                        onChange={(e) => setEditSubcategoryName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleUpdateSubcategory();
                          }
                          if (e.key === 'Escape') {
                            handleCancelEdit();
                          }
                        }}
                        className='flex-1'
                        autoFocus
                      />

                      <Button onClick={handleCancelEdit} variant='ghost'>
                        <XCircle className='size-4' />
                      </Button>
                      <Button
                        onClick={handleUpdateSubcategory}
                        disabled={!editSubcategoryName.trim()}
                      >
                        <CheckCircle className='size-4' />
                      </Button>
                    </>
                  ) : (
                    <>
                      <span className='flex-1 text-gray-700'>
                        {subcategory.name}
                      </span>
                      <button
                        onClick={() => handleStartEdit(subcategory)}
                        className='p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors'
                        title='Editar'
                      >
                        <Edit className='w-4 h-4 text-gray-600 dark:text-gray-400' />
                      </button>
                      <button
                        onClick={() => handleOpenDeleteModal(subcategory)}
                        className='p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors'
                        title='Excluir'
                      >
                        <Trash2 className='w-4 h-4 text-red-600 dark:text-red-400' />
                      </button>
                    </>
                  )}
                </div>
              ))}
          </div>
        </div>
      </Modal>

      <ConfirmDeleteModal
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        title='Tem certeza que deseja excluir esta subcategoria?'
        description='Esta ação não pode ser desfeita.'
        onClose={handleCloseDeleteModal}
        isOpen={isDeleteModalOpen}
      />
    </>
  );
}
