import React, { useState } from 'react'
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

function ForgotPasswordEmailCheck() {
    let [email,setEmail] = useState("")

    const ForgotPassword = async(e) => {
        e.preventDefault()
          try {
              let res = await AxiosService.post(`${ApiRoutes.FORGOT_PASSWORD.path}`,{
                  email
              },{authenticate:ApiRoutes.FORGOT_PASSWORD.auth})
              if(res.status === 200){
                  toast.success(res.data.message);
              }
  
          } catch (error) {
             toast.error(error.message)
          }
    }

  return <>
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
                className="form-control mt-1"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary" onClick={(e) => ForgotPassword(e)}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
  
  </>
}

export default ForgotPasswordEmailCheck