import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { Button } from 'react-native-elements';
import WeekView, { createFixedWeekDate } from 'react-native-week-view';


export default function ActivityBoard({ navigation }) {

  const myEvents = [
    {
      id: 0,
      key: 0,
      description: 'Event1',
      startDate: createFixedWeekDate('Monday', 7),
      endDate: createFixedWeekDate('Monday', 8),
      color: 'blue',
      // ... more properties if needed,
    },
    {
      id: 1,
      key: 1,
      description: 'Event1',
      startDate: createFixedWeekDate('Monday', 0),
      endDate: createFixedWeekDate('Monday', 2),
      color: 'pink',
      // ... more properties if needed,
    },
    {
      id: 2,
      key: 2,
      description: 'Event1',
      startDate: createFixedWeekDate('Monday', 3),
      endDate: createFixedWeekDate('Monday', 5),
      color: 'yellow',
      // ... more properties if needed,
    },
    // More events...
  ];

  const MyTodayComponent = ({ formattedDate, textStyle }) => (
    <Text style={[textStyle, { fontWeight: 'bold' }]}>{formattedDate}</Text>
  );

  //Number of days in calender
  const [daysNumber, SetDaysNumber] = useState(7);

  return (
    <ImageBackground source={require('../images/background1.png')} resizeMode="cover" style={styles.image}>
      <Text style={styles.title}>מרשם עיסוקים</Text>

      <View style={styles.iconContainerStyle}>
        <Button
          title="יומי"
          buttonStyle={{
            backgroundColor: '#E5E5E5',
            borderColor: '#E5E5E5',
            borderWidth: 1,
          }}
          titleStyle={{
            fontSize: 20,
            color: 'black'
          }}
          containerStyle={{
            marginHorizontal: 3,
            width: 205,
            height: 50
          }}
          onPress={() => SetDaysNumber(1)}
        />

        <Button
          title="שבועי"
          buttonStyle={{
            backgroundColor: '#E5E5E5',
            borderColor: '#E5E5E5',
            borderWidth: 1,
          }}
          titleStyle={{
            fontSize: 20,
            color: 'black'
          }}
          containerStyle={{
            marginHorizontal: 3,
            width: 205,
            height: 50
          }}
          onPress={() => SetDaysNumber(7)}
        />
      </View>

      <View style={styles.container}>
        <WeekView
          events={myEvents}
          selectedDate={new Date()}
          numberOfDays={daysNumber} //מספר הימים המוצגים
          showTitle={true}
          headerStyle={{ backgroundColor: '#EFEFEF', borderColor: '#EFEFEF' }}
          hoursInDisplay={14} //מקטין את המרווחים בין השעות
          TodayHeaderComponent={MyTodayComponent}
          formatDateHeader="ddd DD"
          // fixedHorizontally={true}
          weekStartsOn={0}
        />
      </View>

      <Button
        title="אישור"
        buttonStyle={styles.buttonStyle}
        titleStyle={styles.titleStyle}
        containerStyle={styles.containerStyle}
        onPress={() => navigation.navigate('Add Activity')}
      />

    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 550,
    top: 60,
    marginHorizontal: 5,
    shadowColor: 'black',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 56, height: 13 },
    shadowRadius: 5,
    shadowOffset: { width: 0.1, height: 0.1 },
  },

  image: {
    flex: 1,
    justifyContent: "center"
  },

  title: {
    top: 10,
    left: 50,
    fontFamily: 'Arial',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 40,
    color: '#000000',
  },

  buttonStyle: {
    backgroundColor: '#D3DE32',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000000',
    shadowColor: 'black',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 56, height: 13 },
    shadowRadius: 5,
    shadowOffset: { width: 0.1, height: 0.1 },
  },

  titleStyle: {
    fontSize: 20,
    color: 'black'
  },

  containerStyle: {
    marginHorizontal: 25,
    width: 380,
    top: 85,
  },

  iconContainerStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    top: 50,
    marginHorizontal: 2,
  },

});

