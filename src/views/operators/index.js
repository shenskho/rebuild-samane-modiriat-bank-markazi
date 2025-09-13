import React, { useEffect, useState } from 'react'
import { Card, CardBody, Row, Col, CardHeader, Button } from 'reactstrap'
import '@core/scss/react/pages/page-authentication.scss'
import DxDataGrid from '@components/devextreme/DxDataGrid'
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

  const handeleEditRole = (data) => {
    SetUserItem(data)
    SetIsEditModal(!IsEditModal)
  }

  const handeleDeleteRole = (data) => {
    SetUserItem(data)
    SetIsDeleteModal(!IsDeleteModal)
  }
  const rowsWithIndex = store.tickets.items?.map((item, i) => ({
    ...item,
    index: i + 1 // ردیف از ۱ شروع بشه
  }))

  const dataGridData = {
    columns: [
      { dataField: 'index', caption: 'ردیف', width: 'auto', cssClass: 'text-center' },
      { dataField: 'applicantFullName', caption: 'نام و نام خوانوادگی ' },
      { dataField: 'applicantNationalCode', caption: 'کدملی' },
      { dataField: 'refCode', caption: 'کد پیگیری' },
      { dataField: 'applicantDescription', caption: 'متن درخواست ' },
      {
        caption: 'عملیات ',
        type: 'buttons',
        cssClass: 'operationColumn',
        width: 260,
        buttons: [
          {
            name: 'add',
            text: 'پاسخ',
            cssClass: 'btn btn-sm btn-primary',
            onClick: (e) => {
              handeleEditRole(e.row.data)
            }
          }
        ]
      }
    ],
    //  rows: []
    rows: rowsWithIndex
  }

  useEffect(() => {
    dispatch(GetTickets())
  }, [])
  return (
    <Row>
      <Col lg={12} className=' base-data-container'>
        <Card className='mb-2'>
          <CardBody>
            <Row>
              <Col lg={12}>
                <Card id='Home'>
                  <CardHeader>
                    <h4>لیست درخواست های کاربران </h4>
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
