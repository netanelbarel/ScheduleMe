import { ConstraintsForm } from '@/components/ConstraintsForm'
import { useStateContext } from '@/context/StateContext'
import { IEvents } from '@/core/types'

interface AddConstraintsButtonProps {
  event: IEvents;
}

export const AddConstraintsButton = ({event}: AddConstraintsButtonProps) => {
  const { setModal } = useStateContext()

  return (
    <button
      onClick={() => {
        setModal({
          open: true,
          title: <p>Add Constraints</p>,
          body: <ConstraintsForm event={event}/>
        })
      }}
      className="group rounded-lg bg-button py-2 px-4 transition-colors hover:opacity-80"
    >
      <p className="text-sm font-normal text-eventBtn group-hover:text-textHover">
        Add Constraints
      </p>
    </button>
  )
}
