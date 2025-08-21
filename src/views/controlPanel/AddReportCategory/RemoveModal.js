import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap'

import { RemoveCategory, GetAllCategory } from '@store/slices/Category'
import { useDispatch } from 'react-redux'
export default function modal({ IsRemoveModal, SetIsRemoveModal, treeNode }) {

  const dispatch = useDispatch()
  const toggle = (row) => {
    SetIsRemoveModal(!IsRemoveModal)
  }

  const handeleRemoveCategory = () => {


      dispatch(
        RemoveCategory({
          'id': treeNode.id
        })
      ).then((response) => {
     dispatch(GetAllCategory())
        toggle()
      })
  
  }

  return (
    <Modal size='lg' isOpen={IsRemoveModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>حذف کردن دسته بندی</ModalHeader>

      <ModalBody>
        <h5 className='mt-2 mb-2 text-center'>{`آیا میخواهید دسته بندی (${treeNode?.title}) را حذف کنید؟`}</h5>

      </ModalBody>

      <ModalFooter className='d-flex justify-content-center'>
        
        <Button color='primary' onClick={toggle}>
          انصراف
        </Button>
        <Button color='danger ' onClick={ handeleRemoveCategory}>
          حذف
        </Button>
      </ModalFooter>
    </Modal>
  )
}
