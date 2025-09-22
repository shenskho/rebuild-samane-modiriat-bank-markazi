import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap'

// ⚠️ در حالت واقعی از redux استفاده میشه
// import { DeleteRole , ReadRoles} from '@store/slices/controlPanel'
// import { useDispatch } from 'react-redux'

export default function DeleteModal({ IsDeleteModal, SetIsDeleteModal, item }) {
  // const dispatch = useDispatch()

  const toggle = () => {
    SetIsDeleteModal(!IsDeleteModal)
  }

  const handeleDeleteRole = () => {
    console.log('📌 حذف استاتیک:', item)
    // در حالت واقعی:
    // dispatch(DeleteRole({ "rollName": item.name }))
    //   .then(() => dispatch(ReadRoles()))
    //   .then(() => toggle())
    toggle()
  }

  return (
    <Modal size='lg' isOpen={IsDeleteModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>حذف گروه دسترسی</ModalHeader>

      <ModalBody>
        <Label>{`آیا میخواهید گروه دسترسی ${item?.name || ''} را حذف کنید؟`} </Label>
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
