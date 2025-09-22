import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Label,
  FormFeedback,
  Form,
  Row,
  Col
} from 'reactstrap'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Select from 'react-select'
import { useEffect } from 'react'

export default function EditUserModal({ isOpen, toggle, onSubmit, examScope, initialValues }) {
  const schema = yup.object({
    userName: yup.string().required('(الزامی)'),
    email: yup.string().email('ایمیل معتبر نمی باشد').required('(الزامی)'),
    firstName: yup.string().required('(الزامی)'),
    lastName: yup.string().required('(الزامی)'),
    subSiteIds: yup.array().min(1, '(حداقل یک زیرسایت انتخاب کنید)').required('(الزامی)')
  })

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    // defaultValues: {
    //   userName: '',
    //   email: '',
    //   firstName: '',
    //   lastName: '',
    //   subSiteIds: []
    // }
  })

  // هر وقت initialValues تغییر کنه، فرم ست میشه
  useEffect(() => {
    if (initialValues) {
      reset(initialValues)
    }
  }, [initialValues, reset])

  return (
    <Modal isOpen={isOpen} toggle={toggle} size='lg'>
      <ModalHeader toggle={toggle}>ویرایش کاربر</ModalHeader>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          <Row>
            <Col lg={6}>
              <Label for='userName'>نام کاربری *</Label>
              <Controller
                name='userName'
                control={control}
                render={({ field, fieldState }) => (
                  <Input {...field} id='userName' invalid={!!fieldState.error} placeholder='نام کاربری' />
                )}
              />
              {errors.userName && <FormFeedback>{errors.userName.message}</FormFeedback>}
            </Col>
            <Col lg={6}>
              <Label for='firstName'>نام *</Label>
              <Controller
                name='firstName'
                control={control}
                render={({ field, fieldState }) => (
                  <Input {...field} id='firstName' invalid={!!fieldState.error} placeholder='نام' />
                )}
              />
              {errors.firstName && <FormFeedback>{errors.firstName.message}</FormFeedback>}
            </Col>
            <Col lg={6}>
              <Label for='lastName'>نام خانوادگی *</Label>
              <Controller
                name='lastName'
                control={control}
                render={({ field, fieldState }) => (
                  <Input {...field} id='lastName' invalid={!!fieldState.error} placeholder='نام خانوادگی' />
                )}
              />
              {errors.lastName && <FormFeedback>{errors.lastName.message}</FormFeedback>}
            </Col>
            <Col lg={6}>
              <Label for='email'>ایمیل *</Label>
              <Controller
                name='email'
                control={control}
                render={({ field, fieldState }) => (
                  <Input {...field} id='email' invalid={!!fieldState.error} placeholder='ایمیل' />
                )}
              />
              {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
            </Col>
            <Col lg={12}>
              <Label for='subSiteIds'>انتخاب زیرسایت‌ها *</Label>
              <Controller
                name='subSiteIds'
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    isMulti
                    inputId='subSiteIds'
                    options={examScope?.SecoundScopeList?.items?.map((item) => ({
                      value: item.id,
                      label:`${item.title}-${item.provinceTitle}-${item.mainSiteId}-${item.genderTitle}` 
                    }))}
                   
                    value={field.value?.map((id) =>
                      examScope?.SecoundScopeList?.items
                        ?.map((item) => ({ value: item.id, label: `${item.title}-${item.provinceTitle}-${item.mainSiteId}-${item.genderTitle}`  }))
                        .find((opt) => opt.value === id)
                    )}
                    onChange={(selected) => field.onChange(selected?.map((s) => s.value))}
                    placeholder='انتخاب زیرسایت...'
                  />
                )}
              />
              {errors.subSiteIds && <FormFeedback className='d-block'>{errors.subSiteIds.message}</FormFeedback>}
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color='secondary' onClick={toggle}>
            بستن
          </Button>
          <Button color='primary' type='submit' disabled={!isValid}>
            ذخیره تغییرات
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  )
}
