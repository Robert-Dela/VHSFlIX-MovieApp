import { useState } from 'react'
import Layout from '../components/Layout/layout'
import styles from '../styles/Home.module.css'
import { MdLibraryAdd } from 'react-icons/md'
import Modal from '../components/Layout/Modal'
import UserList from '../components/Admin/Users/userList'

export default function Home() {
  const { add_icon, table, btn,

  }= styles

// Pop up modal
const [showmodal, setshowmodal] = useState(false);

const openModal = () => {
    setshowmodal(prev => !prev);
};

  return (
    <Layout>
        <button className={btn}  id="modalpopup" name="modalpopup" onClick={openModal}>
          <MdLibraryAdd className={add_icon}/> Add User
        </button>

        <Modal showmodal={showmodal} setshowmodal={setshowmodal} />
      
        <div className={table}>
          <UserList/>
        </div>

    </Layout>
  )
}
