import { SubmitHandler, useForm, useFieldArray } from 'react-hook-form';
import { useStateContext } from '@/context/StateContext';
import { useConstraintsContext } from '@/context/ConstraintsContext'
import { IConstraints, IEvents } from '@/core/types';
// import { useState } from 'react'; 

import { v4 as uuidv4 } from 'uuid'


interface IConstraintsForm {
  event?: IEvents;
  constraint?: IConstraints;
}

export const ConstraintsForm = ({ event, constraint }: IConstraintsForm) => {
  const { setModal } = useStateContext();
  const { register, handleSubmit, control } = useForm<IConstraints>();
  const { updateConstraintsStorage, removeConstraintsStorage, saveConstraintsStorage } = useConstraintsContext()

    // Log the functions to make sure they exist
    console.log("updateConstraintsStorage:", updateConstraintsStorage);
    console.log("removeConstraintsStorage:", removeConstraintsStorage);
    console.log("saveConstraintsStorage:", saveConstraintsStorage);

  // Add state variables for lists
  const { fields: availableTimeFields, append: appendAvailableTime } = useFieldArray({
    control,
    name: 'available_times',
  });
  const { fields: preferredLocationFields, append: appendPreferredLocation } = useFieldArray({
    control,
    name: 'preferred_locations',
  });
  

  const onSubmit: SubmitHandler<IConstraints> = (data) => {
    if (constraint) {
      updateConstraintsStorage(data)
    } else {
      saveConstraintsStorage(data)
    }

    setModal({ open: false });
  };

  return (
    <div className="flex w-full justify-center bg-primary p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col">
        <input
          {...register('id')}
          id="id"
          type="hidden"
          value={constraint?.id || uuidv4()}
        />
        <input
          {...register('event_id')}
          id="event_id"
          type="hidden"
          value={event?.id}
        />

        {/* available_times field */}
        <label htmlFor="available_times" className="text-sm font-medium">
          Available Times:
        </label>
        <div className="mb-2">
          {availableTimeFields.map((field, index) => (
            <div key={field.id}>
              <input
                {...register(`available_times.${index}.start`)}
                type="datetime-local"
                className="mb-2 rounded-lg bg-search p-2 text-sm font-medium text-navTitle"
              />
              <input
                {...register(`available_times.${index}.end`)}
                type="datetime-local"
                className="mb-2 rounded-lg bg-search p-2 text-sm font-medium text-navTitle"
              />
            </div>
          ))}
          <button
            type="button"
            className="rounded-lg bg-navHover py-2 px-4 text-primary transition-colors hover:bg-secondary hover:text-textHover"
            onClick={() =>
              appendAvailableTime({
                start: '',
                end: '',
              })
            }
          >
            Add Available Time
          </button>
        </div>

        {/* preferred_locations field */}
        <label htmlFor="preferred_locations" className="text-sm font-medium">
          Preferred Locations:
        </label>
        <div className="mb-2">
        {preferredLocationFields.map((field, index) => (
            <input
              key={field.id}
              {...register(`preferred_locations.${index}.value`)}
              type="text"
              className="mb-2 rounded-lg bg-search p-2 text-sm font-medium text-navTitle"
            />
          ))}
          <button
            type="button"
            className="rounded-lg bg-navHover py-2 px-4 text-primary transition-colors hover:bg-secondary hover:text-textHover"
            onClick={() => appendPreferredLocation({ id: uuidv4(), value: '' })}
          >
            Add Preferred Location
          </button>
        </div>

        <label htmlFor="preferred_gender" className="text-sm font-medium">
          Preferred Gender:
        </label>
        <div className="mb-2">
          <select
            {...register('preferred_gender')}
            className="mb-2 rounded-lg bg-search p-2 text-sm font-medium text-navTitle"
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="N">Other</option>
          </select>
        </div>

        {constraint? (
          <span className="flex flex-row gap-x-2">
            <button className="mt-3 flex flex-1 justify-center rounded-lg bg-navHover py-2 px-4 text-primary transition-colors hover:bg-secondary hover:text-textHover">
              Update
            </button>
            <button
              className="mt-3 flex rounded-lg bg-deleteBtn py-2 px-4 transition-colors hover:bg-deleteBtnHover hover:text-secondary"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation() 
                removeConstraintsStorage(constraint.id)
                setModal({ open: false })
              }}
            >
              Delete
            </button>
          </span>
        ) : (
          <button type="submit" className="mt-3 rounded-lg bg-navHover py-2 px-4 text-primary transition-colors hover:bg-secondary hover:text-textHover">
            Create
          </button>
        )}
      </form>
    </div>
  )
}

