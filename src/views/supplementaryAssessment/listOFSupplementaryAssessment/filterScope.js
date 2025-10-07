import React from 'react'
import { Row, Col, Input, Label, Button } from 'reactstrap'
import Select from 'react-select'
import { FaFilter } from 'react-icons/fa'
export default function filterScope() {
  return (
    <Row className='mt-3 w-100'>
      <Row className='m-0'>
        <Col lg={3}>
          <Label for='text-search' className='text-bold font-color sub-filter-title'>
            جستجو
          </Label>
          <Input id='text-search' className='form-input text-search-form ' placeholder='جستجو در حوزه‌های آزمون...' />
        </Col>
        <Col lg={5}></Col>

        <Col lg={3}>
          <Label for='organization-filter' className='text-bold font-color sub-filter-title'>
            دستگاه{' '}
          </Label>

          <Select id='organization-filter' placeholder='همه' options={[]} isClearable={true} />
        </Col>
      
        <Col lg={1}>
      
          <div>
            <Button color='primary' className='filter-button  '>
              <FaFilter color='#fff' size={20} className='filter-icon' /> اعمال
            </Button>
          </div>
        </Col>
      </Row>
      <Col lg={6}></Col>
 
    
    </Row>
  )
}
