// ** React Imports
import { Outlet } from 'react-router-dom'

// ** Core Layout Import
// !Do not remove the Layout import
import Layout from '@core/layouts/VerticalLayout'

// ** Menu Items Array
import navigation from '@src/navigation/vertical'

// ** Custom VerticalLayout Components
// import CustomMenu from './vertical/menu'
import CustomNavbar from './vertical/navbar'
import CustomFooter from './vertical/footer'
import { IoIosHome, IoIosList } from 'react-icons/io'

const VerticalLayout = (props) => {
  return (
    <Layout
      menuData={ localStorage.getItem("panelTypeTitle") === "SuperAdmin" ? navigation :[ {
          id: 'admin-home',
          title: 'لیست درخواست های کاربران',
          icon: <IoIosList />,
          navLink: '/'
        }]} 
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
