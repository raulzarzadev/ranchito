import {
  AnimalType,
  ParentsType
} from '@firebase/types.model.ts/AnimalType.model'
import { DateType, TypeBase } from '@firebase/types.model.ts/TypeBase.model'
import { FarmType } from '@firebase/Farm/farm.model'
import { TypeOfFarmEvent } from 'types/base/LABELS_TYPES/EventTypes'

export interface EventType extends TypeBase {
  type: TypeOfFarmEvent
  date: DateType
  startAt: DateType
  finishAt: DateType
  breedingBatch: Partial<AnimalType>[]
  breedingMale: Partial<AnimalType>
  farm: Pick<FarmType, 'name' | 'id'>
  batch: string
  birthData?: BirthDataType
  parents?: ParentsType
}

export interface BreedingEventType extends EventType {
  type: 'BREEDING'
  possibleBirth?: {
    startAt?: DateType
    finishAt?: DateType
  }
  breedingBirths?: Partial<AnimalType>[]
  breedingAborts?: Partial<AnimalType>[]
  breedingEmpty?: Partial<AnimalType>[]
}
export interface CreateBirthEventType extends Partial<EventType> {
  birthData: BirthDataType
}

export interface BreedingEvent extends Partial<EventType> {
  breedingEvent: any
}

export interface CreateEventDTO
  extends Pick<
    EventType,
    | 'breedingBatch'
    | 'type'
    | 'startAt'
    | 'finishAt'
    | 'breedingMale'
    | 'farm'
    | 'batch'
  > {}

export interface EventDTO extends Partial<Event> {}

export interface BirthDataType {
  birthType?: number
  date?: any
  parents?: ParentsType
  calfs?: any[]
  batch?: string
}
