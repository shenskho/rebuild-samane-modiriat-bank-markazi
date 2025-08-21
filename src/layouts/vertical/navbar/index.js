import { Fragment } from 'react'
import NavbarMobileMenuToggle from './NavbarMobileMenuToggle'
import NavbarNotification from './NavbarNotification'
import NavbarUser from './NavbarUser'

export default function ThemeNavbar(props) {
  const { skin, setSkin, setMenuVisibility } = props

  return (
    <Fragment>
      <NavbarMobileMenuToggle setMenuVisibility={setMenuVisibility} />
      <NavbarNotification />
      <NavbarUser skin={skin} setSkin={setSkin} />
    </Fragment>
  )
}
