import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap'
import { tuple } from 'yup'
import { updateEducationField, GetEducationField } from '@store/slices/variableData'
import { useDispatch } from 'react-redux'
import { title } from 'process'
export default function EditModal({ IsEditModal, SetIsEditModal, item }) {
  const [titleName, setTitleName] = useState('')
  const [educationLevel, setEducationLevel] = useState('')
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
    const CheckEducationLevel = (e) =>{
 if (e.target.value.trim() === '') {
      SetInvalid(true)
      setEducationLevel('')
    } else {
      SetInvalid(false)
      setEducationLevel(e.target.value)
    }
  }


  const AddCategory = () => {
    if (titleName !== '') {
      dispatch(
        updateEducationField({
          'id': item.id,
          'title': titleName,
          'educationLevelId':educationLevel

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
    setTitleName(item.title)
  }, [item.title])

  return (
    <Modal size='lg' isOpen={IsEditModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>تغییر رشته تحصیلی</ModalHeader>

      <ModalBody>
        <Label>نوع رشته تحصیلی جدید خود را وارد کنید</Label>
        <Input value={titleName} invalid={Invalid} placeholder=' نوع رشته تحصیلی' onChange={(e) => CheskInput(e)} />
      </ModalBody>
        <ModalBody>
        <Label>نوع مقطع تحصیلی جدید خود را وارد کنید</Label>
        <Input value={educationLevel} invalid={Invalid} placeholder=' نوع مقطع تحصیلی' onChange={(e) => CheckEducationLevel(e)} />
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
