import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navbarStyle={
    display:'flex',
    justifyContent:'space-between',
    alignIems:'center',
    padding:'12px 24px',
    backgroundColor:'#f5f5f5',
    borderBottom:'1px solid #ddd',
  };
  const logoStyle={
height:'40px',
  };
  const buttonStyle={
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  };
  
  const arrowIconStyle = {
    height: '16px',
    marginLeft: '8px',
  };
  const navigate=useNavigate()
  return (
    <div style={navbarStyle}>
      <img src={assets.logo} alt="" style={logoStyle} />
      <button style={buttonStyle} onClick={()=>navigate('/login')}>Login <img src={assets.arrow} alt=""  style={arrowIconStyle}/></button>
    </div>
  )
}

export default Navbar
