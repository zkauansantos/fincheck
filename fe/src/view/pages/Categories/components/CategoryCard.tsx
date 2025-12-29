import { Category } from '@/app/entities/Category';
import { TransactionType } from '@/app/entities/Transaction';
import { Card } from '@/view/components/Card';
import { CategoryIcon } from '@/view/components/icons/categories/CategoryIcon';
import { Edit, FolderOpen, Trash2 } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onManageSubcategories: (category: Category) => void;
}

export default function CategoryCard({
  category,
  onEdit,
  onDelete,
  onManageSubcategories,
}: CategoryCardProps) {
  return (
    <Card className='p-4 hover:shadow-md transition-shadow bg-white dark:bg-gray-100'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3 flex-1'>
          <CategoryIcon
            type={
              category.type === TransactionType.INCOME ? 'income' : 'expense'
            }
            category={category.icon}
          />

          <div className='flex-1'>
            <h3 className='font-medium text-gray-800 dark:text-gray-700'>
              {category.name}
            </h3>
          </div>
        </div>

        <div className='flex gap-1'>
          <button
            onClick={() => onManageSubcategories(category)}
            className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded transition-colors'
            title='Gerenciar subcategorias'
          >
            <FolderOpen className='w-4 h-4 text-gray-600 dark:text-gray-300' />
          </button>

          <button
            onClick={() => onEdit(category)}
            className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded transition-colors'
            title='Editar categoria'
          >
            <Edit className='w-4 h-4 text-gray-600 dark:text-gray-300' />
          </button>

          <button
            onClick={() => onDelete(category)}
            className='p-2 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors'
            title='Excluir categoria'
          >
            <Trash2 className='w-4 h-4 text-red-600 dark:text-red-400' />
          </button>
        </div>
      </div>
    </Card>
  );
}
