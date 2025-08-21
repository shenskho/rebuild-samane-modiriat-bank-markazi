import React from 'react'
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap'
import NotifItem from './notifItem'

export default function index() {
  return (
    <Card>
      <CardHeader>
        <h4>اعلان ها</h4>
      </CardHeader>
      <CardBody>
        <Row>
          <NotifItem    />
          <NotifItem />
          <NotifItem />
          <NotifItem />
        </Row>
      </CardBody>
    </Card>
  )
}
