import { useNavigate } from 'react-router-dom';
import { Guest } from '@/types';
import useGuests from '@/hooks/useGuests';
import useGuestsActions from '@/hooks/useGuestsActions';
import { parseCode } from '@/utils/utils';
import RoutePaths from '@/enums/RoutePaths';

const useCodeCheckin = () => {
  const { getGuestByCode } = useGuests();
  const { checkinGuest } = useGuestsActions();
  const navigate = useNavigate();

  const promptCode = (retry = false) => {
    // TODO: Improve
    const retryText = 'Verifique o código e tente novamente.\n';
    const promptText = 'Informe o código do convite.\n';
    const exampleText = 'Ex: ABC-1234\n';
    // eslint-disable-next-line no-alert
    let code = window.prompt((retry ? retryText : promptText) + exampleText);
    if (code) {
      code = parseCode(code);
    }
    return code;
  };

  const confirmGuest = (guest: Guest) => {
    const confirmText = `Convidado: ${guest.name.toUpperCase()}
    \nDeseja confirmar o checkin?`;
    // eslint-disable-next-line no-alert
    return window.confirm(confirmText);
  };

  const startCodeCheckin = async () => {
    let retry = false;
    let guest: Guest | null = null;
    do {
      const code = promptCode(retry);
      if (code === null) break; // Cancel button
      guest = getGuestByCode(code);
      retry = true;
    } while (guest === null);

    if (guest && confirmGuest(guest)) {
      await checkinGuest(guest.id);
      alert(`Check-in de ${guest.name.toUpperCase()} realizado com sucesso!`);
      navigate(RoutePaths.homePage);
    }
  };

  return {
    confirmGuest,
    startCodeCheckin,
  };
};

export default useCodeCheckin;
