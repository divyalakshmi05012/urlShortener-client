// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import ApiRoutes from '../utils/ApiRoutes'
// import toast from 'react-hot-toast'
// import { useNavigate } from 'react-router-dom'
// import AxiosService from '../utils/AxiosService'

// function Signin() {

//     let navigate = useNavigate()
//     let [email, setEmail] = useState("")
//     let [password,setPassword] = useState("")
   
    

//     var url = window.location;
//     var link = new URLSearchParams(url.search).get('token');


//     const activateNewAccount = async(e) => {
//         e.preventDefault()
//         try {
//             if(link){
//               let res = await AxiosService.post(`${ApiRoutes.ACTIVATE_NEW_ACCOUNT.path}`,
//                 {
//                   email,password,link
//                 },
//                 {authenticate:ApiRoutes.ACTIVATE_NEW_ACCOUNT.auth})
//                 if(res.status === 200){
//                   toast.success(res.data.message)
//                 }
//             }
//           } catch (error) {
//             toast.error(error.message)
//           }
        
//     }
  
  
//     const handleSigin = async(e) => {
//       e.preventDefault()
//         try {
//             let res = await AxiosService.post(`${ApiRoutes.SIGNIN.path}`,{
//               email,
//               password
//             },{authenticate:ApiRoutes.SIGNIN.auth})
//             if(res.status === 200){
//                 sessionStorage.setItem('token',res.data.token);
//                 sessionStorage.setItem('role',res.data.payload.role);
//                 sessionStorage.setItem('id',res.data.payload.userId);
//                 toast.success(res.data.message);
//                 navigate('/home')
//             }

//         } catch (error) {
//           //console.log(error)
//             toast.error(error.message)
//         }
      
//     }

//   return <>
//       <div className="Auth-form-container">
//         <form className="Auth-form">
//           <div className="Auth-form-content">
//             <h3 className="Auth-form-title">Sign In</h3>
//             <div className="text-center">
//               Not registered yet?{" "}
//                 <Link to="/signup">Sign Up</Link>
//             </div>
//             <div className="form-group mt-3">
//               <label>Email address</label>
//               <input
//                 type="email"
//                 name="email"
//                 className="form-control mt-1"
//                 placeholder="Enter email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
            
//             <div className="form-group mt-3">
//               <label>Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 className="form-control mt-1"
//                 placeholder="Enter password"
//                 value = {password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>

//             {(link)?<div className="d-grid gap-2 mt-3">
//               <a href="#" onClick={(e) => activateNewAccount(e)}>
//                 Activate my account
//               </a>
//             </div>:<></>}
//             <div className="d-grid gap-2 mt-3">
//               <button type="submit" className="btn btn-primary" onClick={(e) => handleSigin(e)}>
//                 Submit
//               </button>
//             </div>
//             <p className="text-center mt-2">
//               Forgot <Link to="/forgotpwdcheck">password?</Link>
//             </p>
//           </div>
//         </form>
//       </div>
//   </>
// }

// export default Signin
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ApiRoutes from '../utils/ApiRoutes';
import toast from 'react-hot-toast';
import AxiosService from '../utils/AxiosService';

function Signin() {
    let navigate = useNavigate();
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [isActivating, setIsActivating] = useState(false);

    // Get the token from the URL if present
    const url = window.location;
    const link = new URLSearchParams(url.search).get('token');

    const activateNewAccount = async (e) => {
        e.preventDefault();
        try {
            if (link) {
                let res = await AxiosService.post(`${ApiRoutes.ACTIVATE_NEW_ACCOUNT.path}`, {
                    email,
                    password,
                    link
                }, { authenticate: ApiRoutes.ACTIVATE_NEW_ACCOUNT.auth });

                if (res.status === 200) {
                    toast.success(res.data.message);
                    navigate('/login'); // Redirect to login after activation
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            let res = await AxiosService.post(`${ApiRoutes.SIGNIN.path}`, {
                email,
                password
            }, { authenticate: ApiRoutes.SIGNIN.auth });

            if (res.status === 200) {
                sessionStorage.setItem('token', res.data.token);
                sessionStorage.setItem('role', res.data.payload.role);
                sessionStorage.setItem('id', res.data.payload.userId);
                toast.success(res.data.message);
                navigate('/home');
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <>
            <div className="Auth-form-container">
                <form className="Auth-form">
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Sign In</h3>
                        <div className="text-center">
                            Not registered yet?{" "}
                            <Link to="/signup">Sign Up</Link>
                        </div>
                        <div className="form-group mt-3">
                            <label>Email address</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control mt-1"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {/* Show activation link if there's a token */}
                        {link && (
                            <div className="d-grid gap-2 mt-3">
                                <a href="#" onClick={(e) => activateNewAccount(e)}>
                                    Activate my account
                                </a>
                            </div>
                        )}
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary" onClick={(e) => handleSignIn(e)}>
                                Submit
                            </button>
                        </div>
                        <p className="text-center mt-2">
                            Forgot <Link to="/forgotpwdcheck">password?</Link>
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Signin;
