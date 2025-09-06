import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap'
import { removeCity, GetCity } from '@store/slices/fixData'
import { useDispatch } from 'react-redux'

export default function EditModal({ IsDeleteModal, SetIsDeleteModal, item }) {
  const dispatch = useDispatch()

  const toggle = (row) => {
    SetIsDeleteModal(!IsDeleteModal)
  }

  const handeleDeleteRole = () => {
    dispatch(
      removeCity({
        'id': item.id
      })
    ).then((response) => {
      dispatch(GetCity())
      toggle()
    })
  }

  return (
    <Modal size='lg' isOpen={IsDeleteModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>حذف شهر</ModalHeader>

      <ModalBody>
        <Label>{`آیا می خواهید شهر ${item.title} را حذف کنید؟`} </Label>
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
