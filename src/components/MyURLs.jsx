import React, { useEffect, useState } from 'react'
import config from '../utils/config';
import ApiRoutes from '../utils/ApiRoutes';
import toast from 'react-hot-toast';
import AxiosService from '../utils/AxiosService';
function MyURLs() {

  let id = sessionStorage.getItem('id')
  let auth_token = sessionStorage.getItem('token')

  let [profileData,setProfileData] = useState("")
  let [urlData,setUrlData] = useState("")
  const fetchdata = async() => {
        try {
          let res = await AxiosService.get(`${ApiRoutes.GET_USER_BY_ID.path}/${id}`,{
            authenticate:ApiRoutes.GET_USER_BY_ID.auth
              })
          if (res.status == 200){
            setProfileData(res.data.data)
          }
        } catch (error) {
          toast(error.message)
        }
  }

  const fetchUrlData = async() => {
    try {

      let res = await AxiosService.get(`${ApiRoutes.GET_URL_BY_USERID.path}/${id}`,{authenticate:ApiRoutes.GET_URL_BY_USERID.auth})
      if(res.status == 200){
        setUrlData(res.data.data)
        
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(auth_token){
      fetchdata()
      fetchUrlData()
    }
    else
      logout()
  },[])

  return <>
  <div className='wrapper'>
  <div className="profile-wrapper">
  <div className="container">
    <img src="./images/dummy1.png" alt="" className="profile-img"/>
    <div className="content">
      <div className="sub-content">
        <h1>{profileData.firstName}&nbsp;{profileData.lastName}</h1>
        <span>{profileData.email}</span>
        <p>{profileData.role}</p>
        <span className="location">Created At: {profileData.createdAt}</span>
      </div>
      <div className='inner-data'>
        <span>Status</span>&nbsp;<span className={profileData.status?"active":"inactive"}>{profileData.status?"Active":"Inactive"}</span>
      </div>
      
    </div>  
  </div>
  </div>
 
  <div className='myurl-wrapper'>
  <div>
    <h5>MYURLS</h5>
  </div>
  { (urlData.length !== 0) ?
 
 <div className='table-responsive'>
 <table className='url-table'>
     <thead>
         <tr>
         <th>#</th>
         <th className='hidden-xs'>LONG URL</th>
         <th>SHORT URL</th>
         <th>CLICKS</th>
         <th className='hidden-xs'>Created At</th>
         </tr>
     </thead>
     <tbody>
       {
         urlData.map((url,i) => {
           return <tr key={i}>
           <td>{i+1}</td>
           <td className='hidden-xs'>{url.url}</td>
           <td><a href={`${config.API_URL}/url/${url.shortUrlId}`} target="_blank">{`https://tiny/${url.shortUrlId}`}</a></td>
           <td>{url.clicks}</td>
           <td className='hidden-xs'>{new Date(url.date).toLocaleDateString()}</td>
           </tr>
         })
       }
       
     </tbody>
     </table>
   </div>
   :
   <div><h5>No Records</h5></div>
 }
  </div>
  </div> 
  </>
}

export default MyURLs