import { AppointmentModel, SchedulerDateTime } from '@devexpress/dx-react-scheduler'

import { Asset } from '@/Images'

export interface IChildren {
  children: React.ReactNode
}

export interface ISchedule {
  title: string
  startDate: Date
  endDate: Date
  type: string
}

export interface ISchedulerView {
  events: AppointmentModel[]
  currentDate: SchedulerDateTime
}

export interface IEventsContext {
  events: IEvents[]
  setEvents: React.Dispatch<React.SetStateAction<IEvents[]>>
  saveEventStorage(event: IEvents): void
  removeEventStorage(id: string): void
  updateEventStorage(event: IEvents): void
}

export interface IEventForm {
  id?: string
  description?: string
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  duration: string
  title?: string
  type?: string
  edit?: boolean
}

export interface IEvents {
  id: string
  description: string
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  duration: string
  title: string
  type: string
}

export interface IConstraintsContext {
  constraints: IConstraints[]
  setConstraints: React.Dispatch<React.SetStateAction<IConstraints[]>>
  saveConstraintsStorage(constraint: IConstraints): void
  removeConstraintsStorage(id: string): void
  updateConstraintsStorage(constraint: IConstraints): void
}

export interface IConstraintsForm {
  id: string
  event_id?: string
  available_times: { start: string; end: string }[];
  preferred_locations: { id: string; value: string }[]
  preferred_gender: string
  edit?: boolean
}

export interface IConstraints {
  id: string;
  event_id?: string;
  available_times: { start: string; end: string }[];
  preferred_locations: { id: string; value: string }[]; 
  preferred_gender: string;
}


export interface ILocalStorage {
  get(key: string): IEvents | null
  get(key: string): IConstraints | null
  set(key: string, startDate: string): void
}

export interface IStateContext {
  search: string
  menu: boolean
  modal: IModal
  selected: Omit<IItem, 'icon'>
}

export interface IValuesContext extends IStateContext {
  setSelected(selected: Omit<IItem, 'icon'>): void
  setSearch(search: string): void
  setMenu(menu: boolean): void
  setModal(modal: IModal): void
}

export type TActionContext =
  | { type: 'search'; search: string }
  | { type: 'menu'; menu: boolean }
  | { type: 'modal'; modal: IModal }
  | { type: 'selected'; selected: Omit<IItem, 'icon'> }

export interface IItem {
  name: string
  href: string
  icon: Asset
}

export interface INavButtons {
  item: IItem[]
}

export interface IModal {
  open: boolean
  body?: JSX.Element
  title?: JSX.Element
}

export interface ICalendarComponent {
  getDate(date: Date | string): void
}
