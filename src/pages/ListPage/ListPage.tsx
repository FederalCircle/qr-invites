import React from 'react';
import useGuests from '@/hooks/useGuests';
import useGuestsActions from '@/hooks/useGuestsActions';

const ListPage = () => {
  const { guests } = useGuests();
  const { checkinGuest } = useGuestsActions();

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
