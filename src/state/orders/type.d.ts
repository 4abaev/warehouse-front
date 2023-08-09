type OrdersState = {
  orders: Order[];
  isOrderSucces: boolean;
  isError: boolean;
  isLoading: boolean;
};

type Order = {
  id: string;
  comment: string;
  totalCost: number;
  products: OrderProduct[];
  status: string;
  flag: string;
  createdAt: string;
};

type OrderProduct = {
  id: string;
  quantity: string;
  cost: number;
  articul: string;
  description: string;
  brand: string;
  category: string;
  picture: string;
};

type OrderCreateForm = {
  text: string;
  totalCost: number;
  ownerId: string;
  addressId: string;
}
