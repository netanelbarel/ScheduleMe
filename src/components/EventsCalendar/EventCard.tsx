import moment from 'moment'

import { EventForm } from '@/components/EventForm'
import { useStateContext } from '@/context/StateContext'
import { IEvents } from '@/core/types'
import { Clock } from '@/Images'
import { AddConstraintsButton } from '../EventsCalendar/AddConstraintsButton'
export const EventCard = (event: IEvents) => {
  const { setModal } = useStateContext()
  const formatStartDate = moment(event.startDate).format('DD MMM, YYYY HH:mm A')
  const formatEndDate = moment(event.endDate).format('DD MMM, YYYY HH:mm A')
  const duration = moment(event.duration, 'HH:mm').format('HH:mm')

  return (
    <article
      className="mt-3 flex w-full cursor-pointer flex-col rounded-lg border border-slate-300 p-2 transition-all hover:animate-pulse"
    >
      <div 
        onClick={() => {
          setModal({
            open: true,
            title: <p>Update or Delete Event</p>,
            body: <EventForm event={event} />
          })
        }}
      >
        <p className="text-sm">{event.title}</p>
        <p className="text-xs">{formatStartDate} - {formatEndDate} </p>
        <span className="mt-3 flex flex-row items-center gap-x-2">
          <Clock />
          <p className="text-xs text-tertiary">
            {duration}
          </p>
        </span>
      </div>
      <AddConstraintsButton event={event}/>
    </article>
  )
}
