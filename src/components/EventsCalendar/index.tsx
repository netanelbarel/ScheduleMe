import { StrictMode, useEffect, useState } from 'react'

import Aside from '@/components/Aside'
import { ScheduleView } from '@/components/ScheduleTable'
import { Constraints } from '@/components/Constraints'
import { useEventsContext } from '@/context/EventsContext'

import { CalendarComponent } from './Calendar'
import { EventCard } from './EventCard'
import { SchedulerDateTime } from '@devexpress/dx-react-scheduler'
import { useStateContext } from '@/context/StateContext'


export const EventsCalendar = () => {
  const [avoidHydration, setAvoidHydration] = useState(false)
  const [currentDate, setCurrentDate] = useState<SchedulerDateTime>(new Date())
  const { events } = useEventsContext()
  const { selected } = useStateContext()


  function getDate(date: Date | string) {
    setCurrentDate(new Date(date))
  }

  useEffect(() => {
    setAvoidHydration(true)
  }, [])

  return (
    <section className="flex w-full flex-col items-center xl:w-fit xl:flex-row xl:items-start">
      <Aside />
      <div className="w-80 py-8">
        {avoidHydration && <CalendarComponent getDate={getDate} />}
        <div className="mt-7 flex w-full flex-col">
          <p className="mb-3">Events</p>

          <div className="h-22 flex w-full flex-col overflow-y-auto py-4 scrollbar-thin">
            {events?.length ? (
              events.map((event) => (
                <StrictMode key={event.id.toString()}>
                  <EventCard {...event} />
                </StrictMode>
              ))
            ) : (
              <p className="p-4">Nothing to show</p>
            )}
          </div>
        </div>
      </div>
      <div className="mx-8 flex w-full overflow-y-auto py-8 scrollbar-thin scrollbar-thumb-transparent xl:flex-1">
        { selected.name === 'Calendar' ? 
          <ScheduleView
              events={events?.map(({ title, startDate, startTime, endDate, endTime, type }) => ({
              startDate: new Date(`${startDate} ${startTime}`),
              endDate: new Date(`${endDate} ${endTime}`),
              title,
              type
          }))}
          currentDate={currentDate}
          /> 
          : 
          <Constraints /> }
      </div>
    </section>
  )
}
