import styles from "../styles/Home.module.css"
import React from 'react'
import Link from "next/link"
import Image from "next/image"
import logo from "../assets/logo.png"

const index = () => {
  return (
    <div className={styles.main}>
      <Image alt="logo" className={styles.logo} src={logo} />
      <h1>WELCOME</h1>
      <h2>Ask, or will be asked</h2>
      <p>Feel free, to ask any question, find the right answer (or not very right), if you know everything, show your wisdom and help the other askers. Let's go!!!</p>
      <Link href="./hero/Hero" className={styles.link}>
        Please, Welcome
      </Link>
    </div>
  )
}

export default index