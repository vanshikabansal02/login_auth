import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
     const containerStyle = {
    textAlign: 'center',
    padding: '40px 20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
  };

  const imageStyle = {
   
    width: '40%%',
    maxWidth: '370px',
    borderRadius: '10px',
    marginBottom: '20px',
     margin: '0 auto 20px',
     display:'block',
  };

  const h1Style = {
    fontSize: '36px',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
  };

  const handwaveStyle = {
    width: '36px',
  };

  const h2Style = {
    fontSize: '24px',
    color: '#555',
    margin: '10px 0',
  };

  const pStyle = {
    fontSize: '16px',
    color: '#777',
    maxWidth: '600px',
    margin: '10px auto 30px',
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <img src={assets.header} alt="" style={imageStyle}/>
      <h1 style={h1Style}>Hey Developer <img src={assets.handwave} alt=""style={handwaveStyle}/></h1>
   <h2 style={h2Style}>Welcome to our app</h2>
   <p style={pStyle}>Lets start with a quick product tour and we will have you up and running in no time!</p>
   <button style={buttonStyle}>Get Started</button>
    </div>
  )
}

export default Header
