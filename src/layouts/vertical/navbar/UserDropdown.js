import { Link, useNavigate } from 'react-router-dom'
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'
import { User, Power, Settings } from 'react-feather'
import { useDispatch } from 'react-redux'
import { logout } from '@store/slices/authentication'
import { useAuth } from '@hooks/useAuth'
import Avatar from '@core/components/avatar'
import defaultAvatar from '@src/assets/images/avatars/avatar-blank.png'
import { useEffect } from 'react'

export default function UserDropdown() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { panelTypeId, panelTypeTitle, userData, firstName, lastName, organizationalPosition } = useAuth()

  const handleLogout = async () => {
    await dispatch(logout()).unwrap()
  }

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={(e) => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name fw-bold'>{firstName + ' ' + lastName || ''}</span>
          <span className='user-status'>{<p className='roleContainer'> {panelTypeTitle}</p>}</span>
        </div>
        <Avatar img={defaultAvatar} imgHeight='50' imgWidth='50' />
      </DropdownToggle>
      <DropdownMenu end>
        {panelTypeTitle === 'SuperAdmin' ? (
          <DropdownItem tag='span' onClick={() => navigate('./controlPanel')}>
            <Settings size={14} className='me-75' />
            <span className='align-middle'>پنل مدیریت</span>
          </DropdownItem>
        ) : (
          ''
        )}

        <DropdownItem tag='span' onClick={() => handleLogout()}>
          <Power size={14} className='me-75' />
          <span className='align-middle'>خروج</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}
