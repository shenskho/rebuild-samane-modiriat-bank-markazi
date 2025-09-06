import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap'
import { removeVeteran, GetVeteran } from '@store/slices/fixData'
import { useDispatch } from 'react-redux'

export default function EditModal({ IsDeleteModal, SetIsDeleteModal, item }) {
  const dispatch = useDispatch()

  const toggle = (row) => {
    SetIsDeleteModal(!IsDeleteModal)
  }

  const handeleDeleteRole = () => {
    dispatch(
      removeVeteran({
        'id': item.id
      })
    ).then((response) => {
      dispatch(GetVeteran())
      toggle()
    })
  }

  return (
    <Modal size='lg' isOpen={IsDeleteModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>حذف وضعیت ایثارگری</ModalHeader>

      <ModalBody>
        <Label>{`آیا می خواهید وضعیت ایثارگری ${item.title} را حذف کنید؟`} </Label>
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
