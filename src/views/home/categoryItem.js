import React from 'react'
import { Card, CardBody, CardHeader, Col } from 'reactstrap'

export default function categoryItem({lg, color, title, value, image}) {
  return (
    <Col lg={lg}>
        <Card  style={{backgroundColor :color}} className='category-Item'>
            <CardBody className='d-flex justify-content-between' >
              <h4 className='text-white mt-1'>
              {`${title} : ${value}`}
              </h4>
              <img src={image} width={40} height={40}/>
          
            </CardBody>
        </Card>
    </Col>
  )
}
