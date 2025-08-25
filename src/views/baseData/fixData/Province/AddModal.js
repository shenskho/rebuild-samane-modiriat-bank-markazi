import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap'
import { tuple } from 'yup'
import { createProvince, getProvince } from '@store/slices/fixData'
import { useDispatch } from 'react-redux'
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
    } else {
      SetInvalid(false)
      SetTitleName(e.target.value)
    }
  }
  const AddCategory = () => {
    if (TitleName !== '') {
      dispatch(
        createProvince({
          'title': TitleName
        })
      ).then((response) => {
        dispatch(getProvince())
        toggle()
      })
    } else {
      SetInvalid(true)
    }
  }

  return (
    <Modal size='lg' isOpen={IsAddModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>اضافه کردن مکان جغرافیایی</ModalHeader>

      <ModalBody>
        <Label>مکان جغرافیایی</Label>
        <Input invalid={Invalid} placeholder=' مکان جغرافیایی' onChange={(e) => CheskInput(e)} />
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
