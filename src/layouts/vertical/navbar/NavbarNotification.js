import NotificationDropdown from './NotificationDropdown'
import rayanLogo from '@assets/images/magfa/rayanLogo.webp'

export default function NavbarNotification() {
  return (
    <ul className='nav navbar-nav align-items-center me-auto'>
      {/* <NotificationDropdown /> */}
      <img src={rayanLogo} width={70}/>
    
    </ul>
  )
}
