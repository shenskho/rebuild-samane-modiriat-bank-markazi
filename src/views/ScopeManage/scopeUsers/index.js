import React, { useEffect, useState } from 'react'
import { Card, CardBody, Row, Col, CardHeader, Button } from 'reactstrap'
import '@core/scss/react/pages/page-authentication.scss'
import DxDataGrid from '@components/devextreme/DxDataGrid'
import { GetScopeusers, GetUser } from '@store/slices/scopeUser'
import { useDispatch, useSelector } from 'react-redux'
import ShowProfile from './EditUser'
import AddModal from './AddModal'
export default function index() {
  const store = useSelector((state) => state.scopeUser)
  console.log(store)
  const dispatch = useDispatch()
  const [userItem, SetUserItem] = useState([])
  const [IsShowModal, SetIsShowModal] = useState(false)
  const [IsAddModal, SetIsAddModal] = useState(false)

  const handeleEditRole = (data) => {
    console.log('Asdasdas', data)

    dispatch(GetUser(data.applicantId)).then((response) => {
      SetUserItem(data)
      SetIsShowModal(!IsShowModal)
    })
  }

  const handeleAddTicket = (data) => {
    console.log('Asdasdas', data)
    SetUserItem(data)
    SetIsAddModal(!IsAddModal)
  }

  const rowsWithIndex = store.ScopeUsers.items
    ?.slice()
    .reverse()
    .map((item, i) => ({
      ...item,
      index: i + 1
    }))

  const dataGridData = {
    columns: [
      { dataField: 'index', caption: 'ردیف', width: 'auto', cssClass: 'text-center' },
      { dataField: 'firstname', caption: 'نام' },
      { dataField: 'lastname', caption: 'نام خوانوادگی' },
      { dataField: 'fatherName', caption: 'نام پدر' },
      { dataField: 'nationalCode', caption: 'کد ملی ' },
       { dataField: 'genderTypeTitle', caption: 'جنسیت' },
      
      { dataField: 'shenasnameCode', caption: 'شماره شناسنامه  ' },
      { dataField: 'mobile', caption: 'شماره تماس' },
      { dataField: 'applicantCode', caption: 'کد کاربری' },
      {
        caption: 'عملیات ',
        type: 'buttons',
        cssClass: 'operationColumn',
        width: 260,
        buttons: [
          {
            name: 'reply',
            text: 'مشخصات',
            cssClass: 'btn btn-sm btn-primary',

            onClick: (e) => handeleEditRole(e.row.data)
          },
          {
            name: 'reopen',
            text: 'ثبت تیکت',
            cssClass: 'btn btn-sm btn-warning',
            // فقط وقتی بسته است
            onClick: (e) => handeleAddTicket(e.row.data)
          }
        ]
      }
    ],
    rows: rowsWithIndex
  }

  useEffect(() => {
    dispatch(GetScopeusers())
  }, [dispatch])

  return (
    <Row>
      <Col lg={12} className=' base-data-container'>
        <Card className='mb-2'>
          <CardBody>
            <Row className='w-100 mt-1'>
              <Col lg={4} className='text-center'>
                {' '}
                <h4 className='color-red'>
                 تعداد کل داوطلب ها :{' '}
                  <span> {store?.ScopeUsers?.items?.filter((item) => !item.isClosed)?.length}</span>{' '}
                </h4>
              </Col>

              <Col lg={4} className='text-center'>
                {' '}
                <h4 className='color-green'>
                   کد داوطلب ها : <span> {store?.ScopeUsers?.items ? `از ${store?.ScopeUsers?.items[0].applicantCode}  - ${store?.ScopeUsers?.items[store?.ScopeUsers?.items.length-1].applicantCode} ` : 0}</span>
                
                </h4>
              </Col>

              <Col lg={4} className='text-center'>
                {' '}
              
                <h4 className='color-gray'>

                     جنسیت    <span> {store?.ScopeUsers?.items ? ` ${store?.ScopeUsers?.items?.filter((item) => item.genderType === 2)?.length}  زن - ${store?.ScopeUsers?.items?.filter((item) => item.genderType === 1)?.length} مرد ` : 0}</span>
                
                </h4>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                 {/* جنسیت مرد زن  */}
                 {/* تعداد تیکت */}
                <Card id='Home'>
                  <CardHeader className=' w-100 rtl'>
                    <h4 className='w-100'>لیست کاربران </h4>
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
        </Card>
      </Col>
      <ShowProfile IsShowModal={IsShowModal} SetIsShowModal={SetIsShowModal} userInfo={userItem} />
      <AddModal IsAddModal={IsAddModal} SetIsAddModal={SetIsAddModal} meetingItem={userItem} />
    </Row>
  )
}
