import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Row } from 'reactstrap'
import { GetTickets, AnswareTicket, TakeTicket, ReadFile, GetUseretTicket } from '@store/slices/operator'
import { useDispatch } from 'react-redux'
import UserEditModal from './EditUser'
import { MdSupport, MdSupportAgent } from 'react-icons/md'
import { Download } from 'react-feather'

export default function EditModal({ IsEditModal, SetIsEditModal, item }) {
  const [titleName, setTitleName] = useState('')
  const [Invalid, SetInvalid] = useState(false)
  const [isUserEditModal, setIsUserEditModal] = useState(false) // 👈 state برای مودال دوم
  const [userInfo, setUserInfo] = useState(null)
  const [isAccept, SetisAcceptd] = useState(true)
  const [operatorName, setOperatorName] = useState(item?.operatorUserFullname || '')
  const dispatch = useDispatch()

  const toggle = () => {
    SetIsEditModal(!IsEditModal)
    if (IsEditModal) {
      setTitleName('')
      SetInvalid(false)
      SetisAcceptd(true)
    }
  }

  const toggleUserEdit = () => {
    dispatch(GetUseretTicket(item.applicantId)).then((response) => {
      setIsUserEditModal(!isUserEditModal)
      //
      console.log(response.payload.item)
      setUserInfo(response.payload.item)
    })
    // setIsUserEditModal(!isUserEditModal)
  } // 👈 تابع برای مودال دوم

  const CheskInput = (e) => {
    if (e.target.value.trim() === '') {
      SetInvalid(true)
      setTitleName('')
    } else {
      SetInvalid(false)
      setTitleName(e.target.value)
    }
  }

  const AddCategory = () => {
    if (titleName !== '') {
      dispatch(
        AnswareTicket({
          ticketId: item.id,
          answerDescription: titleName
        })
      ).then(() => {
        dispatch(GetTickets())
        toggle()
      })
    } else {
      SetInvalid(true)
    }
  }

  useEffect(() => {
    if (item) {
      setTitleName(item.answerDescription || '')
      setOperatorName(item.operatorUserFullname || '')
      if (item.operatorUserId !== null) {
        SetisAcceptd(false)
      } else {
        SetisAcceptd(true)
      }
    }
  }, [item])

  const handeleAcceptRequest = () => {
    dispatch(TakeTicket({ ticketId: item.id })).then((response) => {
      if (response.payload) {
        SetisAcceptd(false)

        setOperatorName(`${localStorage.getItem('firstName')} - ${localStorage.getItem('lastName')}  `)
        dispatch(GetTickets())
      }
    })
  }

  const handleDownload = () => {
    dispatch(ReadFile(item.attachFileId)).then((reposonse) => {
      const link = document.createElement('a')
      link.href = `data:image/png;base64,${reposonse.payload.result.item.content}`
      link.download = 'downloaded-image.png'
      link.click()
    })
  }

  return (
    <>
      {/* مودال اول */}
      <Modal size='lg' isOpen={IsEditModal} toggle={toggle}>
        <ModalHeader toggle={toggle}>پاسخ به تیکت</ModalHeader>
        <ModalBody>
          <Row>
            {isAccept ? (
              <Button color='primary' onClick={handeleAcceptRequest}>
                شروع پشتیبانی
              </Button>
            ) : (
              <h5 className='main-color'>
                <MdSupportAgent size={30} color='#04364a' />
                {`پشتیبان : ${operatorName}`}
              </h5>
            )}
          </Row> 

          <h5 className='mt-2'>متن درخواست</h5>
          <p className='p-1 request-text rounded'>{item.applicantDescription}</p>
          <p className='download-text' onClick={handleDownload}>
            دانلود فایل
            <Download size={20} className='ml-05' />
          </p>
          <Label>پاسخ به تیکت </Label>
          
          <Input
            value={titleName}
            type='textarea'
            disabled={isAccept}
            invalid={Invalid}
            placeholder=' '
            onChange={CheskInput}
          />
        </ModalBody>

    {/* <Button color='success' className='m-2' onClick={toggleUserEdit}>
          ویرایش اطلاعات کاربری
        </Button>  */}

        <ModalFooter>
          <Button color='danger' onClick={toggle}>
            بستن
          </Button>
          <Button color='primary' onClick={AddCategory}>
            ثبت
          </Button>
        </ModalFooter>
      </Modal>

      <UserEditModal isOpen={isUserEditModal} toggle={toggleUserEdit} TicketID={item.id} userInfo={userInfo} />
    </>
  )
}
