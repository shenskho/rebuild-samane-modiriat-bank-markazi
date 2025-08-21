import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export default async function Alert({
  icon = 'warning',
  title = 'توجه!',
  text = 'آیا از انجام این عملیات اطمینان دارید؟',
  showCancelButton = true,
  cancelButtonText = 'خیر',
  confirmButtonText = 'بله',
  reverseButtons = true,
  buttonsStyling = false,
  cancelButtonCss = 'btn btn-outline-danger',
  confirmButtonCss = 'btn btn-danger ms-1'
}) {
  return MySwal.fire({
    icon,
    iconColor: 'var(--bs-danger)',
    color: 'var(--bs-danger)',
    title,
    text,
    showCancelButton,
    cancelButtonText,
    confirmButtonText,
    reverseButtons,
    buttonsStyling,
    customClass: {
      cancelButton: cancelButtonCss,
      confirmButton: confirmButtonCss
    }
  })
}
