/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-alert */
import React, { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import SearchIcon from '@mui/icons-material/Search';

import useGuests from '@/hooks/useGuests';
import useGuestsActions from '@/hooks/useGuestsActions';
import AppBar from '@/components/AppBar';
import allGuests from './allGuests';
import { Guest } from '@/types';
import { parseCode } from '@/utils/utils';

const DevPage = () => {
  const { guests, getGuestsByName } = useGuests();
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
    if (window.prompt('INSERT all guests? Type CONFIRM') === 'CONFIRM') {
      allGuests.forEach((guest) => {
        const [code, name] = guest;
        createGuest({
          name,
          code: parseCode(code),
          tags: ['noivo'],
        });
      });
    } else {
      alert('Operation not executed.');
    }
  };

  const removeAllGuests = () => {
    if (window.prompt('REMOVE all guests? Type CONFIRM') === 'CONFIRM') {
      guests.forEach((guest) => {
        deleteGuest(guest.id);
      });
    } else {
      alert('Operation not executed.');
    }
  };

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
    <>
      <AppBar hasBackButton={false} title="DEVELOPER" />
      <Grid container justifyContent="space-around" sx={{ margin: '16px 0' }}>
        <Button variant="contained" onClick={insertAllGuests}>
          INSERT ALL GUESTS
        </Button>
        <Button variant="contained" onClick={removeAllGuests}>
          REMOVE ALL GUESTS
        </Button>
      </Grid>

      <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor="search">Nome do convidado</InputLabel>
        <OutlinedInput
          id="search"
          type="text"
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
          label="Password"
          onChange={handleInputChange}
        />
      </FormControl>

      <div>
        <ul style={{ padding: 0 }}>
          {guestsList.map((guest) => (
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
