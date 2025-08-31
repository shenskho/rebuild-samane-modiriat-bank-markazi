import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup, Form } from 'reactstrap'
import { tuple } from 'yup'
import { CreateCategory, GetAllCategory } from '@store/slices/Category'
import { useDispatch } from 'react-redux'
export default function modal({ IsAddModal, SetIsAddModal }) {
  const [CategoryName, SetCategoryName] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [organizationId, setOrganizationId] = useState(0)
  const [Invalid, SetInvalid] = useState(false)
  const dispatch = useDispatch()
  const toggle = (row) => {
    SetIsAddModal(!IsAddModal)
  }
  const CheskInput = (e) => {
    if (e.target.value.trim() === '') {
      SetInvalid(true)
      SetCategoryName('')
    } else {
      SetInvalid(false)
      SetCategoryName(e.target.value)
    }
  }
  const AddCategory = () => {
    if (CategoryName !== '') {

      dispatch(
        CreateCategory({
          'title': CategoryName,
          'isPublic': isPublic,
          'organizationId': organizationId
        })
      ).then((response) => {
        dispatch(GetAllCategory())
         toggle()
      })
    } else {
      SetInvalid(true)
    }
  }

  return (
    <Modal size='lg' isOpen={IsAddModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>اضافه کردن دسته بندی اصلی</ModalHeader>

      <ModalBody>
        <Form>
          <FormGroup>
            <Label>عنوان دسته بندی را وارد کنید</Label>
            <Input invalid={Invalid} placeholder=' ' onChange={(e) => CheskInput(e)} />
          </FormGroup>
          
          <FormGroup>
            <Label>شناسه سازمان</Label>
            <Input 
              type="number" 
              placeholder="شناسه سازمان را وارد کنید" 
              value={organizationId}
              onChange={(e) => setOrganizationId(parseInt(e.target.value) || 0)}
            />
          </FormGroup>
          
          <FormGroup check>
            <Label check>
              <Input 
                type="checkbox" 
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
              />
              {' '}عمومی
            </Label>
          </FormGroup>
        </Form>
      </ModalBody>

      <ModalFooter>
        <Button color='danger' onClick={toggle}>
          بستن
        </Button>
        <Button color='primary' onClick={AddCategory}>
          ثبت
        </Button>
      </ModalFooter>
    </Modal>
  )
}
