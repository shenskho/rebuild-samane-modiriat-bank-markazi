import { Card, CardBody, Button, Input, Label, FormFeedback, Form, Row, Col, CardHeader } from 'reactstrap'
import '@core/scss/react/pages/page-authentication.scss'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import DxDataGrid from '@components/devextreme/DxDataGrid'
import { SignUp, ReadUsers } from '@store/slices/controlPanel'
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
    passWord: yup
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
    email: yup.string().email('ایمیل معتبر نمی باشد').required('(الزامی)')
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
      { dataField: 'email', caption: 'ایمیل' },

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
    rows: store.userList?.list
  }

  const onSubmit = async (data) => {

    if (data.passWord == data.rePassWord) {

      dispatch(SignUp({
        "userName": data.userName,
        "password":  data.passWord,
        "email": data.email
      })).then(() => {
        dispatch(ReadUsers({}))
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
        const { hasError, result } = await dispatch(
          ReadUsers({})
        ).unwrap()
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
            <Col lg={3}>
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

            <Col lg={3}>
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

            <Col lg={3}>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label for='passWord'>
                    کلمه ی عبور<span className='text-danger'>*</span>{' '}
                    {errors.passWord && (
                      <FormFeedback tag='span' className='d-inline'>
                        {errors.passWord.message}
                      </FormFeedback>
                    )}
                  </Label>
                </div>
                <Controller
                  name='passWord'
                  control={control}
                  render={({ field, fieldState }) => (
                    <InputPasswordToggle id='passWord' invalid={fieldState.error !== undefined} {...field} placeholder=' ' />
                  )}
                />
              </div>
            </Col>
            <Col lg={3}>
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
                    <InputPasswordToggle id='rePassWord'  invalid={fieldState.error !== undefined} {...field} placeholder=' ' />
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
