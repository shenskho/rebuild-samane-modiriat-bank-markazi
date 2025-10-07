import React, { useEffect, useState } from 'react'
import { Card, CardBody, Row, Col, CardHeader, Button, Table, Input } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllCandidate } from '@store/slices/candidate'
import AddModal from './AddModal'
import { Plus } from 'react-feather'
import { useNavigate } from 'react-router-dom'

export default function Index() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const store = useSelector((state) => state.candidate)

  const [IsAddModal, SetIsAddModal] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [search, setSearch] = useState('')

  // فراخوانی داده‌ها با pagination
useEffect(() => {
  // وقتی سرچ یا صفحه یا pageSize تغییر کرد، جدول رو خالی کن
  dispatch({ type: 'candidate/clearBookletsCadidate' }) 
  dispatch(GetAllCandidate({ page, pageSize, search }))
}, [dispatch, page, pageSize, search])
  const data = store?.BookletsCadidate?.items || []
  const totalCount = store?.BookletsCadidate?.totalCount || 0
  const totalPages = Math.ceil(totalCount / pageSize)

  return (
    <Row>
      <Col lg={12}>
        <p className='route-base-color'>
          <span className='first-route-selected' onClick={() => navigate('/')}>
            خانه
          </span>{' '}
          / <span className='route-caption'>اطلاعات پایه</span> /{' '}
          <span className='route-caption' onClick={() => navigate('/fixData')}>
            مدیریت پاسخنامه
          </span>{' '}
          / <span className='route-caption'>داده های پاسخ نامه</span>
        </p>
      </Col>

      <Col lg={12}>
        <Card>
          <CardHeader className='d-flex justify-content-between align-items-center'>
            <h4>لیست پاسخنامه‌ها</h4>
            <Button color='primary' onClick={() => SetIsAddModal(true)}>
              افزودن <Plus size={20} />
            </Button>
          </CardHeader>
          <CardBody>
            {/* Search و انتخاب تعداد ردیف در صفحه */}
            <Row className='mb-3'>
              <Col md={6}>
                <Input
                  placeholder='جستجو...'
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                    setPage(1) // وقتی سرچ تغییر می‌کنه، به صفحه اول برگرد
                  }}
                />
              </Col>
              <Col md={6} className='text-end'>
                <span>تعداد در صفحه: </span>
                <Input
                  type='select'
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value))
                    setPage(1)
                  }}
                  style={{ width: '100px', display: 'inline-block' }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </Input>
              </Col>
            </Row>

            <Table striped bordered responsive>
              <thead>
                <tr>
                  <th>ردیف</th>
                  <th>شناسه جزوه</th>
                  <th>شناسه داوطلب</th>
                  <th>شماره سوال</th>
                  <th>گزینه انتخابی</th>
                  <th>شناسه پاسخ‌برگ</th>
                  <th>شناسه سوال جزوه</th>
                  <th>شناسه کلید پاسخ</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, i) => (
                  <tr key={item.candidateAnswerSheetId}>
                    <td>{(page - 1) * pageSize + i + 1}</td>
                    <td>{item.bookletId}</td>
                    <td>{item.candidateId}</td>
                    <td>{item.questionNumber}</td>
                    <td>{item.selectedOption}</td>
                    <td>{item.candidateAnswerSheetId}</td>
                    <td>{item.bookletQuestionId}</td>
                    <td>{item.bookletAnswerKeyId}</td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td colSpan={8} className='text-center'>
                      داده‌ای یافت نشد
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>

            {/* Pagination ساده */}
            <div className='d-flex justify-content-between mt-3'>
              <Button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
              >
                صفحه قبل
              </Button>
              <span>
                صفحه {page} از {totalPages}
              </span>
              <Button
                disabled={page === totalPages || totalPages === 0}
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              >
                صفحه بعد
              </Button>
            </div>
          </CardBody>
        </Card>
      </Col>

      <AddModal IsAddModal={IsAddModal} SetIsAddModal={SetIsAddModal} />
    </Row>
  )
}
