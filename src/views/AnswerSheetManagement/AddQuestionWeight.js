import React, { useEffect } from 'react'
import { Button, FormFeedback, Form, Row, Col, Modal, ModalHeader, ModalBody, Input, Label } from 'reactstrap'
import { Controller, useForm, useFieldArray } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { CreateBookletQuestionSection } from '@store/slices/Booklet'

const sectionSchema = yup.object({

  courseName: yup.string().required('نام درس الزامی است'),
  startQuestionNumber: yup.number().typeError('باید عدد باشد').required('شماره شروع الزامی است'),
  endQuestionNumber: yup.number().typeError('باید عدد باشد').required('شماره پایان الزامی است'),
  type: yup.mixed().oneOf(['1', '0'], 'نوع نامعتبر است').required('نوع الزامی است'),
  weight: yup.number().typeError('باید عدد باشد').required('وزن الزامی است'),
  weightPercentage: yup.number().typeError('باید عدد باشد').required('درصد وزن الزامی است')
})

const schema = yup.object({
  sections: yup.array().of(sectionSchema).min(1, 'حداقل یک بخش لازم است')
})

export default function AddBookletSectionModal({ IsAddQuestionModal, SetIsAddQuestionModal, item }) {
  const store = useSelector((state) => state.booklet)
  console.log('store data:', store)
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
      bookletId: item?.id || 0,
      sections: [] // خالی، بعداً با useEffect پر می‌کنیم
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sections'
  })

  // وقتی استور تغییر کرد فرم رو با داده‌ها پر کن
  useEffect(() => {
    if (store.BookletQuestionsSection?.items && store.BookletQuestionsSection?.items.length > 0) {
      reset({
        bookletId: item?.id || 0,
        sections: store.BookletQuestionsSection?.items.map((sec) => ({
          examId: 1,
          examName:'آزمون بانک مرکزی',// sec.examName || '',
          courseName: sec.courseName || '',
          startQuestionNumber: sec.startQuestionNumber,
          endQuestionNumber: sec.endQuestionNumber,
          bookletId: item?.id || 0,
          type: sec.type || '',
          weight: sec.weight,
          weightPercentage: sec.weightPercentage
        }))
      })
    }
  }, [store.BookletQuestionsSection?.items, item?.id, reset])

  const toggle = () => {
    SetIsAddQuestionModal(!IsAddQuestionModal)
  }

  const onSubmit = (data) => {
    console.log('Payload:', data)
    dispatch(CreateBookletQuestionSection(data)).then((response) => {
      if (response.payload) {
        toggle()
        reset()
      }
    })
  }

  return (
    <Modal size='lg' isOpen={IsAddQuestionModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>افزودن بخش به جزوه</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            {fields.map((section, index) => (
              <div key={section.id || index} className='border rounded p-2 mb-2 bg-light'>
                <Row>
               
                  <Col lg={6}>
                    <Label>نام درس</Label>
                    <Controller
                      name={`sections.${index}.courseName`}
                      control={control}
                      render={({ field }) => <Input invalid={!!errors.sections?.[index]?.courseName} {...field} />}
                    />
                    <FormFeedback>{errors.sections?.[index]?.courseName?.message}</FormFeedback>
                  </Col>

                  <Col lg={3}>
                    <Label>شروع سوال</Label>
                    <Controller
                      name={`sections.${index}.startQuestionNumber`}
                      control={control}
                      render={({ field }) => (
                        <Input type='number' invalid={!!errors.sections?.[index]?.startQuestionNumber} {...field} />
                      )}
                    />
                    <FormFeedback>{errors.sections?.[index]?.startQuestionNumber?.message}</FormFeedback>
                  </Col>

                  <Col lg={3}>
                    <Label>پایان سوال</Label>
                    <Controller
                      name={`sections.${index}.endQuestionNumber`}
                      control={control}
                      render={({ field }) => (
                        <Input type='number' invalid={!!errors.sections?.[index]?.endQuestionNumber} {...field} />
                      )}
                    />
                    <FormFeedback>{errors.sections?.[index]?.endQuestionNumber?.message}</FormFeedback>
                  </Col>

                  <Col lg={6}>
                    <Label>نوع</Label>
                    <Controller
                      name={`sections.${index}.type`}
                      control={control}
                      render={({ field }) => (
                        <Input type='select' invalid={!!errors.sections?.[index]?.type} {...field}>
                          <option value=''>انتخاب کنید</option>
                          <option value='1'>تخصصی</option>
                          <option value='0'>عمومی</option>
                        </Input>
                      )}
                    />
                    <FormFeedback>{errors.sections?.[index]?.type?.message}</FormFeedback>
                  </Col>

                  <Col lg={3}>
                    <Label>وزن</Label>
                    <Controller
                      name={`sections.${index}.weight`}
                      control={control}
                      render={({ field }) => (
                        <Input type='number' invalid={!!errors.sections?.[index]?.weight} {...field} />
                      )}
                    />
                    <FormFeedback>{errors.sections?.[index]?.weight?.message}</FormFeedback>
                  </Col>

                  <Col lg={3}>
                    <Label>درصد وزن</Label>
                    <Controller
                      name={`sections.${index}.weightPercentage`}
                      control={control}
                      render={({ field }) => (
                        <Input type='number' invalid={!!errors.sections?.[index]?.weightPercentage} {...field} />
                      )}
                    />
                    <FormFeedback>{errors.sections?.[index]?.weightPercentage?.message}</FormFeedback>
                  </Col>

                  <Col lg={12} className='text-right mt-1'>
                    <Button color='danger' size='sm' onClick={() => remove(index)}>
                      حذف بخش
                    </Button>
                  </Col>
                </Row>
              </div>
            ))}

            <Col lg={12}>
              <Button
                color='secondary'
                type='button'
                block
                onClick={() =>
                  append({
                    examId: 1,
                    examName: '',
                    courseName: '',
                    startQuestionNumber: 0,
                    endQuestionNumber: 0,
                    bookletId: item?.id || 0,
                    type: '1', // پیش‌فرض تخصصی
                    weight: 0,
                    weightPercentage: 0
                  })
                }
              >
                افزودن بخش جدید
              </Button>
            </Col>

            <Col lg={12} className='mt-2'>
              <Button color='primary' type='submit' block disabled={!isValid}>
                ثبت تغییرات
              </Button>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  )
}
