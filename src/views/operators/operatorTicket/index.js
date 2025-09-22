import React, { useEffect, useState } from 'react'
import { Card, CardBody, Row, Col, CardHeader, Button } from 'reactstrap'
import '@core/scss/react/pages/page-authentication.scss'
import DxDataGrid from '@components/devextreme/DxDataGrid'
import { GetScopeTicket } from '@store/slices/operator'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
//import AddModal from './AddModal'
import EditModal from './EditModal'
// import DeleteModal from './DeleteModal'

export default function index() {
  const navigate = useNavigate()
  const store = useSelector((state) => state.operator)

  console.log('ssssssss', store)
  const dispatch = useDispatch()
  const [userItem, SetUserItem] = useState([])
  const [IsAddModal, SetIsAddModal] = useState(false)
  const [IsEditModal, SetIsEditModal] = useState(false)
  const [IsDeleteModal, SetIsDeleteModal] = useState(false)

  const handeleEditRole = (data) => {
    SetUserItem(data)
    SetIsEditModal(!IsEditModal)
  }

  const rowsWithIndex = store.ScopeTicket.items
    ?.slice() // make a shallow copy (so we don’t mutate the original)
    .reverse()
    .map((item, i) => ({
      ...item,
      index: i + 1 // index starts from 1 in reversed list
    }))
  //  {
  //         "id": 1133,
  //         "applicantId": 38365,
  //         "fromSubSiteId": 2,
  //         "fromSubSiteTitle": "دانشکده فنی مهندسی و برق",
  //         "applicantFullName": "محمدرضا کامرانی",
  //         "applicantNationalCode": "0480490937",
  //         "applicantDescription": "iuhiu",
  //         "refCode": "4UR88HUP",
  //         "attachFileId": "98edf6bc-5094-4cf0-49a2-08ddf52d7cd8",
  //         "operatorUserId": null,
  //         "operatorUserFullname": "",
  //         "answerDescription": null,
  //         "isClosed": false,
  //         "createdAt": "2025-09-17T11:20:05.5557401",
  //         "createdAtShamsi": "1404/06/26 11:20:05"
  //       }
  const dataGridData = {
    columns: [
      { dataField: 'index', caption: 'ردیف', width: 'auto', cssClass: 'text-center' },
      { dataField: 'applicantFullName', caption: 'نام و نام خوانوادگی ' },
      { dataField: 'fromSubSiteTitle', caption: 'حوزه' },
      { dataField: 'applicantDescription', caption: 'متن درخواست ' },
      { dataField: 'applicantNationalCode', caption: 'کدملی' },
      { dataField: 'refCode', caption: 'کد پیگیری' },
      {
        dataField: 'isClosed',
        caption: 'وضعیت درخواست',
        cellRender: (cellData) => <span>{cellData.value ? 'بسته شده' : 'باز'}</span>
      },
      { dataField: 'createdAtShamsi', caption: 'تاریخ ثبت' },
      {
        caption: 'عملیات ',
        type: 'buttons',
        cssClass: 'operationColumn',
        width: 260,
        buttons: [
          {
            name: 'reply',
            text: 'پاسخ',
            cssClass: 'btn btn-sm btn-primary',
            onClick: (e) => handeleEditRole(e.row.data)
          }
        ]
      }
    ],
    //  rows: []
    rows: rowsWithIndex
  }

  useEffect(() => {
    // اولین بار صدا زده بشه
    dispatch(GetScopeTicket('?PageSize=9999999'))

    // هر 5 ثانیه یک بار رفرش
    // const interval = setInterval(() => {
    //   dispatch(GetScopeTicket('?PageSize=9999999'))
    // }, 120000)

    // وقتی کامپوننت unmount شد تایمر رو پاک کن
    // return () => clearInterval(interval)
  }, [dispatch])
  return (
    <Row>
      <Col lg={12} className=' base-data-container'>
        <Card className='mb-2'>
          <CardBody>
            <Row>
              <Col lg={12}>
                <Card id='Home'>
                  <CardHeader className=' w-100 rtl'>
                    <h4 className='w-100'>لیست تیکت های حوزه </h4>
                    <Row className='w-100 mt-1'>
                      <Col lg={4} className='text-center'>
                        {' '}
                        <h4 className='color-red'>
                          درخواست های پاسخ داده نشده :{' '}
                          <span> {store?.ScopeTicket?.items?.filter((item) => !item.isClosed)?.length}</span>{' '}
                        </h4>
                      </Col>

                      <Col lg={4} className='text-center'>
                        {' '}
                        <h4 className='color-green'>
                          {' '}
                          درخواست های پاسخ داده شده :{' '}
                          <span> {store?.ScopeTicket?.items?.filter((item) => item.isClosed)?.length}</span>
                        </h4>
                      </Col>

                      <Col lg={4} className='text-center'>
                        {' '}
                        <h4 className='color-gray'>
                          تعداد کل درخواست ها : <span> {store?.ScopeTicket?.items?.length}</span>
                        </h4>
                      </Col>
                    </Row>
                  </CardHeader>

                  <CardBody>
                    <DxDataGrid
                      data={dataGridData}
                      paginationSize={10}
                      editing={{
                        mode: 'row',
                        useIcons: false
                      }}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </CardBody>

          <EditModal IsEditModal={IsEditModal} SetIsEditModal={SetIsEditModal} item={userItem} />
        </Card>
      </Col>
    </Row>
  )
}
