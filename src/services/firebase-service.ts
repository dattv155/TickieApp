import auth from '@react-native-firebase/auth';
import {AuthDetails} from '../types';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {showError, showInfo, showWarning} from 'src/helpers/toast';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';

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
            gender: 'Khác',
            province: 'Hà Nội',
            userImg: '',
            createAt: firestore.Timestamp.fromDate(new Date()),
          })
          .catch(() => {
            showWarning('Không tạo được người dùng trong Firebase');
          });
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          showWarning('E-mail đã được sử dụng.');
        } else if (error.code === 'auth/invalid-email') {
          showWarning('Email sai cấu trúc.');
        } else if (error.code === 'auth/weak-password') {
          showWarning('Mật khẩu yếu (Mật khẩu cần 6 ký tự trở lên).');
        } else if (error.code === 'auth/too-many-requests') {
          showWarning('Đăng nhập quá nhiều lần. Hãy thử lại trong giây lát.');
        } else {
          showWarning('Hãy kiểm tra Internet của bạn.');
        }
      });
    return {};
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      return {
        error: 'E-mail đã được sử dụng.',
      };
    } else if (error.code === 'auth/invalid-email') {
      return {
        error: 'Email sai cấu trúc.',
      };
    } else if (error.code === 'auth/weak-password') {
      return {
        error: 'Mật khẩu yếu (Mật khẩu cần 6 ký tự trở lên).',
      };
    } else if (error.code === 'auth/too-many-requests') {
      return {
        error: 'Đăng nhập quá nhiều lần. Hãy thử lại trong giây lát.',
      };
    }
    return {
      error: 'Hãy kiểm tra Internet của bạn.',
    };
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
        firestore()
          .collection('users')
          .doc(auth().currentUser.uid)

          .set({
            uid: auth().currentUser.uid,
            fullname: auth().currentUser.displayName,
            phoneNumber: '',
            dateOfBirth: new Date(),
            gender: 'Khác',
            province: 'Hà Nội',
            email: auth().currentUser.email,
            createdAt: firestore.Timestamp.fromDate(new Date()),
            userImg: auth().currentUser.photoURL,
          })
          //   //ensure we catch any errors at this stage to advise us if something does go wrong
          .catch(() => {
            showWarning('Không tạo được người dùng trong Firebase');
          });
      })
      //we need to catch the whole sign up process if it fails too.
      .catch(() => {
        showWarning('Đăng nhập Google lỗi.');
      });
  } catch (e) {
    showWarning(e.toString());
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
      // return {error: 'User cancelled the login process'};
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      return {error: 'Lỗi: Không lấy được Token'};
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
        firestore()
          .collection('users')
          .doc(auth().currentUser.uid)
          .set({
            uid: auth().currentUser.uid,
            fullname: auth().currentUser.displayName,
            phoneNumber: '',
            dateOfBirth: new Date(),
            gender: 'Khác',
            province: 'Hà Nội',
            email: auth().currentUser.email,
            createdAt: firestore.Timestamp.fromDate(new Date()),
            userImg: auth().currentUser.photoURL,
          })
          //ensure we catch any errors at this stage to advise us if something does go wrong
          .catch(() => {
            showWarning('Không tạo được người dùng trong Firebase');
          });
      })
      //we need to catch the whole sign up process if it fails too.
      .catch((error) => {
        if (error.code === 'auth/account-exists-with-different-credential') {
          showWarning('Tài khoản được đã được sử dụng!');
        }
      });
  } catch (e) {
    showWarning('Đăng nhập Facebook bị lỗi.');
  }
};

export const loginUser = async ({email, password}: AuthDetails) => {
  try {
    await auth().signInWithEmailAndPassword(email, password);
    return {};
  } catch (error) {
    if (error.code === 'auth/invalid-email') {
      return {
        error: 'Địa chỉ email không chính xác.',
      };
    } else if (error.code === 'auth/user-not-found') {
      return {
        error: 'Tài khoản không tồn tại.',
      };
    } else if (error.code === 'auth/wrong-password') {
      return {
        error: 'Địa chỉ email hoặc mật khẩu không chính xác.',
      };
    } else if (error.code === 'auth/too-many-requests') {
      return {
        error: 'Đăng nhập quá nhiều lần. Hãy thử lại trong giây lát.',
      };
    }
    return {
      error: 'Hãy kiểm tra Internet của bạn.',
    };
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

const reauthenticate = (currentPassword: string) => {
  var user = auth().currentUser;
  var cred = auth.EmailAuthProvider.credential(user.email, currentPassword);
  return user.reauthenticateWithCredential(cred);
};

export const changePassword = async (
  currentPassword: string,
  newPassword: string,
) => {
  try {
    reauthenticate(currentPassword)
      .then(() => {
        var user = auth().currentUser;
        user
          .updatePassword(newPassword)
          .then(() => {
            showInfo('Cập nhật mật khẩu mới thành công');
          })
          .catch((e) => {
            showError(e.toString());
          });
      })
      .catch((e) => {
        showError(e.toString());
      });
  } catch (e) {
    showError(e.toString());
  }
};
