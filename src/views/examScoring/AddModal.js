import React from 'react'
import { Button, FormFeedback, Form, Row, Col, Modal, ModalHeader, ModalBody, Input, Label } from 'reactstrap'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { GetAllExamScroring, CreateExamScroring } from '@store/slices/examScroing'
import Select from 'react-select'

const schema = yup.object({
 
  ruleType: yup.string().required('نوع قانون الزامی است'),
  scoringType: yup.string().required('نوع امتیازدهی الزامی است'),
  scoreValue: yup.number().typeError('باید عدد باشد').required('مقدار امتیاز الزامی است'),
  maxScoreValue: yup.number().typeError('باید عدد باشد').required('حداکثر امتیاز الزامی است'),
  condition: yup.string().required('شرط الزامی است'),
  extraData: yup.string()
})

export default function ExamScoringModal({ IsAddModal, SetIsAddModal }) {
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

  const toggle = () => SetIsAddModal(!IsAddModal)

  const onSubmit = (data) => {
    console.log('payload', data)
    dispatch(CreateExamScroring(data)).then(() => {
      dispatch(GetAllExamScroring()).then(() => {
        reset()
        toggle()
      })
    })
  }

  // گزینه‌های ثابت برای RuleType
  const ruleTypeOptions = [
    { value: '1', label: 'امتیاز بومی شهرستانی' },
    { value: '2', label: 'غیر بومی' }
  ]

  // گزینه‌های ثابت برای ScoringType
  const scoringTypeOptions = [
    { value: '1', label: 'ضریب' },
    { value: '2', label: 'ثابت' }
  ]

  return (
    <Modal size='lg' isOpen={IsAddModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>افزودن قانون امتیازدهی آزمون</ModalHeader>
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

            <Col lg={6}>
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
                ثبت
              </Button>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  )
}
