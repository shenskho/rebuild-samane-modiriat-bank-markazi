import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap'
import { tuple } from 'yup'
import { CreateRole, ReadRoles} from '@store/slices/controlPanel'
import { useDispatch } from 'react-redux'
export default function modal({ IsAddModal, SetIsAddModal }) {
  const [CategoryName, SetCategoryName] = useState('')
  const [Invalid, SetInvalid] = useState(false)
  const dispatch = useDispatch()
  const toggle = (row) => {
    SetIsAddModal(!IsAddModal)
  }
  const CheskInput = (e) => {
    if (e.target.value.trim() === '') {
      SetInvalid(true)
      SetCategoryName('')
    } else {
      SetInvalid(false)
      SetCategoryName(e.target.value)
    }
  }
  const AddCategory = () => {
    if (CategoryName !== '') {

      dispatch(
        CreateRole({
          'rollName': CategoryName
        })
      ).then((response) => {
        dispatch(ReadRoles())
        toggle()
      })
    } else {
      SetInvalid(true)
    }
  }

  return (
    <Modal size='lg' isOpen={IsAddModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>اضافه کردن گروه دسترسی</ModalHeader>

      <ModalBody>
        <Label>عنوان  گروه دسترسی را وارد کنید</Label>
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
