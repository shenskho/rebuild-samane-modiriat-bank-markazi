import React from 'react'
import { Button, FormFeedback, Form, Row, Col, Modal, ModalHeader, ModalBody, Input, Label } from 'reactstrap'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import {
  UploadFile,
  CreateMeetingRecord,
  GetMeetingRecord,
  GetMeetingRecordType,
  RemoveMeetingRecord
} from '@store/slices/scopeUser'

import { Image } from 'react-feather'

const schema = yup.object({
  imageId: yup.string().required('بارگذاری تصویر الزامی است')
})

export default function AddModal({ IsAddModal, SetIsAddModal, meetingItem }) {
  const dispatch = useDispatch()
  const store = useSelector((state) => state.scopeUser)
  console.log('modalStore', store)
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm({
    mode: 'all',

    resolver: yupResolver(schema)
  })

  const toggle = () => SetIsAddModal(!IsAddModal)

  const onSubmit = (data) => {
    console.log('Scope (miladi)', meetingItem)
    console.log('Scope (miladi)', data)

    ///// getSubSiteId From local storage

    const payload = {
      'examId': 1,
      'subSiteId': localStorage.getItem('subSiteIds'),
      'meetingRecordTypeId': meetingItem.id,
      'meetingRecordFileId': data.imageId
    }

    dispatch(CreateMeetingRecord(payload)).then(() => {
      dispatch(
        GetMeetingRecord(
          `?ExamId=1&SubSiteId=${localStorage.getItem('subSiteIds')}&MeetingRecordTypeId=${
            meetingItem.id
          }&PageSize=999999`
        )
      )
      dispatch(GetMeetingRecordType())
      reset() // ← این فرم رو پاک می‌کنه
      // toggle() // بس
    })
  }

  return (
    <Modal size='lg' isOpen={IsAddModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>آپلود فایل</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            {/* تصویر مجوز */}
            <Col lg={12}>
              <div className='mb-1'>
                <Label for='imageId'>
                  <span className='text-danger'>*</span> فقط فایل های pdf قابل قبول هستند
                </Label>
                <Controller
                  name='imageId'
                  control={control}
                  render={({ field }) => {
                    const [fileName, setFileName] = React.useState('') // for showing selected file

                    const handleRemove = () => {
                      setFileName('')
                      field.onChange('') // clear value in form
                      document.getElementById('imageId').value = null // reset input
                    }

                    return (
                      <div className='d-flex align-items-center'>
                        {/* Hidden file input */}
                        <Input
                          id='imageId'
                          type='file'
                          accept='application/pdf' // ← فقط PDF
                          style={{ display: 'none' }}
                          invalid={!!errors.imageId}
                          onChange={async (e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              // چک نوع فایل
                              if (file.type !== 'application/pdf') {
                                alert('لطفاً فقط فایل PDF انتخاب کنید!')
                                e.target.value = null
                                return
                              }

                              setFileName(file.name) // نمایش نام فایل
                              const formData = new FormData()
                              formData.append('files', file)

                              const result = await dispatch(UploadFile(formData))
                              const imageId = result?.payload?.list[0]?.id
                              if (imageId) {
                                field.onChange(imageId) // مقدار فرم
                              }
                            }
                          }}
                        />

                        {/* Custom button */}

                        {/* Display file name + remove icon */}
                        <div className='d-flex align-items-center justify-content-left pl-0 pr-0 form-control'>
                          <Button
                            color='primary'
                            className='m-0'
                            onClick={() => document.getElementById('imageId').click()}
                          >
                            <Image size={20} color='white' />
                          </Button>
                          <span className='text-center ml-1'>{fileName || 'فایلی انتخاب نشده'}</span>
                          {fileName && (
                            <Button color='danger' size='sm' outline className='ms-2' onClick={handleRemove}>
                              ✕
                            </Button>
                          )}
                        </div>
                      </div>
                    )
                  }}
                />
                {errors.imageId && <FormFeedback className='d-block'>{errors.imageId.message}</FormFeedback>}
              </div>
            </Col>
            <Col lg={12}>
              <Row>
                {store.MeetingRecord?.items?.map((item) => (
                  <Col lg={12} key={item.id}>
                    <div className='border rounded p-2 mb-1 d-flex justify-content-between align-items-center bg-white'>
                      <div>
                        <strong>نوع صورت جلسه:</strong> {item.meetingRecordTypeTitle} <br />
                        <strong>عنوان آزمون:</strong> {item.examTitle} <br />
                        <strong>دانشکده:</strong> {item.subSiteTitle} <br />
                        <strong>تاریخ:</strong> {item.createdAtShamsi} <br />
                        <strong>فایل:</strong>{' '}
                        <a
                          href={`https://cardapi.iranrtc.ir/api/v1/File/get-file-as-link?DocumentId=${item.meetingRecordFileId}`}
                        >
                          {item.meetingRecordFileId}
                        </a>
                      </div>

                      {/* دکمه حذف */}
                      <Button
                        color='danger'
                        size='sm'
                        onClick={() => {
                          dispatch(RemoveMeetingRecord({ id: item.id })).then(() => {
                            dispatch(
                              GetMeetingRecord(
                                `?ExamId=1&SubSiteId=${localStorage.getItem('subSiteIds')}&MeetingRecordTypeId=${
                                  meetingItem.id
                                }&PageSize=999999`
                              )
                            )
                            dispatch(GetMeetingRecordType())
                          })
                        }}
                      >
                        حذف
                      </Button>
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
            {/* دکمه ثبت */}
            <Col lg={6}>
              <Button color='danger' className='w-100' onClick={() => toggle()}>
                بستن
              </Button>
            </Col>
            <Col lg={6}>
              <Button color='primary' type='submit' block disabled={!isValid}>
                ثبت
              </Button>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  )
}
