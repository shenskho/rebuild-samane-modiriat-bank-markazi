import React, { useEffect } from 'react'
import { Button, FormFeedback, Form, Row, Col, Modal, ModalHeader, ModalBody, Input, Label } from 'reactstrap'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { UpdateExamScopeSecound, GetExamScopeSecound, GetCity } from '@store/slices/examScope'


import Select from 'react-select'

const schema = yup.object({
  mainSiteId: yup.number().typeError('سایت الزامی است').required('سایت الزامی است'),
  title: yup.string().required('عنوان الزامی است'),
  genderType: yup.string().required('جنسیت الزامی است'),
  capacity: yup.number().typeError('ظرفیت باید عدد باشد').required('ظرفیت الزامی است'),
   address:yup.string().required('آدرس الزامی است')
})

export default function LicenseModal({ IsEditModal, SetIsEditModal, item }) {
  const dispatch = useDispatch()
  const store = useSelector((state) => state.examScope)
  console.log('store', store)
const {
  control,
  handleSubmit,
  reset,
  formState: { errors, isValid }
} = useForm({
  mode: 'all',
  resolver: yupResolver(schema),
  defaultValues: {
    mainSiteId: '',
    title: '',
    genderType: '',
    capacity: '',
    address:''
  }
})

  const toggle = () => SetIsEditModal(!IsEditModal)


  const onSubmit = (data) => {
    const payload = {
      ...data,
      id:item.id
    }

    console.log('ExamScopeSecound', payload)

    dispatch(UpdateExamScopeSecound(payload)).then(() => {
      dispatch(GetExamScopeSecound()).then(() => {
        reset()
        toggle()
      })
    })
  }

  const genderOptions = [
    { value: '1', label: 'مرد' },
    { value: '2', label: 'زن' }
  ]
  useEffect(() => {
  if (item) {
    reset({
      mainSiteId: item.mainSiteId || '',
      title: item.title || '',
      genderType: item.gender?.toString() || '',
      capacity: item.capacity || '',
      address:item.address || '',
    })
  } else {
    reset({
      mainSiteId: '',
      title: '',
      genderType: '',
      capacity: '',
      address:''
    })
  }
}, [item, reset])
  return (
    <Modal size='lg' isOpen={IsEditModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>ویرایش فرم </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col lg={6}>
              <div className='mb-1'>
                <Label for='mainSiteId'>
                  حوزه   <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='mainSiteId'
                  control={control}
                  render={({ field }) => {
                    const options =
                      store.mainScopes?.items?.map((org) => ({
                        value: org.id,
                        label: org.title
                      })) || []
                    return (
                      <Select
                        id='mainSiteId'
                        placeholder='انتخاب حوزه '
                        options={options}
                        value={options.find((o) => o.value === field.value) || null}
                        onChange={(selected) => field.onChange(selected?.value || 0)}
                        className={errors.mainSiteId ? 'is-invalid' : ''}
                      />
                    )
                  }}
                />
                {errors.cityId && <FormFeedback className='d-block'>{errors.cityId.message}</FormFeedback>}
              </div>
            </Col>
        
            {/* سایت اصلی */}
            

            {/* عنوان */}
            <Col lg={6}>
              <div className='mb-1'>
                <Label for='title'>
                  عنوان <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='title'
                  control={control}
                  render={({ field }) => <Input id='title' invalid={!!errors.title} {...field} />}
                />
                {errors.title && <FormFeedback>{errors.title.message}</FormFeedback>}
              </div>
            </Col>

            {/* جنسیت */}
            <Col lg={6}>
              <div className='mb-1'>
                <Label for='genderType'>
                  جنسیت <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='genderType'
                  control={control}
                  render={({ field }) => (
                    <Select
                      id='genderType'
                      placeholder='انتخاب جنسیت'
                      options={genderOptions}
                      value={genderOptions.find((o) => o.value === field.value) || null}
                      onChange={(selected) => field.onChange(selected?.value || '')}
                      className={errors.genderType ? 'is-invalid' : ''}
                    />
                  )}
                />
                {errors.genderType && <FormFeedback className='d-block'>{errors.genderType.message}</FormFeedback>}
              </div>
            </Col>

            {/* ظرفیت */}
            <Col lg={6}>
              <div className='mb-1'>
                <Label for='capacity'>
                  ظرفیت <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='capacity'
                  control={control}
                  render={({ field }) => <Input type='number' id='capacity' invalid={!!errors.capacity} {...field} />}
                />
                {errors.capacity && <FormFeedback>{errors.capacity.message}</FormFeedback>}
              </div>
            </Col>
 <Col lg={12}>
              <div className='mb-1'>
                <Label for='address'>
                  آدرس <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='address'
                  control={control}
                  render={({ field }) => <Input type='textarea' id='address' invalid={!!errors.address} {...field} />}
                />
                {errors.address && <FormFeedback>{errors.address.message}</FormFeedback>}
              </div>
            </Col>
            {/* دکمه ثبت */}
            <Col lg={12}>
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
