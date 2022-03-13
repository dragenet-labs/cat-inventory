import { ZodRegisterUserRequestDTO } from 'my-inventory-common/dto';
import { responseOf, TypedRequestBody } from 'src/utils';

export const registerUser = (data: TypedRequestBody<ZodRegisterUserRequestDTO>) => {
  return responseOf(data);
};
