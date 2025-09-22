import React, { useEffect, useState } from 'react'
import { Card, CardBody, Row, Col, CardHeader, Button } from 'reactstrap'
import '@core/scss/react/pages/page-authentication.scss'
import DxDataGrid from '@components/devextreme/DxDataGrid'
import { GetMeetingRecord } from '@store/slices/scopeUser'
import { useDispatch, useSelector } from 'react-redux'
// import AddModal from './AddModal'

export default function index() {
  const store = useSelector((state) => state.scopeUser)
  console.log(store)
  const dispatch = useDispatch()
  const [userItem, SetUserItem] = useState([])
  const [IsAddModal, SetIsAddModal] = useState(false)
  const [IsEditModal, SetIsEditModal] = useState(false)
  const [IsDeleteModal, SetIsDeleteModal] = useState(false)

  const handeleEditRole = (data) => {
    dispatch(
      GetMeetingRecord(
        `?ExamId=1&PageSize=999999`
      )
    ).then(() => {
      SetUserItem(data)
      SetIsAddModal(!IsAddModal)
    })
  }

  const rowsWithIndex = store.MeetingRecord.items
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
      { dataField: 'examTitle', caption: 'عنوان' },
       { dataField: 'subSiteTitle', caption: 'حوزه' },
      { dataField: 'meetingRecordTypeTitle', caption: ' نوع صورتجلسه' },

 { dataField: 'createdAtShamsi', caption: 'تاریخ ثبت' },
      
       
      {
        dataField: 'meetingRecordFileId',
        caption: 'فایل ',
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
      }
    ],
    rows: rowsWithIndex
  }

  useEffect(() => {
    dispatch(
      GetMeetingRecord(
       `?ExamId=1&PageSize=9999999`
      )
    )
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
                    <h4 className='w-100'>لیست صورتجلسه </h4>
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
      {/* <AddModal IsAddModal={IsAddModal} SetIsAddModal={SetIsAddModal} meetingItem={userItem} /> */}
    </Row>
  )
}
