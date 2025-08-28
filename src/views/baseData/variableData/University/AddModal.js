import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap'
import { tuple } from 'yup'
import { CreateUniversity, GetUniversity } from '@store/slices/variableData'
import { useDispatch } from 'react-redux'
import { number } from 'prop-types'
export default function modal({ IsAddModal, SetIsAddModal }) {
  const [TitleName, SetTitleName] = useState('')
 const [University, setUniverity] = useState('')
  const [Invalid, SetInvalid] = useState(false)
  const dispatch = useDispatch()
  const toggle = (row) => {
    SetIsAddModal(!IsAddModal)
  }
  const CheskInput = (e) => {
    if (e.target.value.trim() === '') {
      SetInvalid(true)
      SetTitleName('')
    } else {
      SetInvalid(false)
      SetTitleName(e.target.value)
    }
  }
  const CheckUniversity = (e)=>{
      if (e.target.value.trim() === '') {
      SetInvalid(true)
      setUniverity('')
    } else {
      SetInvalid(false)
      setUniverity(e.target.value)
    }
  }

  const AddCategory = () => {
    if (TitleName !== '') {
      dispatch(
        CreateUniversity({
          'title': TitleName,
       
        })
      ).then((response) => {
        dispatch(GetUniversity())
        toggle()
      })
    } else {
      SetInvalid(true)
    }
  }

  return (
    <Modal size='lg' isOpen={IsAddModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>اضافه عنوان دانشگاه</ModalHeader>

      <ModalBody>
        <Label>عنوان دانشگاه</Label>
        <Input invalid={Invalid} placeholder=' عنوان' onChange={(e) => CheskInput(e)} />
      </ModalBody>
        <ModalBody>
        <Label>نوع دانشگاه</Label>
        <Input invalid={Invalid} placeholder=' نوع' onChange={(e) => CheckUniversity(e)} />
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
