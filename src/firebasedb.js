import firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyDqaDwQ0q5K6F8hnXMfk0rHAK-mxoVU0d8',
  authDomain: 'reactstarter-7f739.firebaseapp.com',
  databaseURL: 'https://reactstarter-7f739.firebaseio.com',
  storageBucket: 'reactstarter-7f739.appspot.com',
};

firebase.initializeApp(config);

const database = firebase.database().ref('notes');

// callback is a function
export function subscribeNotes(callback) {
  database.on('value', (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
}

export function createNotes(note) {
  database.push(note);
}

export function deleteNote(id) {
  database.child(id).remove();
}

export function updateNotes(id, fields) {
  database.child(id).update(fields);
}
