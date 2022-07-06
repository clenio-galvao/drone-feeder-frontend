export interface IDeliveryData {
  id: number,
  latitudeWithdrawal: string,
  longitudeWithdrawal: string,
  dateWithdrawal: Date,
  latitudeDelivery: string,
  longitudeDelivery: string,
  dateDelivery: Date,
  videoNameDelivery: string,
  droneId: number
}

export interface IFiltersDeliveries {
  droneId: number
}