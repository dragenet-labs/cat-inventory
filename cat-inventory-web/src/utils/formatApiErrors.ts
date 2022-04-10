import { ErrorTypes, HttpErrorDTO } from 'my-inventory-common/errors';
import { ZodError } from 'zod';

export const pathMap = (path: string[], data: any, entry: Record<string, any> = {}) => {
  if (path.length === 1) {
    entry[path[0]] = data;
  } else {
    entry[path[0]] = pathMap(path.slice(1), data, entry[path[0]]);
  }
  return entry;
};

export const parseZodErrorToRHFE = (errors: Record<string, any>[]) =>
  errors.reduce((acc, error) => pathMap(error.path, error.message, acc), {});

export const formatApiErrors = (error: HttpErrorDTO) => {
  switch (error.type) {
    case ErrorTypes.INVALID_ZOD_REQUEST:
      return { ...error, errors: parseZodErrorToRHFE(error.errors as ZodError[]).body };
    default:
      return error;
  }
};
