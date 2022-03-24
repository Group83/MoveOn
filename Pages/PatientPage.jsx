import { View, Text, StyleSheet, ImageBackground, TextInput, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import ToggleSwitch from 'toggle-switch-react-native';
import Svg, { G, Circle } from 'react-native-svg';
import * as Progress from 'react-native-progress';

export default function PatientPage(props) {

  const patient = props.route.params.patient;
  console.log(patient);

  //Review List
  const [Activities, SetActivities] = useState([
    { name: 'ריצה', key: '1' },
    { name: 'עיסוי צלקת', key: '2' },
    { name: 'תרגול ידיים', key: '3' },
    { name: 'נעילת נעליים', key: '4' },
    { name: 'סודוקו', key: '5' },
    { name: 'הליכה', key: '6' },
    { name: 'שחייה', key: '7' },
    { name: 'נעילת נעליים', key: '8' },
    { name: 'סודוקו', key: '9' },
    { name: 'הליכה', key: '10' },
    { name: 'שחייה', key: '11' },
  ]);

  //permissions
  const [update, setUpdate] = useState();
  const [alert, setAlert] = useState();
  const [activ, setActiv] = useState();

  //toggle Switch
  const [isEnabledUpdate, setIsEnableUpdate] = useState(useState(patient.UpdatePermissionPatient));
  const [isEnabledAlert, setIsEnabledAlert] = useState(patient.ReceiveAlertsPermissionPatient);
  const [isEnabledActiv, setIsEnabledActiv] = useState(patient.PatientStatus);
  console.log(isEnabledUpdate[0]);
  console.log(isEnabledAlert);
  console.log(isEnabledActiv);


  const toggleSwitchUpdate = () => {
    setIsEnableUpdate(previousState => !previousState);
    console.log(isEnabledUpdate);
    // if (!isEnabledMale) {
    //   setGender('זכר');
    // }
    // else {
    //   setGender('');
    // }
  }
  const toggleSwitchAlert= () => {
    setIsEnabledAlert(previousState => !previousState);
    console.log(isEnabledAlert);
    // if (!isEnabledFemale) {
    //   setGender('נקבה');
    // }
    // else {
    //   setGender('');
    // }
  }
  const toggleSwitchActiv= () => {
    setIsEnabledActiv(previousState => !previousState);
    console.log(isEnabledActiv);
    // if (!isEnabledOther) {
    //   setGender('אחר');
    // }
    // else {
    //   setGender('');
    // }
  }

  return (
    <ImageBackground source={require('../images/background1.png')} resizeMode="cover" style={styles.image}>

      <View style={styles.container}>

        {/* leftcontainer */}
        <View style={styles.leftcontainer}>

          <View style={styles.left1}>
            <View>
              <Text style={styles.name}>{patient.NicknamePatient}</Text>
              <Text style={styles.name}>#{patient.IdPatient}</Text>
            </View>
            <View style={styles.left1}>
              <Icon name={patient.Mood == 'SAD' ? 'sentiment-very-dissatisfied' : 'sentiment-satisfied-alt'} size={45} style={{ paddingLeft: 25 }} />
              <Icon name={patient.RelativeMood == 'DOUN' ? 'south' : 'north'} size={40} color={patient.RelativeMood == 'DOUN' ? 'red' : '#7fff00'} />
            </View>
          </View>
          <View style={styles.left2}>
            <View style={styles.touchOp}>
              <Text style={{ fontSize: 20, marginRight: 45, marginLeft: 10 }}>מצב התקדמות</Text>
              <Icon name='stacked-line-chart' size={35} />
            </View>
            <View style={{ marginLeft: 8, backgroundColor: 'white', height: 170, width: 190, marginTop: 30, borderWidth: 1, borderColor: 'white', borderRadius: 15 }}>
              <View>
                <Text style={{ fontSize: 15, textAlign: 'center', marginTop: 20 }}>סה"כ ביצועים :</Text>
              </View>
              <View style={{ marginTop: 15 }}>
                <Svg width={100} height={100} viewBox={'0 0 100 100'} marginLeft={'23%'}>
                  <G rotation='-90' origin={'50 , 50'}>
                    <Circle cx='50%' cy='50%' stroke={'grey'} strokeWidth={20} r={40} fill='transparent' strokeOpacity={0.2} />
                    <Circle
                      cx='50%'
                      cy='50%'
                      stroke={'#FDA551'}
                      strokeWidth={20}
                      r={40}
                      fill='transparent'
                      strokeDasharray={2 * Math.PI * 40}
                      strokeDashoffset={(2 * Math.PI * 40) / 4}
                      strokeLinecap='round'
                    />
                    <Circle
                      cx='50%'
                      cy='50%'
                      stroke={'#F9677C'}
                      strokeWidth={20}
                      r={40}
                      fill='transparent'
                      strokeDasharray={2 * Math.PI * 40}
                      strokeDashoffset={(2 * Math.PI * 40) / 2.5}
                      strokeLinecap='round'
                    />
                    <Circle
                      cx='50%'
                      cy='50%'
                      stroke={'#9E82F6'}
                      strokeWidth={20}
                      r={40}
                      fill='transparent'
                      strokeDasharray={2 * Math.PI * 40}
                      strokeDashoffset={(2 * Math.PI * 40) / 1.5}
                      strokeLinecap='round'
                    />
                  </G>
                </Svg>
                <TextInput
                  underlineColorAndroid='transparent'
                  editable={false}
                  defaultValue='75%'
                  style={[StyleSheet.absoluteFillObject, { fontSize: 20, fontWeight: '900', textAlign: 'center' }]}
                />
              </View>
            </View>
            <View style={styles.precent}>
              <View style={{ backgroundColor: '#FDA551', height: 50, width: 65, borderRadius: 15, borderWidth: 1, borderColor: '#FDA551', marginLeft: 2 }}>
                <Text style={{ textAlign: 'center', top: -20 }}>תרגול</Text>
                <Text style={{ textAlign: 'center', top: -1, fontSize: 20, fontWeight: '500' }}>20%</Text>
              </View>
              <View style={{ backgroundColor: '#F9677C', height: 50, width: 65, borderRadius: 15, borderWidth: 1, borderColor: '#F9677C', marginLeft: 3 }}>
                <Text style={{ textAlign: 'center', top: -20 }}>חזרתיות</Text>
                <Text style={{ textAlign: 'center', top: -1, fontSize: 20, fontWeight: '500' }}>50%</Text>
              </View>
              <View style={{ backgroundColor: '#9E82F6', height: 50, width: 65, borderRadius: 15, borderWidth: 1, borderColor: '#9E82F6', marginLeft: 3 }}>
                <Text style={{ textAlign: 'center', top: -20 }}>פנאי</Text>
                <Text style={{ textAlign: 'center', top: -1, fontSize: 20, fontWeight: '500' }}>70%</Text>
              </View>
            </View>
            <View style={styles.fillcontainer}>
              <Progress.Bar progress={0.2} width={65} color='#FDA551' borderWidth={1} borderColor='darkgrey' marginLeft={2} />
              <Progress.Bar progress={0.5} width={65} color='#F9677C' borderWidth={1} borderColor='darkgrey' marginLeft={3} />
              <Progress.Bar progress={0.7} width={65} color='#9E82F6' borderWidth={1} borderColor='darkgrey' marginLeft={3} />
            </View>

          </View>

          <View style={styles.left3}>
            <Text style={{ fontSize: 20, paddingLeft: 10, paddingTop: 20, paddingBottom: 10 }}>הרשאות :</Text>
            <View style={styles.toggle}>
              <Text style={styles.toggleinput}>עדכון מרשם עיסוקים</Text>
              <Switch
                trackColor={{ false: "#a9a9a9", true: "#dcdcdc" }}
                thumbColor={isEnabledUpdate[0] ? "#D3DE32" : "#f4f3f4"}
                ios_backgroundColor="#a9a9a9"
                onValueChange={toggleSwitchUpdate}
                value={isEnabledUpdate[0] ? true : false}
              />
            </View>
            <View style={styles.toggle}>
              <Text style={styles.toggleinput}>קבלת התראות</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#dcdcdc" }}
                thumbColor={isEnabledAlert ? "#D3DE32" : "#f4f3f4"}
                ios_backgroundColor="#a9a9a9"
                onValueChange={toggleSwitchAlert}
                value={isEnabledAlert ? true : false}
              />
            </View>
          </View>

          <View style={styles.left4}>
            <View style={styles.toggleActiv}>
              <Text style={styles.toggleinput}>משתמש פעיל</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#dcdcdc" }}
                thumbColor={isEnabledActiv ? "#D3DE32" : "#f4f3f4"}
                ios_backgroundColor="#a9a9a9"
                onValueChange={toggleSwitchActiv}
                value={isEnabledActiv ? true : false}
              />
            </View>
          </View>
        </View>

        {/* right container */}
        <View style={styles.rightcontainer}>

          <View style={styles.board}>
            <TouchableOpacity style={styles.touchOp} onPress={() => {
              navigation.navigate('Log in');
            }}>
              <Text style={{ marginRight: 15, marginLeft: 10, fontSize: 15 }}>יצירת מרשם עיסוקים חדש</Text>
              <Icon name='add' />
            </TouchableOpacity>
          </View>

          <View style={styles.board}>
            <TouchableOpacity style={styles.touchOp} onPress={() => {
              navigation.navigate('Log in');
            }}>
              <Text style={{ marginRight: 35, marginLeft: 10, fontSize: 15 }}>עדכון מרשם העיסוקים</Text>
              <Icon name='update' />
            </TouchableOpacity>
          </View>

          <View style={styles.rateContainer}>
            <View style={styles.touchOp}>
              <Text style={{ fontSize: 20, marginRight: 60, marginLeft: 10 }}>משו"ב פעילויות</Text>
              <Icon name='note' />
            </View>
            <View style={styles.scrollView}>
              <ScrollView>
                {Activities.map((item) => {
                  return (
                    <View>
                      <Text style={styles.review}>{item.name}</Text>
                    </View>
                  )
                })}
              </ScrollView>
            </View>
          </View>

        </View>
      </View>
    </ImageBackground >
  )
}

const styles = StyleSheet.create({

  toggleActiv: {
    flexDirection: "row",
    marginTop: 35
  },

  toggle: {
    flexDirection: "row",
    marginTop: 18
  },

  toggleinput: {
    marginRight: 15,
    marginTop: 5,
    fontSize: 16,
    marginLeft: 10
  },

  fillcontainer: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },

  precent: {
    marginTop: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },

  left4: {
    backgroundColor: '#EFEFEF',
    height: 95,
    width: 210,
    marginTop: 3,
    top: 10,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 5,
  },

  left3: {
    backgroundColor: '#EFEFEF',
    height: 180,
    width: 210,
    marginTop: 3,
    top: 10,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 5,
  },

  left2: {
    backgroundColor: '#EFEFEF',
    height: 400,
    width: 210,
    marginTop: 20,
    top: 10,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 5,
  },

  name: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingLeft: 10,
  },

  left1: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },

  scrollView: {
    backgroundColor: '#EFEFEF',
    height: 620,
    width: 200,
    marginHorizontal: 1,
    top: 10,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 5,
  },

  review: {
    marginTop: 3,
    padding: 30,
    backgroundColor: '#FFE4E6',
    display: 'flex',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 4,
    marginTop: 5
  },

  rateContainer: {
    backgroundColor: '#EFEFEF',
    height: 685,
    width: 210,
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#EFEFEF',
  },

  board: {
    backgroundColor: '#EFEFEF',
    height: 50,
    width: 210,
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#EFEFEF'
  },

  touchOp: {
    marginTop: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },

  image: {
    flex: 1,
    justifyContent: "center",
  },

  container: {
    display: 'flex',
    flexDirection: 'row',
  },

  leftcontainer: {
    display: 'flex',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    height: 800,
    width: 210,
    marginHorizontal: 2,

  },

  rightcontainer: {
    display: 'flex',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    height: 800,
    width: 210,
    marginHorizontal: 2,

  },


});