import { useEffect, useState } from 'react';
import { child, onValue, ref } from 'firebase/database';
import { database } from '@/config/firebase';
import { Guest, Snapshot } from '@/types';

const useGuest = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const guestsRef = child(ref(database), 'guests');

  useEffect(() => {
    onValue(guestsRef, (snapshot) => {
      const guestsSnapshot: Snapshot<Guest> = snapshot.val();
      const parsedGuests = Object.values(guestsSnapshot ?? {});
      setGuests(parsedGuests);
    });
  }, []);

  return {
    guests,
  };
};

export default useGuest;
