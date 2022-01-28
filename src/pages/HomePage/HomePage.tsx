import React from 'react';
import useGuest from '@/hooks/useGuests';
import useGuestActions from '@/hooks/useGuestsActions';

const HomePage = () => {
  const { guests } = useGuest();
  const { createGuest, updateGuest, deleteGuest } = useGuestActions();

  const addData = () => {
    createGuest({
      name: 'John Doe',
      code: 'ABC123',
      tags: ['noivo'],
    });
  };

  const updateData = (id: string) => {
    updateGuest(id, {
      name: 'John Doe UPDATED',
      tags: ['noiva'],
    });
  };

  const deleteData = (id: string) => {
    deleteGuest(id);
  };

  return (
    <header className="App-header">
      <button onClick={addData}>Add</button>
      <div>
        <ul>
          {guests.map((guest) => (
            <li key={guest.id}>
              {guest.name}{' '}
              <button onClick={() => updateData(guest.id)}>Update</button>
              <button onClick={() => deleteData(guest.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default HomePage;
