import logo from '@src/assets/images/rayan/logo2.png'

const Spinner = () => {
  return (
    <div className='fallback-spinner app-loader'>
      <img className='fallback-logo w-70' style={{width:'250px'}} src={logo} alt='logo'  />
      <div className='loading'>
        <div className='effect-1 effects'></div>
        <div className='effect-2 effects'></div>
        <div className='effect-3 effects'></div>
      </div>
    </div>
  )
}

export default Spinner
