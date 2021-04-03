import { Form } from 'reactstrap'
import styles from '../../../styles/edit.module.css'
import { useForm } from "react-hook-form"
import { API_BASE_URL, API_PORT, AddUser_endpoint} from '../../../config'
import isEmail from "validator/lib/isEmail"
import axios from 'axios'

export default function EditUser() {

//Css Stylenames
const {
        form_wrapper, form, form_header, form_group, form_input, btn, form_label


} = styles

//Enpoints and urls

const add_user_url = `${API_BASE_URL}:${API_PORT}/${AddUser_endpoint}`;

//handling User data 
const { register,
        handleSubmit,
        watch, 
} = useForm ();


//function for editing user details 
const onSubmit = (data = {fname, email, username, pnumber}) => {

// const userdata = JSON.parse(localStorage.getItem("user"));
// console.log(userdata)
//   if(userdata) {
//     // const foundUser = JSON(userdata)
//     created_by(userdata.email)
//     console.log('user adding new user')
//   }

console.log('data is ', data)
axios.put( add_user_url, 

    {
        name: data.fname,
        email: data.email,
        username: data.username,
        number: data.pnumber
        
        
    }
    
        
)
.then(resp =>{

      // On successful editing of user 
      console.log(resp)
      
      if (resp.status == 201 || 200) {

        //store added user details

        localStorage.setItem('user', resp.data)
        console.log(resp.data)
        window.alert('user Edited successfully')
        window.location.reload()
          
      }
      else{
        console.log(resp.data)
      }

      }).catch(err=>{
        console.log('Failed to edit user', err)
        window.alert('Failed to edit user')
        window.location.reload()


      })
      console.log(data);
      
}
  console.log( watch('email'))

//onSubmit={handleSubmit(onSubmit)}

    return(
        <>
            <div className={form_wrapper}>
                <div className={form_header}>
                    <h5>Edit User Profile</h5>
                    
                </div>
                <div className={form}>
                    <Form >

                        <div className={form_group}>
                            {/* <label for="fname" className={form_label}>First Name</label> */}
                            <input type="text" 
                                className={form_input} 
                                placeholder="Full Name" 
                                name="fname"
                                id="fname" 
                                ref={register({ required: true, minLength:3 })} /> 

                        </div>
                        <div className={form_group}>
                            {/* <label for="email" className={form_label}>Email address</label> */}
                            <input type="email" 
                                className={form_input} 
                                placeholder="Email address" 
                                name="email"
                                id="email" 
                                ref={register({ required: true , 
                                    validate: (input) => isEmail (input)
                                })} /> 

                        </div>
                        <div className={form_group}>
                            {/* <label for="fname" className={form_label}>First Name</label> */}
                            <input type="text" 
                                className={form_input} 
                                placeholder="Username" 
                                name="username"
                                id="username" 
                                ref={register({ required: true, minLength:3 })} /> 

                        </div>
                        <div className={form_group}>
                            {/* <label for="age" className={form_label}>Age</label> */}
                            <input type="number" 
                            className={form_input} 
                            placeholder="Phone Number" 
                            name="pnumber"
                            id="pnumber" 
                            ref={ register({ required: true , 
                                    min: 1, max: 10
                            })} /> 

                        </div>
                    
                        <div className={form_group}>
                            <button type="submit" className={btn}  id="addstudent"  value="submit" name="addstudent" >
                                Submit
                            </button>
                        </div>

                    </Form>
                </div>
            </div>
        </>
    )
    
}