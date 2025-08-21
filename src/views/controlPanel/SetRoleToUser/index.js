import { Card, CardBody, Row, Col, CardHeader, Button } from 'reactstrap'
import '@core/scss/react/pages/page-authentication.scss'
import DxDataGrid from '@components/devextreme/DxDataGrid'
import { ReadUserRole, ReadUsers } from '@store/slices/controlPanel'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import AddOrUpdateModal from './AddorUpdateModal'
import { useNavigate } from 'react-router-dom'

export default function index() {
  const store = useSelector((state) => state.controlPanel)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [userItem, SetUserItem] = useState([])
  const [IsEditModal, SetIsEditModal] = useState(false)

  const handeleEditRoles = (data) => {
    SetUserItem(data)
    dispatch(
      ReadUserRole({
        'userName': data.userName
      })
    ).then(() => {
      SetIsEditModal(!IsEditModal)
    })
  }

  const dataGridData = {
    columns: [
      { dataField: 'index', caption: '#', width: 'auto', cssClass: 'text-center' },
      { dataField: 'userName', caption: 'نام کاربری' },
      {
        caption: 'عملیات ',
        type: 'buttons',
        cssClass: 'operationColumn',
        width: 160,
        buttons: [
          {
            name: 'add',
            text: 'گروه های دسترسی',
            cssClass: 'btn btn-sm btn-primary',
            onClick: (e) => {
              handeleEditRoles(e.row.data)
            }
          }
        ]
      }
    ],
    rows: store.userList?.list
  }

  useEffect(() => {
    dispatch(ReadUsers({}))
  }, [])

  return (
    <Card className='mb-2'>
      <CardBody>
        <Row>
          <Col lg={12}>
            <Card id='Home'>
              <CardHeader>
                <h4>لیست کاربران</h4>
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

      <AddOrUpdateModal SetIsEditModal={SetIsEditModal} IsEditModal={IsEditModal} item={userItem} />
    </Card>
  )
}
