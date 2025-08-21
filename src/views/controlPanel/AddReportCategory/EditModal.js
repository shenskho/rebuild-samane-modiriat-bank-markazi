import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap'
import { tuple } from 'yup'
import { UpdateCategory, GetAllCategory } from '@store/slices/Category'
import { useDispatch } from 'react-redux'
export default function modal({ IsEditModal, SetIsEditModal, treeNode }) {
  const [CategoryName, SetCategoryName] = useState('')
  const [Invalid, SetInvalid] = useState(false)
  const dispatch = useDispatch()
  const toggle = (row) => {
    SetIsEditModal(!IsEditModal)
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
        UpdateCategory({
          "id": treeNode.id,
          "title": CategoryName,
          "parentId": treeNode.parentId
        })
      ).then((response) => {
        dispatch(GetAllCategory())
        toggle()
      })
    } else {
      SetInvalid(true)
    }
  }

  return (
    <Modal size='lg' isOpen={IsEditModal} toggle={toggle}>
      <ModalHeader toggle={toggle}> تغییر عنوان دسته بندی </ModalHeader>

      <ModalBody>
        <Label>عنوان دسته بندی (جدید) را وارد کنید</Label>
        <Input invalid={Invalid} placeholder=' ' defaultValue={treeNode?.title} onChange={(e) => CheskInput(e)} />
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
