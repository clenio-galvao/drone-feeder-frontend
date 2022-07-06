import { IDeliveryData } from "./IDeliveryData";

export interface IDroneData {
  id: number,
  brand: string,
  model: string,
}

export interface IDroneCreateEdit {
  brand: string,
  model: string
}
