// import { useEffect } from 'react'
// import { useSearchParams } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import { getExternalLoginLink } from '@store/slices/authentication'

// export default function ExternalLogin() {
//   const [searchParams] = useSearchParams()

//   const dispatch = useDispatch()

//   useEffect(() => {
//     ;(async function () {
//       const nationalCode = searchParams.get('nationalCode')
//       if (nationalCode && nationalCode.length === 10) {
//         try {
//           const { hasError, result } = await dispatch(getExternalLoginLink({ nationalCode })).unwrap()
//           if (!hasError) {
//             const { RegisterLink } = result
//             if (RegisterLink && RegisterLink.length > 0) {
//               window.location.replace(RegisterLink)
//             }
//           }
//         } catch (rejectedValueOrSerializedError) {
//           setTimeout(() => {
//             window.location.reload()
//           }, 1000)
//         }
//       }
//     })()
//   }, [])
// }
