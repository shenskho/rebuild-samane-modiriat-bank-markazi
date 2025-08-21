import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Spinner } from 'reactstrap'
import Countdown from 'react-countdown'
import logo from '@assets/images/magfa/rayanLogo.webp'

export default function Maintenance() {
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState()

  useEffect(() => {
    const countdownTimestamp = parseInt(localStorage.getItem('countdown'))
    if (!countdownTimestamp || (countdownTimestamp && countdownTimestamp < new Date().valueOf())) {
      navigate('/login', { replace: true })
    } else if (countdownTimestamp) {
      setCountdown(countdownTimestamp)
    }
  }, [])

  return (
    <div className='position-fixed w-100 h-100 bg-primary'>
      <div className='h-100 d-flex flex-column justify-content-between align-items-center'>
        <div className='d-flex flex-column justify-content-center align-items-center flex-fill'>
          <img src={logo} className='width-200' alt='magfa' />
          <p className='font-large-1 text-light my-2'>در حال بروزرسانی</p>
          {countdown && (
            <Countdown
              date={new Date(countdown)}
              renderer={({ hours, minutes, seconds, completed }) => {
                if (completed) {
                  localStorage.removeItem('countdown')
                  return (
                    <Button tag='a' color='light' href='/login'>
                      ورود
                    </Button>
                  )
                } else {
                  return (
                    <>
                      <div className='d-flex flex-row-reverse'>
                        <span className='font-large-1 text-light'>{hours < 10 ? `0${hours}` : hours}</span>
                        <span className='font-large-1 text-light'>:</span>
                        <span className='font-large-1 text-light'>{minutes < 10 ? `0${minutes}` : minutes}</span>
                        <span className='font-large-1 text-light'>:</span>
                        <span className='font-large-1 text-light'>{seconds < 10 ? `0${seconds}` : seconds}</span>
                      </div>
                    </>
                  )
                }
              }}
            />
          )}
          {!countdown && <Spinner color='light' />}
        </div>
        <p className='text-center text-light m-1'>© کلیه حقوق این سایت متعلق به مرکز توسعه تجارت الکترونیکی می‌باشد.</p>
      </div>
    </div>
  )
}
