interface Identified {
  id: string;
}

export const LocalStorage = <T>() => {
  const get = (key: string): T[] => {
    const getItem = localStorage.getItem(key)
    const response: T[] = getItem ? JSON.parse(getItem) : []

    return response
  }

  const set = (key: string, data: string) => {
    localStorage.setItem(key, data)
  }

  return { get, set }
}


// export const LocalStorageCon = () => {
//   const get = (key: string) => {
//     const getItem = localStorage.getItem(key)
//     const response: IConstraints[] = getItem ? JSON.parse(getItem) : []

//     return response
//   }

//   const set = (key: string, data: string) => {
//     localStorage.setItem(key, data)
//   }

//   return { get, set }
// }

export const CRUD = <T extends Identified>() => {
  const add = (items: T[], item: T): T[] => {
    return [...items, item];
  }

  const remove = (items: T[], itemId: string): T[] => {
    return items.filter(({ id }) => id !== itemId);
  }

  const update = (updatedItem: T, items: T[]): T[] => {
    return [updatedItem, ...items.filter(({ id }) => id !== updatedItem.id)];
  }

  return { add, remove, update };
}

// export const CRUDCons = () => {
//   const add = (constraints: IConstraints[], constraint: IConstraints) => {
//     return [...constraints, constraint]
//   }
//   const remove = (constraints: IConstraints[], constraintId: string) => {
//     return constraints.filter(({ id }) => id !== constraintId)
//   }

//   const update = (constraint: IConstraints, constraints: IConstraints[]) => {
//     return [constraint, ...constraints.filter(({ id }) => id !== constraint.id)]
//   }

//   return { add, update, remove }
// }
