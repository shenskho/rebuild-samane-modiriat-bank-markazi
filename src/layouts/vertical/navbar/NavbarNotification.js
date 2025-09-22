import NotificationDropdown from './NotificationDropdown'
import rayanLogo from '@assets/images/rayan/logo2.png'

export default function NavbarNotification() {
  return (
    <ul className='nav navbar-nav align-items-center me-auto'>
      {/* <NotificationDropdown /> */}
      <img src={rayanLogo} width={70}/>
    
    </ul>
  )
}
