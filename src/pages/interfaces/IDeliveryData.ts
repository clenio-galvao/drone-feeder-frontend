export interface IDeliveryData {
  id: number,
  latitudeWithdrawal: string,
  longitudeWithdrawal: string,
  dateWithdrawal: Date,
  latitudeDelivery: string,
  longitudeDelivery: string,
  dateDelivery: Date,
  videoNameDelivery: string,
  droneName: string,
  droneId: number
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