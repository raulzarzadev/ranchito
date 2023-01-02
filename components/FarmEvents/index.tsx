import Icon from 'components/Icon'
import Modal from 'components/modal'
import { useState } from 'react'

export interface FarmEvent {
  id: string
}

const FarmEvents = ({ events }: { events: FarmEvent[] }) => {
  return (
    <div>
      <div role="events-list">
        {/* {events.map((event) => (
          <FarmEvent key={event.id} event={event} />
        ))} */}
      </div>
    </div>
  )
}

export const FarmEvent = ({ event }: { event: FarmEvent }) => {
  return (
    <>
      <EventDetails event={event} />
      <div className=""></div>
    </>
  )
}

export const EventDetails = ({ event }: { event: FarmEvent }) => {
  const [openEventDetails, setOpenEventDetails] = useState(false)
  const handleOpenEventDetails = () => {
    setOpenEventDetails(!openEventDetails)
  }
  return (
    <>
      <div>
        <button onClick={(e) => handleOpenEventDetails()}>
          <Icon name="settings" />
        </button>
      </div>
      <Modal
        open={openEventDetails}
        handleOpen={handleOpenEventDetails}
        title="Detalles del Evento"
      >
        <div>
          <EventDetails event={event} />
        </div>
      </Modal>
    </>
  )
}

export default FarmEvents