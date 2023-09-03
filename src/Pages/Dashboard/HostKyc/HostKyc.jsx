import { Button, Col, Input, Row } from 'antd'
import React,{useState,useEffect} from 'react'
import { UserOutlined,SearchOutlined } from '@ant-design/icons';
import HostKycTable from './HostKycTable';
import mypdf from '../../../Images/sample.pdf'
import axios from '../../../../Config';
function HostKyc() {
  const pdfPath = '/sample.pdf';
  console.log(pdfPath)


  const [imagePath, setImagePath] = useState('');

  // useEffect(() => {
  //   // Make an HTTP GET request to your server to get the image path
  //   axios.get('/upload') // Replace with your actual API endpoint
  //     .then((response) => {
  //       setImagePath(response.data.imagePath);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching image path:', error);
  //     });
  // }, []);

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
                    <Input size="large" placeholder="Search by name/email/phone" prefix={<SearchOutlined style={{color:"#cccccc"}}/>} />
                    <Button style={{height:"50px",width:"300px",backgroundColor:"#000b90",color:"#fff",fontSize:"20px"}}>Search</Button>
                </div>
             </Col>
         </Row>

         <Row>
           <h2 style={{ fontSize: "30px", margin: "30px 0px" }}>
            Host KYC List
           </h2>  
            <Col lg={{span:24}}>
                <HostKycTable/>
            </Col>
         </Row>
    </div>
  )
}

export default HostKyc