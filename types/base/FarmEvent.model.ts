import { BreedingDatesType } from 'components/BreedingsList/breeding.helpers'
import { AnimalType, ParentsType } from './AnimalType.model'
import {
  AnimalBreedingStatus,
  StatusOfFarmEvent,
  TypeOfFarmEvent
} from './LABELS_TYPES/EventTypes'
import { Merge, TypeBase } from './TypeBase.model'

export interface BaseFarmEvent {
  type: TypeOfFarmEvent
  status?: StatusOfFarmEvent
  farm: {
    id: string
    name: string
  }
}

export interface FarmEvent extends TypeBase, BaseFarmEvent {}

export interface FarmEventDetails extends FarmEvent {}

export interface ParentType
  extends Partial<
    Pick<
      AnimalType,
      'earring' | 'breed' | 'birthday' | 'gender' | 'name' | 'id'
    >
  > {
  inTheFarm: boolean
}
export interface BirthDetailsEvent extends BreedingEventDefaultInfo {
  birthType?: number
  calfs?: AnimalBreedingType[]
}
export interface AbortDetailsEvent extends BreedingEventDefaultInfo {
  comments: string
}
export interface EmptyDetailsEvent extends BreedingEventDefaultInfo {
  comments: string
}
export interface BreedingDetailsEvent extends BreedingEventDefaultInfo {
  animals: any
  calfs?: AnimalBreedingType[]
  breedingDates?: BreedingDatesType
  birthType?: number
}

export interface AnimalBreedingType
  extends Merge<
    Omit<Partial<AnimalType>, 'status'>,
    { status: AnimalBreedingStatus }
  > {}

export interface BreedingEventDefaultInfo {
  id: string
  date: number | string
  breedingId: string
  batchId: string
  breedingBatch: AnimalBreedingType[]
  breedingMale: ParentType | null
  parents: ParentsType
  startAt: number | string
  finishAt: number | string
  // calfs?: Partial<AnimalType>[]
}

export interface SetGenericEventType<ContentType> extends FarmEvent {
  eventData: ContentType
}

export interface CreateGenericEventType<ContentType> extends BaseFarmEvent {
  eventData: ContentType
}

export interface FarmBreedingEvent
  extends SetGenericEventType<BreedingDetailsEvent> {}

export interface EventData
  extends BreedingEventDefaultInfo,
    BreedingDetailsEvent,
    EmptyDetailsEvent,
    AbortDetailsEvent,
    BirthDetailsEvent {
  breedingDates?: BreedingDatesType
  // animals?: any[]
}

export interface EventDataStoreDetails extends SetGenericEventType<EventData> {}

export interface BreedingEventCardDetails
  extends SetGenericEventType<EventData> {
  animals?: any
}

export interface DTO_CreateBreedingEventType
  extends CreateGenericEventType<BreedingDetailsEvent> {}

export interface GetAllFarmEventsType extends SetGenericEventType<EventData> {}

export interface AnimalBreedingEventCard extends Partial<AnimalType> {
  eventData: EventData
}
