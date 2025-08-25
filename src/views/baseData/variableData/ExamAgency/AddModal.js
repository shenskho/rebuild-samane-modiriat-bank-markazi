import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap'
import { tuple } from 'yup'
import { CreateScoreRatio, GetScoreRatio } from '@store/slices/variableData'
import { useDispatch } from 'react-redux'
import { number } from 'prop-types'
export default function modal({ IsAddModal, SetIsAddModal }) {
  const [TitleName, SetTitleName] = useState('')
  const [examRatio, SetExamRatio] = useState(number)
  const [complementEvaluationRatio, SetComplementEvaluationRatio] = useState(number)
  const [Invalid, SetInvalid] = useState(false)
  const dispatch = useDispatch()
  const toggle = (row) => {
    SetIsAddModal(!IsAddModal)
  }
  const CheskInput = (e) => {
    if (e.target.value.trim() === '') {
      SetInvalid(true)
      SetTitleName('')

      SetComplementEvaluationRatio('')
    } else {
      SetInvalid(false)
      SetTitleName(e.target.value)

      SetComplementEvaluationRatio(e.target.value)
    }
  }
  const CheckExamRatio = (e) => {
    if (e.target.value.trim() === 0) {
      SetInvalid(true)
      SetExamRatio('')
    } else {
      SetInvalid(false), SetExamRatio(e.target.value)
    }
  }
  const ComplementEvaluationRatio = (e) => {
    if (e.target.value.trim() === 0) {
      SetInvalid(true)
      SetComplementEvaluationRatio('')
    } else {
      SetInvalid(false), SetComplementEvaluationRatio(e.target.value)
    }
  }
  const AddCategory = () => {
    if (TitleName !== '') {
      dispatch(
        CreateScoreRatio({
          'title': TitleName,
          'examRatio': examRatio,
          'complementEvaluationRatio': complementEvaluationRatio
        })
      ).then((response) => {
        dispatch(GetScoreRatio())
        toggle()
      })
    } else {
      SetInvalid(true)
    }
  }

  return (
    <Modal size='lg' isOpen={IsAddModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>اضافه نسبت امتیاز</ModalHeader>

      <ModalBody>
        <Label>نسبت امتیاز</Label>
        <Input invalid={Invalid} placeholder=' عنوان' onChange={(e) => CheskInput(e)} />
          <Label>امتیاز آزمون</Label>

        <Input invalid={Invalid} placeholder=' امتیاز آزمون' onChange={(e) => CheckExamRatio(e)} />
         <Label>امتیاز ظرفیت تکمیلی</Label>

        <Input invalid={Invalid} placeholder=' امتیاز ظرفیت تکمیلی' onChange={(e) => ComplementEvaluationRatio(e)} />
      </ModalBody>
  

      <ModalFooter>
        <Button color='danger' onClick={toggle}>
          بستن
        </Button>
        <Button color='primary' onClick={AddCategory}>
          ثبت
        </Button>
      </ModalFooter>
    </Modal>
  )
}
