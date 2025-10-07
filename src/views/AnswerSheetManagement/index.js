import React, { useEffect, useState } from 'react'
import { Card, CardBody, Row, Col, CardHeader, Button } from 'reactstrap'
import '@core/scss/react/pages/page-authentication.scss'
import DxDataGrid from '@components/devextreme/DxDataGridexcel'
import { GetAllBooklet, GetAnswareKeyStatus, GetAllBookletQuestionSectionPagination } from '@store/slices/Booklet'
import { useDispatch, useSelector } from 'react-redux'
import AddModal from './AddModal'
import { Plus } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import AddQuestionWeight from './AddQuestionWeight'

export default function index() {
  const store = useSelector((state) => state.booklet)
  console.log('store ذشسث', store)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [IsAddQuestionModal, SetIsAddQuestionModal] = useState(false)

  const [Item, SetItem] = useState([])
  const [IsAddModal, SetIsAddModal] = useState(false)
  const rowsWithIndex = store?.Booklets?.items?.map((item, i) => ({
    ...item,
    index: i + 1 // ردیف از ۱ شروع بشه
  }))
  const dataGridData = {
    columns: [
      { dataField: 'index', caption: 'ردیف', width: 'auto', cssClass: 'text-center' },
      { dataField: 'title', caption: 'عنوان' },
      { dataField: 'code', caption: 'کد' },
      { dataField: 'questionCount', caption: 'تعداد سوالات' }
      // {
      //   caption: 'عملیات ',
      //   type: 'buttons',
      //   cssClass: 'operationColumn',
      //   width: 260,
      //   buttons: [
      //     {
      //       name: 'reply',
      //       text: 'تعیین وزن ها ',
      //       cssClass: 'btn btn-sm btn-primary',
      //       onClick: (e) => hanndeleAddWeghit(e.row.data)
      //     }
      //   ]
      // }
    ],
  
    rows: rowsWithIndex
  
  }
  const hanndeleAddWeghit = (row) => {
    dispatch(GetAllBookletQuestionSectionPagination(row.id)).then((response) => {
      if (response.payload) {
        SetItem(row)
        SetIsAddQuestionModal(!IsAddQuestionModal)
      }
    })
  }

  useEffect(() => {
    dispatch(GetAllBooklet())
  }, [dispatch])

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
          /{' '}
          <span className='route-caption' onClick={() => navigate('/City')}>
            داده های پاسخ برگ{' '}
          </span>
        </p>
      </Col>

      <Col lg={12} className=' base-data-container'>
        <Card className='mb-2'>
          <CardBody>
            <Row>
              <Col lg={12}>
                <Card id='Home'>
                  <CardHeader>
                    <h4>کلید پاسخنامه ها    </h4>
                  </CardHeader>

                  <CardBody>

                    <div className='d-flex justify-content-end'>
                      <Button className='btn-base-data-add' color='white' onClick={() => SetIsAddModal(!IsAddModal)}>
                        افزودن <Plus size={20} color='white' />
                      </Button>
                    </div>

                    <DxDataGrid
                      data={dataGridData}
                      paginationSize={10}
                      reportName="کلید پاسخنامه"
                      editing={{
                        mode: 'row',
                        useIcons: false
                      }}   />

                  </CardBody>
                </Card>
              </Col>
            </Row>
          </CardBody>

          <AddModal IsAddModal={IsAddModal} SetIsAddModal={SetIsAddModal} />
          <AddQuestionWeight
            IsAddQuestionModal={IsAddQuestionModal}
            SetIsAddQuestionModal={SetIsAddQuestionModal}
            item={Item}
          />
        </Card>
      </Col>
    </Row>
  )
}
