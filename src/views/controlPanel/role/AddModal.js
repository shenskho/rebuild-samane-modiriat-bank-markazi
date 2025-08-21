import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap'
import { ReadTypes,SetUserPanelType,ReadUsers } from '@store/slices/controlPanel'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import toast from 'react-hot-toast'
import ToastContent from '@src/components/theme/toast/SimpleToastContent'

export default function modal({ IsAddModal, SetIsAddModal, item }) {
  const store = useSelector((state) => state.controlPanel)

  const [PanelType, SetPanelType] = useState(null)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(ReadTypes())
  }, [])
  const toggle = (row) => {
    SetIsAddModal(!IsAddModal)
  }
  const CheskInput = (e) => {

    SetPanelType(e)

  }

  const AddPanelType = () => {
     if(PanelType !== null)
      {
     
          dispatch(SetUserPanelType({
            "userName": item.userName,
            "panelTypeId": PanelType.value
          })).then(() => {
            dispatch(ReadUsers({})).then(()=>{
              SetIsAddModal(!IsAddModal)  
            })
  
          })
      } else{
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
    <Modal size='lg' isOpen={IsAddModal} toggle={toggle}>
      <ModalHeader toggle={toggle}> تعیین نقش (نوع پنل) </ModalHeader>

      <ModalBody>
        <Label> {`نام کاربری : ${item?.userName}`}</Label>
        <br />
        <Label>نوع نقش را انتخاب کنید.</Label>
        <Select

          options={store.Types.items?.map((item) => ({
            value: item.id,
            label: item.title
          }))}
          placeholder="انتخاب نقش..."
          onChange={(e) => CheskInput(e)}
        />
      </ModalBody>

      <ModalFooter>
        <Button color='danger' onClick={toggle}>
          بستن
        </Button>
        <Button color='primary' onClick={AddPanelType}>
          ثبت
        </Button>
      </ModalFooter>
    </Modal>
  )
}
