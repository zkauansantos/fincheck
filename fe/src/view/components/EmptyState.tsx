import emptyStateImage from '@/assets/empty-state.svg';

interface IEmptyStateProps {
  message?: string;
}

export function EmptyState({
  message = 'Não encontramos nenhuma transação',
}: IEmptyStateProps) {
  return (
    <div className='flex flex-col h-full items-center justify-center gap-4'>
      <img src={emptyStateImage} alt='empty-state' />
      <p className='text-gray-700'>{message}</p>
    </div>
  );
}
