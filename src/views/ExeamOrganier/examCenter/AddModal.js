import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import DxDataGrid from '@components/devextreme/DxDataGrid'

export default function LicenseModal({ IsAddModal, SetIsAddModal, StateName }) {
  const toggle = () => SetIsAddModal(!IsAddModal)

  // 👇 state برای مودال تخصیص
  const [isAssignModal, setIsAssignModal] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)

  const handleEditRole = (row) => {
    setSelectedRow(row)       // داده‌ی ردیف انتخاب شده
    setIsAssignModal(true)    // باز کردن مودال دوم
  }

  const rowsWithIndex = [
    { title: 'تست' },
    { title: 'یک ردیف دیگه' }
  ]

  const dataGridData = {
    columns: [
      { dataField: 'index', caption: 'ردیف', width: 'auto', cssClass: 'text-center' },
      { dataField: 'title', caption: 'شرح ' },
      {
        caption: 'عملیات ',
        type: 'buttons',
        cssClass: 'operationColumn',
        width: 260,
        buttons: [
          {
            name: 'add',
            text: 'تخصیص',
            cssClass: 'btn btn-sm btn-primary',
            onClick: (e) => handleEditRole(e.row.data)
          }
        ]
      }
    ],
    rows: rowsWithIndex.map((item, i) => ({ ...item, index: i + 1 }))
  }

  return (
    <>
      {/* مودال اصلی */}
      <Modal size='lg' isOpen={IsAddModal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {`ساماندهی داوطلبان استان ${StateName}`}
        </ModalHeader>
        <ModalBody>
          <DxDataGrid
            data={dataGridData}
            paginationSize={10}
            editing={{ mode: 'row', useIcons: false }}
          />
        </ModalBody>
      </Modal>

      {/* مودال دوم (تخصیص) */}
      <Modal size='md' isOpen={isAssignModal} toggle={() => setIsAssignModal(false)}>
        <ModalHeader toggle={() => setIsAssignModal(false)}>
          تخصیص برای {selectedRow?.title}
        </ModalHeader>
        <ModalBody>
             <DxDataGrid
            data={dataGridData}
            paginationSize={10}
            editing={{ mode: 'row', useIcons: false }}
          />
          <p>اینجا می‌تونی اطلاعات مربوط به تخصیص "{selectedRow?.title}" رو نشون بدی</p>
        </ModalBody>
      </Modal>
    </>
  )
}
