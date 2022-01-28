import React from 'react';
import { Link } from 'react-router-dom';
import useGuests from '@/hooks/useGuests';
import useGuestsActions from '@/hooks/useGuestsActions';
import RoutePaths from '@/enums/RoutePaths';
import AppBar from '@/components/AppBar';

const DevPage = () => {
  const { guests } = useGuests();
  const { createGuest, updateGuest, deleteGuest } = useGuestsActions();

  const addData = () => {
    createGuest({
      name: 'Alyson Maia',
      code: 'HXV5610',
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
    <>
      <AppBar hasBackButton={false} title="DEVELOPER" />
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
    </>
  );
};

export default DevPage;
