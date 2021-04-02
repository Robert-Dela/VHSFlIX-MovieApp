import { useRef, useCallback, useEffect } from "react"
import { MdClose } from 'react-icons/md'
import { useSpring, animated } from 'react-spring'
import styles from '../../styles/modal.module.css'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import {Form } from 'reactstrap'
import { useForm } from "react-hook-form"
import { API_BASE_URL, API_PORT, AddUser_endpoint} from '../../config'
import isEmail from "validator/lib/isEmail"


export default function Modal({ showmodal, setshowmodal }){

     //Enpoints and urls
  
     const add_user_url = `${API_BASE_URL}:${API_PORT}/${AddUser_endpoint}`;
  
     //handling User data 
     const { register,
             handleSubmit,
             watch, 
           } = useForm ();
   
// Css Styling classnames
const {
        modal_wrapper, closeModalButton, modal_header, form, 
        form_group, form_input, btn, form_label


} = styles


  // Pop up modal function
  const modalRef = useRef();

  const animation = useSpring({
      config: {
      duration: 250
      },
      opacity: showmodal ? 1 : 0,
      transform: showmodal ? `translateY(0%)` : `translateY(-100%)`
  });

  const closeModal = e => {
      if (modalRef.current === e.target) {
        setshowmodal(false);
      }
  };
    
  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showmodal) {
        setshowmodal(false);
          console.log('I pressed');
        }
    },
      [setshowmodal, showmodal]
  );
    
  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  },
    [keyPress]
  );

  
  //function for adding new user 
  const onSubmit = (data = {fname, email, username, password}) => {
    
    // const userdata = JSON.parse(localStorage.getItem("user"));
    // console.log(userdata)
    //   if(userdata) {
    //     // const foundUser = JSON(userdata)
    //     created_by(userdata.email)
    //     console.log('user adding new user')
    //   }

    console.log('data is ', data)
    axios.post( add_user_url, 

        {
          name: data.fname,
          email: data.email,
          username: data.username,
          password: data.password
          
      }
      
          
      )
.then(resp =>{

      // On successful addition of user 
      console.log(resp)
      
      if (resp.status == 201 || 200) {

        //store added user details

        localStorage.setItem('user', resp.data)
        console.log(resp.data)
        window.alert('user added successfully')
        window.location.reload()
          
      }
      else{
        console.log(resp.data)
      }

      }).catch(err=>{
        console.log('Failed to add user', err)
        window.alert('Failed to add user')
        window.location.reload()


      })
      console.log(data);
      
  }
  console.log( watch('email'))


  return(
    <>
        {showmodal ? (
            <div onClick={closeModal} ref={modalRef}>   
                <animated.div style={animation}>
                    <div className={modal_wrapper} showmodal={showmodal}>
                        <div className={modal_header}>
                            <h5>Add User</h5>
                            
                        </div>
                        <div className={form}>
                            <Form onSubmit={handleSubmit(onSubmit)}>

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
                                    {/* <label for="fname" className={form_label}>First Name</label> */}
                                    <input type="password" 
                                        className={form_input} 
                                        placeholder="Password" 
                                        name="password"
                                        id="password" 
                                        ref={register({ required: true, minLength:7 })} /> 

                                </div>
                                <div className={form_group}>
                                    <button type="submit" className={btn}  id="addstudent"  value="submit" name="addstudent" >
                                        Submit
                                    </button>
                                </div>

                            </Form>
                        </div>
                        <MdClose className={closeModalButton}
                            aria-label='Close modal'
                            onClick={() => setshowmodal(prev => !prev)}
                        />
                    </div>
                </animated.div>
            </div>
        ) :null}
    </>
  )
}
