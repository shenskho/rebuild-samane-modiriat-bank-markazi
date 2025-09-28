import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Input, Label, Progress } from 'reactstrap'
import * as XLSX from 'xlsx'
import { UploadAnswerKeys, GetAnswareKeyStatus, ProcessAnswerKeys } from '@store/slices/Booklet'
import { useDispatch } from 'react-redux'

const stepsTitles = [
  'انتخاب فایل اکسل',
  ' ارسال فایل',
  'پردازش',
  'نتیجه پردازش',
]

export default function ExcelModal({ IsAddModal, SetIsAddModal }) {
  const dispatch = useDispatch()
  const [step, setStep] = useState(1)
  const [excelData, setExcelData] = useState([])
  const [excelFile, setExcelFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  const [trackingCode, setTrackingCode] = useState(null)

  const [processingStatus, setProcessingStatus] = useState({
    progress: 0,
    message: '',
    hasError: false,
    isProcessed: false,
  })

  const resetAll = () => {
    setStep(1)
    setExcelData([])
    setExcelFile(null)
    setUploading(false)
    setUploadError(null)
    setTrackingCode(null)
    setProcessingStatus({
      progress: 0,
      message: '',
      hasError: false,
      isProcessed: false,
    })
  }

  const toggle = () => {
    if (step === 1) {
      SetIsAddModal(!IsAddModal)
      resetAll()
    } else {
      setStep(step - 1)
    }
  }

  const handleExcelUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setExcelFile(file)
    const reader = new FileReader()
    reader.onload = (event) => {
      const binaryStr = event.target.result
      const workbook = XLSX.read(binaryStr, { type: 'binary' })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 })
      setExcelData(jsonData)
    }
    reader.readAsBinaryString(file)
  }

  const handleSubmit = () => {
    if (!excelFile) {
      alert('فایل انتخاب نشده است')
      return
    }

    setUploading(true)
    setUploadError(null)

    if (step === 1) {
      dispatch(UploadAnswerKeys({ examId: 1, file: excelFile }))
        .then((response) => {
          const tracking = response.payload?.trackingCode || null
          setTrackingCode(tracking)
          setStep(2) // وارد مرحله پردازش می‌شویم
        })
        .catch(() => {
          setUploadError('خطا در آپلود فایل')
        })
        .finally(() => {
          setUploading(false)
        })
    }
  }

  // این useEffect تا زمانی که step=2 و trackingCode موجود است، هر 2 ثانیه وضعیت را می‌گیرد
  useEffect(() => {
    let intervalId

    if (step === 2 && trackingCode && processingStatus.progress !==100) {
      intervalId = setInterval(() => {
        dispatch(GetAnswareKeyStatus(trackingCode))
          .then((response) => {
            const res = response.payload
   
            if (!res) return

            setProcessingStatus({
              progress: res.progress || 0,
              message: response.payload?.message || '',
              hasError: response.payload?.hasError || false,
              isProcessed: res.isProcessed || false,
            })

            // اگر پیشرفت 100 یا پردازش تمام شده یا خطا داشتیم، حلقه رو تموم کن و مرحله بعد رو بزن
            if (res.progress === 100 || res.isProcessed || response.payload.hasError) {
              clearInterval(intervalId)
              if (response.payload.hasError) {
                setUploadError('خطا در پردازش فایل')
      
              } else {
                // dispatch(ProcessAnswerKeys())
                setStep(3) // مرحله موفقیت
              }
            }
          })
          .catch(() => {
            setUploadError('خطا در دریافت وضعیت پردازش')
            clearInterval(intervalId)
            setStep(4)
          })
      }, 2000)
    }

    // پاک کردن interval در هنگام unmount یا تغییر dependencies
    return () => clearInterval(intervalId)
  }, [step, trackingCode, dispatch])

  // کامپوننت ProgressBar برای نمایش مراحل
  const ProgressBar = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        {stepsTitles.map((title, index) => {
          const stepNum = index + 1
          const isActive = step === stepNum
          const isCompleted = step > stepNum

          return (
            <div
              key={index}
              style={{
                flex: 1,
                textAlign: 'center',
                position: 'relative',
                color: isActive || isCompleted ? '#04364a' : '#aaa',
                fontWeight: isActive ? 'bold' : 'normal',
              }}
            >
              <div
                style={{
                  margin: '0 auto 8px',
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  backgroundColor: isCompleted ? '#04364a' : isActive ? '#04364a' : '#ddd',
                  color: isCompleted ? 'white' : isActive ? 'white' : '#888',
                  lineHeight: '30px',
                  fontWeight: 'bold',
                }}
              >
                {stepNum}
              </div>
              <div style={{ fontSize: 14 }}>{title}</div>
              {stepNum !== stepsTitles.length && (
                <div
                  style={{
                    position: 'absolute',
                    top: 15,
                    right: 0,
                    width: '100%',
                    height: 2,
                    backgroundColor: isCompleted ? '#04364a' : '#ddd',
                    zIndex: -1,
                  }}
                />
              )}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <Modal size='xl' isOpen={IsAddModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>آپلود و نمایش اکسل</ModalHeader>
      <ModalBody>
        <ProgressBar />

        {step === 1 && (
          <>
            <div className='mb-3'>
              <Label>انتخاب فایل اکسل</Label>
              <Input type='file' accept='.xlsx, .xls' onChange={handleExcelUpload} />
            </div>

            {excelData.length > 0 ? (
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
            ) : (
              <div
                style={{
                  height: '300px',
                  overflow: 'auto',
                  border: '1px solid #e0e0e0',
                  borderRadius: '5px',
                }}
              />
            )}

            <Button
              className='w-100 mt-1'
              color='primary'
              onClick={handleSubmit}
              disabled={uploading || !excelFile}
            >
              {uploading ? 'در حال ارسال...' : 'ارسال'}
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <h5>وضعیت پردازش فایل</h5>
            <Progress value={processingStatus.progress} max='100'>
              {processingStatus.progress}%
            </Progress>
            <p>{processingStatus.message}</p>
            {processingStatus.hasError && (
              <p className='text-danger'>خطا در پردازش فایل رخ داده است.</p>
            )}
            <Button className='mt-2 me-2' onClick={() => setStep(1)} disabled={uploading}>
              بازگشت به انتخاب فایل
            </Button>
          </>
        )}

        {step === 3 && (
          <>
            <h5>پردازش با موفقیت انجام شد!</h5>
            <p>کد پیگیری: {trackingCode}</p>
            <Button
              onClick={() => {
                toggle()
                resetAll()
              }}
            >
              بستن
            </Button>
          </>
        )}

        {step === 4 && (
          <>
            {uploadError ? (
              <>
                <h5 className='text-danger'>خطا در آپلود یا پردازش فایل</h5>
                <p>{uploadError}</p>
                <Button onClick={() => setStep(1)}>بازگشت به آپلود</Button>
              </>
            ) : (
              <>
                <h5>آپلود با موفقیت انجام شد!</h5>
                <p>کد پیگیری: {trackingCode}</p>
                <Button
                  onClick={() => {
                    toggle()
                    resetAll()
                  }}
                >
                  بستن
                </Button>
              </>
            )}
          </>
        )}
      </ModalBody>
    </Modal>
  )
}
