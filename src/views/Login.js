import React, { useState } from 'react';
import { login } from '@api/auth';
// 1. وارد کردن ابزارهای نمایش پیام
import toast from 'react-hot-toast';
import ToastContent from '@src/components/theme/toast/SimpleToastContent';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await login({ userName: username, password });

      // 2. نمایش پیام موفقیت با toast
      toast(t => (
        <ToastContent t={t} message={'خوش آمدید'} />
      ), {
        duration: 5000,
        style: {
          background: 'var(--bs-success)',
          color: 'var(--bs-white)'
        }
      });

      // هدایت کاربر به صفحه داشبورد پس از لاگین موفق
       setTimeout(() => {
        window.location.href = '/home';
      }, 1000);

    } catch (error) {
      // پیام خطا توسط interceptor نمایش داده می‌شود، نیازی به کار اضافه نیست
      console.error('Failed to login:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h2>Login</h2>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ marginBottom: '10px', padding: '8px' }}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ marginBottom: '20px', padding: '8px' }}
        />
        <button type="submit" disabled={loading} style={{ padding: '10px', cursor: 'pointer' }}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
