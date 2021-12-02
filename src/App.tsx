import React, { useEffect, useState } from 'react';
import './App.css';
import { child, onValue, push, ref } from 'firebase/database';
import { database } from './config/firebase';

interface Guest {
  name: string;
}

const App = () => {
  const [guests, setGuests] = useState<Record<string, Guest>>({});
  const addData = async () => {
    try {
      const id = push(child(ref(database), 'guests'), {
        name: 'John Doe',
      }).key;
      console.log('Document written with ID: ', id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  useEffect(() => {
    const guestsRef = child(ref(database), 'guests');
    onValue(guestsRef, (snapshot) => {
      const data: Record<string, Guest> = snapshot.val();
      if (data) {
        console.log('Guests Retrieved', data);
        setGuests(data);
      }
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={addData}>Add</button>
        <div>
          <ul>
            {Object.keys(guests).map((guestId) => (
              <li key={guestId}>{guests[guestId].name}</li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
};

export default App;
