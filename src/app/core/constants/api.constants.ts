const API_VERSION = 'api/v1';

export const API_ENDPOINTS = {
  products: {
    all: `${API_VERSION}/products`,
    single: (id: string) => `${API_VERSION}/products/${id}`,
  },
};
