import { Button, Col, Input, Row } from 'antd'
import React,{useState,useEffect} from 'react'
import { UserOutlined,SearchOutlined } from '@ant-design/icons';
import { useDispatch,useSelector} from 'react-redux';
import CarKycTable from './CarKycTable';
import { CarInformationWithKycData } from '../../../ReduxSlices/CarInformationWithKycSlice';

function CarKyc() {

  const [searchData,setSearchData]=useState("");


  const [imagePath, setImagePath] = useState('');
  
  const dispatch=useDispatch();

  useEffect(()=>{
    let data={
      search:searchData,
      page:1
    }
    if(searchData==""){
      dispatch(CarInformationWithKycData(data))
    }
       
  },[searchData]);




  
 

const carDataGetByPagination=(page)=>{
  
    let data={
      search:searchData,
      page:page
    }
    if(!searchData){
      dispatch(CarInformationWithKycData(data));
      console.log("without search")
    }
   
  }


  const carDataGetBySearch=(page)=>{
    let data={
      search:searchData,
      page:page
    }
    if(searchData){
      dispatch(CarInformationWithKycData(data));
      console.log("with search")
    }
   
   
  }

  return (
    <div>
        <Row style={{marginBottom:"30px"}}>
           <h2 style={{ fontSize: "30px", margin: "30px 0px" }}>
            Car Kyc
           </h2>  
             <Col lg={{span:24}}>
                <div className='' style={{display:"flex",gap:"15px"}}>
                    <Input onChange={(e)=>setSearchData(e.target.value)} value={searchData} size="large" placeholder="Search by name/email/phone" prefix={<SearchOutlined style={{color:"#cccccc"}}/>} />
                    <Button onClick={carDataGetBySearch} style={{height:"50px",width:"300px",backgroundColor:"#000b90",color:"#fff",fontSize:"20px"}}>Search</Button>
                </div>
             </Col>
         </Row>

         <Row>
           <h2 style={{ fontSize: "30px", margin: "30px 0px" }}>
            Car KYC List
           </h2>  
            <Col lg={{span:24}}>
                <CarKycTable carDataGetByPagination={carDataGetByPagination} carDataGetBySearch={carDataGetBySearch} />
            </Col>
         </Row>
    </div>
  )
}

export default CarKyc