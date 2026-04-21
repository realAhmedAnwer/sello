const API_VERSION = 'api/v1';

export const API_ENDPOINTS = {
  auth: {
    signin: `${API_VERSION}/auth/signin`,
    signup: `${API_VERSION}/auth/signup`,
  },
  products: {
    all: `${API_VERSION}/products`,
    single: (id: string) => `${API_VERSION}/products/${id}`,
  },
  categories: {
    all: `${API_VERSION}/categories`,
  },
};
