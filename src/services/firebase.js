import { firebase, FieldValue } from '../library/firebase';

export async function doesUsernameExist(username) {
	const result = await firebase
		.firestore()
		.collection('users')
		.where('username', '==', username)
		.get();

	return result.docs.length > 0;
}

export async function getUserByUserId(userId) {
	const result = await firebase
		.firestore()
		.collection('users')
		.where('userId', '==', userId)
		.get();

	const user = result.docs.map((item) => ({
		...item.data(),
		docId: item.id,
	}));
	return user;
}

export async function getSuggestedProfiles(userId, following) {
	let query = firebase.firestore().collection('users');

	if (following.length > 0) {
		query = query.where('userId', 'not-in', [...following, userId]);
	} else {
		query = query.where('userId', '!=', userId);
	}

	const result = await query.limit(10).get();

	const profiles = result.docs.map((user) => ({
		...user.data(),
		docId: user.id,
	}));

	return profiles;
	// const result = await firebase.firestore().collection('users').limit(10).get();
}

export async function updateLoggedInUserFollowing(
	loggedInUserDocId, // Currently logged in user
	profileId, // Profile that current user requests to follow
	isFollowingProfile // Is logged in user currently following profile
) {
	return firebase
		.firestore()
		.collection('users')
		.doc(loggedInUserDocId)
		.update({
			following: isFollowingProfile
				? FieldValue.arrayRemove(profileId)
				: FieldValue.arrayUnion(profileId),
		});
}

export async function updateFollowedUserFollowers(
	profileDocId, // Currently logged in user doc id
	loggedInUserDocId, // Profile that current user requests to follow
	isFollowingProfile // Is logged in user currently following profile
) {
	return firebase
		.firestore()
		.collection('users')
		.doc(profileDocId)
		.update({
			followers: isFollowingProfile
				? FieldValue.arrayRemove(loggedInUserDocId)
				: FieldValue.arrayUnion(loggedInUserDocId),
		});
}

export async function getPhotos(userId, following) {
	const result = await firebase
		.firestore()
		.collection('photos')
		.where('userId', 'in', following)
		.get();

	const userFollowedPhotos = result.docs.map((photo) => ({
		...photo.data(),
		docId: photo.id,
	}));

	const photosWithUserDetails = await Promise.all(
		userFollowedPhotos.map(async (photo) => {
			let userLikedPhoto = false;
			if (photo.likes.includes(userId)) {
				userLikedPhoto = true;
			}

			const user = await getUserByUserId(photo.userId);
			const { username } = user[0];
			return { username, ...photo, userLikedPhoto };
		})
	);

	return photosWithUserDetails;
}
