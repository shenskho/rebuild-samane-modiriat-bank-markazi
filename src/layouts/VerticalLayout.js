// ** React Imports
import { Outlet } from 'react-router-dom'

// ** Core Layout Import
// !Do not remove the Layout import
import Layout from '@core/layouts/VerticalLayout'

// ** Menu Items Array
import navigation from '@src/navigation/vertical'
import operatorNavigation from '@src/navigation/vertical/operatorNavigation'
import scopeNavigation from '@src/navigation/vertical/ScopeNavigation'
import organNavigation from '@src/navigation/vertical/organNavigation'
import ticketNavigation from '@src/navigation/vertical/TicketNavigation'
// ** Custom VerticalLayout Components
// import CustomMenu from './vertical/menu'
import CustomNavbar from './vertical/navbar'
import CustomFooter from './vertical/footer'
import { IoIosHome, IoIosList } from 'react-icons/io'

const VerticalLayout = (props) => {
  return (
    <Layout
      menuData={
        localStorage.getItem('panelTypeTitle') === 'SuperAdmin'
          ? navigation
          : localStorage.getItem('panelTypeTitle') === 'scope'
          ? scopeNavigation
          : localStorage.getItem('panelTypeTitle') === 'organ'
          ? organNavigation
          : localStorage.getItem('panelTypeTitle') === 'ticket'
          ? ticketNavigation : operatorNavigation
      }
      // menu={(props) => <CustomMenu {...props} />}
      navbar={(props) => <CustomNavbar {...props} />}
      footer={<CustomFooter />}
      {...props}
    >
      <Outlet />
    </Layout>
  )
}

export default VerticalLayout
