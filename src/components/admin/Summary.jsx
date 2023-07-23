import axios from "axios";
import { useEffect, useState } from "react";
import { FaChartBar, FaClipboard, FaUsers } from "react-icons/fa";
import styled from "styled-components";
import Widget from "../summary/Widget";
import {url,setHeaders} from '../../slices/api'

const baseUrl='http://localhost:5000/api/users/stats'
const Summary = () => {
  const [users,setUsers]=useState([]);
  const [usersperc,setUsersPerc]=useState([])

  function compare(a,b){
    if(a._id <b._id){
      return 1
    }
    if(a._id >b._id){
      return -1
    }return 0
  }
    useEffect(()=>{
  async function fetchData(){
  try {
    const res= await axios.get(`${url}/users/stats`, setHeaders())
    res.data.sort(compare)
    console.log( res.data);
  setUsers(  res.data)
  setUsersPerc(
    ((users[0].total-users[1].total)/users[1].total)*100
  )
  
  } catch (error) {
    console.log(error);
    
  }
  }
  fetchData()
    },[])
  

  const data =[
    {
      icons:<FaUsers/>,
      digits:users[0]?.total,
      isMoney:false,
      title:'Users',
      color:"rgb(102,108,255)",
      bgColor:"rgba(38,198,249,0.12)",
      percentage:usersperc
    },
    {
      icons:<FaClipboard/>,
      digits:70,
      isMoney:false,
      title:'Orders',
      color:"rgb(38,198,249)",
      bgColor:"rgba(38,198,249,0.12)",
      percentage:60
    },
    {
      icons:<FaChartBar/>,
      digits:500,
      isMoney:true,
      title:'Earnings',
      color:"#afb91a",
      bgColor:"#d9f9261e",
      percentage:60
    },
    
  ]


  return (
    <StyledSummury>
      <MainStats>
        <Overview>
          <Title>
            <h3>Overview</h3>
            <p>How the shop is performing compared to the prev month</p>
          </Title>
          <WidgetWrapper>
            {data?.map((data,index)=>{
              return(
                <>
                <Widget key={index} data={data}/>
                </>
              )
            })}
          </WidgetWrapper>
        </Overview>
      </MainStats>
      <SideStatus></SideStatus>
    </StyledSummury>
  );
};

export default Summary;

const StyledSummury=styled.div`
  width: 100%;
  display: flex;
`
const MainStats=styled.div`
  flex: 2;
  width: 100%;
`

const Title=styled.div`
  p{
    font-size: 14px;
    color: whitesmoke;
  }
`

const Overview=styled.div`
  background: rgb(48,51,78);
  color: white;
  width: 100%;
  padding: 1.5rem;
  height: 170px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const WidgetWrapper= styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`
const SideStatus=  styled.div`
  flex:1;
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  width: 100%;
`
