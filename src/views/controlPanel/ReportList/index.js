import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { ExecuteReports, GetAllReports } from '@store/slices/Report'
import { Card, CardBody, CardHeader, Container, Row, Col, Button } from 'reactstrap'

import '@assets/css/report.css'
import '@assets/css/reportTree.css'

import { Edit, Eye, Info, PlusCircle, Trash } from 'react-feather'
import RemoveModal from './RemoveModal'

export default function index() {

  const store = useSelector((state) => state.addReport)
  const [IsRemoveModal, SetIsRemoveModal] = useState(false)
  const [report, SetReport] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  let rowNum = 0

  const handeleRemove = (item) => {
    SetIsRemoveModal(!IsRemoveModal)
    SetReport(item)
  }

  useEffect(() => {
    dispatch(GetAllReports())

    if (!location.state) {
      navigate('/')
    }
  }, [])

  return (
    <Container className='mt-2'>
      <Card className='p-2'>
        <Row className='m-2'>
          <Col lg={9}>
            <h3>{`لیست گزارشات : ${location.state?.title}`}</h3>
          </Col>
          <Col lg={3} className='d-flex justify-content-end align-items-center'>
            <Button color='success' onClick={() => navigate('/AddReport', { state: location.state })}>
              {' '}
              اضافه کردن گزارش <PlusCircle size={25} color='#fff' />{' '}
            </Button>
          </Col>
        </Row>

        <Row className='report-container m-2'>
          {store.ReportList.length > 0 ? (
            store.ReportList?.map((item) => {
              return (
                <>
                  {item?.categoryId === location.state?.id ? (
                    <Col lg={3}>
                      <div className='report-item-container mt-1'>
                        <h5 className='report-item-row-number'>{`شماره : ${++rowNum}`}</h5>
                        <CardHeader>{`گزارش : ${item?.title}`}</CardHeader>
                        <CardBody>
                          {`تعداد پارامتر های ورودی : ${
                            item.parameters?.length === 0 ? 'ندارد' : item.parameters?.length
                          }`}
                          <br />
                          <div className='d-flex justify-content-between'>
                            <Trash
                              onClick={() => handeleRemove(item)}
                              id='removeToolTip'
                              size={20}
                              className='button-tree-remove mt-1'
                            />
                            <Eye
                              onClick={() => navigate('/ReportResult', { state: { item } })}
                              id='removeToolTip'
                              size={20}
                              className='button-tree-eye mt-1'
                            />
                                <Edit
                              onClick={() => navigate('/AddReport', { state: { item } })}
                              id='removeToolTip'
                              size={20}
                              className='button-tree-edit mt-1'
                            />
                          </div>
                        </CardBody>
                      </div>
                    </Col>
                  ) : (
                    ''
                  )}
                </>
              )
            })
          ) : (
            <div className='d-flex justify-content-center'>
              <div className='d-flex justify-content-center m-1 pb-2 card w-50 align-items-center'>
                <Info size={35} color='#5e5873' className='mt-2' />
                <h5 className='mt-1'>هیچ گزارشی جهت نمایش وجود ندارد</h5>
              </div>
            </div>
          )}
        </Row>
      </Card>
      <RemoveModal report={report} SetIsRemoveModal={SetIsRemoveModal} IsRemoveModal={IsRemoveModal} />
    </Container>
  )
}
