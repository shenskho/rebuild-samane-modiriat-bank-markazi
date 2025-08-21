import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap'

import { CreateCategory, GetAllCategory } from '@store/slices/Category'
import { useDispatch } from 'react-redux'
export default function AddTreeNodeModal({ IsAddNodeModal, SetIsAddNodeModal,treeNode }) {
  const [CategoryName, SetCategoryName] = useState('')
  const [Invalid, SetInvalid] = useState(false)
  const dispatch = useDispatch()
  const toggle = (row) => {
    SetIsAddNodeModal(!IsAddNodeModal)
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
        CreateCategory({
          'title': CategoryName,
          "parentId": treeNode.id
        }),
     
      ).then((response) => {
        dispatch(GetAllCategory())
        toggle()
      })
    } else {
      SetInvalid(true)
    }
  }

  return (
    <Modal size='lg' isOpen={IsAddNodeModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>اضافه کردن دسته بندی فرعی به ({treeNode?.title}) </ModalHeader>

      <ModalBody>
        <Label>عنوان دسته بندی را وارد کنید</Label>
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
