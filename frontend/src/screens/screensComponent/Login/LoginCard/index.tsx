import httpRequest from '@/controllers/httpRequest';
import SaveUserData from '@/controllers/SaveUserData';
import { useState } from 'react';
import { toast } from 'react-toastify';
import styles from './loginCard.module.css';

export default function LoginCard() {
  const [name, setName] = useState<string>();
  const [password, setPassword] = useState<string>();

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(await new SaveUserData('role').getData());

    await httpRequest.post('/users/login', { name, password })
      .then(req => {
        const data = req.data;
        toast.success(data.msg)
        new SaveUserData('token').saveData(data.data.token);
        new SaveUserData('name').saveData(data.data.user.name);
        new SaveUserData('role').saveData(data.data.user.role);
      })
      .catch(e => {
        toast.error(e.response.data.msg)
      })
  }

  return (
    <form className={styles.loginCard} onSubmit={handleLogin}>
      <h1 className={styles.title}>Login - Salvatore</h1>
      <div className={styles.input}>
        <input type="text" name="name" id='name' value={name} onChange={handleNameChange} required />
        <label htmlFor='name'>Name</label>
      </div>

      <div className={styles.input}>
        <input type="password" id='password' name='password' onChange={handlePasswordChange} value={password} required />
        <label htmlFor="password">Password</label>
      </div>

      <button className={styles.loginBtn} type='submit'>Login</button>
    </form>
  )
}
