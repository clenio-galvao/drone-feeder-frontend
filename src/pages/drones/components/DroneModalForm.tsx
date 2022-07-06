import axios from "axios"
import { Formik } from "formik"
import { useState } from "react"
import { Button, Col, Dropdown, Modal, Row } from "react-bootstrap"
import { FiPlus } from "react-icons/fi"
import Swal from "sweetalert2"
import * as Yup from 'yup'

import { StyledInput } from "../../../styled-components"
import { urlAxios } from "../../constraints"
import { IDroneCreateEdit, IDroneData } from "../../interfaces"

interface IDroneModalForm {
  drone?: IDroneData,
  handleAction: () => void
}

export const DroneModalForm = ({ drone, handleAction }: IDroneModalForm) => {
  const [showDroneModal, setShowDroneModal] = useState<boolean>(false)

  const handleCloseDroneModal = () => setShowDroneModal(false)
  const handleShowDroneModal = () => setShowDroneModal(true)

  const initialValues: IDroneCreateEdit = {
    brand: drone?.brand || '',
    model: drone?.model || '',
  }

  const validationSchema = Yup.object().shape({
    brand: Yup.string().required('Favor informar a marca'),
    model: Yup.string().required('Favor informar a modelo'),
  })

  const droneCreate = (values: IDroneCreateEdit) => {
    axios.post(urlAxios + 'drones', values)
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Drone salvo com sucesso!',
        showConfirmButton: false,
        timer: 1500
      })
      setShowDroneModal(false)
      handleAction()
    })
    .catch(e => {
      console.log(e)
      Swal.fire({
        icon: 'error',
        title: 'Ocorreu um erro, favor tentar novamente mais tarde!',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  const droneEdit = (values: IDroneCreateEdit) => {
    axios.put(urlAxios + 'drones/' + drone?.id, values)
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Drone editado com sucesso!',
        showConfirmButton: false,
        timer: 1500
      })
      setShowDroneModal(false)
      handleAction()
    })
    .catch(e => {
      console.log(e)
      Swal.fire({
        icon: 'error',
        title: 'Ocorreu um erro, favor tentar novamente mais tarde!',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  return (
    <>
      {drone?.id
      ? 
        (
          <Dropdown.Item eventKey="1" onClick={handleShowDroneModal}>
            Editar
          </Dropdown.Item>
        )
      : 
        (
          <Button variant='secondary' onClick={handleShowDroneModal}>
            <FiPlus style={{ marginRight: '8px' }}/>
            drone
          </Button>
        )
      }
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, {resetForm}) => {
          if (drone?.id) {
            droneEdit(values)
          } else {
            droneCreate(values)
          }
          resetForm()
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          resetForm,
        }) => (
          <Modal
            show={showDroneModal}
            onHide={() => {
              resetForm()
              handleCloseDroneModal()
            }}
            size='lg'
          >
            <form onSubmit={handleSubmit}>
              <Modal.Header closeButton>
                <Modal.Title>Adicione um drone</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Row>
                    <Col md={6}>
                      <div>
                        <label>Marca</label>
                      </div>
                      <StyledInput
                        type="text"
                        name="brand"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.brand}
                      />
                      <div style={{ color: 'red', fontSize: '12px' }}>
                        {errors.brand && touched.brand && errors.brand}
                      </div>
                    </Col>
                    <Col md={6}>
                      <div>
                        <label>Modelo</label>
                      </div>
                      <StyledInput
                        type="text"
                        name="model"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.model}
                      />
                      <div style={{ color: 'red', fontSize: '12px' }}>
                        {errors.model && touched.model && errors.model}
                      </div>
                    </Col>
                  </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => {
                  resetForm()
                  handleCloseDroneModal()
                }}>
                  Cancelar
                </Button>
                <Button variant="primary" type='submit'>
                  Salvar
                </Button>
              </Modal.Footer>
            </form>
          </Modal>
        )}
      </Formik>
    </>
  )
}