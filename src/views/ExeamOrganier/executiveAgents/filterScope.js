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
      
        <Col lg={2}>
          <Label for='organization-filter' className='text-bold font-color sub-filter-title'>
            استان محل سکونت 
          </Label>
          <Select id='organization-filter' placeholder='همه' options={[]} isClearable={true} />
        </Col>

        <Col lg={1}>
          <Label for='organization-filter' className='text-bold font-color sub-filter-title'>
            نوع فعالیت
          </Label>

          <Select id='organization-filter' placeholder='همه' options={[]} isClearable={true} />
        </Col>
        <Col lg={1}>
          <Label for='organization-filter' className='text-bold font-color sub-filter-title'>
            وضعیت 
          </Label>

          <Select id='organization-filter' placeholder='همه' options={[]} isClearable={true} />
        </Col>
        <Col lg={1}>
          <Label for='organization-filter' className='text-bold font-color sub-filter-title'>
            رتبه عملکرد
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
      <Col lg={11}>
        <Row className='mt-1 custom-row-height w-100 executive-sort-row'>
      
          <Col xs='auto' className='text-center d-flex align-items-center'>
            <Label className='sub-sort-filter'> همه </Label>
          </Col>
          <Col xs='auto'  className='text-center d-flex align-items-center'>
            <Label className='sub-sort-filter'> جهاد دانشگاهی </Label>
          </Col>
          <Col xs='auto'  className='text-center d-flex align-items-center'>
            <Label className='sub-sort-filter'>  مرکز آموزش و پژوهشی رایانگان </Label>
          </Col>
          <Col xs='auto'  className='text-center d-flex align-items-center'>
            <Label className='sub-sort-filter'> شرکت آزمون گستر </Label>
          </Col>
          <Col xs='auto'  className='text-center d-flex align-items-center'>
            <Label className='sub-sort-filter'> سازمان سنجش و آموزش کشور </Label>
          </Col>
        </Row>
      </Col>
      <Col lg={1}></Col>
    
    </Row>
  )
}

