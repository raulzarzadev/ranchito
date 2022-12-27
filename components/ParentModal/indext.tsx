import { AnimalType } from '@firebase/types.model.ts/AnimalType.model'
import { AnimalDetails } from 'components/AnimalCard'
import useFarm from 'components/hooks/useFarm'
import Icon from 'components/Icon'
import Modal from 'components/modal'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectFarmOvines } from 'store/slices/farmSlice'

const ParentModal = ({
  parentReference,
  type
}: {
  parentReference?: string
  type: 'father' | 'mother'
}) => {
  const ovines = useSelector(selectFarmOvines)
  // const farm = useFarm()
  // console.log(farm)

  const [parentData, setParentData] = useState<AnimalType | null>(null)
  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => {
    setOpenModal(!openModal)
  }
  const handleOpenParent = (parentReference: string) => {
    // can be a id or a earring
    console.log(parentReference)
    const parent = [...ovines].find(
      ({ earring, id }) => earring === parentReference || id === parentReference
    )
    setOpenModal(true)
    setParentData(parent || null)
  }
  console.log(parentData)
  return (
    <div>
      {parentReference && (
        <button
          className="btn btn-ghost btn-sm btn-circle"
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            handleOpenParent(parentReference)
          }}
        >
          <span className="text-info">
            {type === 'father' ? (
              <Icon size="xs" name="male" />
            ) : (
              <Icon size="xs" name="female" />
            )}
          </span>
          <span className="truncate">{parentReference}</span>
        </button>
      )}
      <Modal
        title={`Información de ${type === 'father' ? 'a madre' : 'l Padre'}`}
        open={openModal}
        handleOpen={handleOpenModal}
      >
        <div>
          {parentData ? (
            <AnimalDetails animal={parentData} setEditing={() => {}} />
          ) : (
            <div>No hay información sobre el padre</div>
          )}
        </div>
      </Modal>
    </div>
  )
}

export default ParentModal
