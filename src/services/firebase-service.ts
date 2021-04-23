import auth from '@react-native-firebase/auth';
import {AuthDetails} from '../types';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-simple-toast';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk';

export const logoutUser = () => {
  auth().signOut();
};

export const signInUser = async ({email, password}: AuthDetails) => {
  try {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firestore()
          .collection('users')
          .doc(auth().currentUser.uid)
          .set({
            uid: auth().currentUser.uid,
            fullname: '',
            email: email,
            phoneNumber: '',
            dateOfBirth: new Date(),
            gender: '',
            province: '',
            createAt: firestore.Timestamp.fromDate(new Date()),
          });
      });
    return {};
  } catch (error) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return {
          error: 'E-mail already in use.',
        };
      case 'auth/invalid-email':
        return {
          error: 'Invalid e-mail address format.',
        };
      case 'auth/weak-password':
        return {
          error: 'Password is too weak.',
        };
      case 'auth/too-many-requests':
        return {
          error: 'Too many request. Try again in a minute.',
        };
      default:
        return {
          error: 'Check your internet connection.',
        };
    }
  }
};

export const logInByGoogle = async () => {
  try {
    GoogleSignin.configure({
      webClientId:
        '882927407357-42g1r9e2e49p1pke081lfn3crpkdvgha.apps.googleusercontent.com',
    });
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    await auth()
      .signInWithCredential(googleCredential)
      // Use it only when user Sign's up,
      // so create different social signup function
      .then(() => {
        //   //Once the user creation has happened successfully, we can add the currentUser into firestore
        //   //with the appropriate details.
        console.log('current User', auth().currentUser);
        firestore()
          .collection('users')
          .doc(auth().currentUser.uid)

          .set({
            fname: '',
            lname: '',
            email: auth().currentUser.email,
            createdAt: firestore.Timestamp.fromDate(new Date()),
            userImg: null,
          })
          //   //ensure we catch any errors at this stage to advise us if something does go wrong
          .catch((error) => {
            Toast.show(
              'Something went wrong with added user to firestore: ',
              error,
            );
          });
      })
      //we need to catch the whole sign up process if it fails too.
      .catch((error) => {
        Toast.show('Something went wrong with sign up: ', error);
      });
  } catch (e) {
    Toast.show(e.toString());
  }
};

export const loginByFacebook = async () => {
  try {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      return {error: 'User cancelled the login process'};
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      return {error: 'Something went wrong obtaining access token'};
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    await auth()
      .signInWithCredential(facebookCredential)
      // Use it only when user Sign's up,
      // so create different social signup function
      .then(() => {
        //Once the user creation has happened successfully, we can add the currentUser into firestore
        //with the appropriate details.
        console.log('current User', auth().currentUser);
        firestore()
          .collection('users')
          .doc(auth().currentUser.uid)
          .set({
            fname: '',
            lname: '',
            email: auth().currentUser.email,
            createdAt: firestore.Timestamp.fromDate(new Date()),
            userImg: null,
          })
          //ensure we catch any errors at this stage to advise us if something does go wrong
          .catch((error) => {
            Toast.show(
              'Something went wrong with added user to firestore: ',
              error,
            );
          });
        return {};
      })
      //we need to catch the whole sign up process if it fails too.
      .catch((error) => {
        Toast.show('Something went wrong with sign up: ', error);
      });
  } catch (e) {
    Toast.show(e.toString);
  }
};

export const loginUser = async ({email, password}: AuthDetails) => {
  try {
    await auth().signInWithEmailAndPassword(email, password);
    return {};
  } catch (error) {
    switch (error.code) {
      case 'auth/invalid-email':
        return {
          error: 'Invalid email address format.',
        };
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return {
          error: 'Invalid email address or password.',
        };
      case 'auth/too-many-requests':
        return {
          error: 'Too many request. Try again in a minute.',
        };
      default:
        return {
          error: 'Check your internet connection.',
        };
    }
  }
};

export const sendEmailWithPassword = async (email: string) => {
  try {
    await auth().sendPasswordResetEmail(email);
    return {};
  } catch (error) {
    switch (error.code) {
      case 'auth/invalid-email':
        return {
          error: 'Invalid email address format.',
        };
      case 'auth/user-not-found':
        return {
          error: 'User with this email does not exist.',
        };
      case 'auth/too-many-requests':
        return {
          error: 'Too many request. Try again in a minute.',
        };
      default:
        return {
          error: 'Check your internet connection.',
        };
    }
  }
};
