import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './BookingScreen.scss';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import {
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import {atomicStyles} from 'src/styles';
import ButtonSelectFilmProperties from 'src/components/atoms/ButtonSelectFilmProperties/ButtonSelectFilmProperties';
import {ListMovie} from 'src/sample/listMovies';
import ChooseSeatScreen from 'src/screens/ChooseSeatScreen/ChooseSeatScreen';

/**
 * File: BookingScreen.tsx
 * @created 2021-04-04 17:08:54
 * @author TrongDat <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<BookingScreenProps>>}
 */
const BookingScreen: FC<PropsWithChildren<BookingScreenProps>> = (
  props: PropsWithChildren<BookingScreenProps>,
): ReactElement => {
  const {navigation, route} = props;

  const keyExtractor = ({key}: any) => key;

  const renderItem: ListRenderItem<any> = React.useCallback(
    ({item, index}: ListRenderItemInfo<any>) => {
      return <ButtonSelectFilmProperties item={item} key={index} />;
    },
    [],
  );
  const handleGotoChooseSeatScreen = React.useCallback(() => {
    navigation.navigate(ChooseSeatScreen.displayName);
  }, [navigation]);

  return (
    <DefaultLayout
      navigation={navigation}
      route={route}
      left="back-button"
      // right={<HeaderIconPlaceholder />}
      gradient={false}
      customHeader={false}
      bgWhite={true}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.containerView}>
        <CalendarStrip
          startingDate={moment()}
          minDate={moment()}
          maxDate={moment().add(13, 'days')}
          calendarAnimation={{type: 'parallel', duration: 10}}
          style={{height: 68, justifyContent: 'center'}}
          calendarHeaderStyle={{color: 'blue'}}
          calendarColor={'white'}
          scrollable={true}
          dateNameStyle={{color: 'grey', fontSize: 16, fontWeight: '700'}}
          highlightDateNameStyle={{
            color: 'blue',
            fontSize: 16,
            fontWeight: '700',
          }}
          dateNumberStyle={{color: 'grey', fontSize: 20, fontWeight: '700'}}
          highlightDateNumberStyle={{
            color: 'blue',
            fontSize: 20,
            fontWeight: '700',
          }}
          // iconLeft={require('./img/left-arrow.png')}
          // iconRight={require('./img/right-arrow.png')}
          showMonth={false}
          iconContainer={{flex: 0.1}}
        />
        <View style={styles.contentView}>
          <View>
            <Text
              style={[atomicStyles.bold, atomicStyles.h1, styles.textStyle]}>
              Định dạng
            </Text>
            <View>
              <FlatList
                data={ListMovie[0].type}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                keyExtractor={keyExtractor}
                contentContainerStyle={styles.listType}
                // numColumns={3}
              />
            </View>
          </View>
          {/*<View>*/}
          {/*  <Text*/}
          {/*    style={[atomicStyles.bold, atomicStyles.h1, styles.textStyle]}>*/}
          {/*    Rạp Tickie Long Biên*/}
          {/*  </Text>*/}
          {/*  <View>*/}
          {/*    <FlatList*/}
          {/*      key={'#'}*/}
          {/*      data={ListMovie[0].time.timeLB}*/}
          {/*      renderItem={renderItem}*/}
          {/*      showsVerticalScrollIndicator={false}*/}
          {/*      keyExtractor={(item) => '#' + item}*/}
          {/*      contentContainerStyle={styles.listTime}*/}
          {/*      numColumns={3}*/}
          {/*    />*/}
          {/*  </View>*/}
          {/*</View>*/}
          {/*<View>*/}
          {/*  <Text*/}
          {/*    style={[atomicStyles.bold, atomicStyles.h1, styles.textStyle]}>*/}
          {/*    Rạp Tickie Thăng Long*/}
          {/*  </Text>*/}
          {/*  <View>*/}
          {/*    <FlatList*/}
          {/*      key={'_'}*/}
          {/*      data={ListMovie[0].time.timeTL}*/}
          {/*      renderItem={renderItem}*/}
          {/*      showsVerticalScrollIndicator={false}*/}
          {/*      keyExtractor={(item) => '_' + item}*/}
          {/*      contentContainerStyle={styles.listTime}*/}
          {/*      numColumns={3}*/}
          {/*    />*/}
          {/*  </View>*/}
          {/*</View>*/}
          <TouchableOpacity
            style={styles.buttonNext}
            onPress={handleGotoChooseSeatScreen}>
            <Text style={[atomicStyles.h4, styles.textNext]}>Tiếp theo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DefaultLayout>
  );
};

export interface BookingScreenProps extends StackScreenProps<any> {
  //
}

BookingScreen.defaultProps = {
  //
};

BookingScreen.propTypes = {
  //
};

BookingScreen.displayName = nameof(BookingScreen);

export default BookingScreen;