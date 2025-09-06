import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap'
import { removeActivityScope,GetActivityScope} from '@store/slices/fixData'
import { useDispatch } from 'react-redux'

export default function EditModal({ IsDeleteModal, SetIsDeleteModal, item }) {
  const dispatch = useDispatch()

  const toggle = (row) => {
    SetIsDeleteModal(!IsDeleteModal)
  }

  const handeleDeleteRole = () => {
    dispatch(
      removeActivityScope({
        'id': item.id
      })
    ).then((response) => {
      dispatch(GetActivityScope())
      toggle()
    })
  }

  return (
    <Modal size='lg' isOpen={IsDeleteModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>حذف گستره فعالیت</ModalHeader>

      <ModalBody>
        <Label>{`آیا می خواهید گستره فعالیت ${item.title} را حذف کنید؟`} </Label>
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
