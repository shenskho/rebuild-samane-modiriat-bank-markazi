import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import '@core/scss/base/pages/page-misc.scss'

export default function Error() {
  return (
    <div className='misc-wrapper'>
      <div className='misc-inner p-2 p-sm-3'>
        <div className='w-100 text-center'>
          <h2 className='mb-1'>404</h2>
          <p className='mb-2'>صفحه مورد نظر یافت نشد</p>
          <Button tag={Link} to='/' color='primary' className='btn-sm-block mb-2'>
            صفحه اصلی
          </Button>
        </div>
      </div>
    </div>
  )
}
