import { forwardRef, useState, useEffect, useMemo } from 'react'
import { TreeView } from 'devextreme-react/tree-view'
import './DxTreeView.scss'

const DxTreeView = forwardRef((props, ref) => {
  const { id, className, data, disabled, ...rest } = props

  const [language, setLanguage] = useState()

  useEffect(() => {
    setLanguage(document.getElementsByTagName('html')[0].lang || 'en')
  }, [])

  const selectAllTextValues = useMemo(() => ({ en: 'Select All', fa: 'انتخاب همه' }), [])

  const noDataTextValues = useMemo(() => ({ en: 'No data', fa: 'اطلاعاتی یافت نشد' }), [])

  const searchEditorOptionsTextValues = useMemo(
    () => ({
      en: { placeholder: 'search...' },
      fa: { placeholder: 'جستجو...' }
    }),
    []
  )

  return (
    <TreeView
      ref={ref}
      id={id}
      className={className}
      items={data.items}
      keyExpr={data.keyExpr}
      displayExpr={data.displayExpr}
      hasItemsExpr={data.hasItemsExpr}
      itemsExpr={data.itemsExpr}
      parentIdExpr={data.parentIdExpr}
      expandedExpr={data.expandedExpr}
      disabledExpr={data.disabledExpr}
      selectedExpr={data.selectedExpr}
      searchExpr={data.searchExpr}
      searchEnabled={true}
      selectByClick={true}
      expandEvent='click'
      rtlEnabled={language === 'fa'}
      selectAllText={selectAllTextValues[language]}
      noDataText={noDataTextValues[language]}
      searchEditorOptions={searchEditorOptionsTextValues[language]}
      disabled={disabled}
      {...rest}
    />
  )
})

export default DxTreeView
