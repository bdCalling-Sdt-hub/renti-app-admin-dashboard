import { Button, Col, Input, Row } from 'antd'
import React from 'react'
import { UserOutlined,SearchOutlined } from '@ant-design/icons';
import { useDispatch,useSelector } from "react-redux";

import { useEffect,useState } from "react";
import UserKycTable from './UserKycTable';
import { UserInformationWithKycData } from '../../../ReduxSlices/UserInformationWithKycSlice';

function UserKyc() {

  const [searchData,setSearchData]=useState("");
 
  const dispatch=useDispatch();

  

  useEffect(()=>{
    let data={
      search:searchData,
      page:1
    }
        dispatch(UserInformationWithKycData(data))
  },[]);




  
 

const userDataGetByPagination=(page)=>{
  
    let data={
      search:searchData,
      page:page
    }
    if(!searchData){
      dispatch(UserInformationWithKycData(data));
      
    }
   
  }


  const userDataGetBySearch=(page)=>{
    let data={
      search:searchData,
      page:page
    }
    if(searchData){
      dispatch(UserInformationWithKycData(data));
      
    }
   
   
  }

  return (
    <div>
        <Row style={{marginBottom:"30px"}}>
           <h2 style={{ fontSize: "30px", margin: "30px 0px" }}>
            KYC Settings
           </h2>  
             <Col lg={{span:24}}>
                <div className='' style={{display:"flex",gap:"15px"}}>
                    <Input onChange={(e)=>setSearchData(e.target.value)} value={searchData} size="large" placeholder="Search by name/email/phone" prefix={<SearchOutlined style={{color:"#cccccc"}}/>} />
                    <Button onClick={userDataGetBySearch} style={{height:"50px",width:"300px",backgroundColor:"#000b90",color:"#fff",fontSize:"20px"}}>Search</Button>
                </div>
             </Col>
         </Row>

         <Row>
           <h2 style={{ fontSize: "30px", margin: "30px 0px" }}>
            User KYC List
           </h2>  
            <Col lg={{span:24}}>
                <UserKycTable userDataGetByPagination={userDataGetByPagination} userDataGetBySearch={userDataGetBySearch} />
            </Col>
         </Row>
    </div>
  )
}

export default UserKyc