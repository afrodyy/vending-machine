export type Item = {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
};

export type CartItem = {
  id: number;
  name: string;
  price: number;
  qty: number;
  subtotal: number;
};
