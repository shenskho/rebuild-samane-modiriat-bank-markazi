import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap'
import { tuple } from 'yup'
import { updateActivityScope, GetActivityScope } from '@store/slices/fixData'
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
        updateActivityScope({
          'id': item.id,
          'title': titleName,
        })
      ).then((response) => {
        dispatch(GetActivityScope())
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
      <ModalHeader toggle={toggle}> تغییر گستره فعالیت</ModalHeader>

      <ModalBody>
        <Label>عنوان جدید گستره فعالیت را وارد کنید</Label>
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
