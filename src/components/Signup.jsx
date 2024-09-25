import React, { useState, useEffect} from 'react'
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom'
import ApiRoutes from '../utils/ApiRoutes';
import toast from 'react-hot-toast';
import AxiosService from '../utils/AxiosService';


function Signup() {

      let navigate = useNavigate();
      let [role, setRole] = useState("User")

      const initialValues = {firstName:"", lastName:"",email:"",password:""}
      const [formValues, setFormValues] = useState(initialValues);
      const [formErrors, setFormErrors] = useState("");
  
      const handleChange = (e) => {
        e.preventDefault();
        const { name, value} = e.target;
        setFormValues({...formValues,[name]: value})
      }

      const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!values.firstName){
          errors.firstName = "firstName is required";
        }else
        if (!values.lastName){
          errors.lastName = "lastName is required";
        }else
        if (!values.email){
          errors.email = "email is required";
        }else if(!regex.test(values.email)){
          errors.email = "This is not a valid email";
        }else
        if (!values.password){
          errors.password = "password is required";
        }
       
        return errors;
      }

    
      const handleSubmit = (event) => {
        event.preventDefault();
        
       setFormErrors(validate(formValues));
       
        const singnupFormData = new FormData();
        singnupFormData.append("firstName",formValues.firstName)
        singnupFormData.append("lastName",formValues.lastName)
        singnupFormData.append("email",formValues.email)
        singnupFormData.append("password",formValues.password)
        singnupFormData.append("role",role)
        
       
        if(Object.keys(formErrors) == 0)
        handleSignUp(singnupFormData)
        
       
      }

      const handleSignUp = async(singnupFormData) => {
        
          try {
              let res = await AxiosService.post(`${ApiRoutes.SIGNUP.path}`,singnupFormData
              ,{authenticate:ApiRoutes.SIGNUP.auth})
              if(res.status === 201){
                  toast.success(res.data.message);
                  navigate('/signin')
              }
  
          } catch (error) {
            
              toast.error(error.message)
          }
       
      }
  

  return <>
      <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <Link to="/signin">Sign In</Link>            
          </div>
          <div className="form-group mt-3">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              className="form-control mt-1"
              placeholder="e.g Jane" 
              value = {formValues.firstName}
              onChange={handleChange}
            />
          </div>
          <p className='error'>{(formErrors.firstName)?formErrors.firstName:""}</p>
          <div className="form-group mt-3">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              className="form-control mt-1"
              placeholder="e.g Doe"
              value = {formValues.lastName}
              onChange={handleChange}
            />
          </div>
          <p className='error'>{(formErrors.lastName)?formErrors.lastName:""}</p>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              className="form-control mt-1"
              placeholder="Email Address"
              value = {formValues.email}
              onChange={handleChange}
              required
            />
          </div>
          <p className='error'>{(formErrors.email)?formErrors.email:""}</p>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control mt-1"
              placeholder="Password"
              value = {formValues.password}
              onChange={handleChange}
              required
            />
          </div>
          <p className='error'>{(formErrors.password)?formErrors.password:""}</p>
          <div className="form-group mt-3">
              {['Admin', 'User'].map((role,i) => (
                  <div key={i} className="mb-3">
                    <Form.Check // prettier-ignore
                      inline
                      type='radio'
                      name="role"
                      id={role}
                      value={role}
                      label={role}
                      onChange={(e)=>setRole(e.target.value)}
                    />
                  </div>
              ))}
          </div>
      
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" onClick={(e) => handleSubmit(e)}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  
  </>
}

export default Signup