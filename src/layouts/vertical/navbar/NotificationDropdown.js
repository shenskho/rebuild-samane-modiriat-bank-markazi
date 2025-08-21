import { Fragment } from 'react'
import { Button, Badge, DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown } from 'reactstrap'
import PerfectScrollbar from 'react-perfect-scrollbar'
import classnames from 'classnames'
import { Bell, AlertTriangle } from 'react-feather'
import Avatar from '@core/components/avatar'

export default function NotificationDropdown() {
  const notificationsArray = []
  // const notificationsArray = [
  //   {
  //     avatarIcon: <AlertTriangle size={14} />,
  //     color: 'light-primary',
  //     title: (
  //       <p className='media-heading'>
  //         <span className='fw-bolder'>اعلام رفع تخلف</span>
  //       </p>
  //     ),
  //     subtitle: (
  //       <>
  //         <span>اعلام رفع تخلف کسب‌و‌کار </span>
  //         <span>amircliper.ir</span>
  //       </>
  //     )
  //   },
  //   {
  //     avatarIcon: <AlertTriangle size={14} />,
  //     color: 'light-primary',
  //     title: (
  //       <p className='media-heading'>
  //         <span className='fw-bolder'>عدم پذیرش تخلف</span>
  //       </p>
  //     ),
  //     subtitle: (
  //       <>
  //         <span>عدم پذیرش تخلف کسب‌و‌کار </span>
  //         <span>alirezakafi.ir</span>
  //       </>
  //     )
  //   }
  // ]

  /*eslint-disable */
  const renderNotificationItems = () => {
    if (notificationsArray.length > 0) {
      return (
        <PerfectScrollbar
          component='li'
          className='media-list scrollable-container'
          options={{
            wheelPropagation: false
          }}
        >
          {notificationsArray.map((item, index) => {
            return (
              <a
                key={index}
                className='d-flex'
                href={item.switch ? '#' : '/'}
                onClick={(e) => {
                  if (!item.switch) {
                    e.preventDefault()
                  }
                }}
              >
                <div
                  className={classnames('list-item d-flex', {
                    'align-items-start': !item.switch,
                    'align-items-center': item.switch
                  })}
                >
                  {!item.switch ? (
                    <Fragment>
                      <div className='me-1'>
                        <Avatar
                          {...(item.img
                            ? { img: item.img, imgHeight: 32, imgWidth: 32 }
                            : item.avatarContent
                            ? {
                                content: item.avatarContent,
                                color: item.color
                              }
                            : item.avatarIcon
                            ? {
                                icon: item.avatarIcon,
                                color: item.color
                              }
                            : null)}
                        />
                      </div>
                      <div className='list-item-body flex-grow-1'>
                        {item.title}
                        <small className='notification-text'>{item.subtitle}</small>
                      </div>
                    </Fragment>
                  ) : (
                    <Fragment>
                      {item.title}
                      {item.switch}
                    </Fragment>
                  )}
                </div>
              </a>
            )
          })}
        </PerfectScrollbar>
      )
    }

    return <div className='text-center m-5'>در حال حاضر اعلانی برای شما وجود ندارد.</div>
  }
  /*eslint-enable */

  return (
    <UncontrolledDropdown tag='li' className='dropdown-notification nav-item me-25'>
      <DropdownToggle tag='a' className='nav-link' href='/' onClick={(e) => e.preventDefault()}>
        <Bell size={21} />
        <Badge pill color='danger' className='badge-up'>
          {notificationsArray.length}
        </Badge>
      </DropdownToggle>
      <DropdownMenu tag='ul' className='dropdown-menu-media mt-0'>
        <li className='dropdown-menu-header'>
          <DropdownItem className='d-flex' tag='div' header>
            <h4 className='notification-title mb-0 me-auto'>اعلان‌ها</h4>
            <Badge tag='div' color='light-primary' pill>
              {`${notificationsArray.length} اعلان جدید`}
            </Badge>
          </DropdownItem>
        </li>
        {renderNotificationItems()}
        {notificationsArray.length > 0 && (
          <li className='dropdown-menu-footer'>
            <Button color='primary' block>
              همه اعلان‌ها خوانده شود
            </Button>
          </li>
        )}
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}
