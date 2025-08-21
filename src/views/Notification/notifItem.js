import React, { useState } from 'react'
import { Col } from 'reactstrap'
import Modal from './modal'
export default function notifItem() {
  const [Ismodal, SetIsmodal] = useState(false)
  const toggle = (row) => {
    SetIsmodal(!Ismodal)
  }
  return (
    <Col lg={12}>
      <h5 style={{lineHeight:'1.3rem'}} className='h-390 panel-box' onClick={() => toggle()}>
      <div className='d-flex justify-content-between'>
          <h6>{`موضوع: عمومی`}</h6>
          <h6 className='text-gray'>تاریخ : 28/03/1402</h6>
        </div>

        <div></div>
     
      متن تستی میباشد و فقط برای تست اعلانات نوشته شده است       متن تستی میباشد و فقط برای تست اعلانات نوشته شده است       متن تستی میباشد و فقط برای تست اعلان      متن تستی میباشد و فقط برای تست اعلانات نوشته شده است 
      متن تستی میباشد و فقط برای تست اعلانات نوشته شده است 


      </h5>
      <Modal
        date={'     تاریخ :  28/03/1402'}
        SetIsmodal={SetIsmodal}
        Ismodal={Ismodal}
        title={
          'متن تستی میباشد و فقط برای تست اعلانات نوشته شده است '
        }
        subject={'عمومی'}
      />
    </Col>
  )
}
