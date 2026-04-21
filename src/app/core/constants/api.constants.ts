const API_VERSION = 'api/v1';

export const API_ENDPOINTS = {
  auth: {
    signin: `${API_VERSION}/auth/signin`,
    signup: `${API_VERSION}/auth/signup`,
    password: {
      forgot: `${API_VERSION}/auth/forgotPasswords`,
      verify: `${API_VERSION}/auth/verifyResetCode`,
      reset: `${API_VERSION}/auth/resetPassword`,
    },
  },
  products: {
    all: `${API_VERSION}/products`,
    single: (id: string) => `${API_VERSION}/products/${id}`,
  },
  categories: {
    all: `${API_VERSION}/categories`,
  },
};
