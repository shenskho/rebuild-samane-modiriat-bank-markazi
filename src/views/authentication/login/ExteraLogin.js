import { Link, useLocation } from 'react-router-dom'
import { Card, CardBody, CardFooter, Button, Input, Label, FormFeedback, Form } from 'reactstrap'
import themeConfig from '@configs/themeConfig'
import '@core/scss/react/pages/page-authentication.scss'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import InputPasswordToggle from '@core/components/input-password-toggle'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { Extralogin } from '@store/slices/authentication'
import { useEffect } from 'react'

export default function Login() {
  const dispatch = useDispatch()
  const location = useLocation()

  const schema = yup.object({
    userName: yup.string().required('(الزامی)'),
    password: yup
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
    defaultValues: {
      userName: '',
      password: ''
    },
    mode: 'all',
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data) => {
    if (data.userName && data.password) {
      try {
        await dispatch(
          Extralogin({
            userName: data.userName,
            password: data.password,
            isPersistent: true
          })
        ).then((response) => {
          if (response.payload !== undefined) {
            window.location.reload()
          }
        })
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <div className='auth-wrapper auth-basic px-2'>
      <div className='auth-inner my-2'>
        <Card className='mb-2'>
          <CardBody>
            <Link className='brand-logo' to='/' onClick={(e) => e.preventDefault()}>
              <img src={themeConfig.app.appLogoImage} className='w-50' alt={themeConfig.app.appName} />
            </Link>
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
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
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label for='password'>
                    رمز عبور
                    <span className='text-danger'>*</span>{' '}
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
                      placeholder=''
                    />
                  )}
                />
              </div>
              <Button color='primary' type='submit' block disabled={!isValid}>
                ورود
              </Button>
            </Form>
          </CardBody>
          <CardFooter className='text-center'>
            <span>
              اگر اکانت ندارید <a href='/Register'>ثبت نام</a> کنید
            </span>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
