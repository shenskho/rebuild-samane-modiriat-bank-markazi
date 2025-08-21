import { Home, RefreshCw, FileText, AlertTriangle, Circle, TrendingUp } from 'react-feather'

export default [
 
  {
    id: 'grant-dashboard',
    title: 'عملیات پایه',
    icon: <RefreshCw size={20} />,

    children: [
      {
        id: 'grant-business-management',
        title: 'مدیریت کسب‌و‌کار',
        icon: <Circle size={12} />,
        navLink: '/grant/business-management'
      }
    ]
  }
]
