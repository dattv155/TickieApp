import {Options, RNToasty} from 'react-native-toasty';

export const TOAST_DURATION: number = 1500;

const toastConfig: Partial<Options> = {
  position: 'bottom',
};

export function showError(message: string) {
  RNToasty.Error({
    title: message,
    ...toastConfig,
  });
}

export function showInfo(message: string) {
  RNToasty.Info({
    title: message,
    ...toastConfig,
  });
}

export function showWarning(message: string) {
  RNToasty.Warn({
    title: message,
    ...toastConfig,
  });
}
