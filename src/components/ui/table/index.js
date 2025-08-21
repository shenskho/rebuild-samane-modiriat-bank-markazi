import { useMemo } from 'react'
import { useTable, useFilters, useSortBy } from 'react-table'
import classNames from 'classnames'
import { ArrowUp, ArrowDown } from 'react-feather'
import { matchSorter } from 'match-sorter'
import { Input } from 'reactstrap'
import './index.scss'

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] })
}
fuzzyTextFilterFn.autoRemove = (val) => !val

function DefaultColumnFilterUI({ column: { filterValue, /*preFilteredRows,*/ setFilter } }) {
  // const count = preFilteredRows.length
  return (
    <Input
      className='bg-light rounded-0 border-0 shadow-none py-1'
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined)
      }}
      placeholder='جستجو...'
    />
  )
}

function useInstance(instance) {
  const { allColumns } = instance
  let rowSpanHeaders = []
  allColumns.forEach((column) => {
    const { id, enableRowSpan } = column
    if (enableRowSpan !== undefined) {
      rowSpanHeaders = [...rowSpanHeaders, { id, topCellValue: null, topCellIndex: 0 }]
    }
  })
  Object.assign(instance, { rowSpanHeaders })
}

const defaultPropGetter = () => ({})

export default function Table({
  columns,
  data,
  getHeaderProps = defaultPropGetter,
  getColumnProps = defaultPropGetter,
  getRowProps = defaultPropGetter,
  getCellProps = defaultPropGetter
}) {
  const filterTypes = useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id]
          // prettier-ignore
          return rowValue !== undefined ? String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase()) : true
        })
      }
    }),
    []
  )

  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilterUI
    }),
    []
  )

  const { getTableProps, headerGroups, getTableBodyProps, rows, prepareRow, rowSpanHeaders } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes
    },
    useFilters,
    useSortBy,
    (hooks) => {
      hooks.useInstance.push(useInstance)
    }
  )

  return (
    <table className='table table-bordered' {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps([
                  {
                    className: column.className,
                    style: column.style
                  },
                  getColumnProps(column),
                  getHeaderProps(column),
                  column.getSortByToggleProps()
                ])}
                className={classNames('bg-white align-middle p-2', {
                  'sort-desc': column.isSorted && column.isSortedDesc,
                  'sort-asc': column.isSorted && !column.isSortedDesc
                })}
                style={{ width: column.width }}
              >
                <span
                  className={classNames({
                    'd-flex justify-content-between align-items-center': column.isSorted
                  })}
                >
                  <span className='font-small-3 fw-semibold text-secondary'>{column.render('Header')}</span>
                  {column.isSorted && column.isSortedDesc && <ArrowDown size={14} />}
                  {column.isSorted && !column.isSortedDesc && <ArrowUp size={14} />}
                </span>
              </th>
            ))}
          </tr>
        ))}
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th className='bg-light p-0' {...column.getHeaderProps()}>
                {column.canFilter && column.render('Filter')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)

          for (let j = 0; j < row.allCells.length; j++) {
            const cell = row.allCells[j]
            const rowSpanHeader = rowSpanHeaders.find((x) => x.id === cell.column.id)

            if (rowSpanHeader !== undefined) {
              if (rowSpanHeader.topCellValue === null || rowSpanHeader.topCellValue !== cell.value) {
                cell.isRowSpanned = false
                rowSpanHeader.topCellValue = cell.value
                rowSpanHeader.topCellIndex = i
                cell.rowSpan = 1
              } else {
                rows[rowSpanHeader.topCellIndex].allCells[j].rowSpan++
                cell.isRowSpanned = true
              }
            }
          }

          return null
        })}
        {rows.map((row) => {
          return (
            <tr {...row.getRowProps(getRowProps(row))}>
              {row.cells.map((cell) => {
                if (cell.isRowSpanned) {
                  return null
                } else {
                  return (
                    <td
                      rowSpan={cell.rowSpan}
                      {...cell.getCellProps([
                        {
                          className: cell.column.className,
                          style: cell.column.style
                        },
                        getColumnProps(cell.column),
                        getCellProps(cell)
                      ])}
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                }
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
