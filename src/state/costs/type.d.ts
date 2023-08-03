type CostsState = {
  costs: Cost[];
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
};

type Cost = {
  id: string;
  name: string;
  cost: number;
  isCurrent: boolean;
  createdAt: string;
};
