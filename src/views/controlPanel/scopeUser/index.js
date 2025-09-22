import { Card, CardBody, Button, Input, Label, FormFeedback, Form, Row, Col, CardHeader } from 'reactstrap'
import '@core/scss/react/pages/page-authentication.scss'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import DxDataGrid from '@components/devextreme/DxDataGrid'
import { CreateUser, ReadUsers } from '@store/slices/controlPanel'
import { GetExamScopeSecoundList } from '@store/slices/examScope'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import toast from 'react-hot-toast'
import ToastContent from '@src/components/theme/toast/SimpleToastContent'
import InputPasswordToggle from '@core/components/input-password-toggle'
import DeleteModal from './DeleteModal'
export default function index() {
  const store = useSelector((state) => state.controlPanel)
  const examScope = useSelector((state) => state.examScope)
  console.log('store', store)
  console.log('examScope', examScope)
  const [userNameID, SetuserNameID] = useState('')
  const [IsDeleteModal, SetIsDeleteModal] = useState(false)
  const dispatch = useDispatch()

  const schema = yup.object({
    userName: yup.string().required('(الزامی)'),
    password: yup
      .string()
      .required('(الزامی)')
      .min(8, '(حداقل 8 کاراکتر)')
      .max(50, '(حداکثر 50 کاراکتر)')
      .matches(/^(?=.*[a-z])(?=.*[0-9])/, 'باید تلفیقی از حروف انگلیسی و اعداد باشد'),
    rePassWord: yup
      .string()
      .required('(الزامی)')
      .min(8, '(حداقل 8 کاراکتر)')
      .max(50, '(حداکثر 50 کاراکتر)')
      .matches(/^(?=.*[a-z])(?=.*[0-9])/, 'باید تلفیقی از حروف انگلیسی و اعداد باشد'),
    email: yup.string().email('ایمیل معتبر نمی باشد').required('(الزامی)'),
    firstname: yup.string().required('(الزامی)'),
    lastname: yup.string().required('(الزامی)'),
    subSiteIds: yup.array().min(1, '(حداقل یک زیرسایت انتخاب کنید)').required('(الزامی)')
  })

  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema)
  })

  const dataGridData = {
    columns: [
      { dataField: 'index', caption: '#', width: 'auto', cssClass: 'text-center' },

      { dataField: 'userName', caption: 'نام کاربری' },

      { dataField: 'firstName', caption: 'نام' },
      { dataField: 'lastName', caption: 'نام خوانوادگی' },
      { dataField: 'email', caption: 'ایمیل' },
      {
        caption: 'عملیات',
        type: 'buttons',
        cssClass: 'operationColumn',
        width: 160,
        buttons: [
          {
            name: 'del',
            text: 'حذف',
            cssClass: 'btn btn-sm btn-danger',
            onClick: (e) => {
              SetuserNameID(e.row.data.userName)
              SetIsDeleteModal(!IsDeleteModal)
            }
          }
        ]
      }
    ],
    rows: store?.userList?.items?.filter((item) => item.roleName === 'scope')
  }

  const onSubmit = async (data) => {
    if (data.password === data.rePassWord) {
      dispatch(
        CreateUser({
          roleName: 'scope',
          userName: data.userName,
          password: data.password,
          email: data.email,
          firstname: data.firstname,
          lastname: data.lastname,
          subSiteIds: data.subSiteIds // اینجا از فرم میاد
        })
      ).then(() => {
        dispatch(ReadUsers())
      })
    } else {
      toast((t) => <ToastContent t={t} message={'کلمه های  عبور باهم تطابق ندارد'} />, {
        duration: 5000,
        style: {
          background: 'var(--bs-danger)',
          color: 'var(--bs-white)'
        }
      })
    }
  }

  useEffect(() => {
    dispatch(GetExamScopeSecoundList())
    dispatch(ReadUsers())
  }, [dispatch])

  return (
    <Card className='mb-2'>
      <CardBody>
        <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col lg={6}>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label for='userName'>
                    نام کاربری <span className='text-danger'>*</span>{' '}
                    {errors.userName && (
                      <FormFeedback tag='span' className='d-inline'>
                        {errors.userName.message}
                      </FormFeedback>
                    )}
                  </Label>
                </div>
                <Controller
                  name='userName'
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input id='userName' invalid={fieldState.error !== undefined} {...field} placeholder=' ' />
                  )}
                />
              </div>
            </Col>
            <Col lg={6}>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label for='firstname'>
                    نام <span className='text-danger'>*</span>{' '}
                    {errors.firstname && (
                      <FormFeedback tag='span' className='d-inline'>
                        {errors.firstname.message}
                      </FormFeedback>
                    )}
                  </Label>
                </div>
                <Controller
                  name='firstname'
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input id='firstname' invalid={fieldState.error !== undefined} {...field} placeholder=' ' />
                  )}
                />
              </div>
            </Col>
            <Col lg={6}>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label for='lastname'>
                    نام خوانوادگی <span className='text-danger'>*</span>{' '}
                    {errors.lastname && (
                      <FormFeedback tag='span' className='d-inline'>
                        {errors.lastname.message}
                      </FormFeedback>
                    )}
                  </Label>
                </div>
                <Controller
                  name='lastname'
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input id='lastname' invalid={fieldState.error !== undefined} {...field} placeholder=' ' />
                  )}
                />
              </div>
            </Col>

            <Col lg={6}>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label for='email'>
                    پست الکترونیکی <span className='text-danger'>*</span>{' '}
                    {errors.email && (
                      <FormFeedback tag='span' className='d-inline'>
                        {errors.email.message}
                      </FormFeedback>
                    )}
                  </Label>
                </div>
                <Controller
                  name='email'
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input id='email' invalid={fieldState.error !== undefined} {...field} placeholder=' ' />
                  )}
                />
              </div>
            </Col>

            <Col lg={6}>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label for='password'>
                    کلمه ی عبور<span className='text-danger'>*</span>{' '}
                    {errors.password && (
                      <FormFeedback tag='span' className='d-inline'>
                        {errors.password.message}
                      </FormFeedback>
                    )}
                  </Label>
                </div>
                <Controller
                  name='password'
                  control={control}
                  render={({ field, fieldState }) => (
                    <InputPasswordToggle
                      id='password'
                      invalid={fieldState.error !== undefined}
                      {...field}
                      placeholder=' '
                    />
                  )}
                />
              </div>
            </Col>
            <Col lg={6}>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label for='rePassWord'>
                    تکرار کلمه ی عبور <span className='text-danger'>*</span>{' '}
                    {errors.rePassWord && (
                      <FormFeedback tag='span' className='d-inline'>
                        {errors.rePassWord.message}
                      </FormFeedback>
                    )}
                  </Label>
                </div>
                <Controller
                  name='rePassWord'
                  control={control}
                  render={({ field, fieldState }) => (
                    <InputPasswordToggle
                      id='rePassWord'
                      invalid={fieldState.error !== undefined}
                      {...field}
                      placeholder=' '
                    />
                  )}
                />
              </div>
            </Col>
            <Col lg={12}>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label for='subSiteIds'>انتخاب حوزه ها</Label>
                </div>
                <Controller
                  name='subSiteIds'
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      inputId='subSiteIds'
                      isMulti
                      options={examScope.SecoundScopeList.items?.map((item) => ({
                        value: item.id,
                        label: item.title
                      }))}
                      placeholder='انتخاب زیرسایت...'
                      // مقدار انتخاب شده باید به صورت object باشه
                      value={field.value?.map((id) =>
                        examScope.SecoundScopeList.items
                          ?.map((item) => ({ value: item.id, label: item.title }))
                          .find((option) => option.value === id)
                      )}
                      onChange={(selected) => field.onChange(selected?.map((s) => s.value))}
                    />
                  )}
                />
              </div>
            </Col>
            <Col lg={12}>
              <Button color='primary' type='submit' block disabled={!isValid}>
                ثبت
              </Button>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Card id='Home'>
                <CardHeader>
                  <h4>لیست کاربران حوزه</h4>
                </CardHeader>
                <CardBody>
                  <DxDataGrid
                    data={dataGridData}
                    paginationSize={10}
                    editing={{
                      mode: 'row',
                      useIcons: false
                    }}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Form>
        <DeleteModal SetIsDeleteModal={SetIsDeleteModal} IsDeleteModal={IsDeleteModal} userName={userNameID} />
      </CardBody>
    </Card>
  )
}
