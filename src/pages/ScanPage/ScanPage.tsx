import React from 'react';
import useGuests from '@/hooks/useGuests';
import useGuestsActions from '@/hooks/useGuestsActions';
import { Guest } from '@/types';

const ScanPage = () => {
  const { getGuestsByCode } = useGuests();
  const { checkinGuest } = useGuestsActions();

  const promptCode = (retry = false) => {
    // TODO: Improve
    const retryText = 'Verifique o código e tente novamente.\n';
    const promptText = 'Informe o código do convite.\n';
    const exampleText = 'Ex: ABC-1234\n';
    // eslint-disable-next-line no-alert
    let code = window.prompt((retry ? retryText : promptText) + exampleText);
    if (code) {
      code = code
        .trim()
        .toUpperCase()
        .replace(/[^A-Za-z0-9]/g, '');
    }
    return code;
  };

  const confirmGuest = (guest: Guest) => {
    const confirmText = `Convidado: ${guest.name.toUpperCase()}
    \nDeseja confirmar o checkin?`;
    // eslint-disable-next-line no-alert
    return window.confirm(confirmText);
  };

  const handleCodeCheckinClick = () => {
    let retry = false;
    let guest: Guest | null = null;
    do {
      const code = promptCode(retry);
      if (code === null) break; // Cancel button
      guest = getGuestsByCode(code);
      retry = true;
    } while (guest === null);

    if (guest && confirmGuest(guest)) {
      checkinGuest(guest.id);
    }
  };

  return (
    <div>
      <button onClick={handleCodeCheckinClick}>Inserir código</button>
    </div>
  );
};

export default ScanPage;
