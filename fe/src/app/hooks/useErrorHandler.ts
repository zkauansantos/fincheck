import { AxiosError, HttpStatusCode } from 'axios';
import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { ApiError, getErrorMessage } from '../errors';

export function useErrorHandler() {
  const handleError = useCallback((error: unknown) => {
    if (ApiError.isApiError(error)) {
      const message = getErrorMessage(error.code);
      toast.error(message);
      return;
    }

    if (error instanceof AxiosError) {
      if (error.code === 'ERR_NETWORK') {
        toast.error('Erro de conexão. Verifique sua internet e tente novamente.');
        return;
      }

      if (error.response?.status === HttpStatusCode.NotFound) {
        toast.error('Recurso não encontrado.');
        return;
      }

      if (error.response?.status === HttpStatusCode.InternalServerError) {
        toast.error('Erro no servidor. Tente novamente mais tarde.');
        return;
      }
    }

    toast.error('Ocorreu um erro inesperado. Por favor, tente novamente.');
  }, []);

  return { handleError };
}
