import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap'

import { RemoveReport, GetAllReports  } from '@store/slices/Report'
import { useDispatch } from 'react-redux'
export default function modal({ IsRemoveModal, SetIsRemoveModal, report }) {

  const dispatch = useDispatch()
  const toggle = (row) => {
    SetIsRemoveModal(!IsRemoveModal)
  }

  const handeleRemoveCategory = () => {


      dispatch(
        RemoveReport({
          'id': report.id
        })
      ).then((response) => {
     dispatch(GetAllReports())
        toggle()
      })
  
  }

  return (
    <Modal size='lg' isOpen={IsRemoveModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>حذف کردن  گزارش</ModalHeader>

      <ModalBody>
        <h5 className='mt-2 mb-2 text-center'>{`آیا میخواهید گزارش (${report?.title}) را حذف کنید؟`}</h5>

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
