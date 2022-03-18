import { View, Text, StyleSheet, ImageBackground, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import ToggleSwitch from 'toggle-switch-react-native';
import Svg, { G, Circle } from 'react-native-svg';
// import { ProgressBar } from 'react-native-paper';
// import { StatusBar } from 'expo-status-bar';
import ProgressBar from 'react-native-progress/Bar';
import * as Progress from 'react-native-progress';

export default function PatientPage({ navigation }) {

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

  return (
    <ImageBackground source={require('../images/background1.png')} resizeMode="cover" style={styles.image}>

      <View style={styles.container}>

        {/* leftcontainer */}
        <View style={styles.leftcontainer}>

          <View style={styles.left1}>
            <View>
              <Text style={styles.name}>אורין_83</Text>
              <Text style={styles.name}>#2458</Text>
            </View>
            <View style={styles.left1}>
              <Icon name='sentiment-satisfied' size={45} style={{ paddingLeft: 15 }} />
              <Icon name='north' size={40} color={'#7fff00'} />
            </View>
          </View>
          <View style={styles.left2}>
            <View style={styles.touchOp}>
              <Text style={{ fontSize: 20, marginRight: 45, marginLeft: 10 }}>מצב התקדמות</Text>
              <Icon name='stacked-line-chart' size={35} />
            </View>
            <View style={{ marginLeft:8,backgroundColor: 'white', height:170,width:190, marginTop:30, borderWidth:1, borderColor:'white', borderRadius:15 }}>
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
            <Text style={{ fontSize: 20, paddingLeft: 10, paddingTop: 20 }}>הרשאות :</Text>
            <ToggleSwitch
              onColor="black"
              offColor="gray"
              label="עדכון מרשם עיסוקים"
              labelStyle={{ color: "black", fontWeight: "400", fontSize: 15 }}
              size="small"
              onToggle={isOn => console.log("changed to : ", isOn)}
              style={{ marginTop: 30, flexDirection: 'row' }}
            />
            <ToggleSwitch
              onColor="black"
              offColor="gray"
              label="קבלת התראות"
              labelStyle={{ color: "black", fontWeight: "400", fontSize: 15 }}
              size="small"
              onToggle={isOn => console.log("changed to : ", isOn)}
              style={{ marginTop: 30, flexDirection: 'row' }}
            />
          </View>
          <View style={styles.left4}>
            <ToggleSwitch
              onColor="black"
              offColor="gray"
              label="משתמש פעיל ?"
              labelStyle={{ color: "black", fontWeight: "400", fontSize: 15 }}
              size="small"
              onToggle={isOn => console.log("changed to : ", isOn)}
              style={{ marginTop: 30, flexDirection: 'row' }}
            />
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
    height: 80,
    width: 210,
    marginTop: 3,
    top: 10,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 5,
  },

  left3: {
    backgroundColor: '#EFEFEF',
    height: 200,
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
    top: 40
  },

  rightcontainer: {
    display: 'flex',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    height: 800,
    width: 210,
    marginHorizontal: 2,
    top: 40
  },


});