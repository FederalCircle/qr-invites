import React from 'react';
import useGuest from '@/hooks/useGuests';
import useGuestActions from '@/hooks/useGuestsActions';

const ListPage = () => {
  const { guests } = useGuest();
  const { checkinGuest } = useGuestActions();

  return (
    <div>
      <ul>
        {guests.map((guest) => (
          <li key={guest.id}>
            {guest.name}{' '}
            {guest.hasCheckin ? (
              'DONE'
            ) : (
              <button onClick={() => checkinGuest(guest.id)}>Checkin</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListPage;
