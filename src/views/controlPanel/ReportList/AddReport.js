import { Card, CardBody, Button, Input, Label, FormFeedback, Form, Row, Col } from 'reactstrap'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { CreateReport,UpdateReport } from '@store/slices/Report'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import * as yup from 'yup'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { PlusCircle, XCircle } from 'react-feather'
import toast from 'react-hot-toast'
import ToastContent from '@src/components/theme/toast/SimpleToastContent'
import '@assets/css/report.css'
export default function ReportForm() {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const [parameters, setParameters] = useState([])

  const schema = yup.object({
    title: yup.string().required('(الزامی)'),
    code: yup.string().required('(الزامی)'),
    parameters: yup.array().of(
      yup.object().shape({
        paramTitle: yup.string().required('عنوان پارامتر الزامی است'),
        paramKey: yup.string().required('کلید ورودی الزامی است'),
        required: yup.boolean().required(),
        parameterType: yup.object().required('نوع ورودی الزامی است'),
        options: yup.array().of(yup.string()) // To store the multiChoice options
      })
    )
  })

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue // Added setValue for setting default values
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema)
  })

  const convertInputType = (parameterType) => {
    switch (parameterType) {
      case 'int':
        return 1
      case 'string':
        return 0
      case 'date':
        return 2
      case 'bit':
        return 3
      case 'multiChoice':
        return 4

    }
  }

  const onSubmit = async (data) => {
    let isParametersEmpty = true

    parameters.forEach((param) => {
      if (param.paramTitle.trim() === '' || param.paramKey.trim() === '' || param.parameterType.trim() === '') {
        isParametersEmpty = false
      }
    })

    const sanitizedText = data.code.replace(/[\r\n]+/g, '/r/n')
    let reportData={}

    if (location.state.item !== undefined)
    {
      reportData = {
        id: location.state.item?.id,
        categoryId: location.state.item?.categoryId,
        title: data.title,
        query: sanitizedText,
        parameters: parameters.map((param) => ({
          persianName: param.paramTitle,
          parameterName: param.paramKey,
          isRequired: param.required,
          parameterType: convertInputType(param.parameterType),
          values: param.options || [] // Include options if it's multiChoice
        }))
      }


      if (isParametersEmpty) {
        dispatch(UpdateReport(reportData)).then((response) => {

          if(response.payload)
            {
              navigate(-1)
            }
          //  
        })
      } else {
        toast((t) => <ToastContent t={t} message={'مقادیر پارامتر ها نمی تواند خالی باشد'} />, { 
          duration: 5000,
          style: {
            background: 'var(--bs-danger)',
            color: 'var(--bs-white)'
          }
        })
      }
    }else
    {
       reportData = {
        categoryId: location.state.id,
        title: data.title,
        query: sanitizedText,
        parameters: parameters.map((param) => ({
          persianName: param.paramTitle,
          parameterName: param.paramKey,
          isRequired: param.required,
          parameterType: convertInputType(param.parameterType),
          values: param.options || [] // Include options if it's multiChoice
        }))
      }


      if (isParametersEmpty) {
        dispatch(CreateReport(reportData)).then((response) => {
       
          if(response.payload)
            {
              navigate(-1)
            }
          //  
        })
      } else {
        toast((t) => <ToastContent t={t} message={'مقادیر پارامتر ها نمی تواند خالی باشد'} />, { 
          duration: 5000,
          style: {
            background: 'var(--bs-danger)',
            color: 'var(--bs-white)'
          }
        })
      }
    }


  }

  const addParameter = () => {
    setParameters((prevParameters) => [
      ...prevParameters,
      { paramTitle: '', paramKey: '', required: false, parameterType: '', options: [] }
    ])
  }

  const removeParameter = (index) => {
    setParameters((prevParameters) => prevParameters.filter((_, i) => i !== index))
  }

  const addOption = (index, option) => {
    const newParameters = [...parameters]
    newParameters[index].options = [...newParameters[index].options, option]
    setParameters(newParameters)
  }

  const removeOption = (paramIndex, optionIndex) => {
    const newParameters = [...parameters]
    newParameters[paramIndex].options = newParameters[paramIndex].options.filter((_, i) => i !== optionIndex)
    setParameters(newParameters)
  }
  const convertInputSelectEditType = (parameterType) => {

    switch (parameterType) {
      case 'متن':
        return 'string'
      case 'عدد':
        return 'int'
      case 'زمان':
        return 'date'
      case 'بولین':
        return 'bit'
      case 'چند جوابی':
        return 'multiChoice'
      
    }
  }
  useEffect(() => {
    if (!location.state) {
      navigate('/AddReportCategory')
      return
    }

    // Set default values from location.state
    const { item } = location.state
    if (item) {
   
      setValue('title', item.title)
      setValue('code', item.query.replace(/\/r\/n/g, '\n'))
      setParameters(
        item.parameters.map((param) => ({
          paramTitle: param.persianName,
          paramKey: param.parameterName,
          required: param.isRequired,
          parameterType:  convertInputSelectEditType(param.parameterTypeTitle) ,
          options: param.values || []
        }))
      )
    }
  }, [location.state, navigate, setValue])

  return (
    <Card className='mb-2'>
      <CardBody>
        <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col lg={12}>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label for='title'>
                    <h5>
                      عنوان گزارش <span className='text-danger'>*</span>{' '}
                    </h5>

                    {errors.title && (
                      <FormFeedback tag='span' className='d-inline'>
                        {errors.title.message}
                      </FormFeedback>
                    )}
                  </Label>
                </div>
                <Controller
                  name='title'
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input id='title' invalid={fieldState.error !== undefined} {...field} placeholder=' ' />
                  )}
                />
              </div>
            </Col>

            <Col lg={12}>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label for='code'>
                    <h5>
                      کوئری <span className='text-danger'>*</span>{' '}
                    </h5>

                    {errors.code && (
                      <FormFeedback tag='span' className='d-inline'>
                        {errors.code.message}
                      </FormFeedback>
                    )}
                  </Label>
                </div>
                
                <Controller
                  name='code'
                  control={control}
                  render={({ field, fieldState }) => (
                    <textarea
                      className='w-100 p-2'
                      style={{ lineHeight: 3, direction: 'ltr' }}
                      id='code'
                      invalid={fieldState.error !== undefined}
                      {...field}
                      placeholder=' '
                    />
                  )}
                />
              </div>
            </Col>

            <Col lg={12}>
              <Button color='success' className='m-2' onClick={addParameter}>
                <PlusCircle size={25} color='#fff' /> اضافه کردن پارامتر
              </Button>
            </Col>

            {parameters.map((param, index) => (
              <React.Fragment key={index}>
                <Col lg={12}>
                  <div className='mb-1'>
                    <div className='d-flex justify-content-between'>
                      <Label>
                        <h5>
                          عنوان پارامتر <span className='text-danger'>*</span>{' '}
                        </h5>

                        {errors.parameters && errors.parameters[index] && errors.parameters[index].paramTitle && (
                          <FormFeedback tag='span' className='d-inline'>
                            {errors.parameters[index].paramTitle.message}
                          </FormFeedback>
                        )}
                      </Label>
                      <Button className='mb-1' color='danger' size='sm' onClick={() => removeParameter(index)}>
                        <XCircle size={20} />
                      </Button>
                    </div>
                    <Input
                      id={`paramTitle-${index}`}
                      value={param.paramTitle}
                      onChange={(e) => {
                        const newParameters = [...parameters]
                        newParameters[index].paramTitle = e.target.value
                        setParameters(newParameters)
                      }}
                      placeholder=' '
                      invalid={errors.parameters && errors.parameters[index] && errors.parameters[index].paramTitle}
                    />
                  </div>
                </Col>
                <Col lg={12}>
                  <div className='mb-1'>
                    <div className='d-flex justify-content-between'>
                      <Label>
                        <h5>
                          کلید ورودی <span className='text-danger'>*</span>{' '}
                        </h5>

                        {errors.parameters && errors.parameters[index] && errors.parameters[index].paramKey && (
                          <FormFeedback tag='span' className='d-inline'>
                            {errors.parameters[index].paramKey.message}
                          </FormFeedback>
                        )}
                      </Label>
                    </div>
                    <Input
                      id={`paramKey-${index}`}
                      value={param.paramKey}
                      onChange={(e) => {
                        const newParameters = [...parameters]
                        newParameters[index].paramKey = e.target.value
                        setParameters(newParameters)
                      }}
                      placeholder=' '
                      invalid={errors.parameters && errors.parameters[index] && errors.parameters[index].paramKey}
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div className='mb-5'>
                    <div className='d-flex justify-content-left'>
                      <Label>
                        <h5>
                          نوع ورودی <span className='text-danger'>*</span>
                        </h5>
                      </Label>
                    </div>
                    <Select
                      className='w-50'
                      options={[
                        { value: 'string', label: 'متن' },
                        { value: 'bit', label: 'درست و غلط' },
                        { value: 'date', label: 'تاریخ' },
                        { value: 'int', label: 'عدد' },
                        { value: 'multiChoice', label: 'چند جوابی' }
                      ]}
                      id={`parameterType-${index}`}
                      value={{
                        value: param.parameterType,
                        label: param.parameterType ? param.parameterType : ' انتخاب نوع پارامتر...'
                      }}
                      onChange={(selectedOption) => {
                        const newParameters = [...parameters]
                        newParameters[index].parameterType = selectedOption.value
                        setParameters(newParameters)
                      }}
                    />
                    {errors.parameters && errors.parameters[index] && errors.parameters[index].parameterType && (
                      <FormFeedback tag='span' className='d-inline'>
                        {errors.parameters[index].parameterType.message}
                      </FormFeedback>
                    )}
                  </div>
                </Col>
                {param.parameterType === 'multiChoice' && (
                  <Col lg={12}>
                    <div className='mb-1'>
                      <Label>
                        <h5>گزینه‌ها</h5>
                      </Label>
                      <Row>
                        <Col lg={10}>
                          <Input
                            type='text'
                            value={param.newOption || ''}
                            onChange={(e) => {
                              const newParameters = [...parameters]
                              newParameters[index].newOption = e.target.value
                              setParameters(newParameters)
                            }}
                          />
                        </Col>
                        <Col lg={2}>
                          <Button
                            color='primary'
                            onClick={() => {
                              if (param.newOption && param.newOption.trim() !== '') {
                                addOption(index, param.newOption.trim())
                                const newParameters = [...parameters]
                                newParameters[index].newOption = ''
                                setParameters(newParameters)
                              }
                            }}
                          >
                            افزودن
                          </Button>
                        </Col>
                      </Row>
                      <div className='mt-2 multi-choise'>
                        {param.options && param.options.map((option, optionIndex) => (
                          <div key={optionIndex} className='d-flex align-items-center mt-1'>
                            <span className='multi-choise-title'>{option}</span>
                            <Button
                              className='ms-1'
                              color='danger'
                              size='sm'
                              onClick={() => removeOption(index, optionIndex)}
                            >
                              <XCircle size={14} />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Col>
                )}
                <Col lg={6}>
                  <div className='mb-1'>
                    <div className='d-flex justify-content-left'>
                      <Label>
                        <h5 className='mt-3'>اجباری</h5>
                      </Label>
                      <Input
                        className='mt-3'
                        style={{ marginRight: '10px' }}
                        type='checkbox'
                        id={`required-${index}`}
                        checked={param.required}
                        onChange={(e) => {
                          const newParameters = [...parameters]
                          newParameters[index].required = e.target.checked
                          setParameters(newParameters)
                        }}
                      />
                    </div>
                  </div>
                </Col>
              </React.Fragment>
            ))}
          </Row>

          <Button color='primary' type='submit' className='mt-5' block disabled={!isValid}>
            ثبت
          </Button>
        </Form>
      </CardBody>
    </Card>
  )
}