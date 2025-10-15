import pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts' // <-- اینجا تغییر کرد

import VazirmatnNormal from '../../assets/fonts/vazirmatn/Vazirmatn-Medium.ttf'
import VazirmatnBold from '../../assets/fonts/vazirmatn/Vazirmatn-Bold.ttf'

async function loadFonts() {
  const normalRes = await fetch(VazirmatnNormal)
  const normalBlob = await normalRes.arrayBuffer()
  const boldRes = await fetch(VazirmatnBold)
  const boldBlob = await boldRes.arrayBuffer()

  const base64 = (buffer) =>
    btoa(
      new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
    )

  pdfMake.vfs = {
    ...pdfFonts.pdfMake?.vfs, // <-- اصلاح شد
    'Vazirmatn-RD-UI.ttf': base64(normalBlob),
    'Vazirmatn-RD-UI-Bold.ttf': base64(boldBlob)
  }

  pdfMake.fonts = {
    Vazirmatn: {
      normal: 'Vazirmatn-RD-UI.ttf',
      bold: 'Vazirmatn-RD-UI-Bold.ttf',
      italics: 'Vazirmatn-RD-UI.ttf',
      bolditalics: 'Vazirmatn-RD-UI-Bold.ttf'
    }
  }
}

export default loadFonts
