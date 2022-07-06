import axios from "axios";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Swal from "sweetalert2";
import { urlAxios } from "../../constraints";
import { IDroneData } from "../../interfaces";
import { DroneModalForm } from "./DroneModalForm";

interface IDroneActionProps {
  drone: IDroneData,
  handleAction: () => void
}

export const DroneActions = ({ drone, handleAction }: IDroneActionProps) => {
  const deleteDrone = () => {
    Swal.fire({
      title: 'Deseja realmente apagar esse drone e todas as entregas vinculadas a ele?',
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: `Não`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios.delete(urlAxios + 'drones/' + drone.id)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Drone deletado com sucesso!',
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

  return (
    <DropdownButton align="end" title="Ações" id="dropdown-menu-align-end" variant='Secondary'>
      <DroneModalForm drone={drone} handleAction={handleAction} />
      <Dropdown.Divider />
      <Dropdown.Item eventKey="2" onClick={() => deleteDrone()}>
        Excluir
      </Dropdown.Item>
    </DropdownButton>
  )
}