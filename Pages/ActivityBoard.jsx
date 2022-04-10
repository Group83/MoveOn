import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-native-elements';
import WeekView, { createFixedWeekDate } from 'react-native-week-view';
import { Icon, Overlay, Header } from 'react-native-elements';

export default function ActivityBoard(props) {

  //selected activity - on press activity
  const [idAct, setIdAct] = useState(0);
  const [activity, setActivity] = useState();

  //DATA - url
  //events
  const apiUrlEvents = "https://proj.ruppin.ac.il/igroup83/test2/tar6/api/PatientActivity?id";
  //delete
  const urlDelete = "https://proj.ruppin.ac.il/igroup83/test2/tar6/api/PatientActivity?id";

  //Events list fron DATA
  const [myEvents, setMyEvents] = useState([]);

  //Number of days in calender - changed on press
  const [daysNumber, SetDaysNumber] = useState(7);
  const MyTodayComponent = ({ formattedDate, textStyle }) => (
    <Text style={[textStyle, { fontWeight: 'bold' }]}>{formattedDate}</Text>
  );

  //after delete activity to refresh page 
  const [back, setBack] = useState(true);

  //Overlay
  const [visible, setVisible] = useState(false);
  const toggleOverlay = (e) => {
    setVisible(!visible);
    setIdAct(e.id);
    setActivity(e);
  };

  //DELETE activity
  const deleteActivity = () => {

    setVisible(!visible); //for overlay

    //DELETE activity from data
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

    setBack(!back); //to refresh page

  }

  //EVERY RENDER
  useEffect(() => {

    //SET id from patient page
    let id = props.route.params.patient.IdPatient;

    //GET patient events from DATA
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
        res.map((event, key) => {
          let obj = { //set new object for every event to match for this calender
            id: event.IdPatientActivity,
            name:event.ActivityName,
            key: key,
            description: event.ActivityName,
            startDate: new Date(event.StartPatientActivity),
            endDate: new Date(event.EndPatientActivity),
            color: (event.ActivityClassification == 'פנאי' ? '#9E82F6' : event.ActivityClassification == 'תרגול' ? '#FDA551' : '#F9677C'),
            type: event.ActivityClassification,
            link: event.ActivityLink,
            about: event.DescriptionActivity,
            isMoved: event.IsMoveablePatientActivity,
            isRequired: event.IsMandatoryPatientActivity,
            repetition: event.RepetitionPatientActivity,
            sets: event.SetsPatientActivity,
          };
          arr = [...arr, obj]; //add to arr
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
        rightComponent={<View>
          <TouchableOpacity style={{ marginTop: 6, marginLeft: 5 }} onPress={headerfunc}>
            <Icon name='arrow-back-ios' color='black' size={25} />
          </TouchableOpacity>
        </View>}
        containerStyle={{
          backgroundColor: 'rgba(0, 0, 0, 0)',
          justifyContent: 'space-around',
        }}
      />

      <ImageBackground source={require('../images/background3.jpeg')} resizeMode="cover" style={styles.image}>
        <Text style={styles.title}>{props.route.params.patient.NicknamePatient} - מרשם עיסוקים</Text>

        <View style={styles.iconContainerStyle}>
          <Button
            title="יומי"
            buttonStyle={{
              backgroundColor: '#E5E5E5',
              borderColor: '#E5E5E5',
              borderWidth: 1,
            }}
            titleStyle={{
              fontSize: 22,
              color: 'black'
            }}
            containerStyle={{
              marginHorizontal: 8,
              width: 390,
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
              fontSize: 22,
              color: 'black'
            }}
            containerStyle={{
              marginHorizontal: 8,
              width: 390,
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
            // fixedHorizontally={true}
            weekStartsOn={0}
            onEventPress={toggleOverlay} //לחיצה על אירוע
            onGridClick={(pressEvent, startHour, date) => { props.navigation.navigate('Add Activity', { Date: date, StartHour: startHour, patient: props.route.params.patient, terapistId: props.route.params.patient.terapistId }) }} //לחיצה לשיבוץ פעילות
          />
        </View>

        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <Text style={styles.texttitle}>
            {activity?activity.name:''}
          </Text>
          <Text style={styles.textSecondary}>אודות : 
            {activity?activity.about:''}
          </Text>
          <Text style={styles.textSecondary}>סטים :
            {activity?activity.sets:''}
          </Text>
          <Text style={styles.textSecondary}>חזרות : 
            {activity?activity.repetition:''}
          </Text>
          <Text style={styles.textDelete}>
            האם למחוק את הפעילות ?
          </Text>
          <Button
            title="מחק"
            buttonStyle={{ backgroundColor: 'rgba(214, 61, 57, 1)' }}
            titleStyle={{ color: 'white', marginHorizontal: 20, fontSize:20 }}
            onPress={deleteActivity}
          />
        </Overlay>

        <Button
          title="שמור"
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

  texttitle: {
    marginTop: 7,
    textAlign: 'left',
    fontSize: 22,
    fontWeight:'500',
    marginBottom: 10,
  },

  textSecondary: {
    marginTop: 7,
    textAlign: 'right',
    fontSize: 20,
    textAlign:'left'
  },

  textDelete: {
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
  },

  container: {
    backgroundColor: '#fff',
    height: 800,
    top: 15,
    marginHorizontal: 10,
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
    top: -30,
    right: '35%',
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
    fontSize: 22,
    color: 'black'
  },

  containerStyle: {
    marginHorizontal: 20,
    width: '95%',
    top: 30,
  },

  iconContainerStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    top: 10,
    marginHorizontal: 2,
  },

});

