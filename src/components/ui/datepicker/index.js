import ReactMultiDatePicker from 'react-multi-date-picker'
// import ReactMultiTimePicker from 'react-multi-date-picker/plugins/time_picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'

export default function DatePicker({ id, containerClassName, inputClass, className, value, handleChange, ...props }) {
  return (
    <ReactMultiDatePicker
      id={id}
      containerClassName={containerClassName}
      inputClass={inputClass}
      className={className}
      calendar={persian}
      locale={persian_fa}
      // plugins={[<ReactMultiTimePicker position='bottom' />]}
      hideWeekDays={true}
      calendarPosition='bottom-right'
      value={value || ''}
      onChange={(date) => {
        handleChange(date)
      }}
      {...props}
    />
  )
}
