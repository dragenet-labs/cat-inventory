import { ErrorTypes, HttpErrorDTO } from 'my-inventory-common/errors';
import { Path, UseFormReturn } from 'react-hook-form';

export interface AppError extends Pick<HttpErrorDTO, 'type' | 'message'> {
  errors?: Record<string, string>;
}

export const setFormErrors = <T extends string, V>(
  error: AppError | null,
  form: UseFormReturn<V>
) => {
  if (!error?.errors) return;
  if (error.type !== ErrorTypes.INVALID_ZOD_REQUEST) return;

  Object.entries(error.errors as Record<Path<V>, T>).forEach(([key, val]) =>
    form.setError(key as Path<V>, {
      type: 'custom',
      message: val as T
    })
  );
};
