import { useEffect, useState } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import axios from 'axios'
// import { format } from 'date-fns';
import ReactSelect from 'react-select';

import { IDeliveryData, IFiltersDeliveries } from '../interfaces'
import { urlAxios } from '../constraints'
import { IDroneData } from '../interfaces'
import { DeliveryActions, DeliveryModalForm } from './components';

export interface IDroneOptions {
  value: number,
  label: string
}

export const Deliveries = () => {
  const [deliveriesData, setDeliveriesData] = useState<IDeliveryData[]>([])
  const [filters, setFilters] = useState<IFiltersDeliveries>({
    droneId: 0
  })
  const [droneOptions, setDroneOptions] = useState<IDroneOptions[]>()

  const getDeliveries = () => {
    axios.get(urlAxios + 'deliveries?droneId=' + filters?.droneId || '')
      .then((response) => {        
        setDeliveriesData(response.data)
      })
      .catch(e => console.log(e))
  }

  useEffect(() => {
    getDeliveries()
  }, [filters])

  const getDronesSelect = () => {
    axios.get(urlAxios + 'drones')
      .then((response) => {
        const drones = response.data.content.map((drone: IDroneData) => {
          return {
            value: drone.id,
            label: drone.brand + ' - ' + drone.model,
          }
        })
        setDroneOptions(drones)
      })
      .catch(e => console.log(e))
  }

  useEffect(() => {
    getDronesSelect()
  }, [])

  return (
    <>
      <Container>
        <h2>Filtros</h2>
        <Row>
          <Col md={3}>
            <div>
              <label>Drone</label>
            </div>
            <ReactSelect
              className="select"
              options={droneOptions}
              placeholder="Escolha um Drone"
              isClearable={true}
              onChange={(selected) => setFilters({
                ...filters,
                droneId: selected?.value ? selected.value : 0
              })}
            />
          </Col>
        </Row>
        <hr />
      </Container>
      <Container
        style={{ display: 'flex', justifyContent: 'space-between', marginTop: '18px' }}
      >
        <h2>
          Lista de entregas
        </h2>
        <DeliveryModalForm handleAction={() => getDeliveries()} />
      </Container>
      <Container style={{ marginTop: '18px' }}>
        <Table striped hover>
          <thead>
            <tr>
              <th style={{ width: '100px' }}>Ordem</th>
              <th style={{ width: '300px' }}>Drone</th>
              <th style={{ width: '150px' }}>Retirada Latitude</th>
              <th style={{ width: '150px' }}>Retirada Longitude</th>
              <th style={{ width: '150px' }}>Retirada Data</th>
              <th style={{ width: '150px' }}>Entrega Latitude</th>
              <th style={{ width: '150px' }}>Entrega Longitude</th>
              <th style={{ width: '150px' }}>Entrega Data</th>

              <th style={{ width: '5px', textAlign: 'right' }}></th>
            </tr>
          </thead>
          <tbody>
            {deliveriesData && deliveriesData.length > 0 && deliveriesData.map(delivery => {
              return (
                <tr key={delivery.id}>
                  <td>{delivery.id}</td>
                  <td>{delivery.droneName}</td>
                  <td>{delivery.latitudeWithdrawal}</td>
                  <td>{delivery.longitudeWithdrawal}</td>
                  <td>
                    {/* {delivery.dateWithdrawal ? format(delivery.dateWithdrawal, "dd/MM/yyyy HH:mm:ss") : ''} */}
                  </td>
                  <td>{delivery.latitudeDelivery}</td>
                  <td>{delivery.longitudeDelivery}</td>
                  <td>
                    {/* {delivery.dateDelivery ? format(delivery.dateDelivery, "dd/MM/yyyy HH:mm:ss") : ''} */}
                  </td>
                  <td>
                    <DeliveryActions
                      delivery={delivery}
                      handleAction={() => getDeliveries()}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Container>
    </>
  )
}

