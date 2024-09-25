import React, { useEffect, useState } from 'react';
import config from '../utils/config';
import ApiRoutes from '../utils/ApiRoutes';
import toast from 'react-hot-toast';
import AxiosService from '../utils/AxiosService';

function URLDirectory() {
    let [urldata,setData] = useState([])
  
  const fetchdata = async() => {
    try {
        let res = await AxiosService.get(`${ApiRoutes.GETALL_URL.path}`,{authenticate:ApiRoutes.GETALL_URL.auth})
        if(res.status == 200){ 
            setData(res.data.data)
        }
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

  useEffect(() => {
    fetchdata()
  },[])
  return <>

  <div className='urldocs'>
    <h4>Checkout the URL directory</h4>
  </div>
  { (urldata.length !== 0) ?
 
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
          urldata.map((url,i) => {
            return <tr key={i}>
            <td>{i+1}</td>
            <td className='hidden-xs'>{url.url}</td>
            <td><a href={`${config.API_URL}/url/${url.shortUrlId}`}  target="_blank">{`https://tiny/${url.shortUrlId}`}</a></td>
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
  </>
}

export default URLDirectory