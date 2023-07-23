import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'

const Post = () => {
  return (
    <>
    <h2 style={{textAlign:'center'}}>Tell ma about your product</h2>

    <div style={{display:'flex',
    alignItems:'center',
    justifyContent:'center',
    width:'100%',
    height:'80vh'}}>
        
        <div>
          <a  href={`https://wa.me/0757198515`} target="_blank" rel="noreferrer noopener" style={{color:'orangered',listStyle:'none',textDecoration:'none'}}>
                    <button style={{backgroundColor:'red'}}>get in touch <FaWhatsapp/>Whatsapp</button>
                    </a>  
        </div>
        
    </div>
    </>
  )
}

export default Post