const V1 = 'api/v1';
const V2 = 'api/v2';

export const API_ENDPOINTS = {
  auth: {
    signin: `${V1}/auth/signin`,
    signup: `${V1}/auth/signup`,
    password: {
      forgot: `${V1}/auth/forgotPasswords`,
      verify: `${V1}/auth/verifyResetCode`,
      reset: `${V1}/auth/resetPassword`,
    },
  },
  cart: {
    addProduct: `${V2}/cart`,
    getProducts: `${V2}/cart`,
    removeItem: (id: string) => `${V2}/cart/${id}`,
    updateItemQuantity: (id: string) => `${V2}/cart/${id}`,
    clear: `${V2}/cart`,
  },
  products: {
    all: `${V1}/products`,
    single: (id: string) => `${V1}/products/${id}`,
  },
  categories: {
    all: `${V1}/categories`,
  },
};
