import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap'
import { tuple } from 'yup'
import { CreateAgencyCategory, GetAgencyCategory } from '@store/slices/variableData'
import { useDispatch } from 'react-redux'
import { number } from 'prop-types'
export default function modal({ IsAddModal, SetIsAddModal }) {
  const [TitleName, SetTitleName] = useState('')
 
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

  const AddCategory = () => {
    if (TitleName !== '') {
      dispatch(
        CreateAgencyCategory({
          'title': TitleName,
       
        })
      ).then((response) => {
        dispatch(GetAgencyCategory())
        toggle()
      })
    } else {
      SetInvalid(true)
    }
  }

  return (
    <Modal size='lg' isOpen={IsAddModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>اضافه رسته عوامل مجری</ModalHeader>

      <ModalBody>
        <Label>رسته عوامل مجری</Label>
        <Input invalid={Invalid} placeholder=' رسته عوامل مجری' onChange={(e) => CheskInput(e)} />
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
