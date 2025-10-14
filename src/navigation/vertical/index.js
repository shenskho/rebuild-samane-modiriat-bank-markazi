import {
  FaTachometerAlt,
  FaDatabase,
  FaFileAlt,
  FaClipboardList,
  FaUsersCog,
  FaChartBar,
  FaUserCheck,
  FaLock,
  FaSyncAlt,
  FaQuestion
} from 'react-icons/fa'

import { IoDocuments } from 'react-icons/io5'
import { IoIosHome } from 'react-icons/io'
import { AnswareTicket } from '@store/slices/operator'
import { MdOutlineViewList, MdQueryStats, MdQuestionAnswer } from 'react-icons/md'

export default [
  {
    id: 'admin-home',
    title: 'خانه',
    icon: <IoIosHome />,
    navLink: '/home'
  },
  {
    id: 'admin-home2',
    title: 'دسترسی سریع',
    icon: <FaTachometerAlt />,

    navLink: '/quickAccess'
  },

  {
    id: 'admin-home4',
    title: 'اطلاعات پایه',
    icon: <FaDatabase />,

    children: [
      { title: 'اطلاعات ثابت', icon: <FaLock />, navLink: '/fixData' },
      { title: 'اطلاعات متغیر', icon: <FaSyncAlt />, navLink: '/variableData' }
    ]
  },
  {
    id: 'admin-home5',
    title: 'مجوز استخدام',
    icon: <FaFileAlt />,
    children: [
      { title: 'مدیریت مجوزها', navLink: '/licenseRequest' },
      { title: 'ثبت شرایط و تعریف شغل محل‌ها', navLink: '/requestLicense' }
    ]
  },
  {
    id: 'admin-home6',
    title: 'آزمون‌های استخدامی',
    icon: <FaClipboardList />,
    children: [
      { title: 'مدیریت آزمون', navLink: '/managementExam' },
      { title: 'تخصیص مجوز به آزمون' },
      { title: 'نتایج آزمون', navLink: '/resultsExam' }
    ]
  },
  {
    id: 'admin-home7',
    title: 'سازماندهی آزمون',
    icon: <FaUsersCog />,
    children: [
      { title: 'معرفی آزمون', navLink: './IntroductionExams' },
      { title: 'لیست نفرات', navLink: '/listOfPeople' },
      { title: 'عوامل اجرایی مجری', navLink: '/executiveAgents' },
      { title: 'حوزه آزمون', navLink: '/examScope' },
      { title: 'حوزه فرعی', navLink: '/examSecoundScope' },
      { title: 'ملزومات چاپی', navLink: '/printRequirement' },
      { title: 'مدیریت حوزه‌های آزمون', navLink: '/examCenter' },
      { title: 'قرنطینه سوال' },
      { title: 'قرنطینه چاپ', navLink: '/printQuarantine' },
      { title: 'طراح سوال', navLink: '/questionDesigner' },
      { title: 'تولید دفترچه آزمون' },
      {
        title: 'لیست  صورتجلسه ها ',
        navLink: '/scopeManage'
      }
    ]
  },

  {
    id: 'admin-home165',
    title: 'مدیریت پاسخنامه',
    icon: <MdOutlineViewList />,
    children: [
      { title: 'کلید پاسخنامه ها', navLink: '/answerSheet' },
      { title: 'داده پاسخنامه ها', navLink: '/answerResultSheet' },
      { title: 'امتیاز دهی آزمون', navLink: '/examScoring' },
    { title: 'تصحیح پاسخنامه ها', navLink: '/correctionExam' }

      
    ]
    //  { title: 'سازماندهی گزینش' },
    //   { title: 'نتایج گزینش' }]
  },
  {
    id: 'admin-home8',
    title: 'بررسی مدارک',
    icon: <IoDocuments />,
    children: [
      { title: 'بررسی نشده' },
      { title: 'تأیید شده' },
      { title: 'رد شده' },
      { title: 'دارای نواقص' },
      { title: 'دریافتی جدید' },
      { title: 'تأیید نهایی' },
      { title: 'نیاز به حضور' },
      { title: 'بایگانی' }
    ]
  },
  {
    id: 'admin-home9',
    title: 'ارزیابی تکمیلی',
    icon: <FaChartBar />,
    children: [
      { title: 'تعیین مجری', navLink: '/selectPresenter' },
      // "ارزیابی‌های جاری",
      { title: 'لیست نفرات ارزیابی تکمیلی', navLink: '/listOFSupplementaryAssessment' },
      { title: 'سازماندهی ارزیابی' },
      { title: 'مواد ارزیابی تکمیلی' },
      { title: 'مستندات ارزیابی تکمیلی' },
      { title: 'نتایج ارزیابی تکمیلی',navLink:'/evaluationResults' }
    ]
  },
  {
    id: 'admin-home10',
    title: 'گزینش',
    icon: <FaUserCheck />,
    children: [{ title: 'لیست نفرات گزینش' }, { title: 'سازماندهی گزینش' }, { title: 'نتایج گزینش' }]
  }
]
// [
//   {
//     id: 'admin-home',
//     title: 'صفحه اصلی',
//     icon: <Home size={12} />,
//     navLink: '/home'
//   }
// ]
