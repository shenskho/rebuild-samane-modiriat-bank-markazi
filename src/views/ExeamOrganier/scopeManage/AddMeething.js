import React from 'react'
import { Button, FormFeedback, Form, Row, Col, Modal, ModalHeader, ModalBody, Input, Label } from 'reactstrap'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { UploadFile, CreateMeetingRecordType,GetMeetingRecordType } from '@store/slices/scopeUser'
import { Image } from 'react-feather'

const schema = yup.object({
  title: yup.string().required('عنوان الزامی است'),
  imageId: yup.string().required('بارگذاری تصویر الزامی است'),
  justDownload: yup.boolean()
})

export default function AddModal({ IsAddModal, SetIsAddModal }) {
  const dispatch = useDispatch()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
      justDownload: true
    }
  })

  const toggle = () => SetIsAddModal(!IsAddModal)

  const onSubmit = (data) => {
    const payload = {
      title: data.title,
      rawFileId: data.imageId,
      justDownload: data.justDownload
    }

    console.log('Payload to send:', payload)

    dispatch(CreateMeetingRecordType(payload)).then(() => {
      dispatch(GetMeetingRecordType()).then(() => {
      reset()
      toggle()
      })

    })
  }

  return (
    <Modal size='lg' isOpen={IsAddModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>آپلود فایل</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            {/* Title */}
            <Col lg={12} className='mb-2'>
              <Controller
                name='title'
                control={control}
                render={({ field }) => (
                  <div>
                    <Label for='title'>
                      <span className='text-danger'>*</span> عنوان
                    </Label>
                    <Input
                      id='title'
                      type='text'
                      placeholder='عنوان را وارد کنید'
                      invalid={!!errors.title}
                      {...field}
                    />
                    {errors.title && <FormFeedback className='d-block'>{errors.title.message}</FormFeedback>}
                  </div>
                )}
              />
            </Col>

            {/* PDF File */}
            <Col lg={12} className='mb-2'>
              <Controller
                name='imageId'
                control={control}
                render={({ field }) => {
                  const [fileName, setFileName] = React.useState('')

                  const handleRemove = () => {
                    setFileName('')
                    field.onChange('')
                    document.getElementById('imageId').value = null
                  }

                  return (
                    <div>
                      <Label for='imageId'>
                        <span className='text-danger'>*</span> فقط فایل‌های PDF قابل قبول هستند
                      </Label>
                      <Input
                        id='imageId'
                        type='file'
                        accept='application/pdf'
                        style={{ display: 'none' }}
                        invalid={!!errors.imageId}
                        onChange={async (e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            if (file.type !== 'application/pdf') {
                              alert('لطفاً فقط فایل PDF انتخاب کنید!')
                              e.target.value = null
                              return
                            }

                            setFileName(file.name)
                            const formData = new FormData()
                            formData.append('files', file)

                            const result = await dispatch(UploadFile(formData))
                            const imageId = result?.payload?.list[0]?.id
                            if (imageId) field.onChange(imageId)
                          }
                        }}
                      />
                      <div className='d-flex align-items-center justify-content-left pl-0 pr-0 form-control'>
                        <Button color='primary' className='m-0' onClick={() => document.getElementById('imageId').click()}>
                          <Image size={20} color='white' />
                        </Button>
                        <span className='text-center ml-1'>{fileName || 'فایلی انتخاب نشده'}</span>
                        {fileName && (
                          <Button color='danger' size='sm' outline className='ms-2' onClick={handleRemove}>
                            ✕
                          </Button>
                        )}
                      </div>
                      {errors.imageId && <FormFeedback className='d-block'>{errors.imageId.message}</FormFeedback>}
                    </div>
                  )
                }}
              />
            </Col>

            {/* justDownload */}
          <Col lg={12} className='mb-2'>
  <Controller
    name='justDownload'
    control={control}
    render={({ field }) => (
      <div className='form-check'>
        <input
          type='checkbox'
          id='justDownload'
          className='form-check-input'
          checked={field.value}
          onChange={(e) => field.onChange(e.target.checked)}
        />
        <label className='form-check-label' htmlFor='justDownload'>
          فقط دانلود
        </label>
      </div>
    )}
  />
</Col>

            {/* Buttons */}
            <Col lg={6}>
              <Button color='danger' className='w-100' onClick={toggle}>
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
