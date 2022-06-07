import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, LogBox } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-native-elements';
import WeekView, { createFixedWeekDate } from 'react-native-week-view';
import { Icon, Header } from 'react-native-elements';
import moment from 'moment';
import Overlay from 'react-native-modal-overlay';

LogBox.ignoreAllLogs();

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
            name: event.ActivityName,
            key: key,
            description: event.ActivityName,
            startDate: new Date(event.StartPatientActivity),
            endDate: new Date(event.EndPatientActivity),
            color: (event.ActivityClassification == 'פנאי' ? 'rgba(158, 130, 246, 0.85)' : event.ActivityClassification == 'תרגול' ? 'rgba(253, 165, 81, 0.85)' : 'rgba(249, 103, 124, 0.85)'),
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
          <TouchableOpacity style={{ marginTop: '10%', marginLeft: 5 }} onPress={headerfunc}>
            <Icon name='arrow-back-ios' color='black' size={25} />
          </TouchableOpacity>
        </View>}
        centerComponent={<View style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
          <Text style={{ fontSize: 23, marginRight: 10, marginTop: 14 }}>{props.route.params.patient.NicknamePatient}</Text>
          <Icon name='assignment' color='black' size={38} style={{ marginTop: 10 }} />
        </View>}
        containerStyle={{
          backgroundColor: 'rgba(0, 0, 0, 0)',
          justifyContent: 'space-around',
        }}
      />

      <ImageBackground source={require('../images/background5.jpeg')} resizeMode="cover" style={styles.image}>
        <View style={styles.iconContainerStyle}>
          <Button
            title="יומי"
            buttonStyle={{
              backgroundColor: '#E5E5E5',
              borderColor: 'black',
              borderWidth: 1,
              borderRadius:10
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
              borderColor: 'black',
              borderWidth: 1,
              borderRadius:10
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
            local={moment.updateLocale('en', {
              months: [
                "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי",
                "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
              ],
              weekdays: [
                'ראשון', 'שני', 'שלישי', 'רביעי'
                , 'חמישי', 'שישי', 'שבת'
              ]
            })}
            startHour={7}
            timeStep={30}
            events={myEvents}
            selectedDate={new Date()}
            numberOfDays={daysNumber} //מספר הימים המוצגים
            showTitle={true}
            headerStyle={{ backgroundColor: '#EFEFEF', borderColor: '#EFEFEF' }}
            hoursInDisplay={8} //מקטין את המרווחים בין השעות
            TodayHeaderComponent={MyTodayComponent}
            formatDateHeader="dddd   DD"
            weekStartsOn={0}
            onEventPress={toggleOverlay} //לחיצה על אירוע
            onGridClick={(pressEvent, startHour, date) => { props.navigation.navigate('Add Activity', { Date: date, StartHour: startHour, patient: props.route.params.patient, terapistId: props.route.params.patient.terapistId }) }} //לחיצה לשיבוץ פעילות
            headerTextStyle={{fontSize:17}}
            hourTextStyle={{fontSize:14}}
            eventContainerStyle={{size:24}}
          />
        </View>

        <Overlay visible={visible} onBackdropPress={toggleOverlay}
          containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', alignItems: 'center' }}
          childrenWrapperStyle={{ backgroundColor: activity ? activity.color : 'transparent', opacityValue: 5, borderWidth: 1, borderColor: 'rgba(176, 219, 239, 0.83)', borderRadius: 15, alignItems: 'right', width: '60%' }}>
          <TouchableOpacity onPress={toggleOverlay}>
            <Icon name='close' size={20}
              style={{
                marginBottom: 8,
              }} />
          </TouchableOpacity>

          <Text style={styles.texttitle}>{activity ? activity.name : ''}</Text>
          <Text style={styles.Secondarytitle}>{activity ? activity.about : ''}</Text>

          <View style={{
            display: 'flex',
            flexDirection: 'row',
          }}>
            <Icon name='schedule' size={40}
              style={{
                marginTop: 10,
                marginLeft: '18%',
              }} />
            <Text style={styles.textSecondary}>{activity ? moment(activity.startDate).format("HH:MM") : ''}</Text>
          </View>

          <View style={{
            display: 'flex',
            flexDirection: 'row',
          }}>
            <Icon name='accessibility' size={40}
              style={{
                marginTop: 10,
                marginLeft: '18%',
              }} />
            <Text style={styles.textSecondary}>{activity ? activity.repetition : '0'} X {activity ? activity.sets : '0'}</Text>
          </View>

          <TouchableOpacity style={{
            display: 'flex',
            flexDirection: 'row'
          }} onPress={() => (activity ? activity.link ? Linking.openURL(activity.link) : '' : '')}>
            <Icon name={activity ? activity.link ? 'videocam' : '' : ''} size={40}
              style={{
                marginTop: 10,
                marginLeft: '18%',
              }} />
            <Text style={styles.textSecondary}>{activity ? activity.link ? ' לחץ לצפייה בסרטון' : '' : ''}</Text>
          </TouchableOpacity>

          <View style={{
            display: 'flex',
            flexDirection: 'row'
          }}>
            <Button
              title="מחק פעילות"
              buttonStyle={styles.deleteButton}
              titleStyle={{ color: 'black', marginHorizontal: 20, fontSize: 20 }}
              onPress={deleteActivity}
            />
          </View>
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

  deleteButton: {
    backgroundColor: 'rgba(214, 61, 57, 1)',
    borderColor: 'rgba(0, 0, 0, 0)',
    borderRadius: 5,
    borderWidth: 1,
    marginHorizontal: '32%',
    marginTop: '10%'
  },

  topContainer: {
    flex: 1,
  },

  texttitle: {
    marginTop: 7,
    textAlign: 'left',
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 10,
    marginLeft: '13%'
  },

  Secondarytitle: {
    marginVertical: 5,
    textAlign: 'left',
    fontSize: 20,
    marginLeft: '13%'
  },

  textSecondary: {
    marginTop: 18,
    textAlign: 'right',
    fontSize: 20,
  },

  textDelete: {
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
  },

  container: {
    backgroundColor: '#fff',
    height: 880,
    marginTop: '2%',
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
    right: '53%',
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
    fontSize: 24,
    color: 'black'
  },

  containerStyle: {
    marginHorizontal: 20,
    width: '95%',
    marginTop: '3%',
  },

  iconContainerStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 2,
  },

});

