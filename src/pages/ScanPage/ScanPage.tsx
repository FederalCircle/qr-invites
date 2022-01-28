/* eslint-disable no-alert */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import useGuests from '@/hooks/useGuests';
import useGuestsActions from '@/hooks/useGuestsActions';
import Scanner from './Scanner';
import useCodeCheckin from './useCodeCheckin';

const ScanPage = () => {
  const [code, setCode] = useState('');
  const { guests, getGuestsByCode } = useGuests();
  const { checkinGuest } = useGuestsActions();
  const { startCodeCheckin, confirmGuest } = useCodeCheckin();

  const handleScannerSuccess = async (data: string) => {
    console.log('QRCode: ', data);
    const newCode = data
      .trim()
      .toUpperCase()
      .replace(/[^A-Za-z0-9]/g, '');
    setCode(newCode);
  };

  useEffect(() => {
    (async () => {
      // TODO: merge with useCodeCheckin.tsx and isolate UI actions
      const guest = getGuestsByCode(code);
      console.log('guest', guest);
      if (guest && confirmGuest(guest)) {
        await checkinGuest(guest.id);
        alert(`Checking de ${guest.name.toUpperCase()} realizado com sucesso!`);
      }
    })();
  }, [code]);

  console.log('ScanPage:guests', guests);
  return (
    <div>
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
    </div>
  );
};

export default ScanPage;
