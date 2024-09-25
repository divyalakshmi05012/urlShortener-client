import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import toast from 'react-hot-toast';
import Form from 'react-bootstrap/Form';
import ApiRoutes from '../utils/ApiRoutes';
import AxiosService from '../utils/AxiosService';


function Dashboard() {

    var id = useParams().id;
    let logout = useLogout();
    let auth_token = sessionStorage.getItem('token')
    let [userData,setData] = useState([])


    const fetchData = async() => {
        try {
            let res = await AxiosService.get(`${ApiRoutes.GET_ALL_USERS.path}`,{
            authenticate:ApiRoutes.GET_ALL_USERS.auth
            })
            if(res.status === 200 ){
                setData(res.data.data)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    
    const changeStatus = async(email,status) => {
        status = status?false:true
        try {
            let res = await AxiosService.put(`${ApiRoutes.CHANGE_STATUS.path}`,{
                email,status
            },{authenticate:ApiRoutes.CHANGE_STATUS.auth})
            if(res.status === 200 ){
              toast.success(res.data.message)
              fetchData()
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => {
        if(auth_token)
            fetchData()
          else
            logout()
    },[])


    
  return<>
       <div className='urldocs'>
    <h5>User Details</h5>
  </div>
  <div>
  <table className='user-table'>
      <thead>
          <tr>
          <th>#</th>
          <th>Name</th>
          <th className='hidden-xs'>Email</th>
          <th>Status</th>
          <th className='hidden-xs'>Created At</th>
          </tr>
      </thead>
      <tbody>
        {
          userData.map((user,i) => {
            return <tr key={i}>
            <td>{i+1}</td>
            <td>{`${user.firstName}`.concat(" ",`${user.lastName}`)}</td>
            <td className='hidden-xs'>{user.email}</td>
            <td>
            <Form.Check // prettier-ignore
                type="switch"
                id="custom-switch"
                checked={user.status}
                onChange={()=> changeStatus(user.email,user.status)}
                />
            </td>
            <td className='hidden-xs'>{new Date(user.createdAt).toLocaleDateString()}</td>
            </tr>
          })
        }
        
      </tbody>
      </table>
    </div>
  
  </>
}

export default Dashboard