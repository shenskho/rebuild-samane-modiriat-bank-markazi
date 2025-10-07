import React, { useState, useEffect, useRef } from 'react'
import { Modal, ModalHeader, ModalBody, Button, Progress } from 'reactstrap'
import { useDispatch } from 'react-redux'
import { CheckCircle } from 'react-feather'
import {
  ProcessFinalResultStart,
  ProcessFinalResultStartStatus,
  DownloadCandidateAnsware
} from '@store/slices/candidate'

const stepsTitles = ['شروع پردازش', 'وضعیت پردازش', 'پایان پردازش', 'دانلود فایل']

export default function FinalResultProcessor({ show, onClose }) {
  const dispatch = useDispatch()
  const [step, setStep] = useState(1)
  const [trackingCode, setTrackingCode] = useState(null)
  const [progress, setProgress] = useState(0)
  const [details, setDetails] = useState([])
  const [isCompleted, setIsCompleted] = useState(false)
  const [loading, setLoading] = useState(false)
  const detailsEndRef = useRef(null)
  const formatPercent = (p) => (p <= 1 ? Math.round(p) : Math.round(p))

  const resetAll = () => {
    setStep(1)
    setTrackingCode(null)
    setProgress(0)
    setDetails([])
    setIsCompleted(false)
    setLoading(false)
    // localStorage.removeItem('finalResultTrackingCode')
  }

  const toggle = () => {
    onClose()
    resetAll()
  }

  const handleStart = async () => {
    setLoading(true)
    try {
      const res = await dispatch(ProcessFinalResultStart()).unwrap()
      if (res?.trackingCode) {
        setTrackingCode(res.trackingCode)
        localStorage.setItem('finalResultTrackingCode', res.trackingCode)
        setStep(2)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // وقتی مدال باز میشه بررسی کن اگر پردازش قبلاً شروع شده
  useEffect(() => {
    if (show) {
      const savedTrackingCode = localStorage.getItem('finalResultTrackingCode')
      if (savedTrackingCode) {
        setTrackingCode(savedTrackingCode)
        // بررسی وضعیت پردازش
        const checkStatus = async () => {
          try {
            const res = await dispatch(ProcessFinalResultStartStatus(savedTrackingCode)).unwrap()
            if (res?.isCompleted) {
              // پردازش تموم شده، Step 3
              setProgress(formatPercent(res.percent))

              setDetails(res.details || [])
              setIsCompleted(true)
              setStep(3)
              localStorage.removeItem('finalResultTrackingCode')
            } else {
              // پردازش در حال انجام، Step 2
              setProgress(formatPercent(res.percent))
              setDetails(res.details || [])
              setIsCompleted(false)
              setStep(2)
            }
          } catch (err) {
            console.error(err)
            setStep(1) // اگر خطا بود، برگرد Step 1
          }
        }
        checkStatus()
      } else {
        setStep(1) // هیچ پردازشی ذخیره نشده
      }
    }
  }, [show, dispatch])
  useEffect(() => {
    if (!show) return // فقط وقتی باز شد

    const init = async () => {
      const savedTrackingCode = localStorage.getItem('finalResultTrackingCode')
      if (savedTrackingCode) {
        setTrackingCode(savedTrackingCode)
        try {
          const res = await dispatch(ProcessFinalResultStartStatus(savedTrackingCode)).unwrap()
          if (res?.isCompleted) {
            setProgress(formatPercent(res.percent))
            setDetails(res.details || [])
            setIsCompleted(true)
            setStep(3) // پردازش تموم شده
            localStorage.removeItem('finalResultTrackingCode')
          } else {
            setProgress(formatPercent(res.percent))
            setDetails(res.details || [])
            setIsCompleted(false)
            setStep(2) // پردازش در حال انجام
          }
        } catch (err) {
          console.error(err)
          setStep(1)
        }
      } else {
        setStep(1) // هیچ پردازشی ذخیره نشده
      }
    }

    init()
  }, [show, dispatch])

  // Polling مرحله پردازش
  useEffect(() => {
    // setStep(4)
    let interval
    if (step === 2 && trackingCode && !isCompleted) {
      interval = setInterval(async () => {
        try {
          const res = await dispatch(ProcessFinalResultStartStatus(trackingCode)).unwrap()
          if (res) {
            setProgress(formatPercent(res.percent))
            setDetails(res.details || [])
            setIsCompleted(res.isCompleted)
            if (res.isCompleted) {
              clearInterval(interval)
              setStep(3)
              localStorage.removeItem('finalResultTrackingCode')
            }
          }
        } catch (err) {
          console.error(err)
          clearInterval(interval)
        }
      }, 3000)
    }
    return () => clearInterval(interval)
  }, [step, trackingCode, isCompleted, dispatch])

  useEffect(() => {
    if (detailsEndRef.current) {
      detailsEndRef.current.scrollTop = detailsEndRef.current.scrollHeight
    }
  }, [details])

  const goToDownload = () => setStep(4)

  const handleDownload = async () => {
    try {
      // دریافت فایل ZIP از API با trackingCode
      const res = await dispatch(DownloadCandidateAnsware(trackingCode)).unwrap()

      // ساختن Blob از داده‌های باینری
      const blob = new Blob([res], { type: 'application/zip' })

      // بررسی حجم Blob (اختیاری)
      console.log('ZIP size:', blob.size, 'bytes')

      // ساختن تاریخ و زمان برای اسم فایل
      const now = new Date()
      const timestamp = now.toISOString().replace(/[:.]/g, '-')

      // ساختن لینک دانلود و کلیک خودکار
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `FinalResult_${timestamp}.zip`
      document.body.appendChild(a)
      a.click()
      a.remove()

      // آزادسازی حافظه
      window.URL.revokeObjectURL(url)

      console.log('Download completed')
    } catch (err) {
      console.error('Download failed:', err)
    }
  }

  const ProgressBarSteps = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
      {stepsTitles.map((title, index) => {
        const stepNum = index + 1
        const isActive = step === stepNum
        const isCompletedStep = step > stepNum
        return (
          <div
            key={index}
            style={{
              flex: 1,
              textAlign: 'center',
              position: 'relative',
              color: isActive || isCompletedStep ? '#04364a' : '#aaa',
              fontWeight: isActive ? 'bold' : 'normal'
            }}
          >
            <div
              style={{
                margin: '0 auto 8px',
                width: 30,
                height: 30,
                borderRadius: '50%',
                backgroundColor: isCompletedStep ? '#04364a' : isActive ? '#04364a' : '#ddd',
                color: 'white',
                lineHeight: '30px',
                fontWeight: 'bold'
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
                  backgroundColor: isCompletedStep ? '#04364a' : '#ddd',
                  zIndex: -1
                }}
              />
            )}
          </div>
        )
      })}
    </div>
  )

  return (
    <Modal size='xl' isOpen={show} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>پردازش نهایی پاسخنامه‌ها</ModalHeader>
      <ModalBody>
        <ProgressBarSteps />

        {step === 1 && (
          <div className='text-center'>
            <Button color='primary' onClick={handleStart} disabled={loading}>
              {loading ? 'در حال شروع...' : 'شروع پردازش'}
            </Button>
          </div>
        )}

        {step === 2 && (
          <>
            <h5>وضعیت پردازش</h5>
            <Progress value={progress} animated striped>
              {progress}%
            </Progress>
            <div ref={detailsEndRef} style={{ maxHeight: 300, overflowY: 'auto', marginTop: 10 }}>
              <ul>
                {details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          </>
        )}

        {step === 3 && (
          <div className='text-center'>
            <CheckCircle size={45} color='#28c76f' />
            <h5 className='mt-2 mb-2'>پردازش با موفقیت به پایان رسید</h5>
            <p>کد پیگیری: {trackingCode}</p>
            <Button color='success' onClick={goToDownload}>
              ادامه به دانلود
            </Button>
          </div>
        )}

        {step === 4 && (
          <div className='text-center'>
            <h5>دانلود فایل نهایی</h5>
            <Button color='success' onClick={handleDownload}>
              دانلود فایل ZIP
            </Button>
          </div>
        )}
      </ModalBody>
    </Modal>
  )
}
