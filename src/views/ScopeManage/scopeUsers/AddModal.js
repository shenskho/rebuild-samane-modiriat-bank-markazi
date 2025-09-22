import React from 'react'
import { Button, FormFeedback, Form, Row, Col, Modal, ModalHeader, ModalBody, Input, Label } from 'reactstrap'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { UploadFile, CreateScopeTicket } from '@store/slices/scopeUser'
import { Image } from 'react-feather'

// ✅ اعتبارسنجی فیلدها
const schema = yup.object({

  applicantDescription: yup.string().required('توضیحات الزامی است'),
  attachFileId: yup.string().required('بارگذاری فایل الزامی است')
})

export default function AddModal({ IsAddModal, SetIsAddModal, meetingItem }) {
  const dispatch = useDispatch()
  const store = useSelector((state) => state.scopeUser)

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
    const payload = {
      applicantId: meetingItem.applicantId, // می‌تونی اینجا مقدار دهی کنی
      applicantNationalCode: meetingItem.nationalCode,
      applicantDescription: data.applicantDescription,
      attachFileId: data.attachFileId
    }

    dispatch(CreateScopeTicket(payload)).then(() => {
      // dispatch(GetApplicantRecord({ pageSize: 999999 }))
      toggle()
      reset()
    })
  }

  return (
    <Modal size='lg' isOpen={IsAddModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>ثبت درخواست جدید</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>


            {/* توضیحات */}
            <Col lg={12}>
              <Label for='applicantDescription'>توضیحات</Label>
              <Controller
                name='applicantDescription'
                control={control}
                render={({ field }) => (
                  <Input type='textarea' {...field} invalid={!!errors.applicantDescription} placeholder='توضیحات را وارد کنید' />
                )}
              />
              {errors.applicantDescription && (
                <FormFeedback className='d-block'>{errors.applicantDescription.message}</FormFeedback>
              )}
            </Col>

            {/* آپلود فایل */}
            <Col lg={12} className='mt-2'>
              <Label for='attachFileId'>
                <span className='text-danger'>*</span> فقط فایل‌های pdf قابل قبول هستند
              </Label>
              <Controller
                name='attachFileId'
                control={control}
                render={({ field }) => {
                  const [fileName, setFileName] = React.useState('')

                  const handleRemove = () => {
                    setFileName('')
                    field.onChange('')
                    document.getElementById('attachFileId').value = null
                  }

                  return (
                    <div className='d-flex align-items-center'>
                      <Input
                        id='attachFileId'
                        type='file'
                        accept='.pdf, image/*' // ✅ هم PDF هم همه فرمت‌های عکس
                        style={{ display: 'none' }}
                        invalid={!!errors.attachFileId}
                        onChange={async (e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            // ✅ چک کن فایل یا PDF یا تصویر باشه
                            const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
                            if (!allowedTypes.includes(file.type)) {
                              alert('فقط فایل‌های PDF یا تصویر (jpg, jpeg, png) مجاز هستند')
                              e.target.value = null
                              return
                            }

                            setFileName(file.name)
                            const formData = new FormData()
                            formData.append('files', file)

                            const result = await dispatch(UploadFile(formData))
                            const fileId = result?.payload?.list[0]?.id
                            if (fileId) {
                              field.onChange(fileId)
                            }
                          }
                        }}
                      />

                      <div className='d-flex align-items-center justify-content-left pl-0 pr-0 form-control'>
                        <Button
                          color='primary'
                          className='m-0'
                          onClick={() => document.getElementById('attachFileId').click()}
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
              {errors.attachFileId && <FormFeedback className='d-block'>{errors.attachFileId.message}</FormFeedback>}
            </Col>

            {/* دکمه‌ها */}
            <Col lg={6} className='mt-2'>
              <Button color='danger' className='w-100' onClick={() => toggle()}>
                بستن
              </Button>
            </Col>
            <Col lg={6} className='mt-2'>
              <Button color='primary' type='submit' block disabled={!isValid}>
                ثبت
              </Button>
            </Col>
          </Row>
        </Form>

        {/* لیست رکوردها */}
        <Row className='mt-2'>
          {store.ApplicantRecord?.items?.map((item) => (
            <Col lg={12} key={item.id}>
              <div className='border rounded p-2 mb-1 d-flex justify-content-between align-items-center bg-white'>
                <div>
                  <strong>کد ملی:</strong> {item.applicantNationalCode} <br />
                  <strong>توضیحات:</strong> {item.applicantDescription} <br />
                  <strong>فایل:</strong>{' '}
                  <a href={`https://cardapi.iranrtc.ir/api/v1/File/get-file-as-link?DocumentId=${item.attachFileId}`}>
                    {item.attachFileId}
                  </a>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </ModalBody>
    </Modal>
  )
}
