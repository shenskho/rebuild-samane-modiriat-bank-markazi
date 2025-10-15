import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap'
import { useSelector } from 'react-redux'

export default function UserChangeDetailsModal({ IsShowChanges, SetIsShowChanges }) {
  const store = useSelector((state) => state.operator)
  console.log("change log", store)

  const toggle = () => {
    SetIsShowChanges(!IsShowChanges)
  }

  const { before = {}, after = {} } = store.UserChange.item || {}

  // همه کلیدها رو یکی می‌کنیم
  const allKeys = Array.from(new Set([...Object.keys(before), ...Object.keys(after)]))

  return (
    <Modal size='lg' isOpen={IsShowChanges} toggle={toggle}>
      <ModalHeader toggle={toggle}>مشاهده تغییرات</ModalHeader>

      <ModalBody>
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>فیلد</th>
              <th>قبل</th>
              <th>بعد</th>
            </tr>
          </thead>
          <tbody>
            {allKeys.map((key) => (
              <tr key={key}>
                <td style={{ fontWeight: 'bold' }}>{key}</td>
                <td>{before[key] ?? "-"}</td>
                <td style={{ color: before[key] !== after[key] ? "green" : "inherit" }}>
                  {after[key] ?? "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ModalBody>

      <ModalFooter>
        <Button color='primary' onClick={toggle}>
          بستن
        </Button>
      </ModalFooter>
    </Modal>
  )
}
