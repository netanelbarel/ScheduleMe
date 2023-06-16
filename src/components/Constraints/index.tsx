import { useConstraintsContext } from '@/context/ConstraintsContext';
import Main from '@/template';
import Meta from '@/layout';
import { ConstraintCard } from '@/components/ConstraintCard';
import axios from 'axios';

import { groupBy } from 'lodash';
import { IConstraints, IEvents } from '@/core/types';
import { useStateContext } from '@/context/StateContext';
import { ModalContent } from '@/components/Modal';

export const Constraints = () => {
  const { constraints } = useConstraintsContext();
  const { setModal } = useStateContext();
  
  // Get events from localStorage
  const events: IEvents[] = JSON.parse(localStorage.getItem('events') || '[]');
  
  // Group constraints by event_id
  const constraintsByEvent = groupBy(constraints, 'event_id');

  const handleScheduleEvent = (event: IEvents | null) => {
    axios
      .post(
        'http://localhost:5000/schedule',
        {
          start_date: event?.startDate,
          end_date: event?.endDate,
          duration: event?.duration,
          constraints: constraints,
        },
        {
          withCredentials: true,
        }
      )
      .then(response => {
        console.log('Event scheduled successfully');
        console.log(response);
  
        const scheduledEventData = response.data; // Assuming the response data is assigned to a variable named scheduledEventData
  
        setModal({
          open: true,
          title: <p>Event Scheduled</p>,
          body: (
            <div>
              <p>Event has been scheduled successfully.</p>
              <p>Now you can choose from the list below</p>
              {scheduledEventData.map((eventData: any, index: number) => (
                <p key={index}>
                  Start: {eventData[0]}, End: {eventData[1]}, Location: {eventData[2]}, Gender: {eventData[3]}, Score: {eventData[4]}
                </p>
              ))}
            </div>
          ),
        });
      })
      .catch(error => {
        console.error('Failed to schedule event', error);
        setModal({
          open: true,
          title: <p>Failed to Schedule Event</p>,
          body: (
            <div>
              <p>Failed to schedule the event. Please try again later.</p>
              {/* Add any additional error message or troubleshooting steps */}
            </div>
          ),
        });
      });
    console.log('Scheduling event:', event);
  };

  return (
    <Main
      meta={
        <Meta
          title="Constraints"
          description="View all constraints"
        />
      }
    >
      <main className="flex w-full flex-col bg-primary scrollbar">
        {/* Add your header and any other components you want to display on all pages */}
        <div>
          {Object.entries(constraintsByEvent).map(([eventId, eventConstraints]) => {
            const event = events.find(e => e.id === eventId) || null;
            return (
              <div key={eventId}>
                <h6 className="text-sm">{event?.title || 'N/A'}</h6>
                {eventConstraints.map((constraint: IConstraints) => (
                  <ConstraintCard key={constraint.id} constraint={constraint} />
                ))}
                <button
                  className="mt-2 rounded-lg bg-secondary text-primary py-2 px-4 transition-colors hover:bg-secondaryHover hover:text-textHover"
                  onClick={() => handleScheduleEvent(event)}
                >
                  Schedule Event
                </button>
              </div>
            );
          })}
        </div>
        <ModalContent />
      </main>
    </Main>
  );
}
