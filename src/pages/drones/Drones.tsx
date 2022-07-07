import { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import axios from 'axios'

import { IDroneData } from '../interfaces'
import { DroneModalForm } from './components'
import { urlAxios } from '../constraints'
import { DroneActions } from './components/DroneActions'

export const Drones = () => {
  const [dronesData, setDronesData] = useState<IDroneData[]>([])

  const getDrones = () => {
    axios.get(urlAxios + 'drones')
      .then((response) => {
        setDronesData(response.data.content)
      })
      .catch(e => console.log(e))
  }

  useEffect(() => {
    getDrones()
  }, [])

  return (
    <>
      <Container
        style={{ display: 'flex', justifyContent: 'space-between', marginTop: '18px' }}
      >
        <h2>
          Lista de Drones
        </h2>
        <DroneModalForm handleAction={() => getDrones()} />
      </Container>
      <Container style={{ marginTop: '18px' }}>
        <Table striped hover>
          <thead>
            <tr>
              <th style={{ width: '100px' }}>Drone Id</th>
              <th style={{ width: '200px' }}>Marca</th>
              <th>Modelo</th>
              {/* <th style={{ width: '100px' }}>Quantidade entregas</th> */}
              <th style={{ width: '5px', textAlign: 'right' }}></th>
            </tr>
          </thead>
          <tbody>
            {dronesData.length > 0 && dronesData.map(drone => {
              return (
                <tr key={drone.id}>
                  <td>{drone.id}</td>
                  <td>{drone.brand}</td>
                  <td>{drone.model}</td>
                  {/* <td>{drone.deliveries.length}</td> */}
                  <td>
                    <DroneActions
                      drone={drone}
                      handleAction={() => getDrones()}
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
