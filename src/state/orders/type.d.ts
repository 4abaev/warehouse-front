type OrdersState = {
  orders: Order[];
  isSucces: boolean;
  isError: boolean;
  isLoading: boolean;
};

type Order = {
  id: string;
  text: string;
  totalCost: number;
  addressId: string;
  owner: User;
  condition: string;
  createdAt: string;
};

type OrderCreateForm = {
  text: string;
  totalCost: number;
  ownerId: string;
  addressId: string;
}
