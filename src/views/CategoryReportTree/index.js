import React, { useEffect, useState } from 'react'
import { Card, Container, Input, Spinner } from 'reactstrap'
import { GetAllCategory } from '@store/slices/Category'
import { useDispatch, useSelector } from 'react-redux'
import '@assets/css/reportTree.css'
import { ChevronLeft, FileText } from 'react-feather'
import { useNavigate } from 'react-router-dom'

const TreeView = ({ data, searchTerm }) => {
  const navigate = useNavigate()
  const [expandedItems, setExpandedItems] = useState({})

  const toggleItem = (itemId) => {
    setExpandedItems((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId]
    }))
  }

  const renderTree = (items) => {
    return (
      <ul className='ul-custom'>
        {items.map((item) => (
          <li key={item.id} className='li-custom'>
            <span
              className={` tree-item ${item.children.length > 0 ? 'has-children' : ''}`}
              onClick={() => toggleItem(item.id)}
            >
              {item.children.length == 0 ? (
                ''
              ) : (
                <ChevronLeft size={20} className={`tree-arrow  ${expandedItems[item.id] ? 'expanded' : ''}`} />
              )}

              {item.children.length == 0 ? (
                <span className='tree-title-items' onClick={() => navigate('/Reports', { state: item })}>
                  {' '}
                  <strong className='item-child-dash'>
                    <FileText strokeWidth={2} size={20} />
                  </strong>{' '}
                  {` ${item.title}`}
                </span>
              ) : (
                <strong className='tree-title-items'> {`${item.title}`}</strong>
              )}
              {/* <strong className='tree-title-items'> {`${item.children.length == 0 ? '-' : ''} ${item.title}`}</strong> */}
            </span>
            {expandedItems[item.id] && item.children.length > 0 && renderTree(item.children)}
          </li>
        ))}
      </ul>
    )
  }

  // Filter data based on search term
  const filteredData = data.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return <div>{renderTree(filteredData)}</div>
}

const ReportTree = () => {
  const store = useSelector((state) => state.Category)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(GetAllCategory()).then((response) => {
      if (response.payload.length > 0) {
        SetIsloading(false)
      }

    }, [])
  }, [])
  const [Isloading, SetIsloading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <Container className='mt-5'>
      <Card className='p-3'>
        <div>
          <Input
            className='mt-1 w-100'
            type='text'
            placeholder='جستجو...'
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className='tree-container'>
            {Isloading === true ? (
              <div className='d-flex justify-content-center mt-4 mb-4'>
                <Spinner color='primary'>لطفا صبر کنید..</Spinner>
              </div>
            ) : (
              <TreeView data={store.categories.filter((item) => !item.parentId)} searchTerm={searchTerm} />
            )}
          </div>
        </div>
      </Card>
    </Container>
  )
}

export default ReportTree
