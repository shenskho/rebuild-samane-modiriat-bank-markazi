import { Card, CardBody, Button, Input, Label, FormFeedback, Form, Row, Col } from 'reactstrap'
import '@core/scss/react/pages/page-authentication.scss'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {  ChangePassword} from '@store/slices/controlPanel'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import toast from 'react-hot-toast'
import ToastContent from '@src/components/theme/toast/SimpleToastContent'
import { useNavigate } from 'react-router-dom'

export default function index() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [userLits, SetUserlist] = useState([])

  const schema = yup.object({
    username: yup.object().required('(الزامی)'),
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
      .matches(/^(?=.*[a-z])(?=.*[0-9])/, 'باید تلفیقی از حروف انگلیسی و اعداد باشد')
  })

  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: location?.state,
    mode: 'all',
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data) => {

    if (data.passWord == data.rePassWord) {
      try {
        const { hasError, result } = await dispatch(
            ChangePassword({
            'userName': data.username.value,
            'newPassword': data.passWord,
         
          })
        ).unwrap()
        if (!hasError) { 
            navigate(-1)
        }
      } catch (e) {
        console.log(e)
      }
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

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const { hasError, result } = await dispatch(ReadAllUsers()).unwrap()
  //       if (!hasError) {
  //           console.log(result)
  //           SetUserlist(
  //           result.items.map((item) => {
  //             return { value: item.username, label: item.username }
  //           })
  //         )
  //       }
  //     } catch (e) {
  //       console.log(e)
  //     }
  //   }
  //   fetchData()
  // }, [])

  return (
    <Card className='mb-2'>
      <CardBody>
        <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col lg={4}>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label for='username'>
                    سمت <span className='text-danger'>*</span>{' '}
                    {errors.username && (
                      <FormFeedback tag='span' className='d-inline'>
                        {errors.username.message}
                      </FormFeedback>
                    )}
                  </Label>
                </div>

                <Controller
                  name='username'
                  control={control}
                  render={({ field, fieldState }) => (
                    <Select
                      id='username'
                      invalid={fieldState.error !== undefined}
                      {...field}
                      placeholder='انتخاب کاربر'
                      options={userLits}
                      isClearable={true}
                    />
                  )}
                />
              </div>
            </Col>

            <Col lg={4}>
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
                    <Input id='passWord' invalid={fieldState.error !== undefined} {...field} placeholder='' />
                  )}
                />
              </div>
            </Col>
            <Col lg={4}>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label for='rePassWord'>
                    کلمه ی عبور<span className='text-danger'>*</span>{' '}
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
                    <Input id='rePassWord' invalid={fieldState.error !== undefined} {...field} placeholder='' />
                  )}
                />
              </div>
            </Col>
          </Row>

          <Button color='primary' type='submit' block disabled={!isValid}>
            ثبت
          </Button>
        </Form>
      </CardBody>
    </Card>
  )
}
