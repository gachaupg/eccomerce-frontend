import React from 'react'
import styled from 'styled-components'

const Widget = ({data}) => {
  return (
    <StyledWidget>
        <Icon color={data.color} bgcolor={data.bgColor}>
            {data.icons}
        </Icon>
        <Text>
            <h3>
               {data.isMoney ? '$' + data.digits?.toLocaleString():data.digits?.toLocaleString()  } 
            </h3>
            <p>{data.title}</p>
        </Text>
        {data.percentage < 0 ? <Percentage isPositve={false}>
            {Math.floor(data.percentage) + '%'}
        </Percentage> :<Percentage isPositve={true}>
            {Math.floor(data.percentage) + '%'}
        </Percentage>}
    </StyledWidget>
  )
}

export default Widget

const StyledWidget=styled.div`
    display: flex;
    align-items: center;
`
const Icon=styled.div`
    margin-right:0.5rem;
    padding: 0.5;
    color: ${({color})=>color};
    background: ${({bgcolor})=>bgcolor};
    border-radius: 3px;
    font-size: 20px;

`
const Text = styled.div`
    h3{
        font-weight:900;

    }
    p{
        font-size: 14px;
        color: rgb(234,234,255,0.63);
    }
`
const Percentage=styled.div`
    margin-left:0.5rem;
    font-size:14px;
    color:${({isPositve})=>
isPositve ? "rgb(114,255,40)":"#ff3502"}
`