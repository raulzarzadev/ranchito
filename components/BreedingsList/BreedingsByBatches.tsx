import { deleteEvent } from '@firebase/Events/main'
import AnimalBreedingCard from 'components/BreedingsList/AnimalBreedingCard'
import { BreedingFormatted } from 'components/BreedingsList/breeding.helpers'
import Icon from 'components/Icon'
import IconBreedingStatus from 'components/IconBreedingStatus'
import ModalDelete from 'components/modal/ModalDelete'
import { useState } from 'react'
import { FarmStateAnimalEvent } from 'store/slices/farmSlice'
import { BreedingEventCardDetails } from 'types/base/FarmEvent.model'
import { AnimalCurrentStatusType } from 'types/base/LABELS_TYPES/AnimalCurrentStatus'
import { AnimalBreedingStatus } from 'types/base/LABELS_TYPES/EventTypes'
import { fromNow, myFormatDate } from 'utils/dates/myDateUtils'

export interface BreedingBatchesListType {
  breedings: BreedingEventCardDetails[]
}
const BreedingsByBatches = ({ breedings = [] }: BreedingBatchesListType) => {
  const sortByUpdated = (a: any, b: any) => {
    if (a?.updatedAt < b?.updatedAt) return 1
    if (a?.updatedAt > b?.updatedAt) return -1
    return 0
  }
  return (
    <div>
      <div className="text-center">Total: {breedings.length}</div>
      {breedings.sort(sortByUpdated).map((breeding) => (
        <div className="my-2 " key={breeding?.id}>
          <BreedingCard breeding={breeding} />
        </div>
      ))}
    </div>
  )
}

const BreedingCard = ({ breeding }: { breeding: BreedingEventCardDetails }) => {
  const handleDelete = async () => {
    const res = await deleteEvent(breeding?.id)
    return console.log(res)
  }
  const breedingMale = breeding.eventData.breedingMale
  const breedingDates = breeding.eventData.breedingDates
  return (
    <div className="bg-base-300 rounded-md my-1 mt-4">
      <header className="flex w-full justify-between p-2">
        <div className="flex pr-1 mt-1 ">
          <IconBreedingStatus
            startInDays={breedingDates?.birthStartInDays as number}
            finishInDays={breedingDates?.birthFinishInDays as number}
          />
        </div>
        <div className="w-full flex justify-between">
          <div className="">
            <BreedingDatesInfo
              startAt={breedingDates?.birthStartAt as number}
              finishAt={breedingDates?.birthFinishAt as number}
            />
            <div className="text-xs">
              <span>Realizada: </span>
              <span> del </span>
              <span className="font-semibold">
                {myFormatDate(breedingDates?.breedingStartAt, 'dd-MMM')}
              </span>
              <span> al </span>
              <span className="font-semibold">
                {myFormatDate(breedingDates?.breedingFinishAt, 'dd-MMM-yy')}
              </span>
            </div>
            <div className="text-xs">
              <span>Creado: </span>
              <span>{fromNow(breeding.createdAt, { addSuffix: true })}</span>
            </div>
          </div>
          <span>
            Lote:{' '}
            <span className="font-bold">{breeding.eventData?.breedingId}</span>
          </span>
          <div className="relative">
            <span className="absolute -top-6 -right-2">
              <ModalDelete
                buttonLabel={null}
                handleDelete={() => handleDelete()}
                title="Eliminar monta"
                openModalItem={(props) => (
                  <button
                    className="btn btn-circle btn-sm shadow-md btn-error"
                    {...props}
                  >
                    <Icon name="delete" />
                  </button>
                )}
              />
            </span>
            <div>
              <span>
                Macho:{' '}
                <span className="font-bold text-xl">
                  {breedingMale?.earring}
                </span>{' '}
                <span>{breedingMale?.name}</span>
              </span>
            </div>
            <span>
              Raza:
              <span>{breedingMale?.breed}</span>
            </span>
          </div>
        </div>
      </header>
      <BreedingCardBody breeding={breeding} />
    </div>
  )
}

