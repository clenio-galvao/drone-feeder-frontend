import axios from "axios";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Swal from "sweetalert2";
import { urlAxios } from "../../constraints";
import { IDeliveryData } from "../../interfaces";
import { DeliveryModalForm } from "./DeliveryModalForm";

interface IDeliveryActionProps {
  delivery: IDeliveryData,
  handleAction: () => void
}

export const DeliveryActions = ({ delivery, handleAction }: IDeliveryActionProps) => {
  const deleteDelivery = () => {
    Swal.fire({
      title: 'Deseja realmente apagar essa entrega?',
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: `Não`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios.delete(urlAxios + 'deliveries/' + delivery.id)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Delivery deletado com sucesso!',
            showConfirmButton: false,
            timer: 1500
          })
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
    })
  }

  const videoDownload = () => {
    axios.get(urlAxios + 'deliveries/videos/download/' + delivery.id)
      .then()
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
    <DropdownButton align="end" title="Ações" id="dropdown-menu-align-end" variant='Secondary'>
      <DeliveryModalForm delivery={delivery} handleAction={handleAction} />
      <Dropdown.Divider />
      <Dropdown.Item eventKey="2" onClick={() => deleteDelivery()}>
        Excluir
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item eventKey="2" onClick={() => videoDownload()} disabled={delivery.videoNameDelivery === null}>
        Baixar vídeo
      </Dropdown.Item>
    </DropdownButton>
  )
}
