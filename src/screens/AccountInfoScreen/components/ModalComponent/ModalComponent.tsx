import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './ModalComponent.scss';
import {SafeAreaView, View} from 'react-native';
import Modal from 'react-native-modal';

/**
 * File: ModalComponent.tsx
 * @created 2021-07-17 00:18:35
 * @author Ngo Tien Tan <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<ModalComponentProps>>}
 */
const ModalComponent: FC<PropsWithChildren<ModalComponentProps>> = (
  props: PropsWithChildren<ModalComponentProps>,
): ReactElement => {
  const {children, isVisible, onBackdropPress} = props;

  return (
    <Modal
      onBackdropPress={onBackdropPress}
      isVisible={isVisible}
      backdropOpacity={0.2}>
      <SafeAreaView style={styles.modalContainer}>
        <View style={{alignItems: 'center'}}>
          <View style={styles.swipeDown} />
          {children}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export interface ModalComponentProps {
  //

  isVisible: boolean;

  onBackdropPress: () => void;
}

ModalComponent.defaultProps = {
  //
};

ModalComponent.propTypes = {
  //
};

ModalComponent.displayName = nameof(ModalComponent);

export default React.memo(ModalComponent);
