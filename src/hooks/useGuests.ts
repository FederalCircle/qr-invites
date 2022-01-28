/* eslint-disable no-restricted-syntax */
import { useEffect, useState } from 'react';
import { child, onValue, ref } from 'firebase/database';
import { database } from '@/config/firebase';
import { Guest, Snapshot } from '@/types';

interface UseGuestsReturn {
  guests: Guest[];
  getGuestByCode: (code: string) => Guest | null;
  getGuestsByName: (input: string) => Guest[];
}

const useGuests = (): UseGuestsReturn => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const guestsRef = child(ref(database), 'guests');

  useEffect(() => {
    onValue(guestsRef, (snapshot) => {
      const guestsSnapshot: Snapshot<Guest> = snapshot.val();
      const parsedGuests = Object.values(guestsSnapshot ?? {});
      setGuests(parsedGuests);
    });
  }, []);

  const getGuestByCode = (code: string): Guest | null => {
    for (const guest of guests) {
      if (guest.code === code) {
        return guest;
      }
    }
    return null;
  };

  const getGuestsByName = (input: string): Guest[] => {
    const regexp = new RegExp(input, 'i');
    return guests.filter((guest) => regexp.test(guest.name));
  };

  return {
    guests,
    getGuestByCode,
    getGuestsByName,
  };
};

export default useGuests;
