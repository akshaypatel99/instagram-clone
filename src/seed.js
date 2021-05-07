export function seedDatabase(firebase) {
	const users = [
		{
			userId: 'qABxe8iNZiZoIe9nSfbSygVJFy82',
			username: 'akshay',
			fullName: 'Akshay Patel',
			emailAddress: 'akshaypatel99@gmail.com',
			following: ['2'],
			followers: ['2', '3', '4'],
			dateCreated: Date.now(),
		},
		{
			userId: '2',
			username: 'raphael',
			fullName: 'Raffaello Sanzio da Urbino',
			emailAddress: 'raphael@sanzio.com',
			following: [],
			followers: ['qABxe8iNZiZoIe9nSfbSygVJFy82'],
			dateCreated: Date.now(),
		},
		{
			userId: '3',
			username: 'dali',
			fullName: 'Salvador Dalí',
			emailAddress: 'salvador@dali.com',
			following: [],
			followers: ['qABxe8iNZiZoIe9nSfbSygVJFy82'],
			dateCreated: Date.now(),
		},
		{
			userId: '4',
			username: 'orwell',
			fullName: 'George Orwell',
			emailAddress: 'george@orwell.com',
			following: [],
			followers: ['qABxe8iNZiZoIe9nSfbSygVJFy82'],
			dateCreated: Date.now(),
		},
	];

	for (let j = 0; j < users.length; j++) {
		firebase.firestore().collection('users').add(users[j]);
	}

	for (let i = 1; i <= 5; ++i) {
		firebase
			.firestore()
			.collection('photos')
			.add({
				photoId: i,
				userId: '2',
				imageSrc: `/images/users/raphael/${i}.jpg`,
				caption: 'Saint George and the Dragon',
				likes: [],
				comments: [
					{
						displayName: 'dali',
						comment: 'Love this place, looks like my animal farm!',
					},
					{
						displayName: 'orwell',
						comment: 'Would you mind if I used this picture?',
					},
				],
				userLatitude: '40.7128°',
				userLongitude: '74.0060°',
				dateCreated: Date.now(),
			});
	}
}
