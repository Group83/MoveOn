import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Icon, Header } from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import ProgressCircle from 'react-native-progress-circle-rtl';
import * as Progress from 'react-native-progress';
import { GradientCircularProgress } from "react-native-circular-gradient-progress";


export default function PatientPage(props) {

  const [patient, setPatient] = useState(props.route.params.patient);
  const terapistId = props.route.params.terapistId
  const terapistName = props.route.params.name
  const totalPercent = patient.ComplishionPresentae * 100;

  //Reviews from DATA
  const [reviews, SetReviews] = useState([]);

  //DATA url - reviews
  const apiUrlReviews = "https://proj.ruppin.ac.il/igroup83/test2/tar6/api/ActualPatientActivity?id";

  //toggle Switch
  const [isEnabledUpdate, setIsEnableUpdate] = useState(patient.UpdatePermissionPatient);
  const [isEnabledAlert, setIsEnabledAlert] = useState(patient.ReceiveAlertsPermissionPatient);
  const [isEnabledActiv, setIsEnabledActiv] = useState(patient.PatientStatus);

  //DATA url - update permissions
  const apiUrlpermissions = "https://proj.ruppin.ac.il/igroup83/test2/tar6/api/Patient";

  const toggleSwitchUpdate = () => {
    setIsEnableUpdate(previousState => !previousState);
  }
  const toggleSwitchAlert = () => {
    setIsEnabledAlert(previousState => !previousState);
  }

  const toggleSwitchActiv = () => {
    setIsEnabledActiv(previousState => !previousState);
  }

  //percent
  const [tirgul, setTirgul] = useState();
  const [pnai, setPnai] = useState();
  const [tifkud, setTifkud] = useState();
  const [types] = useState(['תרגול', 'פנאי', 'תפקוד']);

  //DATA - url percent
  const apiUrlpercent = "https://proj.ruppin.ac.il/igroup83/test2/tar6/api/Patient?id";

  //EVERY RENDER
  useEffect(() => {

    types.map((item) => {
      //get type percent
      // console.log(patient.IdPatient);
      // console.log(item);
      let id = patient.IdPatient;
      fetch(apiUrlpercent + '=' + id + '&clasification=' + item, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json ; charset=UTP-8',
          'Accept': 'application/json ; charset=UTP-8'
        })
      }).then(
        (response) => response.json()
      ).then((res) => {
        console.log('OK Percent');
        if (res) {
          var obj = res.map(percent => percent);
          obj.map((percent) => {
            if (percent) {
              if (item == 'תרגול') {
                setTirgul(percent.ComplishionPresentae);
              }
              if (item == 'תפקוד') {
                setTifkud(percent.ComplishionPresentae);
              }
              if (item == 'פנאי') {
                setPnai(percent.ComplishionPresentae);
              }
            }
          })
        } else {
          console.log('percent in empty');
        }
        return res;
      }).catch((error) => {
        console.log('percent in empty');
      }).done();
    })

    //GET Reviews
    fetch(apiUrlReviews + "=" + patient.IdPatient, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json ; charset=UTP-8',
        'Accept': 'application/json ; charset=UTP-8'
      })
    }).then(
      (response) => response.json()
    ).then((res) => {
      // result data
      console.log('OK Reviews');
      if (res) {
        var obj = res.map(review => review);
        //console.log(obj);
        SetReviews(obj);
      } else {
        console.log('Reviews in empty');
      }
      return res;
    }).catch((error) => {
      console.log("err GET reviews=", error);
    }).done();

  }, [patient]);


  const headerfunc = () => {

    var update = (isEnabledUpdate ? 1 : 0);
    var alert = (isEnabledAlert ? 1 : 0);
    var activ = (isEnabledActiv ? 1 : 0);

    //insert premosions to data
    let updatearr = [{ IdPatient: patient.IdPatient, PatientStatus: activ, UpdatePermissionPatient: update, ReceiveAlertsPermissionPatient: alert, IdTherapist: terapistId }];
    // console.log('update payient = ', updatearr[0]);

    fetch(apiUrlpermissions, {
      method: 'PUT',
      body: JSON.stringify(updatearr[0]),
      headers: new Headers({
        'Content-Type': 'application/json ; charset=UTP-8',
        'Accept': 'application/json ; charset=UTP-8'
      })
    })
      .then(res => {
        console.log('OK Permissions !');
        props.navigation.navigate('Dashboard', { id: terapistId, name: terapistName, back: true });
      }).catch(error => {
        console.log('err PUT =', error)
      })
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
                <Icon name={patient.Mood == 'SAD' ? 'sentiment-very-dissatisfied' : 'sentiment-satisfied-alt'} size={60} style={{ paddingLeft: 70 }} />
                <Icon name={patient.RelativeMood == 'DOUN' ? 'south' : 'north'} size={60} color={patient.RelativeMood == 'DOUN' ? 'red' : '#7fff00'} />
              </View>
            </View>
            <View style={styles.left2}>
              <View style={styles.touchOp}>
                <Text style={{ fontSize: 25, marginRight: 150, marginLeft: 30 }}>מצב התקדמות</Text>
                <Icon name='stacked-line-chart' size={35} />
              </View>
              <View style={{ marginLeft: 8, backgroundColor: 'white', height: 270, width: 290, marginTop: 30, borderWidth: 1, borderColor: 'white', borderRadius: 15, marginLeft: 40 }}>
                <View>
                  <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 12 }}>סה"כ ביצועים :</Text>
                </View>
                <View style={{ marginTop: 20, marginLeft: 55 }}>
                  <GradientCircularProgress
                    startColor='red'
                    size={180}
                    progress={Math.round(patient.ComplishionPresentae * 100)}
                    // progress={100}
                    endColor='lawngreen'
                    strokeWidth={10}
                    emptyColor='#F5F5F5'
                    middleColor='sandybrown'
                  />
                </View>

                <Text
                  style={[StyleSheet.absoluteFillObject, { fontSize: 30, fontWeight: '900', textAlign: 'center', marginTop: '45%' }]}
                >{totalPercent}%</Text>
              </View>
              <View style={styles.precent}>
                <View style={{ backgroundColor: '#FDA551', height: 80, width: 100, borderRadius: 15, borderWidth: 1, borderColor: '#FDA551', marginHorizontal: 10 }}>
                  <Text style={{ textAlign: 'center', top: -25, fontSize: 20 }}>תרגול</Text>
                  <Text style={{ textAlign: 'center', top: 2, fontSize: 25, fontWeight: '500' }}>{tirgul ? Math.round(tirgul * 100) : 0}%</Text>
                </View>
                <View style={{ backgroundColor: '#F9677C', height: 80, width: 100, borderRadius: 15, borderWidth: 1, borderColor: '#F9677C', marginHorizontal: 10 }}>
                  <Text style={{ textAlign: 'center', top: -25, fontSize: 20 }}>תפקוד</Text>
                  <Text style={{ textAlign: 'center', top: 2, fontSize: 25, fontWeight: '500' }}>{tifkud ? Math.round(tifkud * 100) : 0}%</Text>
                </View>
                <View style={{ backgroundColor: '#9E82F6', height: 80, width: 100, borderRadius: 15, borderWidth: 1, borderColor: '#9E82F6', marginHorizontal: 10 }}>
                  <Text style={{ textAlign: 'center', top: -25, fontSize: 20 }}>פנאי</Text>
                  <Text style={{ textAlign: 'center', top: 2, fontSize: 25, fontWeight: '500' }}>{pnai ? Math.round(pnai * 100) : 0}%</Text>
                </View>
              </View>
              <View style={styles.fillcontainer}>
                <Progress.Bar progress={tirgul ? tirgul : 0} width={90} color={tirgul < 0.5 ? 'red' : 'lawngreen'} borderWidth={1} borderColor='darkgrey' marginHorizontal={15} />
                <Progress.Bar progress={tifkud ? tifkud : 0} width={90} color={tifkud < 0.5 ? 'red' : 'lawngreen'} borderWidth={1} borderColor='darkgrey' marginHorizontal={15} />
                <Progress.Bar progress={pnai ? pnai : 0} width={90} color={pnai < 0.5 ? 'red' : 'lawngreen'} borderWidth={1} borderColor='darkgrey' marginHorizontal={15} />
              </View>

            </View>

            <View style={styles.left3}>
              <Text style={{ fontSize: 23, paddingLeft: 10, paddingTop: 20, paddingBottom: 10, textAlign: 'left' }}>הרשאות: </Text>
              <View style={styles.toggle}>
                <Text style={styles.toggleinput}>עדכון מרשם עיסוקים</Text>
                <Switch
                  trackColor={{ false: "#a9a9a9", true: "#dcdcdc" }}
                  thumbColor={isEnabledUpdate ? "#D3DE32" : "#f4f3f4"}
                  ios_backgroundColor="#a9a9a9"
                  onValueChange={toggleSwitchUpdate}
                  value={isEnabledUpdate ? true : false}
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
                props.navigation.navigate('Activity Board', { patient: patient, back: false, terapistId: terapistId });
              }}>
                <Text style={{ marginRight: 150, marginLeft: 20, fontSize: 23 }}>מרשם העיסוקים</Text>
                <Icon name='event-note' size={30} />
              </TouchableOpacity>
            </View>

            <View style={styles.rateContainer}>
              <View style={styles.touchOp}>
                <Text style={{ fontSize: 23, marginRight: 155, marginLeft: 20 }}>משו"ב פעילויות</Text>
                <Icon name='note' size={30} />
              </View>
              <View style={styles.scrollView}>
                <ScrollView>
                  {reviews.map((item, key) => {
                    return (
                      <View id={key} style={{
                        marginTop: 3,
                        padding: 10,
                        backgroundColor: (item.ActivityClasification == 'פנאי' ? 'rgba(158, 130, 246, 0.57)' : item.ActivityClassification == 'תרגול' ? 'rgba(253, 165, 81, 0.69)' : 'rgba(249, 103, 124, 0.63)'),
                        display: 'flex',
                        borderWidth: 1,
                        borderColor: 'grey',
                        borderRadius: 4,
                        marginTop: 5,
                      }}>
                        <View id={key} style={styles.container}>
                          <Text style={styles.reviewDate}>{(item.StartActualPatientActivity).substring(0, 9)},</Text>
                          <Text style={styles.reviewDate}>{(item.StartActualPatientActivity).substring(10, 15)}</Text>
                        </View>
                        <Text style={styles.reviewtitle}>{item.ActivityName}</Text>
                        <Text style={styles.reviewText}>רמת קושי: {item.DifficultyActualPatientActivity}</Text>
                        <Text style={styles.reviewText} >דירוג: {item.LikeTheActivityActualPatientActivity}</Text>
                        <Text style={styles.reviewText}>רמת ביצוע: {item.ActualLevelOfPerformanceActualPatientActivity}</Text>
                        <Text style={styles.reviewText}>{item.FreeNoteActualPatientActivity}</Text>
                      </View>
                    )
                  })}
                </ScrollView>
              </View>
            </View>

          </View>
        </View>
      </ImageBackground >
    </View >
  )
}

