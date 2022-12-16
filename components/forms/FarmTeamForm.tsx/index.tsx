import { MemberTeam } from '@firebase/Farm/farm.model'
import { updateFarm } from '@firebase/Farm/main'
import useFarm from 'components/hooks/useFarm'
import useSearchUsers from 'components/hooks/useSearchUsers'
import Icon from 'components/Icon'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

const FarmTeamForm = () => {
  const { farm } = useFarm()

  const { control, register, handleSubmit } = useForm({
    defaultValues: { team: farm?.team || [] }
  })
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: 'team' // unique name for your Field Array
    }
  )

  const onSubmit = (data: any) => {
    console.log(data)
    farm?.id &&
      updateFarm(farm?.id, data).then((res) => {
        console.log(res)
      })
  }
  const handleSetMember = (user: MemberTeam | null) => {
    if (user) return append(user)
  }

  return (
    <div>
      <h3 className="text-center font-bold ">Miembros del equipo</h3>
      {!!fields.length || (
        <div>
          <div>
            <span>No hay miembros del equipo aún</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 ">
        {fields.map((field, index) => (
          <div className="w-full flex gap-2 my-2" key={field.id}>
            <div className="form-control w-1/4">
              <input
                className="input input-sm  "
                // important to include key with field's id
                {...register(`team.${index}.name`, {
                  required: 'Este campo es necesario'
                })}
                placeholder="nombre"
              />
            </div>
            <div className="form-control w-full min-w-0">
              <input
                className="input input-sm  "
                placeholder="email"
                // important to include key with field's id
                {...register(`team.${index}.email`, {
                  required: 'Este campo es necesario'
                })}
              />
            </div>
            {/* ************************** TODO should add permissions for each team member **************************** */}

            <div className="flex w-24 gap-1 border justify-center ">
              <button
                className="btn btn-sm btn-circle btn-warning "
                onClick={(e) => {
                  e.preventDefault()
                  remove(index)
                }}
              >
                <Icon name="close" />
                <span className="hidden">Eliminar</span>
              </button>
              <button
                className="btn btn-sm btn-circle btn-success "
                type="submit"
              >
                <Icon name="done" />
                <span className="hidden">Guardar</span>
              </button>
            </div>
          </div>
        ))}
      </form>
      <SearchUserForm setNewUser={handleSetMember} />
    </div>
  )
}

const SearchUserForm = ({
  setNewUser
}: {
  setNewUser: (user: MemberTeam | null) => void
}) => {
  interface HelperText {
    type: 'error' | 'success' | 'info'
    message: string
  }
  const { searchUser } = useSearchUsers()
  const { handleSubmit, register } = useForm()
  const [helperText, setHelperText] = useState<HelperText | null>(null)
  const onSubmit = (data: any) => {
    searchUser({ email: data.email }).then((res) => {
      if (res) {
        setHelperText({
          message: 'Encontramos este usuario. ¿Quieres agregarlo?',
          type: 'info'
        })
        setNewUser(res)
      } else {
        console.log('user not found')
        setHelperText({ message: 'Usuario no encontrado', type: 'error' })
      }
      setTimeout(() => {
        setHelperText(null)
      }, 3000)
    })
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" my-2
      "
    >
      <div className="form-control">
        <label htmlFor="member-mail">Buscar usuario</label>
        <div className="flex mb-0">
          <input
            id="member-mail"
            className="input input-sm w-full rounded-r-none "
            placeholder="Buscar usuario"
            {...register('email')}
          />
          <button className="btn btn-info btn-sm rounded-l-none">
            <Icon name="search" />
          </button>
        </div>
        {helperText?.type === 'error' && (
          <span className="text-error label-text  ">{helperText.message}*</span>
        )}
        {helperText?.type === 'success' && (
          <span className="text-success label-text  ">
            {helperText.message}*
          </span>
        )}
        {helperText?.type === 'info' && (
          <span className="text-info label-text  ">{helperText.message}*</span>
        )}
      </div>
    </form>
  )
}

export default FarmTeamForm