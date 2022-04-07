import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { Icon, Overlay, Header } from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import ProgressCircle from 'react-native-progress-circle-rtl';
import { TextInput } from 'react-native-paper';

export default function Dashboard(props) {

  //Terapist id
  const idTerapist = props.route.params.id;

  //Back
  const back = props.route.params.back;

  //Patients list from DATA
  const [DataPatients, setDataPatients] = useState([]);
  const [patients, setPatients] = useState([]);

  //DATA - url
  const apiUrlPatients = "https://proj.ruppin.ac.il//igroup83/test2/tar6/api/Patient?id";

  //EVERY RENDER
  useEffect(() => {

    //get all terapist patients from DB
    fetch(apiUrlPatients + "=" + idTerapist, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json ; charset=UTP-8',
        'Accept': 'application/json ; charset=UTP-8'
      })
    })
      .then(res => {
        return res.json();
      })
      .then(
        (result) => {
          var obj = result.map(patient => patient);
          setPatients(obj);
          setDataPatients(obj);
        },
        (error) => {
          console.log("err post=", error);
        });

  }, [back]);

  //Overlay
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  //Search Bar
  const onChangeSearch = query => {

    if (query) {
      var filterData = DataPatients.filter(item => item.IdPatient.toString().includes(query));
      setPatients(filterData);
    }
    else {
      setPatients(DataPatients);
    }
  }

  const headerfunc = () => {
    props.navigation.goBack();
  }

  return (
    <View style={styles.topContainer}>

      <Header
        rightComponent={<View>
          <TouchableOpacity style={{ marginTop: 6, marginRight: 20 }} onPress={headerfunc}>
            <Icon name='arrow-back-ios' color='black' size={25} />
          </TouchableOpacity>
        </View>}
        containerStyle={{
          backgroundColor: 'rgba(0, 0, 0, 0)',
          justifyContent: 'space-around',
        }}
      />

      <ImageBackground
        source={require('../images/background1.png')}
        resizeMode="cover" style={styles.image}
      >

        <View style={styles.titleContainer}>
          <Text style={styles.title}>שלום  {props.route.params.name},</Text>
        </View>

        <View style={styles.centerContainer}>
          <View>
            <TextInput
              left={<TextInput.Icon name="magnify" color="grey" size={25} />}
              style={styles.searchinput}
              onChangeText={onChangeSearch}
              placeholder="מספר מטופל"
              placeholderTextColor="#a9a9a9"
              activeUnderlineColor="orange"
            />
          </View>
          <View>
            <TouchableOpacity style={styles.touchOp} onPress={() => {
              props.navigation.navigate('Add Patient', { idTerapist: idTerapist, name: props.route.params.name, back: false });
            }}>
              <Icon name='add' style={{ marginLeft: 20 }} />
              <Text style={{ marginLeft: 50, fontSize: 19 }}>הוסף מטופל חדש</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.dashboardContainer}>

          <View style={styles.col}>
            <View style={styles.coltitle}>
              <Text style={{ fontSize: 18, marginTop: 18, marginHorizontal: 40 }}>מספר</Text>
              {patients.length > 0 && patients.map((item, key) => {
                return (
                  <View style={styles.row} id={key}>
                    <Text
                      id={key}
                      style={{ fontSize: 15, marginTop: 8, marginHorizontal: 20 }}>
                      #{item?.IdPatient}
                    </Text>
                  </View>
                )
              })}
            </View>

          </View>

          <View style={styles.col}>
            <View style={styles.coltitle}>
              <Text style={{ fontSize: 18, marginTop: 18, marginHorizontal: 50 }}>כינוי</Text>
              {patients.length > 0 && patients.map((item, key) => {
                return (
                  <View style={styles.row} id={key}>
                    <Text id={key} style={{ fontSize: 15, marginHorizontal: 18, marginTop: 5 }}>{item?.NicknamePatient}</Text>
                  </View>
                )
              })}
            </View>

          </View>

          <View style={styles.col}>
            <View style={styles.coltitle}>
              <Text
                style={{ fontSize: 18, marginTop: 14, marginHorizontal: 25 }}>רמת ביצוע</Text>
              {patients.length > 0 && patients.map((item, key) => {

                return (
                  <View style={styles.circlerow} id={key}>
                    <ProgressCircle
                      id={key}
                      percent={item ? Math.round(item.ComplishionPresentae * 100) : 0}
                      radius={12}
                      borderWidth={4}
                      color={item.ComplishionPresentae < 0.5 ? 'red' : 'lawngreen'}
                      shadowColor="lightgrey"
                      bgColor="#fff"
                    >
                    </ProgressCircle>
                    <Text id={key} style={{ fontSize: 15, marginLeft: 10, transform: [{ rotate: '180deg' }] }}>{item?.ComplishionPresentae * 100}%</Text>
                  </View>
                )
              })}

            </View>

          </View>

          <View style={styles.col}>
            <View style={styles.coltitle}>
              <Text style={{ fontSize: 18, marginTop: 14, marginHorizontal: 25 }}>מצב רוח</Text>
              {patients.length > 0 && patients.map((item, key) => {
                return (
                  <View style={styles.rowmood} id={key}>
                    <View id={key} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2, marginLeft: 35 }}>
                      <Icon name={item.RelativeMood == 'DOUN' ? 'south' : 'north'} size={23} color={item.RelativeMood == 'DOUN' ? 'red' : '#7fff00'} />
                      <Icon name={item.Mood == 'SAD' ? 'sentiment-very-dissatisfied' : 'sentiment-satisfied-alt'} size={20} />
                    </View>
                  </View>
                )
              })}
            </View>

          </View>

          <View style={styles.col}>
            <View style={styles.coltitle} />
            {patients.length > 0 && patients.map((item, key) => {
              return (
                <View style={styles.rowmood} id={key}>
                  <TouchableOpacity id={key} style={{ marginHorizontal: 20 }} onPress={toggleOverlay}>
                    <Icon name='warning' color='gold' size={25} />
                  </TouchableOpacity>
                  <Overlay id={key} isVisible={visible} onBackdropPress={toggleOverlay}>
                    <Icon name='warning' color='gold' />
                    <Text id={key} style={styles.textSecondary}>
                      סומנו מספר פעילויות ברצף !
                    </Text>
                  </Overlay>
                </View>
              )
            })}
          </View>

          <View style={styles.col}>
            <View style={styles.coltitle} />
            {patients.length > 0 && patients.map((item, key) => {
              return (
                <View style={styles.row} id={key}>
                  <TouchableOpacity id={key} style={styles.show} onPress={() => {
                    props.navigation.navigate('Patient Page', { patient: item, terapistId: idTerapist, name: props.route.params.name });
                  }}>
                    <Text style={{ fontSize: 15, marginLeft: '35%' }}>הצג</Text>
                  </TouchableOpacity>
                </View>
              )
            })}
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

  searchinput: {
    flexDirection: "row",
    height: 50,
    backgroundColor: '#EFEFEF',
    marginLeft: 25,
    width: 300,
    fontSize: 18,
  },

  circlerow: {
    width: 60,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    marginTop: 7.5,
    marginHorizontal: 35,
    transform: [{ rotate: '180deg' }]
  },

  textSecondary: {
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 20,
    marginTop: 5
  },

  row: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    width: '65%',
    height: 30,
    marginLeft: 20,
    marginTop: 8
  },

  rowmood: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    width: '65%',
    height: 30,
    marginLeft: 20,
    marginTop: 7
  },

  show: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    height: 22,
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
    backgroundColor: 'rgba(0, 0, 0, 0)',
    height: 630,
    width: '30%',
  },

  dashboardContainer: {
    display: 'flex',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    height: 600,
    width: 435,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30
  },

  centerContainer: {
    display: 'flex',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    height: 70,
    width: '95%',
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40
  },

  titleContainer: {
    display: 'flex',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    height: 50,
    width: 375,
    marginHorizontal: 0,
    marginTop: 150
  },

  title: {
    left: 25,
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
    width: 300,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#EFEFEF',
    marginLeft: 120,
  },

});