const BreedingDatesInfo = ({
  startAt,
  finishAt
}: {
  startAt?: number
  finishAt?: number
}) => {
  const start = startAt && myFormatDate(startAt, 'dd-MMMM')
  const finish = finishAt && myFormatDate(finishAt, 'dd-MMMM')
  return (
    <div className="font-lg flex flex-col">
      <span>Partos:</span>
      {start === finish ? (
        start
      ) : (
        <>
          <span className="font-bold">
            <span className="text-sm font-normal"> del </span>
            {start}
          </span>
          <span className="font-bold">
            <span className="text-sm font-normal"> al </span>
            {finish}
          </span>
        </>
      )}
    </div>
  )
}

export interface BreedingCardBody extends BreedingFormatted {}

const BreedingCardBody = ({
  breeding
}: {
  breeding: BreedingEventCardDetails
}) => {
  type ViewBatchesType = AnimalBreedingStatus | '' | 'ALL'

  const [view, setView] = useState<ViewBatchesType>('')

  const animals = breeding?.eventData?.breedingBatch.map((animal) => {
    return { ...animal, eventData: { ...breeding.eventData, id: breeding.id } }
  })

  const pendingAnimals = animals?.filter(({ status }) => status === 'PENDING')
  const abortAnimals = animals.filter(({ status }) => status === 'ABORT')
  const birthAnimals = animals.filter(({ status }) => status === 'BIRTH')
  const emptyAnimals = animals.filter(({ status }) => status === 'EMPTY')

  const handleSetView = (newView: ViewBatchesType) => {
    if (newView === view) {
      setView('')
    } else {
      setView(newView)
    }
  }

  return (
    <main className="p-2">
      <div className="flex w-full justify-evenly">
        <span>
          <button
            onClick={() => handleSetView('ALL')}
            className={` rounded-t-md p-2 ${view == 'ALL' && 'bg-base-100'}`}
          >
            Todos {`(${animals?.length || 0})`}
          </button>
        </span>
        <span>
          <button
            onClick={() => handleSetView('PENDING')}
            className={` rounded-t-md p-2 ${
              view == 'PENDING' && 'bg-base-100'
            }`}
          >
            Espera {`(${pendingAnimals?.length || 0})`}
          </button>
        </span>
        <span>
          <button
            onClick={() => handleSetView('ABORT')}
            className={` rounded-t-md p-2  ${view == 'ABORT' && 'bg-base-100'}`}
          >
            Abortos {`(${abortAnimals?.length || 0})`}
          </button>
        </span>
        <span>
          <button
            onClick={() => handleSetView('BIRTH')}
            className={` rounded-t-md p-2 ${view == 'BIRTH' && 'bg-base-100'}`}
          >
            Partos {`(${birthAnimals?.length || 0})`}
          </button>
        </span>
        <span>
          <button
            onClick={() => handleSetView('EMPTY')}
            className={` rounded-t-md p-2 ${view == 'EMPTY' && 'bg-base-100'}`}
          >
            Vacios {`(${emptyAnimals?.length || 0})`}
          </button>
        </span>
      </div>
      <div className="bg-base-100 p-1   pt-1 rounded-md">
        <div className="">
          {view === 'ALL' &&
            animals?.map((animal, i) => (
              <AnimalBreedingCard key={i} animal={animal} />
            ))}
          {view === 'PENDING' &&
            pendingAnimals?.map((animal, i) => (
              <AnimalBreedingCard key={i} animal={animal} />
            ))}
          {view === 'ABORT' &&
            abortAnimals.map((animal, i) => (
              <AnimalBreedingCard key={i} animal={animal} />
            ))}
          {view === 'BIRTH' &&
            birthAnimals.map((animal, i) => (
              <AnimalBreedingCard key={i} animal={animal} />
            ))}
          {view === 'EMPTY' &&
            emptyAnimals.map((animal, i) => (
              <AnimalBreedingCard key={i} animal={animal} />
            ))}
        </div>
      </div>
    </main>
  )
}

export default BreedingsByBatches
