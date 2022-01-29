/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-alert */
import React from 'react';
import { Button } from '@mui/material';

import useGuests from '@/hooks/useGuests';
import useGuestsActions from '@/hooks/useGuestsActions';
import AppBar from '@/components/AppBar';
import allGuests from './allGuests';
import { Guest } from '@/types';
import { parseCode } from '@/utils/utils';

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

  const resetGuest = (guest: Guest) => {
    if (window.confirm(`reset ${guest.name.toUpperCase()}?`)) {
      updateGuest(guest.id, {
        hasCheckin: false,
      });
    }
  };

  const deleteData = (id: string) => {
    deleteGuest(id);
  };

  const insertAllGuests = () => {
    if (window.confirm('INSERT all guests?')) {
      allGuests.forEach((guest) => {
        const [code, name] = guest;
        createGuest({
          name,
          code: parseCode(code),
          tags: ['noivo'],
        });
      });
    }
  };

  const removeAllGuests = () => {
    if (window.confirm('REMOVE all guests?')) {
      guests.forEach((guest) => {
        deleteGuest(guest.id);
      });
    }
  };

  return (
    <>
      <AppBar hasBackButton={false} title="DEVELOPER" />
      <Button variant="contained" onClick={insertAllGuests}>
        INSERT ALL GUESTS
      </Button>
      <Button variant="contained" onClick={removeAllGuests}>
        REMOVE ALL GUESTS
      </Button>
      <div>
        <ul>
          {guests.map((guest) => (
            <li
              key={guest.id}
              style={{ border: '1px solid white', display: 'flex', padding: 5 }}
            >
              <div style={{ flex: 1 }}>
                {guest.name}
                <br />
                <span>
                  {guest.code} · {guest.hasCheckin ? 'true' : 'false'}
                </span>
              </div>
              <Button onClick={() => resetGuest(guest)}>Reset</Button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default DevPage;
