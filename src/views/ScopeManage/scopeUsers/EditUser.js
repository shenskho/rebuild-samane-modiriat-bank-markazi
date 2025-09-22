import React, { useEffect } from 'react'
import { Button, Form, Row, Col, Modal, ModalHeader, ModalBody, Input, Label } from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import DatePicker from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import DateObject from 'react-date-object'
import { useDispatch, useSelector } from 'react-redux'
import {
  GetQuota,
  GetReligion,
  GetEducationLevel,
  GetEducationField,
  GetDutystatus,
  getProvince,
  GetCity,
  GetVeteran
} from '@store/slices/fixData'
import { GetJob } from '@store/slices/variableData'
import './index.css'

const FileInputReadOnly = ({ value, label }) => {
  if (!value) return null
  const fileUrl = `https://cardapi.iranrtc.ir/api/v1/File/get-file-as-link?DocumentId=${value}`
  return (
    <div className='mt-2'>
      <Label>{label}</Label>
      <img src={fileUrl} alt={label} style={{ width: '100%', height: '', padding:'2rem', objectFit: 'cover' }} />
    </div>
  )
}
export default function UserReadOnlyModal({ IsShowModal, SetIsShowModal }) {
  const dispatch = useDispatch()
  const store = useSelector((state) => state.FixData)
  const storeVariable = useSelector((state) => state.variableData)
  const UserStore = useSelector((state) => state.scopeUser)

  const userInfo = UserStore.UserDetail?.item

const { control, reset } = useForm({
  defaultValues: {}
})

useEffect(() => {
  if (userInfo) {
    reset(userInfo) // ⚡ این خط تمام فیلدها رو با userInfo پر می‌کنه
  }
}, [userInfo, reset])

  const closeModal = () => SetIsShowModal(false)

  useEffect(() => {
    if (!userInfo) return
    dispatch(GetQuota())
    dispatch(GetReligion())
    dispatch(GetEducationLevel()).then(() => dispatch(GetEducationField(userInfo?.educationLevelId)))
    dispatch(GetDutystatus())
    dispatch(getProvince())
    dispatch(GetCity())
    dispatch(GetVeteran())
    dispatch(GetJob())
  }, [dispatch, userInfo?.educationLevelId, userInfo])

  if (!userInfo) return null  // ⚡ این خط مهمه، تا وقتی userInfo آماده نشده چیزی render نشه

  return (
    <Modal size='lg' isOpen={IsShowModal} toggle={closeModal}>
      <ModalHeader toggle={closeModal}>اطلاعات کاربری</ModalHeader>
      <ModalBody>
        <Form>
          <Row>
            <Col lg={6}>
              <Label>نام</Label>
              <Controller name='firstname' control={control} render={({ field }) => <Input {...field} readOnly />} />
            </Col>
            <Col lg={6}>
              <Label>نام خانوادگی</Label>
              <Controller name='lastname' control={control} render={({ field }) => <Input {...field} readOnly />} />
            </Col>
            <Col lg={6} className='mt-2'>
              <Label>نام پدر</Label>
              <Controller name='fatherName' control={control} render={({ field }) => <Input {...field} readOnly />} />
            </Col>
            <Col lg={6} className='mt-2'>
              <Label>کد ملی</Label>
              <Controller name='nationalCode' control={control} render={({ field }) => <Input {...field} readOnly />} />
            </Col>
            <Col lg={6} className='mt-2'>
              <Label>شماره شناسنامه</Label>
              <Controller name='shenasnameCode' control={control} render={({ field }) => <Input {...field} readOnly />} />
            </Col>
            <Col lg={6} className='mt-2'>
              <Label>موبایل</Label>
              <Controller name='mobile' control={control} render={({ field }) => <Input {...field} readOnly />} />
            </Col>
            <Col lg={6} className='mt-2'>
              <Label>تاریخ تولد</Label>
              <Controller
                name='birthDate'
                control={control}
                                  // className='form-control'
                render={({ field }) => (
                  <DatePicker
                    
                    calendar={persian}
                    locale={persian_fa}
                    value={field.value ? new DateObject({ date: field.value }).convert(persian) : null}
                    readOnly
                  />
                )}
              />
            </Col>
            <Col lg={6} className='mt-2'>
              <Label>جنسیت</Label>
              <Input value={userInfo?.genderTypeTitle} readOnly />
            </Col>
            <Col lg={6} className='mt-2'>
              <Label>وضعیت تأهل</Label>
              <Input value={userInfo?.marriageStateTitle} readOnly />
            </Col>
            <Col lg={6} className='mt-2'>
              <Label>تعداد فرزندان</Label>
              <Input type='number' value={userInfo?.childrenCount} readOnly />
            </Col>
            <Col lg={6} className='mt-2'>
              <Label>مقطع تحصیلی</Label>
              <Input value={store.EducationLevel?.items?.find(e => e.id === userInfo?.educationLevelId)?.title || ''} readOnly />
            </Col>
            <Col lg={6} className='mt-2'>
              <Label>رشته تحصیلی</Label>
              <Input value={store.EducationField?.items?.find(e => e.id === userInfo?.educationFieldId)?.title || ''} readOnly />
            </Col>
            <Col lg={6} className='mt-2'>
              <Label>نام دانشگاه</Label>
              <Input value={userInfo?.universityName} readOnly />
            </Col>
            <Col lg={6} className='mt-2'>
              <Label>معدل</Label>
              <Input type='number' value={userInfo?.graduationAverage} readOnly />
            </Col>
            <Col lg={6} className='mt-2'>
              <Label>تاریخ فارغ‌التحصیلی</Label>
              <Controller
                name='graduationDate'
                control={control}
                render={({ field }) => (
                  <DatePicker
                    calendar={persian}
                    locale={persian_fa}
                    value={field.value ? new DateObject({ date: field.value }).convert(persian) : null}
                    readOnly
                  />
                )}
              />
            </Col>
            <Col lg={6} className='mt-2'>
              <Label>سهمیه</Label>
              <Input value={store.Quota?.items?.find(q => q.id === userInfo?.quotaId)?.title || ''} readOnly />
            </Col>
            <Col lg={6} className='mt-2'>
              <Label>مذهب</Label>
              <Input value={store.Religion?.items?.find(r => r.id === userInfo?.religionId)?.title || ''} readOnly />
            </Col>
            <Col lg={6} className='mt-2'>
              <Label>ایثارگر</Label>
              <Input value={store.Veteran?.items?.find(v => v.id === userInfo?.veteranId)?.title || ''} readOnly />
            </Col>
            <Col lg={6} className='mt-2'>
              <Label>شغل انتخابی</Label>
              <Input value={storeVariable.Job?.items?.find(j => j.id === userInfo?.selectedJobId)?.title || ''} readOnly />
            </Col>
            <Col lg={12} className='mt-2'>
              <Label>آدرس</Label>
              <Input type='textarea' value={userInfo?.address} readOnly />
            </Col>
            <Col lg={6}>
              <FileInputReadOnly value={userInfo?.personalImageId} label='تصویر پرسنلی' />
            </Col>

              <Col lg={6}>
              <FileInputReadOnly value={userInfo?.lastCertificateImageId} label='تصویر آخرین مدرک تحصیلی' />
            </Col>
            <Col lg={6}>
              <FileInputReadOnly value={userInfo?.nationalCardImageId} label='تصویر کارت ملی' />
            </Col>
          
            <Col lg={6}>
              <FileInputReadOnly value={userInfo?.shenasnamePage1ImageId} label='شناسنامه صفحه ۱' />
            </Col>
            <Col lg={6}>
              <FileInputReadOnly value={userInfo?.shenasnamePage2ImageId} label='شناسنامه صفحه ۲' />
            </Col>
            <Col lg={6}>
              <FileInputReadOnly value={userInfo?.shenasnamePage3ImageId} label='شناسنامه صفحه ۳' />
            </Col>
            <Col lg={6}>
              <FileInputReadOnly value={userInfo?.shenasnameDescImageId} label='پیوست شناسنامه' />
            </Col>
          </Row>
          <Row className='w-100 mt-3'>
            <Col md={12}>
              <Button color='secondary' className='w-100' onClick={closeModal}>
                بستن
              </Button>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  )
}
