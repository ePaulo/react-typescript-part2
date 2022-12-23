import './navbar.styles.scss'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  console.log('Navbar') // LOG
  return (
    <nav className='navbar'>
      <NavLink to='/'>Home</NavLink>
      <NavLink end to='/products'>
        List Products
      </NavLink>
      <NavLink to='/products/create'>Create Product</NavLink>
    </nav>
  )
}

export default Navbar
