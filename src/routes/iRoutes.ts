export interface iFlavors {
  id: number;
  name: string;
  price: number;
}

export interface IUsers {
  id: number;
  name: string;
  address: string;
}

export interface IRequest {
  requestsList: Array<{flavors: Array<number>}>;
  tokenClient: string;
  address: string;
}