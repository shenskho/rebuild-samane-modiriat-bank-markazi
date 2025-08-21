import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Input, Row, Spinner } from 'reactstrap'
import { GetAllCategory } from '@store/slices/Category'
import { useDispatch, useSelector } from 'react-redux'
import '@assets/css/reportTree.css'
import { ChevronLeft, Edit2, Eye, FileText, PlusCircle, Trash } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import AddModal from './AddModal'
import RemoveModal from './RemoveModal'
import EditModal from './EditModal'
import AddTreeNodeModal from './AddTreeNodeModal'
const TreeView = ({ data, searchTerm, handeleRemove, handeleEdit, handeleAddNode }) => {
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
                <span className='tree-title-items'>
                  {' '}
                  <span onClick={() => navigate('/ReportList', { state: item })}>
                    <strong className='item-child-dash'>
                      <FileText strokeWidth={2} size={20} />
                    </strong>{' '}
                    {`${item.title}  `}
                  </span>{' '}
                  <PlusCircle
                    onClick={() => handeleAddNode(item)}
                    id='addTooltip'
                    size={13}
                    className='button-tree-add'
                  />
                  {` `}
                  <Edit2 onClick={() => handeleEdit(item)} id='editToolTip' size={13} className='button-tree-edit' />
                  {` `}
                  <Trash
                    onClick={() => handeleRemove(item)}
                    id='removeToolTip'
                    size={13}
                    className='button-tree-remove'
                  />
                </span>
              ) : (
                <strong className='tree-title-items'>
                  {' '}
                  {`${item.title}`}
                  {` `}
                  <PlusCircle
                    onClick={() => handeleAddNode(item)}
                    id='addTooltip'
                    size={13}
                    className='button-tree-add'
                  />
                  {` `}
                  <Edit2 onClick={() => handeleEdit(item)} id='editToolTip' size={13} className='button-tree-edit' />
                  {` `}
                  <Trash
                    onClick={() => handeleRemove(item)}
                    id='removeToolTip'
                    size={13}
                    className='button-tree-remove'
                  />
                </strong>
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
  const navigate = useNavigate()
  const store = useSelector((state) => state.Category)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(GetAllCategory()).then((response) => {
      if (response.payload.length > 0) {
        SetIsloading(false)
      }
    }, [])
  }, [])

  const [searchTerm, setSearchTerm] = useState('')
  const [Isloading, SetIsloading] = useState(false)
  const [IsAddModal, SetIsAddModal] = useState(false)
  const [IsRemoveModal, SetIsRemoveModal] = useState(false)
  const [IsEditModal, SetIsEditModal] = useState(false)
  const [IsAddNodeModal, SetIsAddNodeModal] = useState(false)

  const [treeNode, SetTreeNode] = useState()
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }
  const handeleRemove = (item) => {
    SetIsRemoveModal(!IsRemoveModal)
    SetTreeNode(item)
  }
  const handeleEdit = (item) => {
    SetIsEditModal(!IsEditModal)
    SetTreeNode(item)
  }
  const handeleAddNode = (item) => {
    SetIsAddNodeModal(!IsAddNodeModal)
    SetTreeNode(item)
  }

  return (
    <Container className='mt-5'>
      <Card className='p-3'>
        <Row>
          <Col lg={9}>
            <div>
              <h3> دسته بندی گزارشات</h3>
              <Input
                className='mt-2 w-50'
                type='text'
                placeholder='جستجو...'
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </Col>
          <Col lg={3} className='d-flex justify-content-end align-items-center'>
            <Button color='success' onClick={() => SetIsAddModal(!IsAddModal)}>
              {' '}
              دسته بندی جدید (اصلی) <PlusCircle size={25} color='#fff' />{' '}
            </Button>
          </Col>
          <Col lg={12}>
            <div className='tree-container'>
              {Isloading === true ? (
                <div className='d-flex justify-content-center mt-4 mb-4'>
                  <Spinner color='primary'>لطفا صبر کنید..</Spinner>
                </div>
              ) : (
                <TreeView
                  data={store.categories.filter((item) => !item.parentId)}
                  searchTerm={searchTerm}
                  SetTreeNode={SetTreeNode}
                  handeleRemove={handeleRemove}
                  handeleEdit={handeleEdit}
                  handeleAddNode={handeleAddNode}
                />
              )}
            </div>
          </Col>
        </Row>
      </Card>

      <AddModal SetIsAddModal={SetIsAddModal} IsAddModal={IsAddModal} />
      <EditModal SetIsEditModal={SetIsEditModal} IsEditModal={IsEditModal} treeNode={treeNode} />
      <RemoveModal SetIsRemoveModal={SetIsRemoveModal} IsRemoveModal={IsRemoveModal} treeNode={treeNode} />
      <AddTreeNodeModal SetIsAddNodeModal={SetIsAddNodeModal} IsAddNodeModal={IsAddNodeModal} treeNode={treeNode} />
    </Container>
  )
}

export default ReportTree
