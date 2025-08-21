import { Card, CardBody, Row, Col, CardHeader } from 'reactstrap'
import '@core/scss/react/pages/page-authentication.scss'
import DxDataGrid from '@components/devextreme/DxDataGrid'
import { ReadUsers } from '@store/slices/controlPanel'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import AddModal from './AddModal'
import { useNavigate } from 'react-router-dom'

export default function index() {
  const store = useSelector((state) => state.controlPanel)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [userItem, SetUserItem] = useState([])
  const [IsAddModal,SetIsAddModal] = useState(false)
  const handeleAddRole = (data) => {
    SetUserItem(data)
    SetIsAddModal(!IsAddModal)
  }

  const dataGridData = {
    columns: [
      { dataField: 'index', caption: '#', width: 'auto', cssClass: 'text-center' },

      { dataField: 'userName', caption: 'نام کاربری' },
      { dataField: 'email', caption: 'ایمیل' },
      { dataField: 'panelTypeTitle', caption: 'نوع پنل' },
      {
        caption: 'تخصیص نقش',
        type: 'buttons',
        cssClass: 'operationColumn',
        width: 160,
        buttons: [
          {
            name: 'add',
            text: 'ویرایش',
            cssClass: 'btn btn-sm btn-primary',
            onClick: (e) => {
              handeleAddRole(e.row.data)
            }
          }
        ]
      }
    ],
    rows: store.userList?.list
  }

  useEffect(() => {
    dispatch(
      ReadUsers({})
    )
  }, [])

  return (
    <Card className='mb-2'>
      <CardBody>
        <Row>
          <Col lg={12}>
            <Card id='Home'>
              <CardHeader>
                <h4>لیست نقش کاربران</h4>
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
      <AddModal  IsAddModal={IsAddModal} SetIsAddModal={SetIsAddModal} item={userItem}/>
    </Card>
  )
}
