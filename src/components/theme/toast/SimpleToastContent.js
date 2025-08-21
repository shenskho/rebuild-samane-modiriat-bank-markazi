const SimpleToastContent = ({ message }) => {
  return (
    <div className='d-flex'>
      <div className='d-flex flex-column'>
        <div className='d-flex justify-content-between'>
          <p className='m-0'>{message}</p>
        </div>
      </div>
    </div>
  )
}

export default SimpleToastContent
