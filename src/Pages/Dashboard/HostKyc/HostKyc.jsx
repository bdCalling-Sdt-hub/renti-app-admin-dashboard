import { Button, Col, Input, Row } from 'antd'
import React,{useState,useEffect} from 'react'
import { UserOutlined,SearchOutlined } from '@ant-design/icons';
import HostKycTable from './HostKycTable';
import mypdf from '../../../Images/sample.pdf'
import axios from '../../../../Config';
import { useDispatch,useSelector } from 'react-redux';
import { HostInformationWithKycData } from './../../../ReduxSlices/HostInformationWithKycSlice';
function HostKyc() {
  const [searchData,setSearchData]=useState("");


  const [imagePath, setImagePath] = useState('');

  const dispatch=useDispatch();

  useEffect(()=>{
    let data={
      search:searchData,
      page:1
    }
    if(searchData==""){
      dispatch(HostInformationWithKycData(data))
    }
        
  },[searchData]);




  
 

const hostDataGetByPagination=(page)=>{
  
    let data={
      search:searchData,
      page:page
    }
    if(!searchData){
      dispatch(HostInformationWithKycData(data));
      console.log("without search")
    }
   
  }


  const hostDataGetBySearch=(page)=>{
    let data={
      search:searchData,
      page:page
    }
    if(searchData){
      dispatch(HostInformationWithKycData(data));
      console.log("with search")
    }
   
   
  }

  return (
    <div>
        <Row style={{marginBottom:"30px"}}>

          <img src={imagePath}/>
        {/* <a href={mypdf} download>
        Download PDF
    </a> */}

           <h2 style={{ fontSize: "30px", margin: "30px 0px" }}>
            KYC Settings
           </h2>  
             <Col lg={{span:24}}>
                <div className='' style={{display:"flex",gap:"15px"}}>
                    <Input onChange={(e)=>setSearchData(e.target.value)} value={searchData} size="large" placeholder="Search by name/email/phone" prefix={<SearchOutlined style={{color:"#cccccc"}}/>} />
                    <Button style={{height:"50px",width:"300px",backgroundColor:"#000b90",color:"#fff",fontSize:"20px"}} onClick={hostDataGetBySearch}>Search</Button>
                </div>
             </Col>
         </Row>

         <Row>
           <h2 style={{ fontSize: "30px", margin: "30px 0px" }}>
            Host KYC List
           </h2>  
            <Col lg={{span:24}}>
                <HostKycTable hostDataGetByPagination={hostDataGetByPagination} hostDataGetBySearch={hostDataGetBySearch}/>
            </Col>
         </Row>
    </div>
  )
}

export default HostKyc