import React, { useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Input, Label, FormGroup, Form, Row, Col, FormFeedback } from 'reactstrap'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { updateJob, GetJob, GetOrganization } from '@store/slices/variableData'
import Select from 'react-select'

const schema = yup.object({
  organizationId: yup.string().required('انتخاب دستگاه الزامی است'),
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
      updateJob({
        'id': item.id,
        'title': data.title,
        'organizationId': data.organizationId,
        'status': data.status
      })
    ).then(() => {
      dispatch(GetJob())
      dispatch(GetOrganization())
      reset()
      toggle()
    })
  }

  useEffect(() => {
    if (item) {
      setValue('title', item.title || '')
      setValue('organizationId', item.organizationId || '')
      setValue('status', item.status !== false)
    }
  }, [item, setValue])

  return (
    <Modal size='lg' isOpen={IsEditModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>تغییر نوع شغل</ModalHeader>
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
                <Label for='organizationId'>
                  دستگاه <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='organizationId'
                  control={control}
                  render={({ field }) => {
                    const options =
                      store.Organization?.items?.map((org) => ({
                        value: org.id,
                        label: org.title
                      })) || []

                    return (
                      <Select
                        id='organizationId'
                        placeholder='انتخاب دستگاه'
                        options={options}
                        value={options.find((o) => o.value === field.value) || null}
                        onChange={(selected) => field.onChange(selected?.value || '')}
                        className={errors.organizationId ? 'is-invalid' : ''}
                      />
                    )
                  }}
                />
                {errors.organizationId && <FormFeedback className='d-block'>{errors.organizationId.message}</FormFeedback>}
              </div>
            </Col>

            <Col lg={6}>
              <div className='mb-1'>
                <FormGroup check>
                  <Controller
                    name='status'
                    control={control}
                    render={({ field }) => (
                      <Label check>
                        <Input 
                          type="checkbox" 
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                        {' '}فعال
                      </Label>
                    )}
                  />
                </FormGroup>
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
