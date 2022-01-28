/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import useGuests from '@/hooks/useGuests';
import useGuestsActions from '@/hooks/useGuestsActions';
import Scanner from './Scanner';
import useCodeCheckin from './useCodeCheckin';
import AppBar from '@/components/AppBar';

const ScanPage = () => {
  const [code, setCode] = useState('');
  const { getGuestByCode } = useGuests();
  const { checkinGuest } = useGuestsActions();
  const { startCodeCheckin, confirmGuest } = useCodeCheckin();

  const handleScannerSuccess = async (data: string) => {
    const newCode = data
      .trim()
      .toUpperCase()
      .replace(/[^A-Za-z0-9]/g, '');
    setCode(newCode);
  };

  useEffect(() => {
    (async () => {
      // TODO: merge with useCodeCheckin.tsx and isolate UI actions
      const guest = getGuestByCode(code);
      if (guest && confirmGuest(guest)) {
        await checkinGuest(guest.id);
        alert(`Check-in de ${guest.name.toUpperCase()} realizado com sucesso!`);
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
      <button
        onClick={startCodeCheckin}
        style={{ position: 'absolute', bottom: 100, left: '36%' }}
      >
        Inserir código
      </button>
    </>
  );
};

export default ScanPage;
