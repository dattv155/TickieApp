import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './ConfirmBox.scss';
import LinearGradient from 'react-native-linear-gradient';
import {atomicStyles, Colors} from 'src/styles';
import {Pressable, View, Text} from 'react-native';
import Modal from 'react-native-modal';
import Spinner from 'src/components/atoms/Spinner/Spinner';
import TextGradient from 'src/components/atoms/TextGradient/TextGradient';

/**
 * File: ConfirmBox.tsx
 * @created 2021-03-16 16:43:08
 * @author tannt <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<ConfirmBoxProps>>}
 */
const ConfirmBox: FC<PropsWithChildren<ConfirmModalProps>> = (
  props: PropsWithChildren<ConfirmModalProps>,
): ReactElement => {
  const {
    title,
    description,
    descriptionColor,
    isVisible,
    onCancel,
    children,
    primaryGradient,
    primaryColor,
    onPrimaryPress,
    primaryText,
    secondaryColor,
    primaryIcon,
    primaryTextColor,
    onSecondaryPress,
    secondaryText,
    secondaryTextGradient,
    primaryLoading,
    secondaryLoading,
    secondaryTextColor,
    secondaryIcon,
  } = props;

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onCancel}
      animationIn="pulse"
      animationOut="flipOutY"
      style={[
        atomicStyles.flexRow,
        atomicStyles.justifyContentCenter,
        atomicStyles.alignItemsCenter,
      ]}>
      <View style={styles.modalView}>
        {title && (
          <>
            <TextGradient numberOfLines={1}>{title}</TextGradient>
            {description && (
              <Text
                style={[
                  atomicStyles.text,
                  atomicStyles.py8px,
                  atomicStyles.textCenter,
                  {color: descriptionColor},
                ]}>
                {description}
              </Text>
            )}
            {children}

            <View style={[styles.buttonModal]}>
              <Pressable onPress={onPrimaryPress}>
                {primaryGradient ? (
                  <LinearGradient
                    colors={[Colors.Blue, Colors.RobinsEggBlue]}
                    style={[styles.buttonPressGradient]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <Spinner loading={primaryLoading} />
                    <Text
                      style={[
                        styles.buttonText,
                        {
                          color: primaryTextColor,
                        },
                      ]}>
                      {primaryText}
                    </Text>
                    {primaryIcon}
                  </LinearGradient>
                ) : (
                  <View
                    style={[
                      styles.buttonPress,
                      atomicStyles.bgPrimary,
                      {
                        backgroundColor: primaryColor,
                      },
                    ]}>
                    <Spinner loading={primaryLoading} />
                    <Text
                      style={[
                        styles.buttonText,
                        {
                          color: primaryTextColor,
                        },
                      ]}>
                      {primaryText}
                    </Text>
                    {primaryIcon}
                  </View>
                )}
              </Pressable>
              <Pressable
                style={[
                  styles.buttonPress,
                  {
                    backgroundColor: secondaryColor,
                  },
                ]}
                onPress={onSecondaryPress}>
                <Spinner loading={secondaryLoading} />
                {secondaryTextGradient ? (
                  <TextGradient style={[styles.buttonText, atomicStyles.bold]}>
                    {secondaryText}
                  </TextGradient>
                ) : (
                  <Text
                    style={[
                      styles.buttonText,
                      {
                        color: secondaryTextColor,
                      },
                    ]}>
                    {secondaryText}
                  </Text>
                )}

                {secondaryIcon}
              </Pressable>
            </View>
          </>
        )}
        {!title && <View style={styles.contentWithoutTitle}>{children}</View>}
      </View>
    </Modal>
  );
};

export interface ConfirmModalProps {
  title?: string;

  description?: string;

  titleColor?: Colors;

  descriptionColor?: Colors;

  message?: string;

  isVisible?: boolean;

  primaryGradient?: boolean;

  primaryColor?: Colors;

  primaryText?: string;

  primaryTextColor?: Colors;

  primaryIcon?: ReactElement;

  primaryLoading?: boolean;

  secondaryColor?: Colors;

  secondaryText?: string;

  secondaryTextGradient?: boolean;

  secondaryTextColor?: Colors;

  secondaryIcon?: ReactElement;

  secondaryLoading?: boolean;

  customFooter?: boolean;

  onPrimaryPress?(): any;

  onSecondaryPress?(): any;

  onCancel?(): any;
}

ConfirmBox.defaultProps = {
  primaryColor: Colors.RobinsEggBlue,
  primaryTextColor: Colors.White,
  secondaryColor: Colors.White,
  secondaryTextColor: Colors.RobinsEggBlue,
  customFooter: false,
  primaryGradient: true,
  secondaryTextGradient: false,
};

ConfirmBox.propTypes = {
  //
};

ConfirmBox.displayName = nameof(ConfirmBox);

export default ConfirmBox;
