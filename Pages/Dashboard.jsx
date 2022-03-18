import { View, Text, StyleSheet, ImageBackground, TextInput, ScrollView, TouchableOpacity, ViewPagerAndroidBase } from 'react-native';
import { Button, Icon, Overlay } from 'react-native-elements';
import { Searchbar } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import Svg, { G, Circle } from 'react-native-svg';


export default function Dashboard({ navigation }) {

  //Terapist id
  const [idTerapist, SetIdTerapist] = useState(5);
  //Patients list from DATA
  const [patients, setPatients] = useState([]);

  //DATA - url
  const apiUrlPatients = "https://proj.ruppin.ac.il//igroup83/test2/tar6/api/Patient?id";

  console.log('hi2');

  //EVERY RENDER
  useEffect(() => {

    console.log('hi');

    //get all recipes from DB
    fetch(apiUrlPatients + "=" + idTerapist, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json ; charset=UTP-8',
        'Accept': 'application/json ; charset=UTP-8'
      })
    })
      .then(res => {
        console.log('res=', res);
        console.log('res.status=', res.status);
        console.log('res.ok=', res.ok);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch btnFetchGetRecipes=", result);

          var obj = result.map(patient => patient);
          console.log(obj);
          setPatients(obj);
        },
        (error) => {
          console.log("err post=", error);
        });

  }, []);

  //overFlow
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  //Search Bar
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);

  //patiants
  const [patiants1, SetPatiants1] = useState([
    { number: 251, name: 'אורין_דורה', complition: 0.5, key: '1' },
    { number: 251, name: 'אורין_דורה', complition: 0.5, key: '2' },
    { number: 251, name: 'אורין_דורה', complition: 0.5, key: '3' },
    { number: 251, name: 'אורין_דורה', complition: 0.5, key: '4' },
    { number: 251, name: 'אורין_דורה', complition: 0.5, key: '5' },
    { number: 251, name: 'אורין_דורה', complition: 0.5, key: '6' },
    { number: 251, name: 'אורין_דורה', complition: 0.5, key: '7' },
    { number: 251, name: 'אורין_דורה', complition: 0.5, key: '8' },
    { number: 251, name: 'אורין_דורה', complition: 0.5, key: '9' },
    { number: 251, name: 'אורין_דורה', complition: 0.5, key: '10' },
    { number: 251, name: 'אורין_דורה', complition: 0.5, key: '11' },
    { number: 251, name: 'אורין_דורה', complition: 0.5, key: '12' },
    { number: 251, name: 'אורין_דורה', complition: 0.5, key: '13' },
    { number: 251, name: 'אורין_דורה', complition: 0.5, key: '14' },
    { number: 251, name: 'אורין_דורה', complition: 0.5, key: '15' },
  ]);

  return (
    <ImageBackground source={require('../images/background1.png')} resizeMode="cover" style={styles.image}>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>שלום דנה,</Text>
      </View>

      <View style={styles.centerContainer}>
        <View>
          <TouchableOpacity style={styles.touchOp} onPress={() => {
            navigation.navigate('Add Patient');
          }}>
            <Icon name='add' />
            <Text style={{ marginRight: 20, marginLeft: 20, fontSize: 17 }}>הוסף מטופל חדש</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.Searchbar}>
          <Searchbar
            placeholder=""
            onChangeText={onChangeSearch}
            value={searchQuery}
            fontSize={17}
          />
        </View>
      </View>

      <View style={styles.dashboardContainer}>

        <View style={styles.col}>
          <View style={styles.coltitle}>
            <Text style={{ fontSize: 13, marginTop: 10, marginHorizontal: 14 }}>מספר</Text>
            <Text style={{ fontSize: 13, marginHorizontal: 14 }}>מטופל</Text>
            {patiants.map((item) => {
              return (
                <View style={styles.row}>
                  <Text style={{ fontSize: 12, marginLeft: 5, marginTop: 11 }}>#{patiants1.number}</Text>
                </View>
              )
            })}
          </View>

        </View>

        <View style={styles.col}>
          <View style={styles.coltitle}>
            <Text style={{ fontSize: 13, marginTop: 15, marginHorizontal: 2 }}>כינוי</Text>
            {patiants.map((item) => {
              return (
                <View style={styles.row}>
                  <Text style={{ fontSize: 12, marginLeft: 2, marginTop: 18 }}>{item.name}</Text>
                </View>
              )
            })}
          </View>

        </View>

        <View style={styles.col}>
          <View style={styles.coltitle}>
            <Text style={{ fontSize: 13, marginTop: 15, marginHorizontal: 2 }}>רמת ביצוע</Text>

            {patiants.map((item) => {
              return (
                <View style={styles.row}>
                  <Svg width={60} height={100} viewBox={'0 0 100 100'}>
                    <G rotation='-90' origin={'10 , 50'}>
                      <Circle cx='50%' cy='40%' stroke={'grey'} strokeWidth={5} r={15} fill='transparent' strokeOpacity={0.2} />
                      <Circle
                        cx='50%'
                        cy='40%'
                        stroke={'lawngreen'}
                        strokeWidth={5}
                        r={15}
                        fill='transparent'
                        strokeDasharray={2 * Math.PI * 20}
                        strokeDashoffset={(2 * Math.PI * 20) / 2}
                        strokeLinecap='round'
                      />
                    </G>
                    <TextInput
                      defaultValue='75%'
                      style={[StyleSheet.absoluteFillObject, { fontSize: 12, textAlign: 'center', marginTop: 25, marginLeft: 30 }]}
                    />
                  </Svg>
                </View>
              )
            })}

          </View>

        </View>

        <View style={styles.col}>
          <View style={styles.coltitle}>
            <Text style={{ fontSize: 13, marginTop: 10, marginHorizontal: 2 }}>מצב רוח</Text>
            <Text style={{ fontSize: 13, marginHorizontal: 2 }}>יחסי</Text>
            {patiants.map((item) => {
              return (
                <View style={styles.row}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 7, marginLeft: 15 }}>
                    <Icon name='sentiment-satisfied' size={20} />
                    <Icon name='north' size={20} color={'#7fff00'} />
                  </View>
                </View>
              )
            })}
          </View>

        </View>

        <View style={styles.col}>
          <View style={styles.coltitle}>
            <Text style={{ fontSize: 13, marginTop: 10, marginHorizontal: 2 }}>פעילות</Text>
            <Text style={{ fontSize: 13, marginHorizontal: 2 }}>חשודה</Text>
            {patiants.map((item) => {
              return (
                <View style={styles.row}>
                  <TouchableOpacity style={{ marginTop: 8, marginRight: 15 }} onPress={toggleOverlay}>
                    <Icon name='warning' color='gold' />
                  </TouchableOpacity>
                  <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                    <Icon name='warning' color='gold' />
                    <Text style={styles.textSecondary}>
                      Activities were marked before the execution time!
                    </Text>
                  </Overlay>
                </View>
              )
            })}
          </View>

        </View>

        <View style={styles.col}>
          <View style={styles.coltitle} />
          {patiants.map((item) => {
            return (
              <View style={styles.row}>
                <TouchableOpacity style={styles.show} onPress={() => {
                  navigation.navigate('Patient Page');
                }}>
                  <Text style={{ fontSize: 12, marginLeft: 20 }}>הצג</Text>
                </TouchableOpacity>
              </View>
            )
          })}
        </View>

      </View>

    </ImageBackground >
  )
}

