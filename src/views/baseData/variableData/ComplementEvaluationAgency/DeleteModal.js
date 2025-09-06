import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap'
import { removeComplementEvaluationAgency, GetComplementEvaluationAgency } from '@store/slices/variableData'
import { useDispatch } from 'react-redux'

export default function EditModal({ IsDeleteModal, SetIsDeleteModal, item }) {
  const dispatch = useDispatch()

  const toggle = (row) => {
    SetIsDeleteModal(!IsDeleteModal)
  }

  const handeleDeleteRole = () => {
    dispatch(
      removeComplementEvaluationAgency({
        'id': item.id
      })
    ).then((response) => {
      dispatch(GetComplementEvaluationAgency())
      toggle()
    })
  }

  return (
    <Modal size='lg' isOpen={IsDeleteModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>حذف مجری ارزیابی نهایی</ModalHeader>

      <ModalBody>
        <Label>{`آیا می خواهید مجری ارزیابی نهایی ${item.title} را حذف کنید؟`} </Label>
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
