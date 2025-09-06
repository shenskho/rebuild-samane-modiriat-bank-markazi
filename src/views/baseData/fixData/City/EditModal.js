import React, { useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Input, Label, FormGroup, Form, Row, Col, FormFeedback } from 'reactstrap'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { updateCity, GetCity, getProvince } from '@store/slices/fixData'
import Select from 'react-select'

const schema = yup.object({
  provinceId: yup.string().required('انتخاب استان الزامی است'),
  title: yup.string().required('عنوان الزامی است'),
})

export default function EditModal({ IsEditModal, SetIsEditModal, item }) {
  const dispatch = useDispatch()
  const store = useSelector((state) => state.FixData)

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid }
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema)
  })

  const toggle = () => SetIsEditModal(!IsEditModal)

  const onSubmit = (data) => {
    console.log('editData', data)
    
    dispatch(
      updateCity({
        'id': item.id,
        'title': data.title,
        'provinceId': data.provinceId,
        'familySupportRule': data.familySupportRule
      })
    ).then(() => {
      dispatch(GetCity())
      dispatch(getProvince())
      reset()
      toggle()
    })
  }

  useEffect(() => {
    if (item) {
      setValue('title', item.title || '')
      setValue('provinceId', item.provinceId || '')
      setValue('familySupportRule', item.familySupportRule || '')
     
    }
  }, [item, setValue])

  return (
    <Modal size='lg' isOpen={IsEditModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>تغییر نام شهر</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col lg={6}>
              <div className='mb-1'>
                <Label for='title'>
                  عنوان<span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='title'
                  control={control}
                  render={({ field }) => <Input id='title' invalid={!!errors.title} {...field} />}
                />
                {errors.title && <FormFeedback>{errors.title.message}</FormFeedback>}
              </div>
            </Col>

            <Col lg={6}>
              <div className='mb-1'>
                <Label for='provinceId'>
                  استان <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='provinceId'
                  control={control}
                  render={({ field }) => {
                    const options =
                      store.Province?.items?.map((org) => ({
                        value: org.id,
                        label: org.title
                      })) || []

                    return (
                      <Select
                        id='provinceId'
                        placeholder='انتخاب استان'
                        options={options}
                        value={options.find((o) => o.value === field.value) || null}
                        onChange={(selected) => field.onChange(selected?.value || '')}
                        className={errors.provinceId ? 'is-invalid' : ''}
                      />
                    )
                  }}
                />
                {errors.provinceId && <FormFeedback className='d-block'>{errors.provinceId.message}</FormFeedback>}
              </div>
            </Col>
             <Col lg={6}>
              <div className='mb-1'>
                <Label for='familySupportRule'>
                  عنوان<span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='familySupportRule'
                  control={control}
                  render={({ field }) => <Input id='familySupportRule' invalid={!!errors.familySupportRule} {...field} />}
                />
                {errors.familySupportRule && <FormFeedback>{errors.familySupportRule.message}</FormFeedback>}
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
