import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap'
import { tuple } from 'yup'
import { updateScoreRatio, GetScoreRatio } from '@store/slices/variableData'
import { useDispatch } from 'react-redux'
import { title } from 'process'
export default function EditModal({ IsEditModal, SetIsEditModal, item }) {
  const [titleName, setTitleName] = useState('')
   const [University, setUniverity] = useState('')
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
    if (titleName !== '') {
      dispatch(
        updateScoreRatio({
          'id': item.id,
          'title': titleName
        })
      ).then((response) => {
        dispatch(GetScoreRatio())
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
      <ModalHeader toggle={toggle}>تغییر نوع دانشگاه</ModalHeader>

      <ModalBody>
        <Label>نوع دانشگاه جدید خود را وارد کنید</Label>
        <Input value={titleName} invalid={Invalid} placeholder=' نوع استخدام' onChange={(e) => CheskInput(e)} />
      </ModalBody>
         <ModalBody>
        <Label>نوع دانشگاه جدید خود را وارد کنید</Label>
        <Input value={University} invalid={Invalid} placeholder=' نوع استخدام' onChange={(e) => CheckUniversity(e)} />
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
