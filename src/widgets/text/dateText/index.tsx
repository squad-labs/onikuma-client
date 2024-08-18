import React, { Fragment, useMemo } from 'react'
import styles from '@/widgets/text/dateText/DateText.module.scss'
import classNames from 'classnames/bind'
import CalendarIcon from '@/assets/icons/calendar.svg'

const cn = classNames.bind(styles)

type Props = {
  startDate: string;
  endDate?: string;
  isUTC?: boolean;
  withIcon?: boolean;
}

const DateText = ({ startDate, endDate = undefined, isUTC = true, withIcon = true }: Props) => {
  const sDate = useMemo(() => {
    return startDate;
  }, [isUTC])

  const eDate = useMemo(() => {
    return endDate;
  }, [isUTC])

  return (
    <div className={cn('text-container')}>
      {withIcon && <CalendarIcon className={cn('icon')} viewBox="0 0 24 24" />}
      <span className={cn('text', 'start')}>{sDate}</span>
      {eDate && (
        <Fragment>
          <span className={cn('seperator')}>~</span>
          <span className={cn('text')}>{eDate}</span>
        </Fragment>
      )}
    </div>
  )
}

export default DateText