const styles = StyleSheet.create({

  textSecondary: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 17,
  },

  row: {
    width: 60,
    height: 30,
  },

  show: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    height: 20,
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#EFEFEF',
  },

  coltitle: {
    backgroundColor: '#F5F5F5',
    height: 40,
    borderBottomWidth: 1,
  },

  col: {
    display: 'flex',
    backgroundColor: 'white',
    height: 600,
    width: 70,
  },

  dashboardContainer: {
    display: 'flex',
    backgroundColor: '#EFEFEF',
    height: 600,
    width: 420,
    marginHorizontal: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },

  title2Container: {
    display: 'flex',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    height: 50,
    width: 420,
    marginHorizontal: 2,
  },

  centerContainer: {
    display: 'flex',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    height: 70,
    width: 420,
    marginHorizontal: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },

  titleContainer: {
    display: 'flex',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    height: 50,
    width: 420,
    marginHorizontal: 2,
    marginTop: 20
  },

  title: {
    left: 20,
    fontFamily: 'Arial',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 40,
    color: '#000000',
  },

  image: {
    flex: 1,
    justifyContent: "center",
  },

  touchOp: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    height: 50,
    width: 200,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#EFEFEF',
  },

  Searchbar: {
    width: 200,
    marginLeft: 17,
  },

});