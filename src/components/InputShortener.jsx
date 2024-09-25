import React, { useState } from 'react'
import ApiRoutes from '../utils/ApiRoutes'
import toast from 'react-hot-toast'
import AxiosService from '../utils/AxiosService'
import config from '../utils/config'

function InputShortener() {

  let id = sessionStorage.getItem('id')
  let [url, setUrl] = useState("");
  let [shortUrl,setShortUrl] = useState("");

  const handleSubmit = async(e)=> {
    e.preventDefault();
    try {
      let res = await AxiosService.post(`${ApiRoutes.CREATE_SHORTURL.path}`,{
        id,
        url
      },{authenticate:ApiRoutes.CREATE_SHORTURL.auth})
      setUrl("");
      if(res.status === 200){
          toast.success(res.data.message);
          setShortUrl(res.data.shortUrl);
      }

    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  async function writeClipboardText() {
    try {
      await navigator.clipboard.writeText(`${config.API_URL}/url/${shortUrl}`);
    } catch (error) {
      console.error(error.message);
    }

  }

  return <>
        <div className="maincontainer">
            <h1>Shorten Your Looooong Links :)</h1>
            <form>
              <p>Linkly is an efficient easy-to-use shortening service that helps share your URLs easily.</p>
              <label>Enter or Paste Your long URL:</label>
              <input type="text" 
              id="long-url" 
              name="long-url"
              onChange={(e)=> setUrl(e.target.value)}/>
              <button 
              type="button" 
              id="shorten-btn"
              onClick={(e)=>handleSubmit(e)}>Shorten</button>
            </form>
            {
              shortUrl?
            <div id="short-url-container">
            <p>Here's your shortened URL:</p>
            <div id="short-url">
                <a 
                href={`${config.API_URL}/url/${shortUrl}`}
                target="_blank"
                > https://tiny/{shortUrl}</a>
                
                <button className="copy-button" type="button" id="copy-btn" onClick={() => writeClipboardText()}>Copy</button>
            </div>
            </div>
            :<></>
            } 
        </div>
  </>
}

export default InputShortener