import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap'

import { createOrganizations, getOrganizations } from '@store/slices/fixData'
import { useDispatch } from 'react-redux'
export default function modal({ IsAddModal, SetIsAddModal }) {
  const [TitleName, SetTitleName] = useState('')
  const [Invalid, SetInvalid] = useState(false)
  const dispatch = useDispatch()
  const toggle = () => {
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
        createOrganizations({
          title: TitleName,
          logoImageId: '13f81fec-7b13-4bb0-e943-08dde0a8e675'
        })
      ).then(() => {
        dispatch(getOrganizations())
        toggle()
      })
    } else {
      SetInvalid(true)
    }
  }

  return (
    <Modal size='lg' isOpen={IsAddModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>اضافه کردن دستگاه اجرایی </ModalHeader>

      <ModalBody>
        <Label> دستگاه اجرایی </Label>
        <Input invalid={Invalid} placeholder=' ' onChange={(e) => CheskInput(e)} />
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
