import { NavItem, NavLink } from 'reactstrap'
import * as Icon from 'react-feather'

export default function NavbarMobileMenuToggle(props) {
  const { setMenuVisibility } = props

  return (
    <ul className='navbar-nav align-items-center d-xl-none'>
      <NavItem className='mobile-menu me-auto'>
        <NavLink className='nav-menu-main menu-toggle hidden-xs is-active' onClick={() => setMenuVisibility(true)}>
          <Icon.Menu className='ficon' />
        </NavLink>
      </NavItem>
    </ul>
  )
}
