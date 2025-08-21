import { useState, useEffect } from 'react'
import { ListGroup, ListGroupItem, Button } from 'reactstrap'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'
import { DownloadCloud, FileText, X } from 'react-feather'
import PropTypes from 'prop-types'

const convertBase64toBlob = (base64Data, contentType = '', sliceSize = 512) => {
  const byteCharacters = atob(base64Data)

  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  const blob = new Blob(byteArrays, { type: contentType })
  return blob
}

const convertBlobToFile = (blob, fileName) => {
  let fileType = fileName.endsWith() ? 'image/png' : 'application/pdf'
  if (
    fileName.endsWith('.png') ||
    fileName.endsWith('.jpg') ||
    fileName.endsWith('.jpeg') ||
    fileName.endsWith('.tif') ||
    fileName.endsWith('.tiff')
  ) {
    fileType = `image/${fileName.slice(fileName.indexOf('.') + 1)}`
  } else if (fileName.endsWith('.pdf')) {
    fileType = 'application/pdf'
  } else if (fileName.endsWith('.xlsx')) {
    fileType = 'application/xlsx'
  }
  return new File([blob], fileName, { type: fileType })
}

export default function DropZone({
  multiple,
  accept,
  maxFiles,
  maxSize,
  disabled,
  uploadedFiles,
  removeUploadedFile,
  handleChange,
  handleSubmit,
  isShowButtons = true
}) {
  const [files, setFiles] = useState([])
  const [serverFiles, setServerFiles] = useState([])

  useEffect(() => {
    setServerFiles(() => {
      if (uploadedFiles) {
        return uploadedFiles.map((item) => convertBlobToFile(convertBase64toBlob(item.content, 'image/png'), item.name))
      }
    })
  }, [uploadedFiles])

  useEffect(() => {
    handleChange(files)
  }, [files])

  const { getRootProps, getInputProps } = useDropzone({
    multiple,
    accept,
    maxFiles,
    maxSize: maxSize * 1000000,
    disabled,
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length) {
        toast.error('فایل انتخاب شده قابل بارگزاری نیست')
      } else {
        setFiles([...files, ...acceptedFiles.map((file) => Object.assign(file))])
      }
    }
  })

  const handleRemoveFile = (file) => {
    const selectedFiles = files
    const filtered = selectedFiles.filter((i) => i.name !== file.name)
    setFiles([...filtered])
  }

  const handleRemoveAllFiles = () => {
    setFiles([])
  }

  const handleSubmitDropZone = async () => {
    await handleSubmit()
    handleRemoveAllFiles()
  }

  const renderFilePreview = (file) => {
    if (file.type.startsWith('image')) {
      return (
        <img
          className='rounded cursor-pointer'
          src={URL.createObjectURL(file)}
          alt={file.name}
          width='30'
          height='30'
          onClick={() => {
            const w = window.open('about:blank')
            const image = new Image()
            image.src = URL.createObjectURL(file)
            setTimeout(function () {
              w.document.write(image.outerHTML)
            }, 0)
          }}
        />
      )
    } else {
      return (
        <FileText
          size='30'
          className='cursor-pointer'
          onClick={() => {
            const w = window.open('about:blank')
            w.document.write(`<iframe width="100%" height="100%" src="${URL.createObjectURL(file)}"></iframe>`)
          }}
        />
      )
    }
  }

  const renderFileSize = (size) => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
    }
  }

  const serverFileList = serverFiles.map((file) => {
    return (
      <ListGroupItem key={file.name} className='d-flex justify-content-between align-items-center bg-light-success'>
        <div className='file-details d-flex align-items-center'>
          <div className='file-preview me-1'>{renderFilePreview(file)}</div>
          <div>
            <p className='file-name mb-0'>{file.name}</p>
            <p className='file-size mb-0'>{renderFileSize(file.size)}</p>
          </div>
        </div>
        <Button color='danger' outline size='sm' className='btn-icon' onClick={() => removeUploadedFile(file)}>
          <X size={14} />
        </Button>
      </ListGroupItem>
    )
  })

  const fileList = files.map((file) => {
    return (
      <>
        <ListGroupItem key={file.name} className='d-flex justify-content-between align-items-center'>
          <div className='file-details d-flex align-items-center'>
            <div className='file-preview me-1'>{renderFilePreview(file)}</div>
            <div>
              <p className='file-name mb-0'>{file.name}</p>
              <p className='file-size mb-0'>{renderFileSize(file.size)}</p>
            </div>
          </div>
          <Button color='danger' outline size='sm' className='btn-icon' onClick={() => handleRemoveFile(file)}>
            <X size={14} />
          </Button>
        </ListGroupItem>
      </>
    )
  })

  return (
    <>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <DownloadCloud size={64} />
          <h5>افزودن فایل ضمیمه</h5>
          <p className='text-secondary'>فایل‌های خود را اینجا بکشید و یا فایل خود را با کلیک انتخاب کنید</p>
        </div>
      </div>
      {serverFiles.length ? <ListGroup className='my-2'>{serverFileList}</ListGroup> : null}
      {files.length ? (
        <>
          <hr />
          <ListGroup className='my-2'>{fileList}</ListGroup>
          {isShowButtons ? (
            <div className='d-flex justify-content-end'>
              <Button color='danger' outline className='me-1' onClick={handleRemoveAllFiles}>
                لغو همه
              </Button>
              <Button color='primary' onClick={handleSubmitDropZone}>
                بارگذاری
              </Button>
            </div>
          ) : null}
        </>
      ) : null}
    </>
  )
}

DropZone.propTypes = {
  multiple: PropTypes.bool.isRequired,
  accept: PropTypes.object.isRequired,
  maxFiles: PropTypes.number,
  maxSize: PropTypes.number,
  disabled: PropTypes.bool,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func
}
