import {
  AuthenticationErrorCode,
  BusinessRuleErrorCode,
  ErrorCode,
  ForbiddenErrorCode,
  ResourceNotFoundErrorCode,
  SystemErrorCode,
  ValidationErrorCode,
} from './error-codes';

type ErrorMessages = {
  [K in ErrorCode]: string;
};

export const errorMessages: ErrorMessages = {
  // Authentication Errors
  [AuthenticationErrorCode.INVALID_CREDENTIALS]:
    'E-mail ou senha inválidos. Verifique suas credenciais e tente novamente.',
  [AuthenticationErrorCode.TOKEN_EXPIRED]:
    'Sua sessão expirou. Por favor, faça login novamente.',
  [AuthenticationErrorCode.TOKEN_INVALID]:
    'Sessão inválida. Por favor, faça login novamente.',
  [AuthenticationErrorCode.UNAUTHORIZED]:
    'Você não tem permissão para acessar este recurso.',

  // Validation Errors
  [ValidationErrorCode.INVALID_EMAIL]: 'E-mail inválido.',
  [ValidationErrorCode.INVALID_UUID]: 'Identificador inválido.',
  [ValidationErrorCode.REQUIRED_FIELD]: 'Este campo é obrigatório.',
  [ValidationErrorCode.MIN_LENGTH]: 'O valor informado é muito curto.',
  [ValidationErrorCode.MAX_LENGTH]: 'O valor informado é muito longo.',
  [ValidationErrorCode.INVALID_DATE]: 'Data inválida.',
  [ValidationErrorCode.NEGATIVE_VALUE]: 'O valor não pode ser negativo.',
  [ValidationErrorCode.EMAIL_ALREADY_EXISTS]:
    'Este e-mail já está cadastrado. Tente fazer login ou use outro e-mail.',

  // Resource Not Found Errors
  [ResourceNotFoundErrorCode.RESOURCE_NOT_FOUND]:
    'O recurso solicitado não foi encontrado.',

  // Forbidden Errors
  [ForbiddenErrorCode.INVALID_OWNERSHIP]:
    'Você não tem permissão para acessar este recurso.',
  [ForbiddenErrorCode.ACCESS_DENIED]:
    'Acesso negado. Você não tem permissão para realizar esta ação.',

  // Business Rule Errors
  [BusinessRuleErrorCode.SUBCATEGORY_REQUIRES_CATEGORY]:
    'Para criar uma subcategoria, você precisa selecionar uma categoria pai.',
  [BusinessRuleErrorCode.CATEGORY_TYPE_MISMATCH]:
    'O tipo da categoria não corresponde ao esperado.',
  [BusinessRuleErrorCode.CANNOT_DELETE_CATEGORY_WITH_TRANSACTIONS]:
    'Não é possível excluir esta categoria pois existem transações vinculadas a ela.',
  [BusinessRuleErrorCode.CANNOT_DELETE_BANK_ACCOUNT_WITH_TRANSACTIONS]:
    'Não é possível excluir esta conta bancária pois existem transações vinculadas a ela.',

  // System Errors
  [SystemErrorCode.INTERNAL_SERVER_ERROR]:
    'Ocorreu um erro interno. Por favor, tente novamente mais tarde.',
  [SystemErrorCode.HTTP_EXCEPTION]:
    'Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.',
};

export function getErrorMessage(code: ErrorCode): string {
  return errorMessages[code] || 'Ocorreu um erro inesperado. Por favor, tente novamente.';
}
