import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Input, Label } from 'reactstrap'
import * as XLSX from 'xlsx'
import { UploadAnswerKeys } from '@store/slices/Booklet'
import { useDispatch } from 'react-redux'

export default function ExcelModal({ IsAddModal, SetIsAddModal }) {
  const toggle = () => SetIsAddModal(!IsAddModal)
  const dispatch = useDispatch()
  const [excelData, setExcelData] = useState([])
  const [excelFile, setExcelFile] = useState(null) // <-- NEW
  const handleExcelUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setExcelFile({ file: file })
    const reader = new FileReader()
    reader.onload = (event) => {
      const binaryStr = event.target.result
      const workbook = XLSX.read(binaryStr, { type: 'binary' })
      const sheetName = workbook.SheetNames[0] // فقط اولین شیت
      const sheet = workbook.Sheets[sheetName]
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 }) // آرایه آرایه‌ای
      setExcelData(jsonData)
    }
    reader.readAsBinaryString(file)
  }

  return (
    <Modal size='xl' isOpen={IsAddModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>آپلود و نمایش اکسل</ModalHeader>
      <ModalBody>
        {/* انتخاب اکسل */}
        <div className='mb-3'>
          <Label>انتخاب فایل اکسل</Label>
          <Input type='file' accept='.xlsx, .xls' onChange={handleExcelUpload} />
        </div>

        {/* نمایش دیتا */}
        {excelData.length > 0 && (
          <div style={{ maxHeight: '400px', overflow: 'auto' }}>
            <table className='table table-bordered table-sm bg-white'>
              <tbody className='bg-white'>
                {excelData.map((row, i) => (
                  <tr key={i} className='bg-white'>
                    {row.map((cell, j) => (
                      <td className='bg-white' key={j}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Button className='w-100 mt-1' color='primary' onClick={() => {
          if (!excelFile) return alert('فایل انتخاب نشده است')
          dispatch(UploadAnswerKeys(excelFile)).then((reposnse) => {
            toggle()
           setExcelData([])
           setExcelFile(null)
          })
        }}>
          {' '}
          ارسال
        </Button>
      </ModalBody>
    </Modal>
  )
}
