import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { getHomeRouteForLoggedInUser } from '@utility'
import '@core/scss/base/pages/page-misc.scss'

export default function NotAuthorized() {
  return (
    <div className='misc-wrapper'>
      <div className='misc-inner p-2 p-sm-3'>
        <div className='w-100 text-center'>
          <h1 className='mb-1'>401</h1>
          <p className='mb-2'>دسترسی غیر مجاز</p>
          <Button tag={Link} to={getHomeRouteForLoggedInUser()} color='primary' className='btn-sm-block mb-1'>
            صفحه اصلی
          </Button>
        </div>
      </div>
    </div>
  )
}
