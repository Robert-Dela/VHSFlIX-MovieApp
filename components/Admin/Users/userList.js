import axios from 'axios'
import { MdDelete, MdEdit } from 'react-icons/md'
import {useState, useEffect} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { API_BASE_URL, API_PORT, AddUser_endpoint} from '../../../config'
import styles from '../../../styles/display.module.css'


export default function UserList(){

    //Css Style ClassNames
    const { table_btn, Table, table_action,

    } = styles

    //Enpoints and urls

    const list_users_url = `${API_BASE_URL}:${API_PORT}/${AddUser_endpoint}`
    // const list_users_url = 'https://jsonplaceholder.typicode.com/users'



    //  State objects

    const [users, setUsers] = useState([])

    useEffect(() => {
        getData()
    }, [])

    //function to fetch users
    const getData = async () => {
        const response = await axios.get(list_users_url)
        setUsers(response.data)
    }
    

    //function to remove users from list
    const removeData = (id) => {  

        axios.delete(`${list_users_url}/${id}`).then(res => {
            const del = users.filter(user => id !== user.id)
            setUsers(del)
        })
    }

    //Header function for user list

    const renderHeader = () => {
        let headerElement = ['Name', 'Email', 'Username', 'Action']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    //mapping user details to table

    const renderBody = () => {
        return users && users.map(({ id, name, email, username }) => {
            return (
                <tr key={id}>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{username}</td>
                    
                    <td className={table_action}>
                        <MdEdit className={table_btn}/>

                        <MdDelete className={table_btn} aria-label='Close modal'
                        onClick={() => removeData(id)}/>                        
                    </td>
                </tr>
            )
        })
    }

    return(
        <>
            <table className={Table}>
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </table>

        </>

    );

}


 