import { Link } from 'react-router-dom'
import { Card, CardBody, CardFooter } from 'reactstrap'
import themeConfig from '@configs/themeConfig'
import '@core/scss/react/pages/page-authentication.scss'
import { useDispatch } from 'react-redux'
import { SignInWithsso } from '@store/slices/authentication'
import { useEffect } from 'react'

export default function Login() {
  const dispatch = useDispatch()

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search)

    if (queryParameters.get('ssokey') !== null) {
      queryParameters.get('ssokey')
      dispatch(
        SignInWithsso({
          'ssokey': queryParameters.get('ssokey')
        })
      ).unwrap()
    }
  }, [])
  return (
    <div className='auth-wrapper auth-basic px-2'>
      <div className='auth-inner my-2'>
        <Card className='mb-2'>
          <CardBody className='text-center'>
            <Link className='brand-logo' to='/' onClick={(e) => e.preventDefault()}>
              <img src={themeConfig.app.appLogoImage} className='w-50' alt={themeConfig.app.appName} />
            </Link>
            <a href='http://situs.sazehgostar.com/'>
              <h5 style={{ cursor: 'pointer', color: '#1724b3' }}>ورورد از پنجره واحد(سیتوس) </h5>
            </a>
          </CardBody>
          <CardFooter className='text-center'>
            <span>{`نسخه ${import.meta.env.VITE_APP_VERSION}`}</span>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
