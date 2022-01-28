import React from 'react';
import { Link } from 'react-router-dom';
import useGuests from '@/hooks/useGuests';
import useGuestsActions from '@/hooks/useGuestsActions';
import RoutePaths from '@/enums/RoutePaths';

const HomePage = () => {
  const { guests } = useGuests();
  const { createGuest, updateGuest, deleteGuest } = useGuestsActions();

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
      <Link to={RoutePaths.scanPage}>SCAN PAGE</Link>
      <Link to={RoutePaths.listPage}>LIST PAGE</Link>
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
