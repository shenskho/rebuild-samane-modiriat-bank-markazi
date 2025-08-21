import { useState, useEffect } from 'react'
import { Alert } from 'reactstrap'
import { Info } from 'react-feather'
import PropTypes from 'prop-types'
import EventBus from '@utility/EventBus'

export default function SystemGuide({ id, color, title, message, dismissable, visible }) {
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    EventBus.on('showGuide', (payload) => {
      if (payload === id) {
        setIsOpen(true)
      }
    })

    return () => {
      EventBus.remove('showGuide', () => {})
    }
  }, [])

  const onDismiss = () => setIsOpen(false)

  if (!dismissable) {
    return (
      <Alert color={color} hidden={!visible}>
        <div className='alert-body'>
          {title && (
            <p className='text-body fw-bolder'>
              <Info size={18} className='me-25' />
              <span>{title}</span>
            </p>
          )}
          <p className='text-body fw-normal'>
            {!title && <Info size={18} className='me-25' />}
            {message}
          </p>
        </div>
      </Alert>
    )
  } else {
    return (
      <Alert color={color} isOpen={isOpen} toggle={onDismiss} hidden={!visible}>
        <div className='alert-body'>
          {title && (
            <p className='text-body fw-bolder'>
              <Info size={18} className='me-25' />
              <span>{title}</span>
            </p>
          )}
          <p className='text-body fw-normal'>
            {!title && <Info size={18} className='me-25' />}
            {message}
          </p>
        </div>
      </Alert>
    )
  }
}

export function showGuide(payload) {
  EventBus.dispatch('showGuide', payload)
}

SystemGuide.defaultProps = {
  color: 'primary',
  dismissable: false,
  visible: true
}

SystemGuide.propTypes = {
  color: PropTypes.string,
  dismissable: PropTypes.bool,
  visible: PropTypes.bool
}
