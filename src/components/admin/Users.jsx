import React from 'react'
import styled from 'styled-components'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import axios from "axios";

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'Name', headerName: 'Name', width: 130 },
  { field: 'email', headerName: 'email', width: 130 },
  { field: 'admin', headerName: 'Admin', width: 130 },
  
  
 
  {
    field: 'imageUrl',
    headerName: 'image',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];


function compare(a,b){
    if(a._id <b._id){
      return 1
    }
    if(a._id >b._id){
      return -1
    }return 0
  }


export default function ProductList () {
    const {items}=useSelector((state)=>state.products)
    
    const [users,setUsers]=useState([]);

    useEffect(()=>{
        async function fetchData(){
        try {
          const res= await axios.get(`http://localhost:5000/api/users/stats/all`)
          
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
    
    
    const rows =  users && users.map(item=>{
        return{
            id:item._id,
            Name:item.name,
            email:item.email,
            admin:item.isAdmin,
            

        }
    })
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}

const ImageContainer=styled.div`
    img{
        height:'40px'
    }
`;
const Actions=styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    button{
        border: none;
        outline: none;
        padding: 3px 5px;
        color: aliceblue;
        border-radius:3px;
        cursor: pointer;
    }
`
const Delete=styled.button`
    background-color:orange;
`

const view=styled.button`
    background-color:green;
`
