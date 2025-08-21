import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Card, CardHeader } from 'reactstrap'
import NotifItem from './notifItem'

export default function index() {
  const navigate= useNavigate()
  return (

    <Card className='p-1'  style={{height:'510'}}>
    <CardHeader className='d-flex justify-content-between ml-5 mr-0'>
      <h5>اطلاعیه</h5>
      <h5 className='cursor-pointer text-primary' onClick={() => navigate('/Notification')}>بیشتر </h5>
    </CardHeader>
    <Row>
    <NotifItem/>
    <NotifItem/>
    <NotifItem/>
    <NotifItem/>
    </Row>
  </Card>
    
  )
}
