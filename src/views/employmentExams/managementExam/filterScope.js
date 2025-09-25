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
          <Input id='text-search' className='form-input text-search-form ' placeholder='جستجو در آزمون های برگزار شده...' />
        </Col>
        <Col lg={3}></Col>
        <Col lg={6}>
          <Row className='justify-content-end text-start'>
            <Col lg={3} md={4} sm={6}>
              <Label for='organization-filter' className='text-bold font-color sub-filter-title'>
                مجری
              </Label>
              <Select id='organization-filter' placeholder='همه' options={[]} isClearable={true} />
            </Col>
            <Col lg={3} md={4} sm={6}>
              <Label for='organization-filter' className='text-bold font-color sub-filter-title'>
                وضعیت
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
            <Label className='sub-sort-filter'> تاریخ برگزاری (دورترین) </Label>
          </Col>
          <Col lg={2} md={3}  sm={2} className='text-center d-flex align-items-center'>
            <Label className='sub-sort-filter'> تاریخ برگزاری (نزدیک‌ترین) </Label>
          </Col>
          <Col lg={2} md={3}  sm={2} className='text-center d-flex align-items-center'>
            <Label className='sub-sort-filter'> تاریخ ثبت‌نام (دورترین) </Label>
          </Col>
          <Col lg={2} md={3}  sm={2} className='text-center d-flex align-items-center'>
            <Label className='sub-sort-filter'> تاریخ ثبت‌نام (نزدیک‌ترین) </Label>
          </Col>
          <Col lg={2} md={3}  sm={2} className='text-center d-flex align-items-center'>
            <Label className='sub-sort-filter'> پیش فرض </Label>
          </Col>
          <Col lg={1} md={1} sm={2}  className='text-center d-flex justify-content-center '>
         
              <FaSortAmountUp color='#04364a' size={20} className='mt-0o5 ' />
         
          </Col>
          
        </Row>
      </Col>
       <Col lg={3}>
        <div className='exam-year-label-parent'>
          <Label for='text-search' className='exam-year-label sub-sort-filter'>
            1404
          </Label>
          <Label for='text-search' className='exam-year-label sub-sort-filter'>
            1403
          </Label>
        </div>
          
        </Col>
        <div className='exam-panel-divider'></div>
    </Row>
    
  )
}
