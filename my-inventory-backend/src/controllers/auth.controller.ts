import { ZodRegisterUserDTO } from 'my-inventory-common/dto';
import { responseOf, TypedRequestBody } from 'src/utils';

export const registerUser = (data: TypedRequestBody<ZodRegisterUserDTO>) => {
  return responseOf(data);
};
