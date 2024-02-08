'use client'

import { useState } from 'react';
import styles from './login.module.css';
import { useRouter } from 'next/navigation'; 
import axios from 'axios';

import { toast } from 'react-hot-toast'

export default function Page() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post('/api/admin', user); 
      console.log('Login success', response.data);
      toast.success('Login Succes')
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
      
      if (error.response && error.response.status === 401) {
        toast.error('Incorrect email or password');
      } else {
        toast.error('Login failed. Please try again later.');
      }
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.h2}>Login</h2>
          <form className={styles.form} onSubmit={handleLogin}>
            <input
              className={styles.input}
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            />
            <input
              className={styles.input}
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />
            <button className={styles.button} type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
