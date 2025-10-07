import React, { useEffect } from 'react'
import { Button, FormFeedback, Form, Row, Col, Modal, ModalHeader, ModalBody, Input, Label } from 'reactstrap'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { GetAllExamScroring, UpdateExamScroring } from '@store/slices/examScroing'
import Select from 'react-select'

const schema = yup.object({
  ruleType: yup.string().required('نوع قانون الزامی است'),
  scoringType: yup.string().required('نوع امتیازدهی الزامی است'),
  scoreValue: yup.number().typeError('باید عدد باشد').required('مقدار امتیاز الزامی است'),
  maxScoreValue: yup.number().typeError('باید عدد باشد').required('حداکثر امتیاز الزامی است'),
  condition: yup.string().required('شرط الزامی است'),
  extraData: yup.string()
})

export default function ExamScoringModal({ IsEditModal, SetIsEditModal, item }) {
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
      examId: 1,
      ruleType: '',
      scoringType: '',
      scoreValue: 0,
      maxScoreValue: 0,
      condition: '',
      extraData: ''
    }
  })

  const toggle = () => SetIsEditModal(!IsEditModal)

  // وقتی item تغییر کرد → مقادیر فرم رو ست کن
  useEffect(() => {
    if (item) {
      reset({
        id: item.id,
        examId: item.examId,
        ruleType: String(item.ruleType), // باید string باشه چون Select با value:string کار می‌کنه
        scoringType: String(item.scoringType),
        scoreValue: item.scoreValue,
        maxScoreValue: item.maxScoreValue ?? 0, // اگه نبود صفر
        condition: item.condition || '',
        extraData: item.extraData || ''
      })
    }
  }, [item, reset])

  const onSubmit = (data) => {
    console.log('payload', data)
    dispatch(UpdateExamScroring(data)).then(() => {
      dispatch(GetAllExamScroring()).then(() => {
        reset()
        toggle()
      })
    })
  }

  const ruleTypeOptions = [
    { value: '1', label: 'امتیاز بومی شهرستانی' },
    { value: '2', label: 'غیر بومی' },
    { value: '3', label: 'امتیاز فرزند' } // چون توی داده‌ات ruleType=3 هست
  ]

  const scoringTypeOptions = [
    { value: '1', label: 'ضریب' },
    { value: '2', label: 'درصد' },
    { value: '3', label: 'ثابت' }
  ]

  return (
    <Modal size='lg' isOpen={IsEditModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>ویرایش قانون امتیازدهی آزمون</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col lg={6}>
              <Label>نوع قانون</Label>
              <Controller
                name='ruleType'
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={ruleTypeOptions}
                    value={ruleTypeOptions.find((o) => o.value === field.value) || null}
                    onChange={(val) => field.onChange(val?.value)}
                    className={errors.ruleType ? 'is-invalid' : ''}
                  />
                )}
              />
              {errors.ruleType && <FormFeedback className='d-block'>{errors.ruleType.message}</FormFeedback>}
            </Col>

            <Col lg={6}>
              <Label>نوع امتیازدهی</Label>
              <Controller
                name='scoringType'
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={scoringTypeOptions}
                    value={scoringTypeOptions.find((o) => o.value === field.value) || null}
                    onChange={(val) => field.onChange(val?.value)}
                    className={errors.scoringType ? 'is-invalid' : ''}
                  />
                )}
              />
              {errors.scoringType && <FormFeedback className='d-block'>{errors.scoringType.message}</FormFeedback>}
            </Col>

            <Col lg={6}>
              <Label>مقدار امتیاز</Label>
              <Controller
                name='scoreValue'
                control={control}
                render={({ field }) => (
                  <Input type='number' placeholder='مقدار' invalid={!!errors.scoreValue} {...field} />
                )}
              />
              {errors.scoreValue && <FormFeedback>{errors.scoreValue.message}</FormFeedback>}
            </Col>

            <Col lg={6}>
              <Label>حداکثر امتیاز</Label>
              <Controller
                name='maxScoreValue'
                control={control}
                render={({ field }) => (
                  <Input type='number' placeholder='حداکثر' invalid={!!errors.maxScoreValue} {...field} />
                )}
              />
              {errors.maxScoreValue && <FormFeedback>{errors.maxScoreValue.message}</FormFeedback>}
            </Col>

            <Col lg={12}>
              <Label>شرط</Label>
              <Controller
                name='condition'
                control={control}
                render={({ field }) => <Input placeholder='شرط' invalid={!!errors.condition} {...field} />}
              />
              {errors.condition && <FormFeedback>{errors.condition.message}</FormFeedback>}
            </Col>

            <Col lg={12}>
              <Label>اطلاعات اضافی</Label>
              <Controller
                name='extraData'
                control={control}
                render={({ field }) => <Input placeholder='اطلاعات اضافی' {...field} />}
              />
            </Col>

            <Col lg={12} className='mt-2'>
              <Button color='primary' type='submit' block disabled={!isValid}>
                ویرایش
              </Button>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  )
}
