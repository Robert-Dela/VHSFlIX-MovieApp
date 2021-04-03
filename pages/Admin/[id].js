import { useState } from 'react'
import Layout from '../../components/Layout/layout'
import styles from '../../styles/Home.module.css'
import { MdArrowBack } from 'react-icons/md'
import Link from 'next/link'
import EditUser from '../../components/Admin/Users/editUser'

export default function Home() {
  const { back_icon,

  }= styles



  return (
    <Layout>
        <Link  href="/" >
            <a className={back_icon}><MdArrowBack /> Back</a>
        </Link>
        <EditUser/>
        

    </Layout>
  )
}
