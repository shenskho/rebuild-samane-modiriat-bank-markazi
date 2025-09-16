import React, { useEffect } from 'react'
import { Button, Form, Row, Col, Modal, ModalHeader, ModalBody, Input, Label } from 'reactstrap'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { SetPrintQuarantineOfSubSite, GetQuarantineAllSubSutes, GetRemainingReport } from '@store/slices/examOrganizer'

export default function ExamSettingsModal({ IsAddModal, SetIsAddModal }) {
  const store = useSelector((state) => state.examOrganizer)
  const dispatch = useDispatch()

  const { control, handleSubmit, reset } = useForm({
    mode: 'all',
    defaultValues: {
      examId: 1,
      subSiteId: 0,
      personalAnswerPrinted: false,
      personalAnswerPacked: false,
      matchingAlbumPrinted: false,
      matchingAlbumPacked: false,
      seatingNumberPrinted: false,
      seatingNumberPacked: false,
      attendancePrinted: false,
      attendancePacked: false,
      applicantListPrinted: false,
      applicantListPacked: false,
      subSiteHelpPrinted: false,
      subSiteHelpPacked: false,
      questionNotesPrinted: false,
      questionNotesPacked: false,
      rawPersonalAnswersCount: 0,
      rawQuestionNotesCount: 0
    }
  })

  // وقتی داده از استور اومد فرم پر میشه
  useEffect(() => {
    if (store?.subSite?.item) {
      reset(store.subSite.item)
    }
  }, [store?.subSite?.item, reset])

  const toggle = () => SetIsAddModal(!IsAddModal)

  const handleFormSubmit = (data) => {
    console.log('Form Data:', data)
    dispatch(SetPrintQuarantineOfSubSite(data)).then(() => {
      dispatch(GetQuarantineAllSubSutes('?ExamId=1'))
      dispatch(GetRemainingReport('?ExamId=1'))
    })
    toggle()
  }

  const checkFields = [
    { name: 'personalAnswerPrinted', label: 'چاپ پاسخنامه' },
    { name: 'personalAnswerPacked', label: 'بسته‌بندی پاسخنامه' },
    { name: 'matchingAlbumPrinted', label: 'چاپ آلبوم تطبیق' },
    { name: 'matchingAlbumPacked', label: 'بسته‌بندی آلبوم تطبیق' },
    { name: 'seatingNumberPrinted', label: 'چاپ شماره صندلی' },
    { name: 'seatingNumberPacked', label: 'بسته‌بندی شماره صندلی' },
    { name: 'attendancePrinted', label: 'چاپ حضور و غیاب' },
    { name: 'attendancePacked', label: 'بسته‌بندی حضور و غیاب' },
    { name: 'applicantListPrinted', label: 'چاپ لیست داوطلبان' },
    { name: 'applicantListPacked', label: 'بسته‌بندی لیست داوطلبان' },
    { name: 'subSiteHelpPrinted', label: 'چاپ راهنمای حوزه' },
    { name: 'subSiteHelpPacked', label: 'بسته‌بندی راهنمای حوزه' },
    { name: 'questionNotesPrinted', label: 'چاپ یادداشت سوالات' },
    { name: 'questionNotesPacked', label: 'بسته‌بندی یادداشت سوالات' }
  ]

  return (
    <Modal size='lg' isOpen={IsAddModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>تنظیمات حوزه آزمون</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(handleFormSubmit)}>
          <Row>
            {/* فیلدهای چک‌باکس */}
            {checkFields.map((item) => (
              <Col lg={6} key={item.name}>
                <div className='form-check mb-1'>
                  <Controller
                    name={item.name}
                    control={control}
                    render={({ field }) => (
                      <Input
                        type='checkbox'
                        id={item.name}
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    )}
                  />
                  <Label className='form-check-label' for={item.name}>
                    {item.label}
                  </Label>
                </div>
              </Col>
            ))}

            {/* فیلدهای عددی */}
            <Col lg={6}>
              <div className='mb-1'>
                <Label for='rawPersonalAnswersCount'>تعداد خام پاسخنامه</Label>
                <Controller
                  name='rawPersonalAnswersCount'
                  control={control}
                  render={({ field }) => <Input type='number' id='rawPersonalAnswersCount' {...field} />}
                />
              </div>
            </Col>

            <Col lg={6}>
              <div className='mb-1'>
                <Label for='rawQuestionNotesCount'>تعداد خام دفترچه سوالات</Label>
                <Controller
                  name='rawQuestionNotesCount'
                  control={control}
                  render={({ field }) => <Input type='number' id='rawQuestionNotesCount' {...field} />}
                />
              </div>
            </Col>

            {/* دکمه ثبت */}
            <Col lg={12}>
              <Button color='primary' type='submit' block>
                ثبت
              </Button>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  )
}
