import { Card, CardHeader, Col, Row } from 'reactstrap'
import role from '@assets/images/icons/controlPanel/role.png'
import adduser from '@assets/images/icons/controlPanel/adduser.png'
import AccessControl from '@assets/images/icons/controlPanel/access-control.png'

import { useNavigate } from 'react-router-dom'
export default function index() {
  const navigate = useNavigate()

  return (
    <Row>
      <Col lg={4}>
        <Card style={{ backgroundColor: '#43aa8b' }} className='panel-card' onClick={() => navigate('/user')}>
          <CardHeader className='d-flex justify-content-between'>
            <h4 className='panel-title'>ثبت نام</h4>
            <img src={adduser} width={60} height={60} />
          </CardHeader>
        </Card>
      </Col>
{/* 
      <Col lg={4}>
        <Card style={{ backgroundColor: '#f9844a' }} className='panel-card' onClick={() => navigate('/role')}>
          <CardHeader className='d-flex justify-content-between '>
            <h4 className='panel-title'>تعیین نقش</h4>
            <img src={role} width={60} height={60} />
          </CardHeader>
        </Card>
      </Col>

      <Col lg={4}>
        <Card style={{ backgroundColor: '#4aa8f9' }} className='panel-card' onClick={() => navigate('/Access')}>
          <CardHeader className='d-flex justify-content-between '>
            <h4 className='panel-title'>تعریف دسترسی </h4>
            <img src={role} width={60} height={60} />
          </CardHeader>
        </Card>
      </Col>
      <Col lg={4}>
        <Card style={{ backgroundColor: '#4aa8f9' }} className='panel-card' onClick={() => navigate('/SetReportToRole')}>
          <CardHeader className='d-flex justify-content-between '>
            <h4 className='panel-title'>تخصیص دسترسی به گزارش  </h4>
            <img src={role} width={60} height={60} />
          </CardHeader>
        </Card>
      </Col>
      <Col lg={4}>
        <Card style={{ backgroundColor: '#4a57f9' }} className='panel-card' onClick={() => navigate('/SetRoleToUser')}>
          <CardHeader className='d-flex justify-content-between '>
            <h4 className='panel-title'> تخصیص گروه دسترسی به کاربر</h4>
            <img src={role} width={60} height={60} />
          </CardHeader>
        </Card>
      </Col>
      <Col lg={4}>
        <Card style={{ backgroundColor: '#4a57f9' }} className='panel-card' onClick={() => navigate('/SetRoleToUser')}>
          <CardHeader className='d-flex justify-content-between '>
            <h4 className='panel-title'> تخصیص گروه دسترسی به کاربر</h4>
            <img src={AccessControl} width={60} height={60} />
          </CardHeader>
        </Card>
      </Col> */}
    </Row>
  )
}
