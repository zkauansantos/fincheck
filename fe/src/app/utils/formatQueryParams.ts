export function formatQueryParams(filters?: Record<string, unknown>) {
  if (!filters) return '';

  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value === null || value === undefined || value === '') return;

    if (Array.isArray(value)) {
      params.append(key, value.join(','));
      return;
    }

    params.append(key, String(value));
  });

  return params.toString() ? `?${params.toString()}` : '';
}