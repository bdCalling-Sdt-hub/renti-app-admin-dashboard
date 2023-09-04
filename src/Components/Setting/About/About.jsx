import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import { Button, Col, Row } from 'antd';

import "./About.css"
import { useEffect } from 'react';
import axios from '../../../../Config';
import Swal from 'sweetalert2';



const About = () => {

  const editor = useRef(null)
  const [content, setContent] = useState('');

  const aboutDataSave = () => {

    let token=localStorage.getItem("token");
    let data={
      content
    }

    axios.post("/api/about/create",data,{
      headers:{
        
        "authorization":`Bearer ${token}`
      }
    }).then(res=>{
      Swal.fire(
        'Good job!',
        res.data.message,
        'success'
      )
    }).catch(err=>{
      Swal.fire(
        'Oops!',
         err.response.data.message,
        'error'
      )
    });

  }

  useEffect(()=>{
    let token=localStorage.getItem("token");
      axios.get("/api/about/all",{
        headers:{
          "Content-Type":"application/json",
          "authorization":`Bearer ${token}`
        }
      }).then(res=>{
     
        setContent(res.data.about.content)
      }).catch(err=>console.log(err))
  },[])
  return (
    <div >
      
      <Row>
        <Col lg={{ span: 24 }}>

          <JoditEditor
            ref={editor}
            
            value={content}
            onChange={newContent => { setContent(newContent) }}
          />

          <Button onClick={aboutDataSave} block style={{ marginTop: "30px", backgroundColor: "#000b90", color: "#fff", height: "50px" }}>save</Button>

        </Col>
         
      </Row>

    </div>
  );
};

export default About;
