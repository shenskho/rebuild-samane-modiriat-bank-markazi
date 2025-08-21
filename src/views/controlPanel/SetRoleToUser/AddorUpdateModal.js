import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap'
import { ReadRoles, AddRoleToUser, ReadUserRole } from '@store/slices/controlPanel'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import toast from 'react-hot-toast'
import ToastContent from '@src/components/theme/toast/SimpleToastContent'
export default function modal({ IsEditModal, SetIsEditModal, item }) {
  const store = useSelector((state) => state.controlPanel)

  const [Roles, SetRoles] = useState(null)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(ReadRoles()).then(() => {})


  }, [])
  const toggle = (row) => {
    SetIsEditModal(!IsEditModal)
  }
  const CheskInput = (e) => {

    SetRoles(e)
  }

  const AddReportToRole = () => {
    if (Roles !== null) {

      let RoleNames = []

      Roles.forEach((item) => {
        RoleNames.push(item.label)
      })

      dispatch(
        AddRoleToUser({
          'userName': item.userName,
          'roleNames': RoleNames
        })
      ).then(() => {
        toggle()
      })
    } else {
      toast((t) => <ToastContent t={t} message={' گروه را اتنخاب کنید'} />, {
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
      <ModalHeader toggle={toggle}> تخصیص گروه به کاربر </ModalHeader>

      <ModalBody>
        <Label> {`نام کاربری : ${item?.userName}`}</Label>
        <br />
        <Label>گروه های مورد نظر را انتخاب کنید</Label>
        <Select
          options={store.Roles.list?.map((item) => ({
            value: item.id,
            label: item.name
          }))}
          isMulti={true}
          defaultValue={store.userRoles.items?.map((item) => ({
            value: item.roleName,
            label: item.roleName
          }))}
          placeholder='  انتخاب گروه ... '
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
