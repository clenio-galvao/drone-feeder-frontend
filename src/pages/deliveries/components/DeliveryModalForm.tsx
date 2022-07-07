import axios from "axios"
import { Formik } from "formik"
import { useEffect, useState } from "react"
import { Button, Col, Dropdown, Modal, Row } from "react-bootstrap"
import { FiPlus } from "react-icons/fi"
import Swal from "sweetalert2"
import * as Yup from 'yup'

import { StyledInput } from "../../../styled-components"
import { urlAxios } from "../../constraints"
import { IDeliveryCreateEdit, IDeliveryData, IDroneData } from "../../interfaces"
import { IDroneOptions } from "../Deliveries"

interface IDeliveryModalForm {
  delivery?: IDeliveryData,
  handleAction: () => void
}

export const DeliveryModalForm = ({ delivery, handleAction }: IDeliveryModalForm) => {
  const [showDeliveryModal, setShowDeliveryModal] = useState<boolean>(false)
  const [droneOptions, setDroneOptions] = useState<IDroneOptions[]>([])

  const handleCloseDeliveryModal = () => setShowDeliveryModal(false)
  const handleShowDeliveryModal = () => setShowDeliveryModal(true)

  const initialValues: IDeliveryCreateEdit = {
    latitudeWithdrawal: delivery?.latitudeWithdrawal || '',
    longitudeWithdrawal: delivery?.longitudeWithdrawal || '',
    latitudeDelivery: delivery?.latitudeDelivery || '',
    longitudeDelivery: delivery?.longitudeDelivery || '',
    droneId: delivery?.drone.id || 0,
  }

  const validationSchema = Yup.object().shape({
    latitudeWithdrawal: Yup.string().required('Favor informar a latitude onde o drone deverá buscar o pacote'),
    longitudeWithdrawal: Yup.string().required('Favor informar a longitude onde o drone deverá buscar o pacote'),
    latitudeDelivery: Yup.string().required('Favor informar a latitude onde o drone deverá deixar o pacote'),
    longitudeDelivery: Yup.string().required('Favor informar a longitude onde o drone deverá deixar o pacote'),
    droneId: Yup.number().required('Favor informar o drone responsável pela entrega'),
  })

  const DeliveryCreate = (values: IDeliveryCreateEdit) => {
    axios.post(urlAxios + 'deliveries', {
      ...values,
      drone: { id: values.droneId }
    })
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Entrega salva com sucesso!',
        showConfirmButton: false,
        timer: 1500
      })
      setShowDeliveryModal(false)
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

  const DeliveryEdit = (values: IDeliveryCreateEdit) => {
    axios.put(urlAxios + 'deliveries/' + delivery?.id, {
      ...values,
      drone: { id: values.droneId }
    })
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Delivery editado com sucesso!',
        showConfirmButton: false,
        timer: 1500
      })
      setShowDeliveryModal(false)
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
      {delivery?.id
      ? 
        (
          <Dropdown.Item eventKey="1" onClick={handleShowDeliveryModal}>
            Editar
          </Dropdown.Item>
        )
      : 
        (
          <Button variant='secondary' onClick={handleShowDeliveryModal}>
            <FiPlus style={{ marginRight: '8px' }}/>
            Entrega
          </Button>
        )
      }
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, {resetForm}) => {
          if (delivery?.id) {
            DeliveryEdit(values)
          } else {
            DeliveryCreate(values)
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
            show={showDeliveryModal}
            onHide={() => {
              resetForm()
              handleCloseDeliveryModal()
            }}
            size='lg'
          >
            <form onSubmit={handleSubmit}>
              <Modal.Header closeButton>
                <Modal.Title>Adicione uma entrega</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Row>
                    <Col md={6}>
                      <div>
                        <label>Latitude recolher pacote</label>
                      </div>
                      <StyledInput
                        type="text"
                        name="latitudeWithdrawal"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.latitudeWithdrawal}
                      />
                      <div style={{ color: 'red', fontSize: '12px' }}>
                        {errors.latitudeWithdrawal && touched.latitudeWithdrawal && errors.latitudeWithdrawal}
                      </div>
                    </Col>
                    <Col md={6}>
                      <div>
                        <label>Longitude recolher pacote</label>
                      </div>
                      <StyledInput
                        type="text"
                        name="longitudeWithdrawal"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.longitudeWithdrawal}
                      />
                      <div style={{ color: 'red', fontSize: '12px' }}>
                        {errors.longitudeWithdrawal && touched.longitudeWithdrawal && errors.longitudeWithdrawal}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <div>
                        <label>Latitude deixar pacote</label>
                      </div>
                      <StyledInput
                        type="text"
                        name="latitudeDelivery"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.latitudeDelivery}
                      />
                      <div style={{ color: 'red', fontSize: '12px' }}>
                        {errors.latitudeDelivery && touched.latitudeDelivery && errors.latitudeDelivery}
                      </div>
                    </Col>
                    <Col md={6}>
                      <div>
                        <label>Longitude deixar pacote</label>
                      </div>
                      <StyledInput
                        type="text"
                        name="longitudeDelivery"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.longitudeDelivery}
                      />
                      <div style={{ color: 'red', fontSize: '12px' }}>
                        {errors.longitudeDelivery && touched.longitudeDelivery && errors.longitudeDelivery}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <div>
                        <label>Drone</label>
                      </div>
                      <select
                        className="select"
                        placeholder="Escolha um Drone"
                        name="droneId"
                        value={values.droneId}
                        onChange={handleChange}
                      >
                        <>
                          <option value={0} style={{ fontStyle: 'italic'}}>Escolha um drone</option>
                          {droneOptions && droneOptions.map(op => {
                            return (
                              <option value={op.value}>{op.label}</option>
                            )
                          })}
                        </>
                      </select>
                    </Col>
                  </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => {
                  resetForm()
                  handleCloseDeliveryModal()
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
