import { TransactionType } from '@/app/entities/Transaction';
import Button from '@/view/components/Button';
import ConfirmDeleteModal from '@/view/components/ConfirmDeleteModal';
import { EmptyState } from '@/view/components/EmptyState';
import { Header } from '@/view/components/Header';
import Spinner from '@/view/components/Spinner';
import { Plus } from 'lucide-react';
import CategoryCard from './components/CategoryCard';
import CategoryModal from './modals/CategoryModal';
import SubcategoriesModal from './modals/SubcategoriesModal';
import useCategoriesPageController from './useCategoriesPageController';

export default function Categories() {
  const {
    categories,
    isLoading,
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
    hasCategories,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
  } = useCategoriesPageController();

  return (
    <div className='h-full w-full p-4 md:pt-6 md:px-8 md:pb-8 flex flex-col gap-4'>
      <Header />

      {/* Page Header */}
      <header className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900 dark:text-gray-700'>
            Gerenciar Categorias
          </h1>
          <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
            Organize suas categorias de receitas e despesas
          </p>
        </div>

        <Button onClick={handleOpenCreateCategory}>
          <Plus className='w-4 h-4' />
          Nova Categoria
        </Button>
      </header>

      {/* Type Filter */}
      <div className='flex gap-2 justify-end'>
        <button
          onClick={() => setSelectedType(TransactionType.INCOME)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors border ${
            selectedType === TransactionType.INCOME
              ? 'bg-teal-600 text-white border-teal-600'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'
          }`}
        >
          Receitas
        </button>
        <button
          onClick={() => setSelectedType(TransactionType.EXPENSE)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors border ${
            selectedType === TransactionType.EXPENSE
              ? 'bg-red-600 text-white border-red-600'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'
          }`}
        >
          Despesas
        </button>
      </div>

      {/* Categories List */}
      <main className='flex-1 overflow-y-auto'>
        {!hasCategories && !isLoading && (
          <EmptyState message='Não encontramos nenhuma categoria' />
        )}

        {hasCategories && !isLoading && (
          <div className='flex flex-col gap-4'>
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onEdit={handleOpenEditCategory}
                onDelete={handleOpenDeleteModal}
                onManageSubcategories={handleOpenSubcategories}
              />
            ))}
          </div>
        )}

        {isLoading && <Spinner classname='mx-auto' />}
      </main>

      {/* Modals */}
      {(isCreatingCategory || isEditingCategory) && (
        <CategoryModal
          isOpen={isCreatingCategory || isEditingCategory}
          onClose={handleCloseCategory}
          category={categoryBeingEdited}
          type={selectedType}
        />
      )}

      {selectedCategory && (
        <SubcategoriesModal
          isOpen={!!selectedCategory}
          onClose={handleCloseSubcategories}
          category={selectedCategory}
        />
      )}

      <ConfirmDeleteModal
        isLoading={isDeleting}
        onConfirm={handleDeleteCategory}
        title='Tem certeza que deseja excluir esta categoria?'
        description='Ao excluir a categoria, todas as subcategorias também serão excluídas. Esta ação não pode ser desfeita.'
        onClose={handleCloseDeleteModal}
        isOpen={isDeleteModalOpen}
      />
    </div>
  );
}
