import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// import { seedDatabase } from '../seed';

const config = {
	apiKey: 'AIzaSyAeaAwC_ZHJ4LfzFmLdCxz6N2lT2s05CNY',
	authDomain: 'instagram-clone-e1ed5.firebaseapp.com',
	projectId: 'instagram-clone-e1ed5',
	storageBucket: 'instagram-clone-e1ed5.appspot.com',
	messagingSenderId: '895668139755',
	appId: '1:895668139755:web:eeabadb48576cb0ae970ae',
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// seedDatabase(firebase);

export { firebase, FieldValue };
