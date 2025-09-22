export default function Footer() {
  return (
    <p className='clearfix mb-0 footer-container' >
      <span className='float-md-start d-block d-md-inline-block mt-25'>
        © کلیه حقوق این سامانه متعلق به شرکت تعاونی پژوهشگران رایانگان می باشد.{' '}
        <span className='d-none d-sm-inline-block'>{`نسخه ${import.meta.env.VITE_APP_VERSION}`}</span>
      </span>
    </p>
  )
}
