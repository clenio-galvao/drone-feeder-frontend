import { Link } from "react-router-dom"
import styled from "styled-components"

const StyledMenu = styled.menu`
  background-color: #5a8c83;
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  margin: 0;
  padding: 1rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Menu = () => {
  return (
    <StyledMenu>
      <span style={{ fontSize: '1.3rem' }}>Drone feeder</span>
      <nav>
        <Link
          style={{ color: 'white', textDecoration: 'none' }}
          to={'/drones'}
        >
          Drones
        </Link>
        <Link
          style={{ color: 'white', textDecoration: 'none', marginLeft: '16px' }}
          to={'/deliveries'}
        >
          Entregas
        </Link>
      </nav>
    </StyledMenu>
  )
}
