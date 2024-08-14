import LoginCard from "./screensComponent/Login/LoginCard";

import styles from '@/styles/login/login.module.css';

export default function Login() {
  return (
    <div >
      <img src="/pizza.jpg" alt="" className={styles.background} />
      <LoginCard />
    </div>
  )
}
