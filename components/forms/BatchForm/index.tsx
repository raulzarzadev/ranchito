import {
  AnimalType,
  ParentType
} from '@firebase/types.model.ts/AnimalType.model'
import { DateType } from '@firebase/types.model.ts/TypeBase.model'
import InputContainer from 'components/inputs/InputContainer'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { ParentForm } from '../ParentForm'

export interface BatchType {
  birthday: DateType
  animals: Partial<AnimalType>[]
  father: ParentType
  joinedAt: DateType
  batchName: string
  earrings: {
    fromNumber: number
    toNumber: number
    from?: string
    to?: string
    suffix?: string
  }
}

const BatchForm = ({
  animal: { type = 'ovine' },
  setBatch
}: {
  animal: Partial<AnimalType>
  setBatch: (batch: BatchType | null) => void
}) => {
  //const [batch, setBatch] = useState<BatchType | null>(null)
  const handleCreateBatch = (batch: BatchType | null) => {
    if (!batch) return setBatch(null)
    const { earrings, father, birthday, joinedAt, batchName } = batch
    // console.log({ earrings, father, birthday, batchName })
    const animals: BatchType['animals'] = []
    for (
      let earring = earrings.fromNumber;
      earring <= earrings.toNumber;
      earring++
    ) {
      animals.push({
        gender: 'female',
        birthday,
        type,
        joinedAt,
        parents: {
          father,
          mother: null
        },
        earring: `${earring}${earrings.suffix ? '-' + earrings.suffix : ''}`,
        batch: batchName
      })
    }
    setBatch({
      earrings,
      father,
      animals,
      birthday,
      joinedAt,
      batchName
    })
  }

  return (
    <div>
      <DefineBatchForm setBatch={handleCreateBatch} />
    </div>
  )
}

const DefineBatchForm = ({
  batch,
  setBatch
}: {
  batch?: BatchType | null
  setBatch: (data: BatchType | null) => void
}) => {
  const methods = useForm({
    defaultValues: batch || {
      earrings: {
        fromNumber: 0,
        toNumber: 0,
        suffix: ''
      }
    }
  })
  const { watch, handleSubmit, setValue, reset } = methods
  const formValues = watch()
  const {
    query: { farmId }
  } = useRouter()
  const { father, earrings } = formValues
  const [earringsTotal, setEarringsTotal] = useState(0)
  useEffect(() => {
    setEarringsTotal(earrings?.toNumber - earrings?.fromNumber)
    setValue(
      'earrings.from',
      `${earrings?.fromNumber}${earrings.suffix ? '-' + earrings.suffix : ''}`
    )
    setValue(
      'earrings.to',
      `${earrings?.toNumber}${earrings.suffix ? '-' + earrings.suffix : ''}`
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [earrings?.toNumber, earrings?.fromNumber, earrings?.suffix])

  const onSubmit = (data: BatchType) => {
    setBatch(data)
  }
  const handleCleanBatch = () => {
    reset()
    setBatch(null)
  }
  return (
    <div>
      <header>
        <div>Nuevo lote</div>
      </header>
      <main>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4">
              <InputContainer
                type="text"
                name="batchName"
                label="Nombre / Titulo"
              />
            </div>
            <div className="flex justify-center w-full my-4 flex-col items-center">
              <div>
                <span className="font-bold text-lg">{father?.earring}</span>
              </div>
              <ParentForm
                farmId={farmId as string}
                gender="male"
                setValue={(value) => methods.setValue(`father`, value)}
                value={father}
              />
            </div>
            <div className="flex justify-between my-4">
              <InputContainer
                type="date"
                label="Incorporación"
                name="joinedAt"
              />
              <InputContainer
                type="date"
                label="Nacimiento (aprox)"
                name="birthday"
              />
            </div>
            <div className="flex justify-between my-4">
              <InputContainer
                className="w-24"
                type="number"
                name="earrings.fromNumber"
                label="from"
              />
              <InputContainer
                className="w-24"
                type="number"
                name="earrings.toNumber"
                label="to"
              />
              <InputContainer
                className="w-24"
                type="text"
                name="earrings.suffix"
                label="sufijo"
              />
            </div>
            <div className="text-center">
              Total:<span className="font-bold">{earringsTotal}</span>
            </div>
            <div className="flex justify-center w-full">
              <button
                className="btn btn-outline mx-auto "
                onClick={(e) => {
                  e.preventDefault()
                  handleCleanBatch()
                }}
              >
                Limpiar
              </button>
              <button className="btn btn-accent mx-auto ">Crear lote</button>
            </div>
          </form>
        </FormProvider>
      </main>
    </div>
  )
}

export default BatchForm