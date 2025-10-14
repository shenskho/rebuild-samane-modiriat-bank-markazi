import React, { useState, useEffect, useRef } from 'react'
import { Button, Row, Col, Spinner } from 'reactstrap'
import {
  ProcessCandidateResultSteap1,
  CalculateCandidateRawScoresSteap2,
  CalculateCandidateScores,
  CalculateCandidateScoresStatus,
  GenerateRanking,
  GenerateRankingStatus,
  GenerateReportCards,
  GenerateReportCardsStatus,
  GetfinalExel
} from '@store/slices/correction'
import { useDispatch } from 'react-redux'

export default function DoCorrection({ selectedOption }) {
  const dispatch = useDispatch()

  const [step, setStep] = useState(1)

  // ✅ وضعیت هر مرحله (tracking code، درصد، و در حال پردازش بودن)
  const [trackingCodes, setTrackingCodes] = useState({})
  const [progress, setProgress] = useState({})
  const [processing, setProcessing] = useState({})
  const intervalsRef = useRef({})

  // 🔹 تابع عمومی برای مانیتور کردن درصد پیشرفت
  const startStatusMonitor = (stepNumber, trackingCode, statusAction, onComplete) => {
    if (!trackingCode) return

    // اگر interval قبلی وجود دارد، پاکش کن
    if (intervalsRef.current[stepNumber]) clearInterval(intervalsRef.current[stepNumber])

    intervalsRef.current[stepNumber] = setInterval(async () => {
      try {
        const statusResponse = await dispatch(statusAction(trackingCode))
        const percentRaw = Number(statusResponse?.payload?.percent ?? 0)
        const percent = Math.min(Math.max(percentRaw, 0), 100)

        setProgress((prev) => ({ ...prev, [stepNumber]: percent }))

        // ✅ وقتی به ۱۰۰٪ رسید
        if (percent >= 99.9) {
          clearInterval(intervalsRef.current[stepNumber])
          intervalsRef.current[stepNumber] = null
          setProcessing((prev) => ({ ...prev, [stepNumber]: false }))
          setProgress((prev) => ({ ...prev, [stepNumber]: 100 }))
          onComplete()
        }
      } catch (err) {
        console.error('Error polling status:', err)
      }
    }, 3000)
  }

  // پاک کردن intervalها موقع unmount
  useEffect(() => {
    return () => {
      Object.values(intervalsRef.current).forEach((id) => id && clearInterval(id))
    }
  }, [])

  // --- Step 1 ---
  const handleStep1 = async () => {
    setProcessing((p) => ({ ...p, 1: true }))
    setProgress((p) => ({ ...p, 1: 0 }))

    const response = await dispatch(ProcessCandidateResultSteap1())
    if (response?.payload) {
      const tracking = response.payload.trackingCode
      setTrackingCodes((t) => ({ ...t, 1: tracking }))
      startStatusMonitor(1, tracking, CalculateCandidateScoresStatus, () => setStep(2))
    } else {
      setProcessing((p) => ({ ...p, 1: false }))
    }
  }

  // --- Step 2 ---
  const handleStep2 = async () => {
    setProcessing((p) => ({ ...p, 2: true }))
    setProgress((p) => ({ ...p, 2: 0 }))

    const response = await dispatch(CalculateCandidateRawScoresSteap2())
    if (response?.payload) {
      const tracking = response.payload.trackingCode
      setTrackingCodes((t) => ({ ...t, 2: tracking }))
      startStatusMonitor(2, tracking, CalculateCandidateScoresStatus, () => setStep(3))
    } else {
      setProcessing((p) => ({ ...p, 2: false }))
    }
  }

  // --- Step 3 ---
  const handleStep3 = async () => {
    setProcessing((p) => ({ ...p, 3: true }))
    setProgress((p) => ({ ...p, 3: 0 }))

    const response = await dispatch(CalculateCandidateScores())
    if (response?.payload) {
      const tracking = response.payload.trackingCode
      setTrackingCodes((t) => ({ ...t, 3: tracking }))
      startStatusMonitor(3, tracking, CalculateCandidateScoresStatus, () => setStep(4))
    } else {
      setProcessing((p) => ({ ...p, 3: false }))
    }
  }

  // --- Step 4 ---
  const handleStep4 = async () => {
    setProcessing((p) => ({ ...p, 4: true }))
    setProgress((p) => ({ ...p, 4: 0 }))

    const response = await dispatch(GenerateRanking())
    if (response?.payload) {
      const tracking = response.payload.trackingCode
      setTrackingCodes((t) => ({ ...t, 4: tracking }))
      startStatusMonitor(4, tracking, GenerateRankingStatus, () => setStep(5))
    } else {
      setProcessing((p) => ({ ...p, 4: false }))
    }
  }

  // --- Step 5 ---
  const handleStep5 = async () => {
    setProcessing((p) => ({ ...p, 5: true }))
    setProgress((p) => ({ ...p, 5: 0 }))

    const response = await dispatch(GenerateReportCards())
    if (response?.payload) {
      const tracking = response.payload.trackingCode
      setTrackingCodes((t) => ({ ...t, 5: tracking }))
      startStatusMonitor(5, tracking, GenerateReportCardsStatus, () => {
        setProcessing((p) => ({ ...p, 5: false }))
        setProgress((p) => ({ ...p, 5: 100 }))
        console.log('✅ کارنامه داوطلبین تولید شد')
        setStep(6) // ✅ فعال‌سازی دکمه دانلود ZIP بعد از اتمام مرحله ۵
      })
    } else {
      setProcessing((p) => ({ ...p, 5: false }))
    }
  }
  // --- Step 6: دانلود فایل ZIP نهایی ---
  const handleStep6 = async () => {
    setProcessing((p) => ({ ...p, 6: true }))
    setProgress((p) => ({ ...p, 6: 0 }))

    try {
      const response = await dispatch(GetfinalExel()) // فرض بر اینه payload = Blob یا ArrayBuffer باشه
      if (response?.payload) {
        // ساخت Blob از پاسخ
        const blob = new Blob([response.payload], { type: 'application/zip' })

        // ساخت لینک دانلود
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'FinalReports.zip'
        document.body.appendChild(a)
        a.click()
        a.remove()
        window.URL.revokeObjectURL(url)

        console.log('✅ فایل ZIP با موفقیت دانلود شد')
      } else {
        console.error('⛔ پاسخ نامعتبر از GetfinalExel')
      }
    } catch (err) {
      console.error('❌ خطا در دریافت فایل ZIP:', err)
    } finally {
      setProcessing((p) => ({ ...p, 6: false }))
      setProgress((p) => ({ ...p, 6: 100 }))
    }
  }

  // --- تابع مشترک برای نمایش دکمه‌ها ---
  const renderButton = (label, stepNumber, onClick) => (
    <Button
      className='w-100'
      color='primary'
      onClick={onClick}
      disabled={step < stepNumber || processing[stepNumber] || selectedOption}
    >
      {processing[stepNumber] ? (
        <>
          <Spinner size='sm' /> در حال پردازش...{' '}
          {progress[stepNumber] !== null && `(${progress[stepNumber].toFixed(1)}%)`}
        </>
      ) : (
        label
      )}
    </Button>
  )

  return (
    <Row className='gy-2'>
      <Col>{renderButton('تصحیح اولیه', 1, handleStep1)}</Col>
      <Col>{renderButton('اعمال درس‌بندی‌ها', 2, handleStep2)}</Col>
      <Col>{renderButton('اعمال امتیازات آزمون', 3, handleStep3)}</Col>
      <Col>{renderButton('تفکیک سهمیه‌ها', 4, handleStep4)}</Col>
      <Col>{renderButton('کارنامه داوطلبین', 5, handleStep5)}</Col>
      <Col>{renderButton('دانلود فایل نهایی ZIP', 6, handleStep6)}</Col>
    </Row>
  )
}
