import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { CRUD, LocalStorage } from '@/core/methods'
import { IChildren, IConstraints, IConstraintsContext } from '@/core/types'

const defaultConstraints: IConstraintsContext = {
  constraints: [],
  setConstraints: () => [],
  saveConstraintsStorage: () => null,
  removeConstraintsStorage: () => null,
  updateConstraintsStorage: () => null
}

const ConstraintsContext = createContext(defaultConstraints)

const useConstraintsContext = () => useContext(ConstraintsContext)

const ConstraintsProvider = ({ children }: IChildren) => {
  const [constraints, setConstraints] = useState<IConstraints[]>([])

  const key = 'constraints'
  const local = LocalStorage<IConstraints>()
  const crud = CRUD<IConstraints>()

  const saveConstraintsStorage = (constraint: IConstraints) => {
    const saveConstraints = crud.add(constraints, constraint);
    local.set(key, JSON.stringify(saveConstraints));
    setConstraints(saveConstraints);
    toast.success(`Constraints created!`);
  };

  const removeConstraintsStorage = (id: string) => {
    const remove = crud.remove(constraints, id)
    local.set(key, JSON.stringify(remove))
    setConstraints(remove)
    toast.success(`Constraints removed!`)
  }

  const updateConstraintsStorage = (constraint: IConstraints) => {
    const update = crud.update(constraint, constraints)
    local.set(key, JSON.stringify(update))
    setConstraints(update)
    toast.success(`Constraints "${constraint.id}" updated!`)
  }

  useEffect(() => {
    const getItems = local.get(key)
    setConstraints(getItems)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setConstraints])

  return (
    <ConstraintsContext.Provider
      value={{
        constraints,
        setConstraints,
        saveConstraintsStorage,
        removeConstraintsStorage,
        updateConstraintsStorage
      }}
    >
      {children}
    </ConstraintsContext.Provider>
  )
}

export { ConstraintsProvider, useConstraintsContext }
