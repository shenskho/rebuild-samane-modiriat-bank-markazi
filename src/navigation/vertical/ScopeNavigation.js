import { IoIosList, IoIosMail, IoIosPerson, IoIosPrint } from 'react-icons/io'

export default [
  {
    id: 'admin-home',
    title: 'لیست  صورتجلسه ها ',
    icon: <IoIosList />,
    navLink: '/'
  },
  {
    id: 'admin-home2',
    title: 'داوطلبان حوزه',
    icon: <IoIosPerson />,
    navLink: '/scopeUsers'
  },
  {
    id: 'admin-home3',
    title: 'ملزومات چاپی ',
    icon: <IoIosPrint />,
    navLink: '/scopePrintRequirement'
  }
]
