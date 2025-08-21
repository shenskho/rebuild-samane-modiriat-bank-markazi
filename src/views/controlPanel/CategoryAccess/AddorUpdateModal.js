import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap'
import { GetReportPermissionsToCategory, SetReportPermissionsToCategory, GetAllCategory } from '@store/slices/controlPanel'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import toast from 'react-hot-toast'
import ToastContent from '@src/components/theme/toast/SimpleToastContent'

export default function EditModal({ IsEditModal, SetIsEditModal, item }) {
  const store = useSelector((state) => state.controlPanel)
  const [Roles, SetRoles] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if ( item?.userId) {
      dispatch(GetReportPermissionsToCategory("?UserId=" + item.userId))
    }

      dispatch(GetAllCategory())
    
  }, [IsEditModal, dispatch, item?.userId])

  const toggle = () => {
    SetIsEditModal(!IsEditModal)
  }

  const checkInput = (e) => {
    SetRoles(e)
  }

  const addReportToRole = () => {
    if (Roles !== null) {
      const roleIds = Roles.map(role => role.value)
      dispatch(
        SetReportPermissionsToCategory({
          "userId": item.userId,
          "categoryIds": roleIds
        })
      ).then(() => {
        toggle()
      })
    } else {
      toast((t) => <ToastContent t={t} message={'لطفاً یک دسته بندی  را انتخاب کنید'} />, {
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
      <ModalHeader toggle={toggle}>تخصیص دسته بندی به کاربر</ModalHeader>
      <ModalBody>
        <Label>نام کاربری: {item?.userName}</Label>
        <br />
        <Label>دسته بندی های مورد نظر را انتخاب کنید</Label>

        <Select
          options={store.categorys?.map((item) => ({
            value: item.id,
            label: item.title
          }))}
          isMulti={true}
          defaultValue={store.userCategorys.items?.map((item) => ({
            value: item.categoryId,
            label: item.categoryTitle
          }))}
          placeholder='انتخاب دسته بندی...'
          onChange={checkInput}
        />
        
      </ModalBody>
      <ModalFooter>
        <Button color='danger' onClick={toggle}>
          بستن
        </Button>
        <Button color='primary' onClick={addReportToRole}>
          ثبت
        </Button>
      </ModalFooter>
    </Modal>
  )
}
