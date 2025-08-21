import { forwardRef, useState, useEffect, useMemo } from 'react'
import { TreeList, FilterRow, Selection, Column } from 'devextreme-react/tree-list'
import PropTypes from 'prop-types'
import './DxTreeList.scss'

const DxTreeList = forwardRef((props, ref) => {
  const { id, className, data, filterRow, filterRowVisible, selection, selectionMode, disabled, ...rest } = props

  const [language, setLanguage] = useState()

  useEffect(() => {
    setLanguage(document.getElementsByTagName('html')[0].lang || 'en')
  }, [])

  const treeListTextValues = useMemo(() => {
    return {
      noData: { en: 'No data', fa: 'اطلاعاتی یافت نشد' }
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

  return (
    <TreeList
      ref={ref}
      id={id}
      className={className}
      dataStructure={data.dataStructure}
      {...(data.dataStructure === 'tree' && { itemsExpr: data.itemsExpr })}
      {...(data.dataStructure === 'plain' && { keyExpr: data.keyExpr, parentIdExpr: data.parentIdExpr })}
      dataSource={data.dataSource}
      rtlEnabled={language === 'fa'}
      columnAutoWidth={false}
      showRowLines={true}
      showColumnLines={true}
      wordWrapEnabled={true}
      showBorders={true}
      noDataText={treeListTextValues.noData[language]}
      disabled={disabled}
      {...rest}
    >
      {filterRow && (
        <FilterRow
          visible={filterRowVisible}
          operationDescriptions={filterRowTextValues.operation[language]}
          betweenStartText={filterRowTextValues.betweenStart[language]}
          betweenEndText={filterRowTextValues.betweenEnd[language]}
          resetOperationText={filterRowTextValues.reset[language]}
        />
      )}
      {selection && <Selection mode={selectionMode} />}
      {data.columns && data.columns.map((column, index) => <Column key={index} {...column} />)}
    </TreeList>
  )
})

DxTreeList.defaultProps = {
  filterRow: true,
  filterRowVisible: true,
  selection: true,
  selectionMode: 'single',
  disabled: false
}

DxTreeList.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  data: PropTypes.shape({
    dataStructure: PropTypes.oneOf(['tree', 'plain']).isRequired,
    itemsExpr: PropTypes.string,
    keyExpr: PropTypes.string,
    parentIdExpr: PropTypes.string,
    columns: PropTypes.array.isRequired,
    dataSource: PropTypes.array.isRequired
  }).isRequired,
  filterRow: PropTypes.bool,
  filterRowVisible: PropTypes.bool,
  selection: PropTypes.bool,
  selectionMode: PropTypes.oneOf(['single', 'multiple', 'none']),
  disabled: PropTypes.bool
}

export default DxTreeList
