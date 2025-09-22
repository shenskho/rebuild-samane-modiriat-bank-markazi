import React, { useEffect, useState } from 'react'
import { Card, CardBody, Row, Col, CardHeader, Button } from 'reactstrap'
import '@core/scss/react/pages/page-authentication.scss'
import DxDataGrid from '@components/devextreme/DxDataGrid'
import { GetMeetingRecordType, GetMeetingRecord,RemoveMeetingRecordType } from '@store/slices/scopeUser'
import { useDispatch, useSelector } from 'react-redux'
import AddModal from './AddModal'
import DeleteModal from './DeleteModal'
import AddMeething from './AddMeething'
import { Plus } from 'react-feather'

export default function index() {
  const store = useSelector((state) => state.scopeUser)
  console.log(store)
  const dispatch = useDispatch()
  const [userItem, SetUserItem] = useState([])
  const [IsAddModal, SetIsAddModal] = useState(false)
  const [IsAddMeething, SetIsAddMeething] = useState(false)
  const [IsDeleteModal, SetIsDeleteModal] = useState(false)

  const handeleEditRole = (data) => {
    dispatch(
      GetMeetingRecord(
        `?ExamId=1&SubSiteId=${localStorage.getItem('subSiteIds')}&MeetingRecordTypeId=${data.id}&PageSize=999999`
      )
    ).then(() => {
      SetUserItem(data)
      SetIsAddModal(!IsAddModal)
    })
  }
  const handeleDelete = (data) => {
      SetUserItem(data)
    SetIsDeleteModal(!IsDeleteModal)
  }
  const rowsWithIndex = store.MeetingRecordType.items
    ?.slice() // make a shallow copy (so we don’t mutate the original)
    .reverse()
    .map((item, i) => ({
      ...item,
      index: i + 1 // index starts from 1 in reversed list
    }))
  //  {
  //         "id": 2,
  //         "title": "test",
  //         "rawFileId": "8ff91f3b-561f-4179-913c-08ddf51836e6",
  //         "justDownload": false
  //       }
  const dataGridData = {
    columns: [
      { dataField: 'index', caption: 'ردیف', width: 'auto', cssClass: 'text-center' },
      { dataField: 'title', caption: 'عنوان' },
      { dataField: 'justDownload', caption: 'فقط دانلودی' },
      
      {
        dataField: 'rawFileId',
        caption: 'فایل خام',
        cellRender: (e) => {
          if (!e.value) return null
          return (
            <Button
              size='md'
              color='success'
              onClick={() => {
                // لینک دانلود مستقیم
                console.log(e.value)
                window.open(`https://cardapi.iranrtc.ir/api/v1/File/get-file-as-link?DocumentId=${e.value}`, '_blank')
              }}
            >
              دانلود
            </Button>
          )
        }
      },

      {
        caption: 'عملیات ',
        type: 'buttons',
        cssClass: 'operationColumn',
        width: 260,
        buttons: [
          {
            name: 'reply',
            text: 'آپلود و ادیت',
            cssClass: 'btn btn-sm btn-primary',
            onClick: (e) => handeleEditRole(e.row.data)
          },
            {
            name: 'del',
            text: 'حذف',
            cssClass: 'btn btn-sm btn-danger',
            onClick: (e) => handeleDelete(e.row.data)
          }
        ]
      }
    ],
    //  rows: []
    rows: rowsWithIndex
  }

  useEffect(() => {
    dispatch(GetMeetingRecordType())
  }, [dispatch])
  return (
    <Row>
      <Col lg={12} className=' base-data-container'>
        <Card className='mb-2'>
          <CardBody>
            <Row>
              <Col lg={12}>
                <Card id='Home'>
                  <CardHeader>
                    <div className='d-flex justify-content-between w-100'>
                      <h4 className='pt-1'> لیست صورتجلسه </h4>
                      <Button className='btn-base-data-add' color='white' onClick={() => SetIsAddMeething(!IsAddMeething)}>
                        افزودن <Plus size={20} color='white' />
                      </Button>
                    </div>
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
      <AddModal IsAddModal={IsAddModal} SetIsAddModal={SetIsAddModal} meetingItem={userItem} />
      <AddMeething IsAddModal={IsAddMeething} SetIsAddModal={SetIsAddMeething} meetingItem={userItem} />

    <DeleteModal  IsDeleteModal={IsDeleteModal} SetIsDeleteModal={SetIsDeleteModal}userName={userItem} />


      
    </Row>
  )
}
