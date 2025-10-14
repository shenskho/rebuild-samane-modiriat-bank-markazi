import { IoIosDownload, IoIosFingerPrint, IoIosInformation, IoIosList, IoIosMail, IoIosPrint } from 'react-icons/io'

export default [
  {
    id: 'admin-home',
    title: ' تیکت های رفع نقص ',
    icon: <IoIosList />,
    navLink: '/'
  },
    {
    id: 'admin-complante',
    title: ' تیکت های اعتراض ',
    icon: <IoIosList />,
    navLink: '/complanteRequest'
  },
  {
    id: 'admin-home2',
    title: 'قرنطینه چاپ',
    icon: <IoIosPrint />,
    navLink: '/printQuarantine'
  },
  {
    id: 'admin-home3',
    title: 'ملزومات چاپی ',
    icon: <IoIosDownload />,
    navLink: '/scopePrintRequirement'
  },
  {
    id: 'admin-home5',
    title: 'لیست  صورتجلسه ها ',
    icon: <IoIosList />,
    navLink: '/operatorScopeManage'
  },

  {
    id: 'admin-home6',
    title: 'تیکت های حوزه ',
    icon: <IoIosMail />,
    navLink: '/operatorTicket'
  },

  {
    id: 'admin-home7',
    title: 'نمودار آمار',
    icon: <IoIosMail />,
    navLink: '/chartReport'
  }
]
