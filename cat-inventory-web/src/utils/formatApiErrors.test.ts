import { formatApiErrors, parseZodErrorToRHFE, pathMap } from './formatApiErrors';

describe('formatApiErrors', () => {
  it('pathMap', () => {
    const mapped = pathMap(['body', 'data'], 'message');
    expect(mapped).toEqual({ body: { data: 'message' } });
  });

  it('parseZodErrorToRHF', () => {
    const testErrors = [
      {
        validation: 'email',
        code: 'invalid_string',
        message: 'Invalid email address',
        path: ['body', 'email']
      },
      {
        code: 'too_small',
        minimum: 8,
        type: 'string',
        inclusive: true,
        message: 'Password must contain at least 8 characters',
        path: ['body', 'password']
      },
      {
        code: 'too_small',
        minimum: 8,
        type: 'string',
        inclusive: true,
        message: 'Missing invitation code',
        path: ['body', 'invitation', 'code']
      },
      {
        code: 'too_small',
        minimum: 8,
        type: 'string',
        inclusive: true,
        message: 'Missing title',
        path: ['head', 'title']
      }
    ];

    const expectedParsedErrors = {
      body: {
        email: 'Invalid email address',
        password: 'Password must contain at least 8 characters',
        invitation: { code: 'Missing invitation code' }
      },
      head: { title: 'Missing title' }
    };

    const parsed = parseZodErrorToRHFE(testErrors);
    expect(parsed).toEqual(expectedParsedErrors);
  });

  it('formatApiErrors', () => {
    const response = {
      type: 'INVALID_ZOD_REQUEST',
      message: 'Request contains invalid data',
      errors: [
        {
          validation: 'email',
          code: 'invalid_string',
          message: 'Invalid email address',
          path: ['body', 'email']
        },
        {
          code: 'too_small',
          minimum: 8,
          type: 'string',
          inclusive: true,
          message: 'Password must contain at least 8 characters',
          path: ['body', 'password']
        }
      ]
    };
    const formattedError = {
      errors: {
        email: 'Invalid email address',
        password: 'Password must contain at least 8 characters'
      },
      message: 'Request contains invalid data',
      type: 'INVALID_ZOD_REQUEST'
    };

    expect(formatApiErrors(response)).toEqual(formattedError);
  });
});
