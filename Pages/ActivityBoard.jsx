import { View, Text, StyleSheet, ImageBackground, LogBox } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-native-elements';
import WeekView, { createFixedWeekDate } from 'react-native-week-view';

// LogBox.ignoreWarnings([
//   'Non-serializable values were found in the navigation state',
// ]);

export default function ActivityBoard(props) {

  //send to new activity
  const [date, SetDate] = useState();
  const [startHour, SetStartHour] = useState();

  //Events
  const [types] = useState(['תרגול', 'פנאי', 'תפקוד']);
  const [myEvents, setMyEvents] = useState([]);

  apiUrlEvents = "https://proj.ruppin.ac.il/igroup83/test2/tar6/api/Activity?activityClassification";

  //Number of days in calender
  const [daysNumber, SetDaysNumber] = useState(7);
  const MyTodayComponent = ({ formattedDate, textStyle }) => (
    <Text style={[textStyle, { fontWeight: 'bold' }]}>{formattedDate}</Text>
  );

  //Back
  //const back = props.route.params.back;
  const back = false; //זמני

  // const myEvents = [
  //   {
  //     id: 0,
  //     key: 0,
  //     description: 'Event1',
  //     startDate: new Date("2022-03-27T01:00:00"),
  //     endDate: new Date("2022-03-27T02:00:00"),
  //     color: 'blue',
  //     // ... more properties if needed,
  //   },
  //   {
  //     id: 0,
  //     key: 0,
  //     description: 'Event1',
  //     startDate: createFixedWeekDate('Monday', 7),
  //     endDate: createFixedWeekDate('Monday', 8),
  //     color: 'blue',
  //     // ... more properties if needed,
  //   },
  //   {
  //     id: 1,
  //     key: 1,
  //     description: 'Event1',
  //     startDate: createFixedWeekDate('Monday', 0),
  //     endDate: createFixedWeekDate('Monday', 2),
  //     color: 'pink',
  //     // ... more properties if needed,
  //   },
  //   {
  //     id: 2,
  //     key: 2,
  //     description: 'Event1',
  //     startDate: createFixedWeekDate('Monday', 3),
  //     endDate: createFixedWeekDate('Monday', 5),
  //     color: 'yellow',
  //     // ... more properties if needed,
  //   },
  //   // More events...
  // ];

  //EVERY RENDER
  useEffect(() => {

    types.map((item) => {
      //get type percent
      fetch(apiUrlEvents + "=" + item, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json ; charset=UTP-8',
          'Accept': 'application/json ; charset=UTP-8'
        })
      })
        .then(res => {
          return res;
        })
        .then(
          (result) => {

            console.log('OK Events', item, result.json());

            if (result) {
              var obj = result.map(event => event);
              obj.map((event) => {
                let newObj = [...myEvents,event];
                setMyEvents(newObj);
              })
            } else {
              console.log('Events in empty');
            }

          },
          (error) => {
            console.log("err GET events=", error);
          });
    })




  }, [back]);


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
          weekStartsOn={6}
          //onEventPress={} //לחיצה על אירוע
          onGridClick={(pressEvent, startHour, date) => { SetDate(date), SetStartHour(startHour), props.navigation.navigate('Add Activity', { Date: date, StartHour: startHour }) }} //לחיצה לשיבוץ פעילות
        />
      </View>

      <Button
        title="אישור"
        buttonStyle={styles.buttonStyle}
        titleStyle={styles.titleStyle}
        containerStyle={styles.containerStyle}
        onPress={() => props.navigation.navigate('Add Activity')}
      />

    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 600,
    top: 8,
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
    top: -15,
    left: 90,
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
    marginHorizontal: 20,
    width: 380,
    top: 20,
  },

  iconContainerStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    top: 10,
    marginHorizontal: 2,
  },

});

