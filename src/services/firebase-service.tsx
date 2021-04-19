import auth from '@react-native-firebase/auth';
import {AuthDetails} from '../types';
import firestore from '@react-native-firebase/firestore';
import React from 'react';

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
