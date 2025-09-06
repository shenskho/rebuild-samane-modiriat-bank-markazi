import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap'
import { RemoveExamScope , GetExamScope} from '@store/slices/examScope'
import { useDispatch } from 'react-redux'

export default function EditModal({ IsDeleteModal, SetIsDeleteModal, item }) {

  const dispatch = useDispatch()

  const toggle = (row) => {
    SetIsDeleteModal(!IsDeleteModal)
  }


  const handeleDeleteRole = () => {

      dispatch(
        RemoveExamScope({
          "id": item.id
        })
      ).then((response) => {
        dispatch(GetExamScope())
        toggle()
      })
  
  }

  return (
    <Modal size='lg' isOpen={IsDeleteModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>حذف   حوزه</ModalHeader>

      <ModalBody>
        <h5>{`آیا میخواهید  حوزه ${item.title}  را حذف کنید؟`} </h5>
        
      </ModalBody>

      <ModalFooter>

        <Button color='primary' onClick={toggle}>
          بستن
        </Button>

        <Button color='danger' onClick={handeleDeleteRole}>
          حذف
        </Button>

      </ModalFooter>

    </Modal>

  )
}
