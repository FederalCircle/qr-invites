import React, { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';

import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import CheckIcon from '@mui/icons-material/Check';

import useGuests from '@/hooks/useGuests';
import useGuestsActions from '@/hooks/useGuestsActions';
import { Guest } from '@/types';
import AppBar from '@/components/AppBar';
import useCodeCheckin from '@/pages/ScanPage/useCodeCheckin';

const ListPage = () => {
  const { guests, getGuestsByName } = useGuests();
  const { checkinGuest } = useGuestsActions();
  const { confirmGuest } = useCodeCheckin();

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

  const handleCheckinClick = (guest: Guest) => {
    if (confirmGuest(guest)) {
      checkinGuest(guest.id);
    }
  };

  useEffect(() => {
    setGuestsList(guests);
  }, [guests]);

  return (
    <>
      <AppBar title="Convidados" />

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

      <List>
        {guestsList.map((guest) => (
          <ListItem disablePadding key={guest.id}>
            <ListItemButton>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={guest.name} secondary={guest.code} />
              {guest.hasCheckin ? (
                <CheckIcon color="success" />
              ) : (
                <Button onClick={() => handleCheckinClick(guest)}>
                  Check-in
                </Button>
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ListPage;
