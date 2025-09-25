import React from 'react'
import { Row, Col, Input, Label, Button } from 'reactstrap'
import Select from 'react-select'
import { FaFilter, FaSortAmountUp } from 'react-icons/fa'
export default function filterScope() {
  return (
    <Row className='mt-3 w-100' >
      <Row className='m-0'>
        <Col lg={3}>
          <Label for='text-search' className='text-bold font-color sub-filter-title'>
            جستجو
          </Label>
          <Input id='text-search' className='form-input text-search-form ' placeholder='جستجو در حوزه‌های آزمون...' />
        </Col>
        <Col lg={3}></Col>
        <Col lg={6}>
          <Row className='justify-content-end text-start'>
            <Col lg={3} md={4} sm={6}>
              <Label for='organization-filter' className='text-bold font-color sub-filter-title'>
                دستگاه
              </Label>
              <Select id='organization-filter' placeholder='همه' options={[]} isClearable={true} />
            </Col>
            <Col lg={2} md={3} sm={4}>
              <div>
                <Button color='primary' className='filter-button  '>
                  <FaFilter color='#fff' size={20} className='filter-icon' /> اعمال
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Col lg={6}></Col>
      <Col lg={6}>
        <Row className='mt-1 custom-row-height w-100 justify-content-end text-end'>
          <Col lg={2} md={3}  sm={2} className='text-center d-flex align-items-center'>
            <Label className='sub-sort-filter'> جدید ترین </Label>
          </Col>
          <Col lg={2} md={2} sm={2}  className='text-center d-flex align-items-center'>
            <Label className='sub-sort-filter'> قدیمی ترین </Label>
          </Col>
          <Col lg={1} md={1} sm={2}  className='text-center d-flex justify-content-center '>
         
              <FaSortAmountUp color='#04364a' size={20} className='mt-0o5 ' />
         
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
