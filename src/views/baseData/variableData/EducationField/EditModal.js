import React, { useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Input, Label, FormGroup, Form, Row, Col, FormFeedback } from 'reactstrap'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { updateEducationField, GetEducationField, GetEducationLevel } from '@store/slices/variableData'
import Select from 'react-select'

const schema = yup.object({
  educationLevelId: yup.string().required('انتخاب مقطع الزامی است'),
  title: yup.string().required('عنوان الزامی است'),
})

export default function EditModal({ IsEditModal, SetIsEditModal, item }) {
  const dispatch = useDispatch()
  const store = useSelector((state) => state.variableData)

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
    updateEducationField({
      id: item.id,
      title: data.title,                 // مقدار جدید از فرم
      educationLevelId: Number(data.educationLevelId) // حتما عدد باشد
    })
  ).then(() => {
    dispatch(GetEducationField())
    dispatch(GetEducationLevel())
    reset()
    toggle()
  })
}



  useEffect(() => {
    if (item) {
      setValue('title', item.title || '')
      setValue('educationLevelId', item.educationLevelId || '')
     
    }
  }, [item, setValue])

  return (
    <Modal size='lg' isOpen={IsEditModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>ویرایش رشته تحصیلی</ModalHeader>
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
                <Label for='educationLevelId'>
                  مقطع <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='educationLevelId'
                  control={control}
                  render={({ field }) => {
                    const options =
                      store.EducationLevel?.items?.map((level) => ({
                        value: level.id,
                        label: level.title
                      })) || []

                    const normalize = (v) => (v === undefined || v === null || v === '' ? '' : Number(v))

                    return (
                      <Select
                        id='educationLevelId'
                        placeholder='انتخاب مقطع'
                        options={options}
                        value={options.find((o) => o.value === normalize(field.value)) || null}
                        onChange={(selected) => field.onChange(normalize(selected?.value))}
                        className={errors.educationLevelId ? 'is-invalid' : ''}
                      />
                    )
                  }}
                />
                {errors.educationLevelId && <FormFeedback className='d-block'>{errors.educationLevelId.message}</FormFeedback>}
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
