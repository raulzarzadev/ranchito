import { AnimalType } from '@firebase/types.model.ts/AnimalType.model'
import Icon from 'components/Icon'
import { useState } from 'react'
import { fromNow, myFormatDate } from 'utils/dates/myDateUtils'
import AnimalBreedingOptions from './AnimalBreedingOptions'

const AnimalBreedingCard = ({ animal }: { animal: Partial<AnimalType> }) => {
  const possibleBirthStartAt = animal?.breeding?.possibleBirth?.startAt
  const possibleBirthFinishAt = animal?.breeding?.possibleBirth?.finishAt
  const iconStyle: 'error' | 'warning' | 'success' =
    // @ts-ignore
    animal.possibleBirthStartIn < 0
      ? 'error'
      : // @ts-ignore
      animal.possibleBirthStartIn < 5
      ? 'warning'
      : 'success'
  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => {
    setOpenModal(!openModal)
  }
  return (
    <>
      {openModal && (
        <AnimalBreedingOptions
          animal={animal}
          handleOpenModal={handleOpenModal}
          openModal={openModal}
        />
      )}
      <div
        className="bg-base-300 my-2 rounded-md shadow-md  "
        onClick={() => handleOpenModal()}
      >
        <header className="flex w-full justify-between p-2 bg-base-200 rounded-t-md">
          <div className="flex items-center ">
            <span className="pr-1">
              {iconStyle === 'error' && (
                <span className="text-error ">
                  <Icon name="baned" size="xs" />
                </span>
              )}
              {iconStyle === 'success' && (
                <span className="text-success ">
                  <Icon name="done" size="xs" />
                </span>
              )}
              {iconStyle === 'warning' && (
                <span className="text-warning ">
                  <Icon name="info" size="xs" />
                </span>
              )}
            </span>
            <span className="flex flex-col">
              <span>
                Parto: del{' '}
                <span className="font-bold">
                  {possibleBirthStartAt &&
                    myFormatDate(possibleBirthStartAt, 'dd-MMM')}
                </span>{' '}
                al{' '}
                <span className="font-bold">
                  {possibleBirthFinishAt &&
                    myFormatDate(possibleBirthFinishAt, 'dd-MMM yyyy')}
                </span>
              </span>
              <span className="text-xs italic">
                {fromNow(possibleBirthStartAt, { addSuffix: true })}
              </span>
            </span>
          </div>

          <span className="flex flex-col">
            <span>
              Arete:{' '}
              <span className="font-bold whitespace-nowrap">
                {animal.earring}
              </span>
            </span>
            <span className="text-xs">
              Lote: <span className="font-bold">{animal.batch}</span>
            </span>
          </span>
        </header>
        <main className="p-2">
          <div className="flex w-full justify-evenly">
            <div className="flex flex-col text-center">
              <span>Fecha Monta</span>
              <div>
                <span>
                  {myFormatDate(animal?.breeding?.startAt, 'dd-MMM-yy')}
                </span>
                <span className="mx-2">al</span>
                <span>
                  {myFormatDate(animal?.breeding?.finishAt, 'dd-MMM-yy')}
                </span>
              </div>
            </div>
            <div className="flex flex-col text-center">
              <span>Macho</span>
              <div>
                <span className="mx-2 font-bold">
                  {animal.breeding?.breedingMale?.earring}
                </span>
                <span>{animal.breeding?.breedingMale?.name || ''}</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
export default AnimalBreedingCard