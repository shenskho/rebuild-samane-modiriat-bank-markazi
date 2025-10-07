import { useState, useEffect, useMemo, useRef } from 'react'
import DataGrid, {
  SearchPanel,
  Sorting,
  FilterRow,
  Scrolling,
  Column,
  MasterDetail,
  Paging,
  Pager,
  Grouping,
  GroupPanel,
  Summary,
  GroupItem
} from 'devextreme-react/data-grid'
import PropTypes from 'prop-types'
import './DxDataGrid.scss'
import { Button } from 'reactstrap'
import { exportDataGrid as exportDataGridToExcel } from 'devextreme/excel_exporter'
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'

export default function DxDataGrid({
  id,
  className,
  data,
  searchPanel,
  filterRow,
  pagination,
  paginationSize,
  page, // 🔹 اضافه شد
  onPageChange, // 🔹 اضافه شد
  onPageSizeChange, // 🔹 اضافه شد
  grouping,
  groupPanel,
  reportName,
  ...props
}) {
  const dataGridRef = useRef(null)

  const exportToExcel = () => {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Main sheet')

    exportDataGridToExcel({
      component: dataGridRef.current.instance,
      worksheet,
      autoFilterEnabled: true
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: 'application/octet-stream' })
        saveAs(blob, `${reportName}.xlsx`)
      })
    })
  }

  const [language, setLanguage] = useState('fa')

  useEffect(() => {
    setLanguage(document.getElementsByTagName('html')[0].lang || 'fa')
  }, [])

  const dataGridTextValues = useMemo(
    () => ({
      noData: { en: 'No data', fa: 'اطلاعاتی یافت نشد' }
    }),
    []
  )

  const searchPanelTextValues = useMemo(() => ({ placeholder: { en: 'search...', fa: 'جستجو...' } }), [])

  const pagerTextValues = useMemo(
    () => ({
      info: { en: 'Page {0} of {1} ({2} items)', fa: 'صفحه {0} از {1} ({2} کل)' }
    }),
    []
  )

  return (
    <div>
      <div className='d-flex justify-content-end mb-1'>
        <Button color='success' onClick={exportToExcel}>
          خروجی این صفحه (Excel)
        </Button>
      </div>

      <DataGrid
        ref={dataGridRef}
        id={id}
        className={className}
        rtlEnabled={language === 'fa'}
        noDataText={dataGridTextValues.noData[language]}
        loadPanel={{ enabled: true }}
        width='100%'
        columnAutoWidth
        columnHidingEnabled
        showBorders
        keyExpr={data.keyExpr}
        dataSource={{
          store: data.rows, // داده‌های صفحه جاری
          paginate: true,
          totalCount: data.totalCount 
        }}
        {...props}
      >
        <SearchPanel visible={searchPanel} placeholder={searchPanelTextValues.placeholder[language]} />
        <FilterRow visible={filterRow} />
        <Scrolling mode='virtual' />

        {data.columns.map((column, index) => (
          <Column key={index} {...column} />
        ))}

        <Paging
          enabled={pagination}
          pageSize={paginationSize}
          pageIndex={page - 1} // DevExtreme از صفر شروع می‌کنه
          onPageIndexChange={(newIndex) => onPageChange && onPageChange(newIndex + 1)}
          onPageSizeChange={(newSize) => onPageSizeChange && onPageSizeChange(newSize)}
        />

        {pagination && (
          <Pager
            visible
            allowedPageSizes={[5, 10, 20, 50, 100]}
            showPageSizeSelector
            showNavigationButtons
            showInfo
            infoText={pagerTextValues.info[language]}
          />
        )}
      </DataGrid>
    </div>
  )
}

DxDataGrid.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  data: PropTypes.object.isRequired,
  searchPanel: PropTypes.bool,
  filterRow: PropTypes.bool,
  pagination: PropTypes.bool,
  paginationSize: PropTypes.number,
  page: PropTypes.number, // 🔹 اضافه شد
  onPageChange: PropTypes.func, // 🔹 اضافه شد
  onPageSizeChange: PropTypes.func, // 🔹 اضافه شد
  grouping: PropTypes.bool,
  groupPanel: PropTypes.bool,
  reportName: PropTypes.string
}

DxDataGrid.defaultProps = {
  searchPanel: false,
  filterRow: true,
  pagination: true,
  paginationSize: 10,
  page: 1,
  grouping: false,
  groupPanel: false
}
