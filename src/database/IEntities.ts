export interface ICalculatePriceAndQuantity {
  priceOfRequest?: number;
  pizzaQuantity?: number;
}

export interface IRequestsList {
  id: string;
  date: string;
  quantity: number;
  price: string;
  fk_client: number | null;
}

export interface IRegisterOrder {
  id: string;
  fk_client: string | null;
  date: string;
  fullprice: string;
  quantity: number;
  address: string;
}