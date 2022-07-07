import { IDroneData } from "./IDroneData"

export interface IDeliveryData {
  id: number,
  latitudeWithdrawal: string,
  longitudeWithdrawal: string,
  dateWithdrawal: string,
  latitudeDelivery: string,
  longitudeDelivery: string,
  dateDelivery: string,
  videoNameDelivery: string,
  droneName: string,
  drone: IDroneData
}

export interface IDeliveryCreateEdit {
  latitudeWithdrawal: string,
  longitudeWithdrawal: string,
  latitudeDelivery: string,
  longitudeDelivery: string,
  droneId: number
}

export interface IFiltersDeliveries {
  droneId: number
}