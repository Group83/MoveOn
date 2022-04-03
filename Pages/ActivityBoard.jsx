import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-native-elements';
import WeekView, { createFixedWeekDate } from 'react-native-week-view';
import { Icon, Overlay, Header } from 'react-native-elements';

export default function ActivityBoard(props) {

  //color types
  const colors = { 'תרגול': '#FDA551', 'תפקוד': '#F9677C', 'פנאי': '#9E82F6' };
  const [idAct, setIdAct] = useState(0);

  //Events
  //DATA - url
  const apiUrlEvents = "https://proj.ruppin.ac.il/igroup83/test2/tar6/api/PatientActivity?id";
  const [myEvents, setMyEvents] = useState([]);

  //Number of days in calender
  const [daysNumber, SetDaysNumber] = useState(7);
  const MyTodayComponent = ({ formattedDate, textStyle }) => (
    <Text style={[textStyle, { fontWeight: 'bold' }]}>{formattedDate}</Text>
  );

  const [back, setBack] = useState(props.route.params.back);

  //Overlay
  const [visible, setVisible] = useState(false);
  const toggleOverlay = (e) => {
    setVisible(!visible);
    setIdAct(e.id);
  };

  const urlDelete = "https://proj.ruppin.ac.il/igroup83/test2/tar6/api/PatientActivity?id";

  const deleteActivity = () => {

    setVisible(!visible);

    //delete activity from data
    fetch(urlDelete + "=" + idAct, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json ; charset=UTP-8',
        'Accept': 'application/json ; charset=UTP-8'
      })
    }).then(res => {
      return res;
    }).then((result) => {
      alert('הפעילות נמחקה');
      return result;
    }).catch((error) => {
      console.log("err GET Activityes=", error);
    }).done();

    setBack(!back);
  }

  //EVERY RENDER
  useEffect(() => {

    let id = props.route.params.patient.IdPatient;

    //get events from DATA
    fetch(apiUrlEvents + "=" + id, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json ; charset=UTP-8',
        'Accept': 'application/json ; charset=UTP-8'
      })
    }).then(
      (response) => response.json()
    ).then((res) => {
      console.log('OK Events');
      var arr = [];
      if (res) {
        console.log(res);
        res.map((event, key) => {
          let obj = {
            id: event.IdPatientActivity,
            key: key,
            description: event.ActivityName,
            startDate: new Date(event.StartPatientActivity),
            endDate: new Date(event.EndPatientActivity),
            color: (event.ActivityClassification=='פנאי'?'#9E82F6':event.ActivityClassification=='תרגול'?'#FDA551':'#F9677C'),
            type: event.ActivityClassification,
            link: event.ActivityLink,
            about: event.DescriptionActivity,
            isMoved: event.IsMoveablePatientActivity,
            isRequired: event.IsMandatoryPatientActivity,
            repetition: event.RepetitionPatientActivity,
            sets: event.SetsPatientActivity,
          };
          console.log(obj);
          arr = [...arr, obj];
        });
        setMyEvents(arr);
      } else {
        console.log('Events in empty');
      }
      return res;
    }).catch((error) => {
      console.log("err GET Events=", error);
    }).done();

  }, [back, props.route.params.back]);

  const headerfunc = () => {
    props.navigation.goBack();
  }

  return (

    <View style={styles.topContainer}>

    <Header
      leftComponent={<View>
        <TouchableOpacity style={{ marginTop: 6, marginLeft: 5 }} onPress={headerfunc}>
          <Icon name='arrow-back-ios' color='black' size={25} />
        </TouchableOpacity>
      </View>}
      containerStyle={{
        backgroundColor: 'rgba(0, 0, 0, 0)',
        justifyContent: 'space-around',
      }}
    />

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
          startHour={7}
          timeStep={30}
          events={myEvents}
          selectedDate={new Date()}
          numberOfDays={daysNumber} //מספר הימים המוצגים
          showTitle={true}
          headerStyle={{ backgroundColor: '#EFEFEF', borderColor: '#EFEFEF' }}
          hoursInDisplay={8} //מקטין את המרווחים בין השעות
          TodayHeaderComponent={MyTodayComponent}
          formatDateHeader="ddd DD"
          //fixedHorizontally={true}
          weekStartsOn={6}
          onEventPress={toggleOverlay} //לחיצה על אירוע
          onGridClick={(pressEvent,startHour, date) => { props.navigation.navigate('Add Activity', { Date: date, StartHour: startHour, patient: props.route.params.patient, terapistId:props.route.params.patient.terapistId }) }} //לחיצה לשיבוץ פעילות
        />
      </View>

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Icon name='warning' color='#ff4500' size={30} />
        <Text style={styles.textSecondary}>
          האם למחוק את הפעילות ?
        </Text>
        <Button
          title="מחק"
          buttonStyle={{ backgroundColor: 'rgba(214, 61, 57, 1)' }}
          titleStyle={{ color: 'white', marginHorizontal: 20 }}
          onPress={deleteActivity}
        />
      </Overlay>

      <Button
        title="אישור"
        buttonStyle={styles.buttonStyle}
        titleStyle={styles.titleStyle}
        containerStyle={styles.containerStyle}
        onPress={() => props.navigation.navigate('Patient Page', { patient: props.route.params.patient })}
      />

    </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({

  topContainer: {
    flex: 1,
  },

  textSecondary: {
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
    fontSize: 17,
  },

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

