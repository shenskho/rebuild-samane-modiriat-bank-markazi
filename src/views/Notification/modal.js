import React from 'react'
import { Button, Card, Modal, ModalHeader, ModalBody, ModalFooter, CardBody, CardHeader, Row } from 'reactstrap'
export default function modal({ Ismodal, SetIsmodal, title, date , subject}) {
  const toggle = (row) => {
    SetIsmodal(!Ismodal)
  }
  return (
    <Modal size='lg' isOpen={Ismodal} toggle={toggle}>
      <ModalHeader toggle={toggle}>اعلان</ModalHeader>

      <ModalBody>
        <div className='d-flex justify-content-between'>
          <h6>{`موضوع: ${subject}`}</h6>
          <h6>{date}</h6>
        </div>

        <h5 className='mt-2 mb-2 notif-modal-body'>{title}</h5>
      </ModalBody>

      <ModalFooter>
        <Button color='danger' onClick={toggle}>
          بستن
        </Button>
      </ModalFooter>
    </Modal>
  )
}
