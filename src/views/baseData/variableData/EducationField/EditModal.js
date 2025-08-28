import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap'
import { tuple } from 'yup'
import { updateEducationField, GetEducationField,GetEducationLevel } from '@store/slices/variableData'
import { useDispatch } from 'react-redux'
export default function EditModal({ IsEditModal, SetIsEditModal, item }) {
  const [AccessName, SetAccessName] = useState('')
  const [Invalid, SetInvalid] = useState(false)
  const dispatch = useDispatch()

  const toggle = (row) => {
    SetIsEditModal(!IsEditModal)
  }

  const CheskInput = (e) => {
    if (e.target.value.trim() === '') {
      SetInvalid(true)
      SetAccessName('')
    } else {
      SetInvalid(false)
      SetAccessName(e.target.value)
    }
  }

  const AddCategory = () => {
    if (AccessName !== '') {
      dispatch(
        updateEducationField({
          'oldRoleName': item.title,
          'newRoleName': AccessName
        })
      ).then((response) => {
        dispatch(GetEducationField())
        toggle()
      })
    } else {
      SetInvalid(true)
    }
  }

  useEffect(() => {
    SetAccessName(item.title)
  }, [item.title])

  return (
    <Modal size='lg' isOpen={IsEditModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>تغییر گروه دسترسی</ModalHeader>

      <ModalBody>
        <Label>عنوان جدید گروه دسترسی را وارد کنید</Label>
        <Input value={AccessName} invalid={Invalid} placeholder=' ' onChange={(e) => CheskInput(e)} />
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
