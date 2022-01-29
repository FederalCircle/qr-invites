/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import useGuests from '@/hooks/useGuests';
import useGuestsActions from '@/hooks/useGuestsActions';
import AppBar from '@/components/AppBar';

import Scanner from './Scanner';
import useCodeCheckin from './useCodeCheckin';
import { parseCode } from '@/utils/utils';
import RoutePaths from '@/enums/RoutePaths';

const FloatingButton = styled(Button)`
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translate(-50%, 0);
`;

const ScanPage = () => {
  const [code, setCode] = useState('');
  const { guests, getGuestByCode } = useGuests();
  const { checkinGuest } = useGuestsActions();
  const { startCodeCheckin, confirmGuest } = useCodeCheckin();
  const navigate = useNavigate();

  const handleScannerSuccess = async (data: string) => {
    const newCode = parseCode(data);
    setCode(newCode);
  };

  useEffect(() => {
    (async () => {
      // TODO: merge with useCodeCheckin.tsx and isolate UI actions
      const guest = getGuestByCode(code);
      console.log('code', code);
      console.log('guest', guest);
      if (guest && confirmGuest(guest)) {
        await checkinGuest(guest.id);
        alert(`Check-in de ${guest.name.toUpperCase()} realizado com sucesso!`);
        navigate(RoutePaths.homePage);
      }
    })();
  }, [code]);

  return (
    <>
      <AppBar title="Check-in" />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <Scanner
          id="qrScanner"
          style={{ height: '100vh' }}
          onSuccess={handleScannerSuccess}
        />
      </div>
      <FloatingButton
        variant="contained"
        onClick={startCodeCheckin}
        // style={{ position: 'absolute', bottom: 100, left: '50%' }}
      >
        Inserir código
      </FloatingButton>
    </>
  );
};

export default ScanPage;
