import { Card, CardBody, Row, Col, CardHeader, Button } from 'reactstrap'
import '@core/scss/react/pages/page-authentication.scss'
import DxDataGrid from '@components/devextreme/DxDataGrid'
import { ReadRoles } from '@store/slices/controlPanel'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import AddModal from './AddModal'
import EditModal from './EditModal'
import DeleteModal from './DeleteModal'
import { useNavigate } from 'react-router-dom'

export default function index() {
  const store = useSelector((state) => state.controlPanel)
  
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
  const dataGridData = {
    columns: [
      { dataField: 'index', caption: '#', width: 'auto', cssClass: 'text-center' },
      { dataField: 'name', caption: 'عنوان دسترسی' },
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
    rows: store.Roles?.list
  }

  useEffect(() => {
    dispatch(ReadRoles())
    // dispatch(
    //   ReadUsers({
    //     'userName': 'string',
    //     'normalizedUserName': 'string',
    //     'email': 'string',
    //     'normalizedEmail': 'string',
    //     'phoneNumber': 'string'
    //   })
    // )
  }, [])

  return (
    <Card className='mb-2'>
      <CardBody>
        <Row>
          <Col lg={12}>
            <Card id='Home'>
              <CardHeader>
                <h4>لیست دسترسی ها</h4>
              </CardHeader>
              <CardBody>
                <Button color='success' onClick={() => SetIsAddModal(!IsAddModal)}>
                  گروه دسترسی جدید
                </Button>

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
  )
}
