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
    removeItem: (id: string): string => `${V2}/cart/${id}`,
    updateItemQuantity: (id: string): string => `${V2}/cart/${id}`,
    clear: `${V2}/cart`,
  },
  order: {
    cash: (cartId: string): string => `${V1}/orders/${cartId}`,
    card: (cartId: string, url: string): string =>
      `${V1}/orders/checkout-session/${cartId}?url=${url}`,
  },
  products: {
    all: (pageNumber: number): string => `${V1}/products?page=${pageNumber}`,
    single: (id: string): string => `${V1}/products/${id}`,
  },
  categories: {
    all: `${V1}/categories`,
  },
  brands: {
    all: `${V1}/brands`,
  },
  wishlist: {
    addProduct: `${V1}/wishlist`,
    getProducts: `${V1}/wishlist`,
    removeItem: (id: string): string => `${V1}/wishlist/${id}`,
  },
};
