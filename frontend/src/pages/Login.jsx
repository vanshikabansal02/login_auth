import React, { useContext,useState } from 'react'
import { assets } from '../assets/assets'

import { useNavigate } from 'react-router-dom'
import { AppContent} from '../context/AppContext'

const Login = () => {
  const navigate=useNavigate()
  const {backendUrl,setIsLoggedIn}=useContext(AppContent)
  const [state,setState]=useState('Sign Up')
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  return (
    <div>
     <img onClick={()=>navigate('/')} src={assets.logo} alt="" />
     <div>
      <h2>{state=='Sign Up'? 'Create account':'Login'}</h2>
      <p> {state=='Sign Up'? 'Create your account':'Login to your account'}</p> 
<form >
  {
    state==='Sign Up'&&(
  
<div>
  <input onChange={e=>setName(e.target.value)}  value={name} type="text"placeholder='Full name' required />
</div>)}

<div>
  <input   onChange={e=>setEmail(e.target.value)}  value={email} type="email"placeholder='email id' required/>
</div>
<div>
  <input  onChange={e=>setPassword(e.target.value)}  value={password} type="password"placeholder='password'required />
</div>
<p onClick={()=>navigate('/')}>Forgot Password</p>
<button>{state}</button>
</form>
{state==='Sign Up'?(<p>Already have an account?{' '}
  <span onClick={()=>setState('Login')}>
    Login here
  </span>
</p>):
(<p>Dont have an account?{' '}
  <span onClick={()=>setState('Sign Up')}>Sign Up</span>
</p>)}


     </div>
    </div>
  )
}

export default Login
