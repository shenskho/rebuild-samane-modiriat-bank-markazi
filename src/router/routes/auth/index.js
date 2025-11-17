import { lazy } from 'react';

// 1. تغییر import برای اشاره به کامپوننت جدید ما
const Login = lazy(() => import('@views/Login'));

const AuthenticationRoutes = [
  {
    // 2. مسیر /login بدون تغییر باقی می‌ماند
    path: '/login',
    // 3. کامپوننت به Login تغییر می‌کند
    element: <Login />,
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: true
    }
  }
  // مسیر ExteraLogin را برای جلوگیری از تداخل حذف می‌کنیم یا می‌توانید آن را نگه دارید
];

export default AuthenticationRoutes;
