import React from 'react'
import { Button, FormFeedback, Form, Row, Col, Modal, ModalHeader, ModalBody, Input, Label } from 'reactstrap'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// ⚠️ در حالت واقعی redux استفاده میشه
// import { useDispatch, useSelector } from 'react-redux'
// import { CreateLicense, GetLicenses } from '@store/slices/licenses'

const schema = yup.object({
  name: yup.string().required('نام آزمون الزامی است'),
  history: yup.string().required('تاریخ آزمون الزامی است'),
  allNumbers: yup.string().required('تعداد کل الزامی است'),
  woman: yup.string().required('تعداد زن الزامی است'),
  man: yup.string().required('تعداد مرد الزامی است')
})

export default function AddModal({ IsAddModal, SetIsAddModal }) {
  // const dispatch = useDispatch()
  // const store = useSelector((state) => state.licenses)

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
    console.log('📌 افزودن استاتیک:', data)
    // در حالت واقعی:
    // dispatch(CreateLicense(data)).then(() => {
    //   dispatch(GetLicenses()).then(() => {
    //     reset()
    //     toggle()
    //   })
    // })
    reset()
    toggle()
  }

  return (
    <Modal size='lg' isOpen={IsAddModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>افزودن آزمون</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            {/* نام آزمون */}
            <Col lg={6}>
              <div className='mb-1'>
                <Label for='name'>نام آزمون</Label>
                <Controller name='name' control={control} render={({ field }) => <Input id='name' {...field} invalid={!!errors.name} />} />
                {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
              </div>
            </Col>

            {/* تاریخ آزمون */}
            <Col lg={6}>
              <div className='mb-1'>
                <Label for='history'>تاریخ آزمون</Label>
                <Controller name='history' control={control} render={({ field }) => <Input id='history' {...field} invalid={!!errors.history} />} />
                {errors.history && <FormFeedback>{errors.history.message}</FormFeedback>}
              </div>
            </Col>

            {/* تعداد کل */}
            <Col lg={6}>
              <div className='mb-1'>
                <Label for='allNumbers'>تعداد کل</Label>
                <Controller name='allNumbers' control={control} render={({ field }) => <Input id='allNumbers' {...field} invalid={!!errors.allNumbers} />} />
                {errors.allNumbers && <FormFeedback>{errors.allNumbers.message}</FormFeedback>}
              </div>
            </Col>

            {/* تعداد زن */}
            <Col lg={6}>
              <div className='mb-1'>
                <Label for='woman'>تعداد زن</Label>
                <Controller name='woman' control={control} render={({ field }) => <Input id='woman' {...field} invalid={!!errors.woman} />} />
                {errors.woman && <FormFeedback>{errors.woman.message}</FormFeedback>}
              </div>
            </Col>

            {/* تعداد مرد */}
            <Col lg={6}>
              <div className='mb-1'>
                <Label for='man'>تعداد مرد</Label>
                <Controller name='man' control={control} render={({ field }) => <Input id='man' {...field} invalid={!!errors.man} />} />
                {errors.man && <FormFeedback>{errors.man.message}</FormFeedback>}
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
