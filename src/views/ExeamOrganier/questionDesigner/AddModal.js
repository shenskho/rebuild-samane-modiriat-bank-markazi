import React from 'react'
import { Button, FormFeedback, Form, Row, Col, Modal, ModalHeader, ModalBody, Input, Label } from 'reactstrap'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Image } from 'react-feather'
import Select from 'react-select'

// ⚠️ در حالت واقعی dispatch و redux استفاده میشه ولی فعلا استاتیک کردیم
// import { useDispatch, useSelector } from 'react-redux'
// import { CreateExamScopeSecound, GetExamScopeSecound, GetProvince } from '@store/slices/examScope'

const schema = yup.object({
  name: yup.string().required('نام الزامی است'),
  province: yup.string().required('استان الزامی است'),
  phone: yup.string().required('شماره همراه الزامی است'),
  nationalId: yup.string().required('کدملی الزامی است'),
  shenasname: yup.string().required('شماره شناسنامه الزامی است'),
  rank: yup.string().required('رتبه عملکرد الزامی است'),
  opinion: yup.string().required('نظر مجری الزامی است'),
  contract: yup.string().required('مبلغ قرارداد الزامی است'),
  contractImage: yup.mixed().required('تصویر قرارداد الزامی است')
})

export default function LicenseModal({ IsAddModal, SetIsAddModal }) {
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
    defaultValues: {}
  })

  const toggle = () => SetIsAddModal(!IsAddModal)

  const onSubmit = (data) => {
    console.log('📌 فرم ارسال شد (استاتیک):', data)
    // در حالت واقعی:
    // dispatch(CreateExamScopeSecound(data)).then(() => {
    //   dispatch(GetExamScopeSecound()).then(() => {
    //     reset()
    //     toggle()
    //   })
    // })
    reset()
    toggle()
  }

 
  const mockProvinces = [
    { value: 'تهران', label: 'تهران' },
    { value: 'اصفهان', label: 'اصفهان' }
  ]

 
  const mockRanks = [
    { value: 'عالی', label: 'عالی' },
    { value: 'خوب', label: 'خوب' },
    { value: 'متوسط', label: 'متوسط' }
  ]

  return (
    <Modal size='lg' isOpen={IsAddModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>فرم جدید</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            {/* نام و نام خانوادگی */}
            <Col lg={6}>
              <div className='mb-1'>
                <Label for='name'>نام و نام خانوادگی <span className='text-danger'>*</span></Label>
                <Controller name='name' control={control} render={({ field }) => <Input id='name' {...field} invalid={!!errors.name} />} />
                {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
              </div>
            </Col>

            {/* استان محل سکونت */}
            <Col lg={6}>
              <div className='mb-1'>
                <Label for='province'>استان محل سکونت <span className='text-danger'>*</span></Label>
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
                <Label for='phone'>شماره همراه <span className='text-danger'>*</span></Label>
                <Controller name='phone' control={control} render={({ field }) => <Input id='phone' {...field} invalid={!!errors.phone} />} />
                {errors.phone && <FormFeedback>{errors.phone.message}</FormFeedback>}
              </div>
            </Col>

            {/* کدملی */}
            <Col lg={6}>
              <div className='mb-1'>
                <Label for='nationalId'>کدملی <span className='text-danger'>*</span></Label>
                <Controller name='nationalId' control={control} render={({ field }) => <Input id='nationalId' {...field} invalid={!!errors.nationalId} />} />
                {errors.nationalId && <FormFeedback>{errors.nationalId.message}</FormFeedback>}
              </div>
            </Col>

            {/* شماره شناسنامه */}
            <Col lg={6}>
              <div className='mb-1'>
                <Label for='shenasname'>شماره شناسنامه <span className='text-danger'>*</span></Label>
                <Controller name='shenasname' control={control} render={({ field }) => <Input id='shenasname' {...field} invalid={!!errors.shenasname} />} />
                {errors.shenasname && <FormFeedback>{errors.shenasname.message}</FormFeedback>}
              </div>
            </Col>

            {/* رتبه عملکرد */}
            <Col lg={6}>
              <div className='mb-1'>
                <Label for='rank'>رتبه عملکرد <span className='text-danger'>*</span></Label>
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

            {/* نظر مجری */}
            <Col lg={12}>
              <div className='mb-1'>
                <Label for='opinion'>نظر مجری <span className='text-danger'>*</span></Label>
                <Controller name='opinion' control={control} render={({ field }) => <Input id='opinion' {...field} invalid={!!errors.opinion} />} />
                {errors.opinion && <FormFeedback>{errors.opinion.message}</FormFeedback>}
              </div>
            </Col>

            {/* مبلغ قرارداد */}
            <Col lg={6}>
              <div className='mb-1'>
                <Label for='contract'>مبلغ قرارداد <span className='text-danger'>*</span></Label>
                <Controller name='contract' control={control} render={({ field }) => <Input type='number' id='contract' {...field} invalid={!!errors.contract} />} />
                {errors.contract && <FormFeedback>{errors.contract.message}</FormFeedback>}
              </div>
            </Col>

            {/* تصویر قرارداد */}
            <Col lg={6}>
              <div className='mb-1'>
                <Label for='contractImage'>تصویر قرارداد <span className='text-danger'>*</span></Label>
                <Controller
                  name='contractImage'
                  control={control}
                  render={({ field }) => {
                    const [fileName, setFileName] = React.useState('')
                    const handleRemove = () => {
                      setFileName('')
                      field.onChange('')
                      document.getElementById('contractImage').value = null
                    }
                    return (
                      <div className='d-flex align-items-center'>
                        <Input
                          id='contractImage'
                          type='file'
                          accept='image/*'
                          style={{ display: 'none' }}
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              setFileName(file.name)
                              field.onChange(file) // در حالت واقعی باید آپلود بشه
                            }
                          }}
                        />
                        <div className='d-flex align-items-center justify-content-left pl-0 pr-0 form-control'>
                          <Button color='primary' className='m-0' onClick={() => document.getElementById('contractImage').click()}>
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
                {errors.contractImage && <FormFeedback className='d-block'>{errors.contractImage.message}</FormFeedback>}
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
