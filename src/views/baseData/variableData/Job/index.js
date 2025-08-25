import React, { useEffect, useState } from 'react'
import { Card, CardBody, Row, Col, CardHeader, Button } from 'reactstrap'
import '@core/scss/react/pages/page-authentication.scss'
import DxDataGrid from '@components/devextreme/DxDataGrid'
import { GetJob } from '@store/slices/variableData'
import { useDispatch, useSelector } from 'react-redux'

import AddModal from './AddModal'
import EditModal from './EditModal'
import DeleteModal from './DeleteModal'
import { Plus } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import { number } from 'prop-types'

export default function index() {
  const store = useSelector((state) => state.variableData)
  const navigate = useNavigate()
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
  const rowsWithIndex = store.Job.items?.map((item, i) => ({
  ...item,
  index: i + 1 // ردیف از ۱ شروع بشه
}))
  const dataGridData = {
    columns: [
      { dataField: 'index', caption: 'ردیف', width: 'auto', cssClass: 'text-center' },
      { dataField: 'title' , caption: 'عنوان ' },
      {
        caption: 'عملیات ',
        type: 'buttons',
        cssClass: 'operationColumn',
        width: 260,
        buttons: [
          {
            name: 'add',
            text: 'ویرایش',
            cssClass: 'btn btn-sm btn-primary',
            onClick: (e) => {
              handeleEditRole(e.row.data)
            }
          },
          {
            name: 'del',
            text: 'حذف',
            cssClass: 'btn btn-sm btn-danger',
            onClick: (e) => {
              handeleDeleteRole(e.row.data)
            }
          }
        ]
      }
    ],
    //  rows: []
    rows: rowsWithIndex
  }

  useEffect(() => {
    dispatch(GetJob())
  }, [])
  return (
    <Row>
      <Col lg={12}>
        <p className='route-base-color'>
          <span className='first-route-selected' onClick={()=> navigate("/")}>خانه</span> / <span className='route-caption'>اطلاعات پایه</span> /{' '}
          <span className='route-caption' onClick={()=> navigate("/variableData")}>اطلاعات متغیر</span> /{' '}
          <span className='route-caption' onClick={()=> navigate("/Job")}>شغل </span>
        </p>
      </Col>

      <Col lg={12} className=' base-data-container'>
        <Card className='mb-2'>
          <CardBody>
            <Row>
              <Col lg={12}>
                <Card id='Home'>
                  <CardHeader>
                    <h4>شغل </h4>
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

          <AddModal IsAddModal={IsAddModal} SetIsAddModal={SetIsAddModal} />

          <EditModal IsEditModal={IsEditModal} SetIsEditModal={SetIsEditModal} item={userItem} />
          <DeleteModal IsDeleteModal={IsDeleteModal} SetIsDeleteModal={SetIsDeleteModal} item={userItem} />
        </Card>
      </Col>
    </Row>
  )
}
