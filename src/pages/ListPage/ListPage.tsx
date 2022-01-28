import React, { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';

import useGuests from '@/hooks/useGuests';
import useGuestsActions from '@/hooks/useGuestsActions';
import { Guest } from '@/types';

const ListPage = () => {
  const { guests, getGuestsByName } = useGuests();
  const { checkinGuest } = useGuestsActions();

  const [guestsList, setGuestsList] = useState<Guest[]>([]);

  const bareHandleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const inputText = event.target.value.trim();
    if (inputText) {
      setGuestsList(getGuestsByName(inputText));
    } else {
      setGuestsList(guests);
    }
  };

  const handleInputChange = useCallback(
    debounce(bareHandleInputChange, 300, { leading: false }),
    [bareHandleInputChange],
  );

  useEffect(() => {
    setGuestsList(guests);
  }, [guests]);

  return (
    <div style={{ color: 'white' }}>
      <input type="text" onChange={handleInputChange} />
      <ul>
        {guestsList.map((guest) => (
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
