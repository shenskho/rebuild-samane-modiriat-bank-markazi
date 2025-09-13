import { Card, CardBody, Button, Input, Label, FormFeedback, Form, Row, Col, CardHeader } from 'reactstrap'
import '@core/scss/react/pages/page-authentication.scss'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import DxDataGrid from '@components/devextreme/DxDataGrid'
import { CreateUser, ReadUsers } from '@store/slices/controlPanel'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import toast from 'react-hot-toast'
import ToastContent from '@src/components/theme/toast/SimpleToastContent'
import { useNavigate } from 'react-router-dom'
import InputPasswordToggle from '@core/components/input-password-toggle'

export default function index() {
  const store = useSelector((state) => state.controlPanel)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [possitionList, SetPossitionList] = useState([])

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
    lastname: yup.string().required('(الزامی)')
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
      { dataField: 'email', caption: 'ایمیل' }
      // {
      //   caption: 'تخصیص نقش',
      //   type: 'buttons',
      //   cssClass: 'operationColumn',
      //   width: 160,
      //   buttons: [
      //     {
      //       name: 'add',
      //       text: 'ویرایش',
      //       cssClass: 'btn btn-sm btn-primary',
      //       onClick: (e) => {
      //         let roles = []
      //         e.row.data.roles.map((item) => {
      //           roles.push({ value: item, label: item })
      //         })
      //         SetuserName(e.row.data.username)
      //         toggle(roles)
      //       }
      //     }
      //   ]
      // }
    ],
    rows: store.userList?.items
  }

  const onSubmit = async (data) => {
    if (data.password == data.rePassWord) {
      dispatch(
        CreateUser({
          'roleName': 'operator',
          'userName': data.userName,
          'password': data.password,
          'email': data.email,
          'firstname': data.firstname,
          'lastname': data.lastname
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
    async function fetchData() {
      try {
        const { hasError, result } = await dispatch(ReadUsers()).unwrap()
        if (!hasError) {
          SetPossitionList(result.items)
        }
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [])

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
                    نام  <span className='text-danger'>*</span>{' '}
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
                    نام خوانوادگی  <span className='text-danger'>*</span>{' '}
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
              <Button color='primary' type='submit' block disabled={!isValid}>
                ثبت
              </Button>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Card id='Home'>
                <CardHeader>
                  <h4>لیست کاربران</h4>
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
      </CardBody>
    </Card>
  )
}
