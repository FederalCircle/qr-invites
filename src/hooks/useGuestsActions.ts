import { child, get, push, ref, update, remove } from 'firebase/database';
import { database } from '@/config/firebase';
import { CreateGuestDto, Guest, UpdateGuestDto } from '@/types';

const useGuestActions = () => {
  const guestsRef = child(ref(database), 'guests');

  const updateGuest = async (id: string, data: UpdateGuestDto) => {
    try {
      const guestRef = child(guestsRef, id);
      const guest = (await get(guestRef)).val();
      const payload = { ...guest, ...data };
      await update(guestRef, payload);
      console.log('Guest updated', payload);
    } catch (e) {
      console.error('Error updating guest: ', e);
    }
  };

  const createGuest = async (data: CreateGuestDto) => {
    try {
      const { key: newGuestId } = await push(guestsRef);
      if (newGuestId) {
        const newGuestRef = child(guestsRef, newGuestId);
        const newGuestPayload: Guest = { id: newGuestId, ...data };
        await update(newGuestRef, newGuestPayload);
        console.log('Guest created', newGuestPayload);
      }
    } catch (e) {
      console.error('Error creating guest: ', e);
    }
  };

  const deleteGuest = async (id: string) => {
    try {
      const guestRef = child(guestsRef, id);
      await remove(guestRef);
      console.log('Guest deleted', id);
    } catch (e) {
      console.error('Error deleting guest: ', e);
    }
  };

  return {
    updateGuest,
    createGuest,
    deleteGuest,
  };
};

export default useGuestActions;
