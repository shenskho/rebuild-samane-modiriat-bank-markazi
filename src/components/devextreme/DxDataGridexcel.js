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
import { Button, Spinner } from 'reactstrap'
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
      worksheet: worksheet,
      autoFilterEnabled: true
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: 'application/octet-stream' })
        saveAs(blob, `${reportName}.xlsx`) // Use your desired file name here
      })
    })
  }


  const [language, setLanguage] = useState()

  useEffect(() => {
    setLanguage(document.getElementsByTagName('html')[0].lang || 'en')
  }, [])

  const dataGridTextValues = useMemo(() => {
    return {
      noData: { en: 'No data', fa: 'اطلاعاتی یافت نشد' }
    }
  }, [])

  const searchPanelTextValues = useMemo(() => {
    return { placeholder: { en: 'search...', fa: 'جستجو...' } }
  }, [])

  const sortingTextValues = useMemo(() => {
    return {
      ascending: { en: 'Sort Ascending', fa: 'مرتب سازی صعودی' },
      descending: { en: 'Sort Descending', fa: 'مرتب سازی نزولی' },
      clear: { en: 'Clear Sorting', fa: 'پاک کردن مرتب سازی ' }
    }
  }, [])

  const filterRowTextValues = useMemo(() => {
    return {
      operation: {
        en: {
          contains: 'Contains',
          notContains: 'Does not contain',
          startsWith: 'Starts with',
          endsWith: 'Ends with',
          equal: 'Equals',
          notEqual: 'Does Not equal',
          lessThan: 'Less than',
          greaterThan: 'Greater than',
          lessThanOrEqual: 'Less than or equal to',
          greaterThanOrEqual: 'Greater than or equal to',
          between: 'Between'
        },
        fa: {
          contains: 'شامل شود',
          notContains: 'شامل نشود',
          startsWith: 'شروع با',
          endsWith: 'پایان با',
          equal: 'برابر',
          notEqual: 'نابرابر',
          lessThan: 'کوچکتر از',
          greaterThan: 'بزرگتر از',
          lessThanOrEqual: 'کوچکتر یا مساوی با',
          greaterThanOrEqual: 'بزرگتر یا مساوی با',
          between: 'بین'
        }
      },
      betweenStart: { en: 'Start', fa: 'شروع' },
      betweenEnd: { en: 'End', fa: 'پایان' },
      reset: { en: 'Reset', fa: 'ریست' }
    }
  }, [])

  const pagerTextValues = useMemo(() => {
    return {
      info: { en: 'Page {0} of {1} ({2} items)', fa: 'صفحه {0} از {1} ({2} تعداد کل)' }
    }
  }, [])

  return (
    <div>
      <div className='d-flex justify-content-end mb-1'>
       
        <Button color='success' onClick={exportToExcel} className='mt-05'>
          خروجی این صفحه (Excel)
        </Button>

      </div>

      <DataGrid
        ref={dataGridRef}
        id={id}
        className={className}
        dataSource={ data.rows}
        keyExpr={data.keyExpr}
        rtlEnabled={language === 'fa'}
        noDataText={dataGridTextValues.noData[language]}
        loadPanel={{ enabled: true }}
        width='100%'
        columnAutoWidth={true}
        columnHidingEnabled={true}
        showColumnLines={true}
        showRowLines={true}
        rowAlternationEnabled={true}
        wordWrapEnabled={true}
        showBorders={true}
        {...props}
      >
        <SearchPanel visible={searchPanel} placeholder={searchPanelTextValues.placeholder[language]} />
        <Sorting
          mode='multiple'
          ascendingText={sortingTextValues.ascending[language]}
          descendingText={sortingTextValues.descending[language]}
          clearText={sortingTextValues.clear[language]}
        />
        <FilterRow
          visible={filterRow}
          operationDescriptions={filterRowTextValues.operation[language]}
          betweenStartText={filterRowTextValues.betweenStart[language]}
          betweenEndText={filterRowTextValues.betweenEnd[language]}
          resetOperationText={filterRowTextValues.reset[language]}
        />

        <Scrolling mode='vertical' visible={true} />

        {data.columns.map((column, index) => (
          <Column key={index} {...column} />
        ))}
        {data.masterDetail && (
          <MasterDetail
            enabled={true}
            component={(e) => {
              if (data.masterDetail.component && !data.masterDetail.columns) {
                return data.masterDetail.component()
              } else if (!data.masterDetail.component && data.masterDetail.columns) {
                if (e.data.data[data.masterDetail.dataField].length > 0) {
                  return (
                    <DataGrid
                      dataSource={e.data.data[data.masterDetail.dataField]}
                      rtlEnabled={language === 'fa'}
                      noDataText={dataGridTextValues.noData[language]}
                      columnAutoWidth={true}
                      columnHidingEnabled={true}
                      showBorders={true}
                    >
                      {data.masterDetail.columns.map((column, index) => (
                        <Column key={index} {...column} />
                      ))}
                      <Scrolling mode='vertical' visible={true} />
                    </DataGrid>
                  )
                }
              }
            }}
            {...data.masterDetail}
          />
        )}
        <Paging enabled={pagination} defaultPageSize={paginationSize} />
        {pagination && (
          <Pager
            visible={pagination}
            allowedPageSizes={[5, 10, 50, 100]}
            showPageSizeSelector={true}
            showNavigationButtons={true}
            showInfo={true}
            infoText={pagerTextValues.info[language]}
          />
        )}
        {grouping && <Grouping expandMode='rowClick' />}
        {groupPanel && <GroupPanel visible={true} allowColumnDragging={false} />}
        {data.summary && (
          <Summary>
            {data.summary.groupItems.map((groupItem, index) => (
              <GroupItem key={index} {...groupItem} />
            ))}
          </Summary>
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
  grouping: PropTypes.bool,
  groupPanel: PropTypes.bool
}

DxDataGrid.defaultProps = {
  searchPanel: false,
  filterRow: true,
  pagination: true,
  paginationSize: 10,
  grouping: false,
  groupPanel: false
}
