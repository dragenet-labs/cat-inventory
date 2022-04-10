import { ErrorTypes, HttpErrorDTO } from 'my-inventory-common/errors';
import { ZodError } from 'zod';
import { AppError } from 'src/utils/errors';

export const pathMap = (path: string[], data: any, entry: Record<string, any> = {}) => {
  if (path.length === 1) {
    entry[path[0]] = data;
  } else {
    entry[path[0]] = pathMap(path.slice(1), data, entry[path[0]]);
  }
  return entry;
};

export const parseZodErrorToJson = (errors: Record<string, any>[]) =>
  errors.reduce((acc, error) => pathMap(error.path, error.message, acc), {});

export const formatApiErrors = (error: HttpErrorDTO) => {
  switch (error.type) {
    case ErrorTypes.INVALID_ZOD_REQUEST:
      return { ...error, errors: parseZodErrorToJson(error.errors as ZodError[]).body };
    default:
      return error;
  }
};

export const getFilteredApiErrorMessage = (
  error: AppError | null,
  filter: ErrorTypes[] = [ErrorTypes.INVALID_ZOD_REQUEST]
) => {
  if (!error) return null;
  return filter.includes(error.type) ? null : error.message;
};
