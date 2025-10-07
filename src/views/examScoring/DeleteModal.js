import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap'
import { RemoveExamScroring, GetAllExamScroring } from '@store/slices/examScroing'
import { useDispatch } from 'react-redux'

export default function EditModal({ IsDeleteModal, SetIsDeleteModal, item }) {
  const dispatch = useDispatch()

  const toggle = (row) => {
    SetIsDeleteModal(!IsDeleteModal)
  }

  const handeleDeleteRole = () => {
    dispatch(
      RemoveExamScroring({
        'id': item.id
      })
    ).then((response) => {
      dispatch(GetAllExamScroring())
      toggle()
    })
  }

  return (
    <Modal size='lg' isOpen={IsDeleteModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>حذف قانون</ModalHeader>

      <ModalBody>
        <Label>{`آیا می خواهید شهر ${item.ruleTypeTitle} را حذف کنید؟`} </Label>
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
