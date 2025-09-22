import React, { useEffect } from 'react'
import { Button, FormFeedback, Form, Row, Col, Modal, ModalHeader, ModalBody, Input, Label } from 'reactstrap'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Select from 'react-select'

// ⚠️ در حالت واقعی redux استفاده میشه
// import { useDispatch, useSelector } from 'react-redux'
// import { UpdateExamScopeSecound, GetExamScopeSecound } from '@store/slices/examScope'

const schema = yup.object({
  name: yup.string().required('نام الزامی است'),
  province: yup.string().required('استان محل سکونت الزامی است'),
  phone: yup.string().required('شماره همراه الزامی است'),
  nationalId: yup.string().required('کدملی الزامی است'),
  typeOfActivity: yup.string().required('نوع فعالیت الزامی است'),
  rank: yup.string().required('رتبه عملکرد الزامی است'),
  presenter: yup.string().required('مجری الزامی است'),
  contract: yup.string().required('مبلغ قرارداد الزامی است')
})

export default function EditModal({ IsEditModal, SetIsEditModal, item }) {
  // const dispatch = useDispatch()
  // const store = useSelector((state) => state.examScope)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      province: '',
      phone: '',
      nationalId: '',
      typeOfActivity: '',
      rank: '',
      presenter: '',
      contract: ''
    }
  })

  const toggle = () => SetIsEditModal(!IsEditModal)

  const onSubmit = (data) => {
    const payload = {
      ...data,
      id: item?.id
    }
    console.log('📌 ویرایش استاتیک:', payload)

    // در حالت واقعی:
    // dispatch(UpdateExamScopeSecound(payload)).then(() => {
    //   dispatch(GetExamScopeSecound()).then(() => {
    //     reset()
    //     toggle()
    //   })
    // })
    reset()
    toggle()
  }

  // داده‌های استاتیک برای تست
  const mockProvinces = [
    { value: 'تهران', label: 'تهران' },
    { value: 'اصفهان', label: 'اصفهان' }
  ]

  const mockRanks = [
    { value: 'عالی', label: 'عالی' },
    { value: 'خوب', label: 'خوب' },
    { value: 'متوسط', label: 'متوسط' }
  ]

  const mockActivities = [
    { value: 'آزمون بان', label: 'آزمون بان' },
    { value: 'آزمون گر', label: 'آزمون گر' }
  ]

  const mockPresenters = [
    { value: 'دارد', label: 'دارد' },
    { value: 'ندارد', label: 'ندارد' }
  ]

  useEffect(() => {
    if (item) {
      reset({
        name: item.name || '',
        province: item.province || '',
        phone: item.phone || '',
        nationalId: item.nationalId || '',
        typeOfActivity: item.typeOfActivity || '',
        rank: item.rank || '',
        presenter: item.presenter || '',
        contract: item.contract || ''
      })
    }
  }, [item, reset])

  return (
    <Modal size='lg' isOpen={IsEditModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>ویرایش عامل اجرایی</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            {/* نام */}
            <Col lg={6}>
              <div className='mb-1'>
                <Label for='name'>نام و نام خانوادگی</Label>
                <Controller name='name' control={control} render={({ field }) => <Input id='name' {...field} invalid={!!errors.name} />} />
                {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
              </div>
            </Col>

            {/* استان */}
            <Col lg={6}>
              <div className='mb-1'>
                <Label for='province'>استان محل سکونت</Label>
                <Controller
                  name='province'
                  control={control}
                  render={({ field }) => (
                    <Select
                      id='province'
                      placeholder='انتخاب استان'
                      options={mockProvinces}
                      value={mockProvinces.find((o) => o.value === field.value) || null}
                      onChange={(selected) => field.onChange(selected?.value)}
                      className={errors.province ? 'is-invalid' : ''}
                    />
                  )}
                />
                {errors.province && <FormFeedback className='d-block'>{errors.province.message}</FormFeedback>}
              </div>
            </Col>

            {/* شماره همراه */}
            <Col lg={6}>
              <div className='mb-1'>
                <Label for='phone'>شماره همراه</Label>
                <Controller name='phone' control={control} render={({ field }) => <Input id='phone' {...field} invalid={!!errors.phone} />} />
                {errors.phone && <FormFeedback>{errors.phone.message}</FormFeedback>}
              </div>
            </Col>

            {/* کدملی */}
            <Col lg={6}>
              <div className='mb-1'>
                <Label for='nationalId'>کدملی</Label>
                <Controller name='nationalId' control={control} render={({ field }) => <Input id='nationalId' {...field} invalid={!!errors.nationalId} />} />
                {errors.nationalId && <FormFeedback>{errors.nationalId.message}</FormFeedback>}
              </div>
            </Col>

            {/* نوع فعالیت */}
            <Col lg={6}>
              <div className='mb-1'>
                <Label for='typeOfActivity'>نوع فعالیت</Label>
                <Controller
                  name='typeOfActivity'
                  control={control}
                  render={({ field }) => (
                    <Select
                      id='typeOfActivity'
                      placeholder='انتخاب نوع فعالیت'
                      options={mockActivities}
                      value={mockActivities.find((o) => o.value === field.value) || null}
                      onChange={(selected) => field.onChange(selected?.value)}
                      className={errors.typeOfActivity ? 'is-invalid' : ''}
                    />
                  )}
                />
                {errors.typeOfActivity && <FormFeedback className='d-block'>{errors.typeOfActivity.message}</FormFeedback>}
              </div>
            </Col>

            {/* رتبه */}
            <Col lg={6}>
              <div className='mb-1'>
                <Label for='rank'>رتبه عملکرد</Label>
                <Controller
                  name='rank'
                  control={control}
                  render={({ field }) => (
                    <Select
                      id='rank'
                      placeholder='انتخاب رتبه'
                      options={mockRanks}
                      value={mockRanks.find((o) => o.value === field.value) || null}
                      onChange={(selected) => field.onChange(selected?.value)}
                      className={errors.rank ? 'is-invalid' : ''}
                    />
                  )}
                />
                {errors.rank && <FormFeedback className='d-block'>{errors.rank.message}</FormFeedback>}
              </div>
            </Col>

            {/* مجری */}
            <Col lg={6}>
              <div className='mb-1'>
                <Label for='presenter'>مجری</Label>
                <Controller
                  name='presenter'
                  control={control}
                  render={({ field }) => (
                    <Select
                      id='presenter'
                      placeholder='انتخاب وضعیت مجری'
                      options={mockPresenters}
                      value={mockPresenters.find((o) => o.value === field.value) || null}
                      onChange={(selected) => field.onChange(selected?.value)}
                      className={errors.presenter ? 'is-invalid' : ''}
                    />
                  )}
                />
                {errors.presenter && <FormFeedback className='d-block'>{errors.presenter.message}</FormFeedback>}
              </div>
            </Col>

          

            {/* دکمه ثبت */}
            <Col lg={12}>
              <Button color='primary' type='submit' block disabled={!isValid}>ثبت</Button>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  )
}