const styles = StyleSheet.create({

  topContainer: {
    flex: 1,
  },

  reviewDate: {
    marginTop: 5,
    color: 'black',
    fontSize: 15,
    marginHorizontal: 2,
  },

  reviewtitle: {
    textAlign: 'left',
    marginHorizontal: 5,
    marginTop: 8,
    marginBottom: 8,
    fontWeight: '500',
    fontSize: 22,
    color: 'black',
  },

  reviewText: {
    textAlign: 'left',
    marginHorizontal: 5,
    marginTop: 5,
    color: 'black',
    fontSize: 17,
  },

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
    fontSize: 20,
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
    height: 110,
    width: '98%',
    marginTop: 3,
    top: 10,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 5,
  },

  left3: {
    backgroundColor: '#EFEFEF',
    height: 200,
    width: '98%',
    marginTop: 3,
    top: 10,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 5,
  },

  left2: {
    backgroundColor: '#EFEFEF',
    height: 520,
    width: '98%',
    marginTop: 20,
    top: 10,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 5,
  },

  name: {
    fontSize: 40,
    fontWeight: 'bold',
    paddingTop: 15,
    paddingLeft: 30,
  },

  left1: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },

  scrollView: {
    backgroundColor: '#EFEFEF',
    height: 850,
    width: '95%',
    marginHorizontal: 10,
    top: 15,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 5,
  },

  review: {
    marginTop: 3,
    padding: 10,
    backgroundColor: 'rgba(211, 222, 50, 0.3)',
    display: 'flex',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 4,
    marginTop: 5,
  },

  rateContainer: {
    backgroundColor: '#EFEFEF',
    height: 920,
    width: '95%',
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#EFEFEF',
  },

  board: {
    backgroundColor: '#EFEFEF',
    height: 60,
    width: '95%',
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#EFEFEF'
  },

  touchOp: {
    marginTop: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
    height: 1000,
    width: '47%',
    marginLeft: 25,
  },

  rightcontainer: {
    display: 'flex',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    height: 1000,
    width: '47%',
    marginLeft: 20,
  },

});