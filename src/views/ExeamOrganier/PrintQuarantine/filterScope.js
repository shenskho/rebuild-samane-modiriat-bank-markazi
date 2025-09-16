import React from 'react'
import { Row, Col, Input, Label, Button } from 'reactstrap'
import Select from 'react-select'
import { FaFilter, FaSortAmountUp } from 'react-icons/fa'
import { useSelector } from 'react-redux'
export default function filterScope({ searchTerm, setSearchTerm }) {
  const store = useSelector((state) => state.examOrganizer)
  console.log('filterScope', store)
  return (
    <Row className=' w-100'>
      <Row className='m-0'>
        <Col lg={4} className='text-center'>
          {' '}
          <h4 className='color-red'>
            تکمیل نشده : <span> {store?.remainCount?.item?.remainingCount}</span>{' '}
          </h4>
        </Col>

        <Col lg={4} className='text-center'>
          {' '}
          <h4 className='color-green'>
            {' '}
            تکمیل شده : <span> {store?.remainCount?.item?.completedCount}</span>
          </h4>
        </Col>

        <Col lg={4} className='text-center'>
          {' '}
          <h4 className='color-gray'>
            تعداد کل : <span> {store?.remainCount?.item?.totalCount}</span>
          </h4>
        </Col>
        <Col lg={12}>
          <Label for='text-search' className='text-bold font-color sub-filter-title mt-2'>
            جستجو
          </Label>
       <Input
            id='text-search'
            className='form-input text-search-form'
            placeholder='جستجو در حوزه‌های آزمون...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
      </Row>
    </Row>
  )
}
