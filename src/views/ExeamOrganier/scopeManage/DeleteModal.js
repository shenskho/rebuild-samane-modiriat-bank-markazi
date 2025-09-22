import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap'
import { RemoveMeetingRecordType, GetMeetingRecordType } from '@store/slices/scopeUser'
import { useDispatch } from 'react-redux'

export default function EditModal({ IsDeleteModal, SetIsDeleteModal, userName }) {
  const dispatch = useDispatch()

  const toggle = () => {
    SetIsDeleteModal(!IsDeleteModal)
  }

  const handeleDeleteRole = () => {
    dispatch(
      RemoveMeetingRecordType({
        'id': userName.id
      })
    ).then(() => {
      dispatch(GetMeetingRecordType())
      toggle()
    })
  }

  return (
    <Modal size='lg' isOpen={IsDeleteModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>حذف حساب کاربری </ModalHeader>

      <ModalBody>
        <Label>{`آیا میخواهید   ${userName?.title}  را حذف کنید؟`} </Label>
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
