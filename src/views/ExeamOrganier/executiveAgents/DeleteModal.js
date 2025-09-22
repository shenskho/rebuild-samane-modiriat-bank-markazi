import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap'

// ⚠️ در حالت واقعی redux استفاده میشه
// import { DeleteExamScopeSecound, GetExamScopeSecound } from '@store/slices/examScope'
// import { useDispatch } from 'react-redux'

export default function DeleteModal({ IsDeleteModal, SetIsDeleteModal, item }) {
  // const dispatch = useDispatch()

  const toggle = () => {
    SetIsDeleteModal(!IsDeleteModal)
  }

  const handleDelete = () => {
    console.log('📌 حذف استاتیک:', item)
    // در حالت واقعی:
    // dispatch(DeleteExamScopeSecound(item.id)).then(() => {
    //   dispatch(GetExamScopeSecound()).then(() => toggle())
    // })
    toggle()
  }

  return (
    <Modal size='lg' isOpen={IsDeleteModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>حذف عامل اجرایی</ModalHeader>

      <ModalBody>
        <Label>
          {`آیا میخواهید عامل اجرایی ${item?.name || ''} (کدملی: ${item?.nationalId || ''}) را حذف کنید؟`}
        </Label>
      </ModalBody>

      <ModalFooter>
        <Button color='primary' onClick={toggle}>
          بستن
        </Button>

        <Button color='danger' onClick={handleDelete}>
          حذف
        </Button>
      </ModalFooter>
    </Modal>
  )
}
