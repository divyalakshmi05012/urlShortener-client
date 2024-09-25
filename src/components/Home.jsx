import React from 'react'
import InputShortener from './InputShortener'
import URLDirectory from './URLDirectory'

function Home() {
  return <>
  <div className='input-wrapper'>
    <InputShortener/>
    <div className='subcontainer'>
        <h2>A Simple link but a powerful tool for <span>Youtubers!!</span></h2>
        <h3>Our tool allows you to seamlessly track audience with simple and easy-to-remember yet powerful links.</h3>
        <h3>Shorten Your URL and share Easily.</h3>
    </div>
  </div>
  
  <URLDirectory/>
  
  
  </>
}

export default Home