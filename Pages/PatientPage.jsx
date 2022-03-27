import { View, Text, StyleSheet, ImageBackground, TextInput, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Icon } from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import ProgressCircle from 'react-native-progress-circle-rtl';
import * as Progress from 'react-native-progress';

export default function PatientPage(props) {

  const [patient, setPatient] = useState(props.route.params.patient);
  console.log(patient);
  const totalPercent = patient.ComplishionPresentae * 100;

  //Reviews from DATA
  const [reviews, SetReviews] = useState([]);

  //Review List
  // const [Activities, SetActivities] = useState([
  //   { name: 'ריצה', key: '1' },
  //   { name: 'עיסוי צלקת', key: '2' },
  //   { name: 'תרגול ידיים', key: '3' },
  //   { name: 'נעילת נעליים', key: '4' },
  //   { name: 'סודוקו', key: '5' },
  //   { name: 'הליכה', key: '6' },
  //   { name: 'שחייה', key: '7' },
  //   { name: 'נעילת נעליים', key: '8' },
  //   { name: 'סודוקו', key: '9' },
  //   { name: 'הליכה', key: '10' },
  //   { name: 'שחייה', key: '11' },
  // ]);

  //toggle Switch
  const [isEnabledUpdate, setIsEnableUpdate] = useState(useState(patient.UpdatePermissionPatient[0]));
  const [isEnabledAlert, setIsEnabledAlert] = useState(patient.ReceiveAlertsPermissionPatient);
  const [isEnabledActiv, setIsEnabledActiv] = useState(patient.PatientStatus);
  const fildName = ['updatePermissionPatient', 'receiveAlertsPermissionPatient', 'patientStatus']

  const apiUrlpermissions = "https://proj.ruppin.ac.il/igroup83/test2/tar6/api/Patient?id";

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
  const [types, setTypes] = useState(['תרגול', 'פנאי', 'תפקוד']);

  //DATA - url
  const apiUrlpercent = "https://proj.ruppin.ac.il/igroup83/test2/tar6/api/Patient?id";

  //EVERY RENDER
  useEffect(() => {

    types.map((item) => {
      //get type percent
      fetch(apiUrlpercent + "=" + patient.IdPatient + '&clasification=' + item, {
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
            var obj = result.map(percent => percent);
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
          },
          (error) => {
            console.log("err GET percent=", error);
          });
    })

    //GET Reviews
    fetch(apiUrlpercent + "=" + patient.IdPatient + '&clasification=' + item, {
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
          var obj = result.map(review => review);
          console.log(obj);
          SetReviews(obj);
        },
        (error) => {
          console.log("err GET percent=", error);
        });

    return () => handleEndConcert();

  }, []);

  //finally function
  const handleEndConcert = async () => {

    console.log('cleaning up...');

    //insert premosions to data
    await fildName.map((item) => {

      if (item == 'updatePermissionPatient') {
        var val = (isEnabledUpdate ? true : false);
      }
      if (item == 'receiveAlertsPermissionPatient') {
        var val = (isEnabledAlert ? true : false);
      }
      if (item == 'patientStatus') {
        var val = (isEnabledActiv ? true : false);
      }

      console.log('id=', patient.IdPatient);
      console.log('name=', item);
      console.log('val=', val);

      fetch(apiUrlpermissions + '=' + patient.IdPatient + "&fildName=" + item + "&val=" + val, {
        method: 'PUT',
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
            console.log('OK');
          }, error => {
            console.log("err PUT =", error);
          })
    })

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
              <Icon name={patient.Mood == 'SAD' ? 'sentiment-very-dissatisfied' : 'sentiment-satisfied-alt'} size={40} style={{ paddingLeft: 25 }} />
              <Icon name={patient.RelativeMood == 'DOUN' ? 'south' : 'north'} size={35} color={patient.RelativeMood == 'DOUN' ? 'red' : '#7fff00'} />
            </View>
          </View>
          <View style={styles.left2}>
            <View style={styles.touchOp}>
              <Text style={{ fontSize: 20, marginRight: 40, marginLeft: 10 }}>מצב התקדמות</Text>
              <Icon name='stacked-line-chart' size={35} />
            </View>
            <View style={{ marginLeft: 8, backgroundColor: 'white', height: 170, width: 190, marginTop: 30, borderWidth: 1, borderColor: 'white', borderRadius: 15 }}>
              <View>
                <Text style={{ fontSize: 15, textAlign: 'center', marginTop: 12 }}>סה"כ ביצועים :</Text>
              </View>
              <View style={{ marginTop: 15 }}>
                <ProgressCircle
                  percent={patient.ComplishionPresentae * 100}
                  radius={52}
                  borderWidth={18}
                  color={patient.ComplishionPresentae < 0.5 ? 'red' : 'lawngreen'}
                  shadowColor="#EFEFEF"
                  bgColor="#fff"
                  outerCircleStyle={{ marginLeft: 42 }}
                />
                <Text
                  style={[StyleSheet.absoluteFillObject, { fontSize: 20, fontWeight: '900', textAlign: 'center', marginTop: 40 }]}
                >{totalPercent}%</Text>
              </View>
            </View>
            <View style={styles.precent}>
              <View style={{ backgroundColor: '#FDA551', height: 50, width: 65, borderRadius: 15, borderWidth: 1, borderColor: '#FDA551', marginLeft: 2 }}>
                <Text style={{ textAlign: 'center', top: -20 }}>תרגול</Text>
                <Text style={{ textAlign: 'center', top: -1, fontSize: 20, fontWeight: '500' }}>{tirgul ? tirgul * 100 : 0}%</Text>
              </View>
              <View style={{ backgroundColor: '#F9677C', height: 50, width: 65, borderRadius: 15, borderWidth: 1, borderColor: '#F9677C', marginLeft: 3 }}>
                <Text style={{ textAlign: 'center', top: -20 }}>חזרתיות</Text>
                <Text style={{ textAlign: 'center', top: -1, fontSize: 20, fontWeight: '500' }}>{tifkud ? tifkud * 100 : 0}%</Text>
              </View>
              <View style={{ backgroundColor: '#9E82F6', height: 50, width: 65, borderRadius: 15, borderWidth: 1, borderColor: '#9E82F6', marginLeft: 3 }}>
                <Text style={{ textAlign: 'center', top: -20 }}>פנאי</Text>
                <Text style={{ textAlign: 'center', top: -1, fontSize: 20, fontWeight: '500' }}>{pnai ? pnai * 100 : 0}%</Text>
              </View>
            </View>
            <View style={styles.fillcontainer}>
              <Progress.Bar progress={tirgul ? tirgul : 0} width={65} color={tirgul < 0.5 ? 'red' : 'lawngreen'} borderWidth={1} borderColor='darkgrey' marginLeft={2} />
              <Progress.Bar progress={tifkud ? tifkud : 0} width={65} color={tifkud < 0.5 ? 'red' : 'lawngreen'} borderWidth={1} borderColor='darkgrey' marginLeft={3} />
              <Progress.Bar progress={pnai ? pnai : 0} width={65} color={pnai < 0.5 ? 'red' : 'lawngreen'} borderWidth={1} borderColor='darkgrey' marginLeft={3} />
            </View>

          </View>

          <View style={styles.left3}>
            <Text style={{ fontSize: 20, paddingLeft: 10, paddingTop: 20, paddingBottom: 10 }}>הרשאות :</Text>
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
              <Text style={{ fontSize: 20, marginRight: 45, marginLeft: 10 }}>משו"ב פעילויות</Text>
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
    fontSize: 25,
    fontWeight: 'bold',
    paddingTop: 15,
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