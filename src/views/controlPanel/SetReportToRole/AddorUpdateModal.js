import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap'
import { GetAllReports, SetReportPermissionsToRole, GetReportPermissionsOfRole } from '@store/slices/controlPanel'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import toast from 'react-hot-toast'
import ToastContent from '@src/components/theme/toast/SimpleToastContent'
export default function modal({ IsEditModal, SetIsEditModal, item }) {
  const store = useSelector((state) => state.controlPanel)

  const [Reports, SetReports] = useState(null)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(GetAllReports()).then(() => {
   
    })
  }, [])
  const toggle = (row) => {
    SetIsEditModal(!IsEditModal)
  }
  const CheskInput = (e) => {

    SetReports(e)
  }

  const AddReportToRole = () => {
    if (Reports !== null) {
      let  ReportsIds = []

      Reports.forEach((item) => {
        ReportsIds.push(item.value);
      });

      dispatch(
        SetReportPermissionsToRole({
          "roleId": item.id,
          "reportIds": ReportsIds
        })
      ).then(() => {toggle()})
    } else {
      toast((t) => <ToastContent t={t} message={'نوع نقش را اتنخاب کنید'} />, {
        duration: 5000,
        style: {
          background: 'var(--bs-danger)',
          color: 'var(--bs-white)'
        }
      })
    }
  }

  return (
    <Modal size='lg' isOpen={IsEditModal} toggle={toggle}>
      <ModalHeader toggle={toggle}> تخصیص گزارش به گروه </ModalHeader>

      <ModalBody>
        <Label> {`نام گروه : ${item?.name}`}</Label>
        <br />
        <Label>گزارش های مورد نظر را انتخاب کنید</Label>
        <Select
          options={store.Reports?.map((item) => ({
            value: item.id,
            label: item.title
          }))}
          isMulti={true}
          defaultValue={store.RoleReports.items?.map((item) => ({
            value: item.reportId,
            label: item.reportTitle
          }))}
          placeholder='  انتخاب گزارش ... '
          onChange={(e) => CheskInput(e)}
        />
      </ModalBody>

      <ModalFooter>
        <Button color='danger' onClick={toggle}>
          بستن
        </Button>
        <Button color='primary' onClick={AddReportToRole}>
          ثبت
        </Button>
      </ModalFooter>
    </Modal>
  )
}
