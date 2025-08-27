import React, { useState } from 'react'

import {
  Button,
  FormFeedback,
  Form,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label
} from 'reactstrap'
import '@core/scss/react/pages/page-authentication.scss'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import DxDataGrid from '@components/devextreme/DxDataGrid'
import { SignUp, ReadUsers } from '@store/slices/controlPanel'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import toast from 'react-hot-toast'
import ToastContent from '@src/components/theme/toast/SimpleToastContent'
import InputPasswordToggle from '@core/components/input-password-toggle'

export default function modal({ IsAddModal, SetIsAddModal }) {
  const [CategoryName, SetCategoryName] = useState('')
  const [Invalid, SetInvalid] = useState(false)
  const dispatch = useDispatch()
  const schema = yup.object({
    userName: yup.string().required('(الزامی)'),
    passWord: yup.string().required('(الزامی)'),
    rePassWord: yup.string().required('(الزامی)'),
    email: yup.string().required('(الزامی)')
  })

  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema)
  })

  const toggle = () => {
    SetIsAddModal(!IsAddModal)
  }

  const onSubmit = async (data) => {
    if (data.passWord === data.rePassWord) {
      dispatch(
        SignUp({
          userName: data.userName,
          password: data.passWord,
          email: data.email
        })
      ).then(() => {
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

  return (
    <Modal size='lg' isOpen={IsAddModal} toggle={toggle}>
      <ModalHeader toggle={toggle}> مجوز جذب</ModalHeader>

      <ModalBody>
        <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col lg={4}>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label for='userName'>
                    دستگاه <span className='text-danger'>*</span>{' '}
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

            <Col lg={4}>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label for='email'>
                    تصویر مجوز <span className='text-danger'>*</span>{' '}
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
              //         <input
              //   type="file"
              //   accept="image/*"
              //   onChange={(e) =>
              //     handleFileChange(e, "permitImage", "permitImageName")
              //   }
              //   required
              // />
                    <Input type="file" accept="image/*" id='email' invalid={fieldState.error !== undefined} {...field} placeholder=' ' />
                  )}
                />
              </div>
            </Col>

            <Col lg={4}>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label for='passWord'>
                    تاریخ اعتبار <span className='text-danger'>*</span>{' '}
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
                    <InputPasswordToggle
                      id='passWord'
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
                  <Label for='rePassWord'>
                    توضیحات<span className='text-danger'>*</span>{' '}
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
                    <textarea
                      rows={5}
                      id='rePassWord'
                      className='form-control'
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
        </Form>
      </ModalBody>
    </Modal>
  )
}
