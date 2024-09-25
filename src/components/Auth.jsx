import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'


function Auth() {

  return <> 
  
    <div className='welcome'>
      <h1>Welcome to our website</h1>
      <h2>Please <Link to='/signin'>Sign In</Link> to Continue</h2>
    </div>
 
  </>
}

export default Auth