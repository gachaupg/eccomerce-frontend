import { useDispatch, useSelector } from "react-redux";
import {FaWhatsapp,FaMoneyCheckAlt} from 'react-icons/fa'
import { TiFlag } from 'react-icons/ti'; // TiFlag represents the flag icon from the "react-icons" package

import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { addToCart } from "../slices/cartSlice";
import { useEffect, useState } from "react";
import axios from "axios";
// import { useGetAllProductsQuery } from "../slices/productsApi";

const excerpt = (str) => {
  if (str.length > 45) {
    str = str.substring(0, 45) + " ...";
  }
  return str;
};
const Home = () => {
  function compare(a,b){
    if(a._id <b._id){
      return 1
    }
    if(a._id >b._id){
      return -1
    }return 0
  }
  
  const {items: data , status } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users,setUsers]=useState([]);
  // const { data, error, isLoading } = useGetAllProductsQuery();
  const [query,setQuery]=useState('')
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };
 
  useEffect(()=>{
    async function fetchData(){
    try {
      const res= await axios.get(`http://localhost:5000/api/products`)
      
    res.data.sort(compare)
    const result = res.data.filter((_, index) => index < 30);
    setUsers(  result)
    console.log(users);
    
    } catch (error) {
      console.log(error);
      
    }
    }
    fetchData()
      },[])

  return (
    <div className="home-container">
      {status === "success" ? (
        <>
<div className='search'>      
      <input type="text" placeholder='Search by title...' onChange={(e)=>setQuery(e.target.value)} />
     
</div>


<div className="test-trust">
<h2>
  Trusted the following countries</h2>
<div className="flags">
<div>
  <img width={150} height={100} src="data:image/png;base64,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" alt="" />
</div>
<div>
  <img width={150} height={100}  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPwAAACnCAMAAAACPMFhAAAAtFBMVEUAek3eODEAI5X///8AAAD/thIAeEphmnxBimX99vYAIJQYLJgAeU4Ad0//uQ3eNi//vRMAcT4AAI0AHZTdLSUAbDXcHhKSlTnMlA9YhkTssRvT1efj7ejmeXXerCH0xsXW5N2unTG0gg2ZvKo2f0l7WQnyrxGnmzNQhEaIjMCArZbbFgVLkG4dFQITDQGKkzpdRAcpNpvogn6emTZxUgjlcW0lGgMqglkzP57opxG3oS6QlMOGjmUwAAAEkklEQVR4nOWdi1oTMRCFh91tBSmlIKigoqJWFC/1gqC+/3u5EAxlN8nmMptkJucJ+L+fczrbwlcAU6afnte9bL04391gESN7S7/3pk9fv9w4SP1zo2QAHmBvUyX/Owv5g/AwPWQrfxheK/8xefk28LrmH1CXbwXPtfmW8Dxn3xaeZfPt4XWzT7j5DvAa+TVd+U7wuubvEpXvBq9rPtFr3xVe13yS8p3htfIJNt8Dns/B5wPfyr9Uzj615vvBM5l9T3gezYcdX3oGsw8/dmbFyof5yVt/+cRnHyaT+RNk+TWVg6+FnwTJp/wO3zX8CPJpNF/AjyGfQPNv4Vt87Nmv85cv4cPk0zz47uAD5VP8VG8dfozmZy3/Hvwo8jNufgd+jObnO/td+DFmP9vnfFjOe/T48jM9+ODL00VffsjBR2j2oWl+TnDl0zn4WvgGXT6Va/8aHl8+kdkX8E0TR35mzf8PH0l+XgefhMdvfv4H3x1807wrrfnr8LGan438+/CFye/AR3rNv8hj9rvw+PIzPvj68AUdfAr4cpqvhI8z++nf3tXAR5Kf+ODTwTefoxx8F0nla+FLmH0DPP/ZN8Gzn30zfKxHvfPdJBmAj9X8jTzhlbM/wZZfb6XIMHwrfx6h+SliAx/p4IsfO/g4sx89lvBxDr5c4SN9sJMrfKTZzxSe3+w7wce59nOFZzb7rvCsZt8ZfgT5D1LFAx69+dNU8YFHl58sXvDo8hPFD56JfF94tfyvtOR7w6MffAkSAK9+zqckPwieevPD4NUHHxn5gfC05QfDU5YfDk949jHgyb7mo8BTbT4SfPNL9Q5f7vKx4Fv5y/6v/slZ1vR48CsF/PFRGfCnis17X8av/Urxj0rHZ2UMHkXtgANPUzugwCu0LwhoBwR4stohHJ5o20XK1Q6B8KS1QxA8ce0QAk9dO/jD09cO3vAMtIMnPAvt4AePrJ3SR9TI2qd7m6niDq/S/jrgz1IuX5H5sxRs7Ycfk6E7wyO3PaV2V3j0tqfU7gjPqO2u8Kza7gjPTrs9PEPttS08R+21HTy3kZexgGeqvbaAj9L2Z1fbKTIEH0X7h/1HD1PEDL9a9tjnx0fY2r/tV2lihI+lPRG7CT5O27dTaTfCK7XP+Gg3wDNvuxGee9sN8Mq2B2hXnnSptWvgTxc99kVI22dZalfCxxn5Krn2SgFfwMjLQFd7ASMvA8Pa2Y28DNzTHuG5PelJ1wmsa++zc227CIylPb9Lvh8waefbdhEo6qTrBIrVXt3Al9h2ESjttX098Lt/0i3ZnnSdKL7KpRDtVR++hJGX6X59058A7dk+t+sCaNrpjLwMYGmn1XYRGFP7Vc7aqzX4gkZeBkbTnu/Iy9x+NSvv53ZdoFjt1Q18iW0XgQJHXgZCXtuBsvY2UGbbRXzRibddpFztlS88vQc4Zby0U3tu18VHu3Lk/1LTXnnAU3xu18VZO4ORl0HRTq/tIm7alSNPse0iLtq5jLxMudore3hmbRex1a4cedLaK0t4TdvJPLfrYqWdzUnXiYV2jm0XGdbOsu0ig+xstbf5B2xsr9DEOQ7LAAAAAElFTkSuQmCC" alt="" />
</div>
<div>
  <img width={150} height={100} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPwAAACoCAMAAADzanO0AAAAD1BMVEX///8AkkbOKzcAhB7IAACRJZmCAAAAxklEQVR4nO3PQRUAIAgFsI/aP7Ml4MLbGizV72bAO/0iLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vvyH/AV/cqAEzG8eRAAAAAElFTkSuQmCC" alt="" />
</div>
<div>
  <im width={150} height={100} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAAn1BMVEX///8BIWnIEC735ufEAA1QZpcAF2XHACXHBinRN1DaYnUAGmbYVmsAHWfIDSzGACH88fMADWT++frEAADfeIicpL3u8fba3+nvwcfFABvOH0D21drLFjaQnLr34eTttr7xy9BJWos9UIY0SoMnQH0AKnMAAGDk5+4fN3d8jLGIlLTikJoKMHXZb3wAEmXhhJLrq7XRRFbooKzNMEXWS2GEmdclAAAE8ElEQVRoge2Z6XabOBiGNUCLEFjCGDcsCqhpM2lKGLH4/q9tJLHbhNg4PtNzxu+PxEbSg/S92g3+WtLXL0BKN7QjGbpK+PJ1sTi4w+/wO/xPhtu3g9vg+3YBfw3c3j6Bh/2P7ebz4Zvtz/2DyPGyf/77Hfxa+Ga7eXwBrR5/bWaDsw5u279ewUjfHr9vZjKugdv2029Zay/hPf5lP2Pt5XB7+0PFGrCsDke1n7H2UnhnI4i5RaA2jo2o/dvU2svgm+1zY2Oi0NoULq19G1t7Cdy23xobdV+DUOU6hk+tPR9ub55+f2tsNAhuMmHgnuBH1p4LF6NRxdqLsyhs0ZpJQZ56J/iH/VNj7XnwIxubWpsQBcCMUHpC76w9B35ioxQMnUDERMMQl+wU7z0+2/bHcNt+VrEWNlLY1RpCK1Dpo/ecWPv0IfyfGRtHsegilM/gX/avy/DXx9ZGSgYb87Qn9Q/x6OGAX4arZCZi3dda2DiikNBsFdI5axV8B4+007u02K+NkBBFIMfh1SvkDOLxLDyyjhS1cDflvpKC+LOl/2N5yai9bvJp3CRgcZCVQ5Njv1LvC66NghcXTl2WteF3s4RXlVAY71aoOO1d53Nd4PmUaqbsHqTrHrEjvqHUr2HWfGcLCH1OTQriKYt5xJEY1uZBVdOtoCkHhei/lqImZbCAMU61c5r3strKMo5QKeCYyjGQ5P2EimEmAqXnu6bmzm4GBI7HnqwXalvFijStIq2CWIOHSoYk1Hp2zlzBJmEz8JA5A1qCu6I40HmaEk0j3AVuPhDMXIaJ15FRrYKnesYSaasjC9YFiEvY5yGCzaqUlTxfBS9KJGMBGJVx1l3ArB4OLdGOXRgaHHir4Iml1XIoqmCYuRdz3LkJCfYSCjVMstaeS+FetZMVb4JBqszqy8OySl03D0PahH6NoYWBRJsLFRUc9eujhjVUpDFw4/gQcm9lzXkYib8ZaYkjUUrr0kEHXLOVYQlQHloeaOFTYYwhCfGhn7ouhHs+CyJyiLNppXtFTl4NW55L4aKPV6YJ6TEbqikA17xf6tYYKjtMeJIKy4KGppxtxkvuCjjwEDFDVU7EWG1NME1AUjkmFp3c8q+CA52iypckWvOEmzIgsYx0LCYzwoO1hjZysxiIToOiSoyWGIUmxiaSGxzRicb5VsE9HcSUpkmmOoZb5SIaDhcLhJcTM/8IvrBYgGbzzsNCfmKZHDAZJJbuMdGOuAyrAT6/WLy/zAkVThZk9NC8qEBZhajhiMnM9Q96cjBGq/8iZlYsFzs0YvquiEkQUUsMzFKeFdyspuI5mTk3nC8vrUufF3lZCApz/KJIOVILMkOc8yrPr9hcgLjpa6p9egNy5T+XseHL/0AJl1th1GyLedH6/f4Weq50p2ySx2UobHfxJDTqYbe9tPmfKsij4TBBRuggx90ww6TmTD4859gykRf4dDhBzz0kNGOyC5954JpKVFIzG1LXHBSZPdrwE4m+4Kh4hGdyguvgYvcAWzSENFfnhksPuVPFB3F21tr3tGUgaW1cczyfKshrE0gb+4C0Nq69WJhIuAjmbFx9JXIUe9CffXsbr7rMmaq1UWts/IxrqCn82MarL9AG+MjGz7v6a0UitTZ++qWl0oyN18CH69Zet7sovuEV900v52/6s8JNfxBZSv2zfye6w+/wO/w6+L/BVprwVBdLEgAAAABJRU5ErkJggg==" alt="" />
</div>
<div>
  <img width={150} height={100}  src="data:image/jpeg;base64,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" alt="" />
</div>
<div>
  <img width={150} height={100} src="data:image/png;base64,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" alt="" />
</div>
</div>

</div>
          <h3 style={{color:'blue ' ,textAlign:'center'}}>New Arrivals</h3>
          <div className="products">
            {users &&
              users.filter((user)=>user.name.toLowerCase().includes(query)).map((product) => (
                <div key={product._id} className="product">
                  <h3>{product.name}</h3>
                  <img src={product.image?.url} alt={product.name} />
                  {/* <div className="details">
                 
                    <span className="pric"><span style={{display:'flex', gap:'2rem'}}>Price</span> <span>ksh{product.price}</span> </span>
                  </div> */}
                   <div className="details">
                    <span style={{display:'flex', gap:'4rem'}} > <span> price </span> <span> ksh {product.price}</span></span>
                  </div> 
                  <div className="details">
                    
                    <span style={{display:'flex', gap:'4rem'}} > <span >location</span>   <span>{product.location}</span> </span>
                  </div>
                  <div className="details">
                    
                    <span style={{display:'flex', gap:'4rem'}} > 
                    <span>{excerpt(product.desc)}
            <Link to={`/tour/${product._id}`}>Read More</Link></span>
                     </span>
                  </div>
                  <button onClick={() => handleAddToCart(product)}>
                  Add to cart
                  </button>
                 
                  {/* <a  href={`https://wa.me/${product.No}`} target="_blank" rel="noreferrer noopener" style={{color:'orangered',listStyle:'none',textDecoration:'none'}}>
                    <button style={{backgroundColor:'red'}}>get in touch <FaWhatsapp/>Whatsapp</button>
                    </a> */}
                </div>
              ))}
          </div>
        </>
      ) : status === "pending" ? (
        <p>Loading...</p>
      ) : (
        <p>Unexpected error occured...</p>
      )}
    </div>
  );
};

export default Home;
