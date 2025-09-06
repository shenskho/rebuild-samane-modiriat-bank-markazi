import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap'
import { tuple } from 'yup'
import { updateDutystatus, GetDutystatus } from '@store/slices/fixData'
import { useDispatch } from 'react-redux'
import { title } from 'process'
export default function EditModal({ IsEditModal, SetIsEditModal, item }) {
  const [titleName, setTitleName] = useState('')
  const [Invalid, SetInvalid] = useState(false)
  const dispatch = useDispatch()

  const toggle = (row) => {
    SetIsEditModal(!IsEditModal)
  }

  const CheskInput = (e) => {
    if (e.target.value.trim() === '') {
      SetInvalid(true)
      setTitleName('')
    } else {
      SetInvalid(false)
      setTitleName(e.target.value)
    }
  }

  const AddCategory = () => {
    if (titleName !== '') {
      dispatch(
        updateDutystatus({
          'id': item.id,
          'title': titleName
        })
      ).then((response) => {
        dispatch(GetDutystatus())
        toggle()
      })
    } else {
      SetInvalid(true)
    }
  }

  useEffect(() => {
    setTitleName(item.title)
  }, [item.title])

  return (
    <Modal size='lg' isOpen={IsEditModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>ویرایش وضعیت نظام وظیفه</ModalHeader>

      <ModalBody>
        <Label>وضعیت جدید نظام وظیفه را وارد کنید</Label>
        <Input value={titleName} invalid={Invalid} placeholder=' ' onChange={(e) => CheskInput(e)} />
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
