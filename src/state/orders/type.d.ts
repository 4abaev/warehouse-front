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
  products: string;
  status: string;
  flag: string
  createdAt: string
};

type OrderCreateForm = {
  text: string;
  totalCost: number;
  ownerId: string;
  addressId: string;
}
