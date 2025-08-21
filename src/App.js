import React, { Suspense, useEffect } from 'react'
import { useBnIdle } from 'use-bn-idle'
import { useDispatch } from 'react-redux'
import { logout, localLogout } from '@store/slices/authentication'
import { useAuth } from '@hooks/useAuth'
import EventBus from '@utility/EventBus'
import Router from './router/Router'

const App = () => {
  const dispatch = useDispatch()

  const { tokenExpiryTime, isLoggedIn } = useAuth()

  const [startTimer, stopTimer] = useBnIdle(async () => {
    if (isLoggedIn) {
      console.log('Session Timeout')
      await dispatch(logout()).unwrap()
    }
  })

  useEffect(() => {
    if (tokenExpiryTime && tokenExpiryTime > 0) {
      stopTimer()
      startTimer(tokenExpiryTime * 60)
    }
  }, [tokenExpiryTime])

  useEffect(() => {
    if (isLoggedIn) {
      EventBus.on('forceLogout', async () => {
        console.log('Session Unauthenticated')
        dispatch(localLogout())
      })
    }
    return () => {
      EventBus.remove('forceLogout', () => {})
    }
  }, [isLoggedIn])

  useEffect(() => {
    EventBus.on('redirectMaintenance', (payload) => {
      localStorage.setItem('countdown', payload)
      window.location.replace('/maintenance')
    })
    return () => {
      EventBus.remove('redirectMaintenance', () => {})
    }
  }, [])

  return (
    <Suspense fallback={null}>
      <Router />
    </Suspense>
    
  )
}

export default App
