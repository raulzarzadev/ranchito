import FarmNavigation from 'components/FarmNavigation'
import FarmForm from 'components/forms/FarmForm'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUserFarm } from 'store/slices/farmSlice'

const UserFarm = () => {
  const [editing, setEditing] = useState(false)
  const userFarm = useSelector(selectUserFarm)
  return (
    <div>
      {editing ? (
        <FarmForm farm={userFarm || undefined} setEditing={setEditing} />
      ) : (
        <FarmNavigation
          farm={{
            id: userFarm?.id,
            name: userFarm?.name
          }}
          setEditing={setEditing}
          showGo={true}
        />
      )}
    </div>
  )
}

export default UserFarm
