import React, { useEffect, useState } from 'react'
import { Card, CardBody, Row, Col, CardHeader, Button } from 'reactstrap'
import '@core/scss/react/pages/page-authentication.scss'
import DxDataGrid from '@components/devextreme/DxDataGrid2'
import { GetTickets } from '@store/slices/operator'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
//import AddModal from './AddModal'
import EditModal from './EditModal'
// import DeleteModal from './DeleteModal'

export default function index() {
  const navigate = useNavigate()
  const store = useSelector((state) => state.operator)

  console.log(store)
  const dispatch = useDispatch()
  const [userItem, SetUserItem] = useState([])
  const [IsAddModal, SetIsAddModal] = useState(false)
  const [IsEditModal, SetIsEditModal] = useState(false)
  const [IsDeleteModal, SetIsDeleteModal] = useState(false)
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const handeleEditRole = (data) => {
    SetUserItem(data)
    SetIsEditModal(!IsEditModal)
  }

  const rowsWithIndex = store.tickets.items?.map((item, i) => ({
    ...item,
    index: pageIndex * pageSize + i + 1
  }))

  const dataGridData = {
    columns: [
      { dataField: 'index', caption: 'ردیف', width: 'auto', cssClass: 'text-center' },
      { dataField: 'applicantFullName', caption: 'نام و نام خوانوادگی ' },
      { dataField: 'applicantDescription', caption: 'متن درخواست ' },
      { dataField: 'applicantNationalCode', caption: 'کدملی' },
      { dataField: 'refCode', caption: 'کد پیگیری' },
      {
        dataField: 'isClosed',
        caption: 'وضعیت درخواست',
        cellRender: (cellData) => <span>{cellData.value ? 'بسته شده' : 'باز'}</span>
      },
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
            // visible: (e) => e.row.data.isClosed === false, // فقط وقتی بازه
            onClick: (e) => handeleEditRole(e.row.data)
          },
          {
            name: 'reopen',
            text: 'بازگشایی',
            cssClass: 'btn btn-sm btn-warning',
            visible: (e) => e.row.data.isClosed === true, // فقط وقتی بسته است
            onClick: (e) => handleReopen(e.row.data)
          }
        ]
      }
    ],
    //  rows: []
    rows: rowsWithIndex,
    totalCount: store.tickets.totalCount || store.tickets.items.length // fallback
  }

  useEffect(() => {
    dispatch(GetTickets({ page: pageIndex + 1, pageSize }))
  }, [dispatch, pageIndex, pageSize])
  return (
    <Row>
      <Col lg={12} className=' base-data-container'>
        <Card className='mb-2'>
          <CardBody>
            <Row>
              <Col lg={12}>
                <Card id='Home'>
                  <CardHeader className=' w-100 rtl'>
                    <h4 className='w-100'>لیست درخواست های کاربران </h4>
                    <Row className='w-100 mt-1'>
                      <Col lg={4} className='text-center'>
                        {' '}
                        <h4 className='color-red'>
                          درخواست های پاسخ داده نشده :{' '}
                          <span> {store?.tickets?.items?.filter((item) => !item.isClosed)?.length}</span>{' '}
                        </h4>
                      </Col>

                      <Col lg={4} className='text-center'>
                        {' '}
                        <h4 className='color-green'>
                          {' '}
                          درخواست های پاسخ داده شده :{' '}
                          <span> {store?.tickets?.items?.filter((item) => item.isClosed)?.length}</span>
                        </h4>
                      </Col>

                      <Col lg={4} className='text-center'>
                        {' '}
                        <h4 className='color-gray'>
                          تعداد کل درخواست ها : <span> {store?.tickets?.items?.length}</span>
                        </h4>
                      </Col>
                    </Row>
                  </CardHeader>

                  <CardBody>
                    <DxDataGrid
                      data={dataGridData}
                      pagination
                      paginationSize={pageSize}
                      onPageSizeChange={(size) => setPageSize(size)}
                      onPageIndexChange={(index) => setPageIndex(index)}
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
