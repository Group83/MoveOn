import { View, Text, ScrollView, StyleSheet, ImageBackground, TouchableOpacity, LogBox } from 'react-native';
import { Icon, Header } from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import ProgressCircle from 'react-native-progress-circle-rtl';
import { TextInput } from 'react-native-paper';
import Overlay from 'react-native-modal-overlay';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

LogBox.ignoreAllLogs();

export default function Dashboard(props) {

  //Terapist id fron log in page
  const idTerapist = props.route.params.id;

  //Back (to refresh page after add new patient)
  const back = props.route.params.back;

  //Patients lists - from DATA and after SEARCH
  const [DataPatients, setDataPatients] = useState([]);
  const [patients, setPatients] = useState([]);
  const [patientsOff, setPatientsOff] = useState([]);
  const [off, setOff] = useState(true);

  //DATA - url
  const apiUrlPatients = "https://proj.ruppin.ac.il//igroup83/test2/tar6/api/Patient?id";

  //EVERY RENDER
  useEffect(() => {

    //GET all patients from DB
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
          console.log('Patients Data : ', obj);
          var patientsOn = obj.filter((item) => item.PatientStatus == 1);
          var patientsOff = obj.filter((item) => item.PatientStatus == 0);
          setPatientsOff(patientsOff);
          setPatients(patientsOn);
          setDataPatients(patientsOn);
        },
        (error) => {
          console.log("err post=", error);
        });

  }, [back]);

  //Overlay1
  const [visible1, setVisible1] = useState(false);
  const toggleOverlay1 = () => {
    setVisible1(!visible1);
  };
  //Overlay2
  const [visible2, setVisible2] = useState(false);
  const toggleOverlay2 = () => {
    setVisible2(!visible2);
  };
  //Overlay3
  const [visible3, setVisible3] = useState(false);
  const toggleOverlay3 = () => {
    setVisible3(!visible3);
  };

  //Search Bar
  const onChangeSearch = query => {
    if (query) {
      var filterData = DataPatients.filter(item => item.IdPatient.toString().includes(query));
      setPatients(filterData); //set to view only filter patients
    }
    else {
      setPatients(DataPatients); //return all the patients
    }
  }

  const headerfunc = () => {
    props.navigation.goBack();
  }

  //Table
  const tableHead = (['מספר מטופל', 'כינוי', 'ביצועים', 'מצב רוח', '', '']);
  const width = ([140, 170, 140, 140, 100, 110]);
  const tableData = [];
  for (let i = 0; i < patients.length; i += 1) {
    const rowData = [];
    rowData.push(
      '#' + patients[i].IdPatient,
      patients[i].NicknamePatient,
      patients[i].ComplishionPresentae,
      [patients[i].RelativeMood, patients[i].Mood],
      patients[i].Warning,
      patients[i]
    );
    tableData.push(rowData);
  }
  //רמת ביצוע
  const ComplishionPresentae = (item, key) => {
    return (
      <View style={styles.circlerow} key={key}>
        <ProgressCircle
          percent={item ? Math.round(item[key] * 100) : 0}
          radius={16}
          borderWidth={6}
          color={item[key] < 0.5 ? 'red' : 'lawngreen'}
          shadowColor="lightgrey"
          bgColor="#fff"
        />
        <Text style={{ fontSize: 18, marginLeft: 10, transform: [{ rotate: '180deg' }] }}>{item ? item[key] * 100 : 0}%</Text>
      </View>
    )
  }
  //מצב רוח
  const Mood = (item, key) => {
    return (
      <View style={styles.rowmood} key={key}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: '25%' }}>
          <Icon name={item[key][0] == 'DOUN' ? 'south' : 'north'} size={25} color={item[key][0] == 'DOUN' ? 'red' : '#7fff00'} />
          <Text style={{ fontSize: 30 }}>{item[key][1] == 'SAD' ? '😥' : '😀'}</Text>
        </View>
      </View>
    )
  }
  //התראת מצב חריג
  const Warning = (item, key) => {
    if (item[key] === '1') {
      return (
        <TouchableOpacity onPress={toggleOverlay1}>
          <View>
            <Icon name='warning' color='gold' size={33} style={{ marginRight: '35%' }} />
          </View>
        </TouchableOpacity>
      )
    } else if (item[key] === '2') {
      return (
        <TouchableOpacity onPress={toggleOverlay2}>
          <View>
            <Icon name='warning' color='gold' size={33} style={{ marginRight: '35%' }} />
          </View>
        </TouchableOpacity>
      )
    } else if (item[key] === '3') {
      return (
        <TouchableOpacity onPress={toggleOverlay3}>
          <View>
            <Icon name='warning' color='#ED2938' size={33} style={{ marginRight: '35%' }} />
          </View>
        </TouchableOpacity>
      )
    }
  };
  //כפתור הצג
  const Botton = (item, key) => {
    return (
      <View key={key}>
        <TouchableOpacity style={styles.show} onPress={() => {
          props.navigation.navigate('Patient Page', { patient: item[key], terapistId: idTerapist, name: props.route.params.name });
        }}>
          <Text style={{ fontSize: 18, marginHorizontal: '35%' }}>הצג</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const showOff = () => {

    setOff(!off);

    if (off) {
      var newArr = [...DataPatients];
      patientsOff.forEach((patient) => newArr.push(patient));
      setPatients(newArr);
    }
    else {
      var filterOffData = DataPatients.filter((item) => item.PatientStatus == 1);
      setPatients(filterOffData); //set to view only filter patients
    }

  }


  return (
    <View style={styles.topContainer}>

      <Header
        rightComponent={<View>
          <TouchableOpacity style={{ marginTop: '10%', marginRight: 20 }} onPress={headerfunc}>
            <Icon name='arrow-back-ios' color='black' size={25} />
          </TouchableOpacity>
        </View>}
        centerComponent={<View style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
          <Text style={{ fontSize: 23, marginRight: 10, marginTop: 14 }}>{props.route.params.name}</Text>
          <Icon name='account-circle' color='black' size={38} style={{ marginTop: 10 }} />
        </View>}
        containerStyle={{
          backgroundColor: 'rgba(0, 0, 0, 0)',
          justifyContent: 'space-around',
        }}
      />

      <ImageBackground
        source={require('../images/background4.jpeg')}
        resizeMode="cover" style={styles.image}
      >

        <View>
          <TouchableOpacity style={styles.showOff} onPress={showOff}>
            <Icon name='pending-actions' size={35} />
          </TouchableOpacity>
        </View>

        <View style={styles.firstContainer}>
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
              <Icon name='person-add-alt-1' style={{ marginLeft: 20 }} />
              <Text style={{ marginLeft: 50, fontSize: 19 }}>הוסף מטופל חדש</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* table */}
        <View style={styles.dashboardContainer}>
          <Table borderStyle={{ borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0)' }}>
            <Row data={tableHead} widthArr={width} style={styles.header} textStyle={styles.headertext} />
            <ScrollView style={{ marginTop: -1 }}>
              {
                tableData.map((rowData, index) => (
                  <TableWrapper key={index} style={styles.row}>
                    {
                      rowData.map((cellData, cellIndex) => (
                        <Cell style={{ width: width[cellIndex] }} key={cellIndex}
                          data={cellIndex === 2 ? ComplishionPresentae(rowData, cellIndex) : cellIndex === 3 ? Mood(rowData, cellIndex) : cellIndex === 4 ? Warning(rowData, cellIndex) : cellIndex === 5 ? Botton(rowData, cellIndex) : cellData}
                          textStyle={styles.tabletext}
                        />
                      ))
                    }
                  </TableWrapper>
                ))
              }
            </ScrollView>
          </Table>

          <Overlay visible={visible1}
            onClose={() => { setVisible1(false) }}
            closeOnTouchOutside
            containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', alignItems: 'center' }}
            childrenWrapperStyle={{ backgroundColor: 'white', borderWidth: 1, borderColor: 'white', borderRadius: 15, alignItems: 'center', width: '50%' }}
            onBackdropPress={toggleOverlay1}>
            <Icon name='warning' color='gold' size={30} />
            <Text style={styles.textSecondary}>
              סומנה פעילות לפני זמן הביצוע !
            </Text>
          </Overlay>

          <Overlay visible={visible2}
            onClose={() => { setVisible2(false) }}
            closeOnTouchOutside
            containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', alignItems: 'center' }}
            childrenWrapperStyle={{ backgroundColor: 'white', borderWidth: 1, borderColor: 'white', borderRadius: 15, alignItems: 'center', width: '50%' }}
            onBackdropPress={toggleOverlay2}>
            <Icon name='warning' color='gold' size={30} />
            <Text style={styles.textSecondary}>
              סומנו מספר פעילויות ברצף !
            </Text>
          </Overlay>

          <Overlay visible={visible3}
            onClose={() => { setVisible3(false) }}
            closeOnTouchOutside
            containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', alignItems: 'center' }}
            childrenWrapperStyle={{ backgroundColor: 'white', borderWidth: 1, borderColor: 'white', borderRadius: 15, alignItems: 'center', width: '50%' }}
            onBackdropPress={toggleOverlay3}>
            <Icon name='warning' color='#ED2938' size={30} />
            <Text style={styles.textSecondary}>
              שים לב ! נראה כי זוהתה יותר מחריגה אחת.
            </Text>
          </Overlay>

        </View>

      </ImageBackground >
    </View >
  )
}

const styles = StyleSheet.create({

  showOff: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    height: 40,
    width: 40,
    marginLeft: '3%',
    marginBottom: '6%',
  },

  textSecondary: {
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 20,
    marginVertical: '5%'
  },

  header: {
    height: 45,
    borderBottomWidth: 1,
    backgroundColor: '#F5F5F5',
    borderColor: 'rgba(0, 0, 0, 0.25)'
  },

  headertext: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '400',
  },

  tabletext: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '200'
  },

  topContainer: {
    flex: 1,
  },

  searchinput: {
    flexDirection: "row",
    height: 50,
    backgroundColor: '#EFEFEF',
    marginLeft: 25,
    width: 300,
    fontSize: 20,
  },

  circlerow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    marginHorizontal: '25%',
    transform: [{ rotate: '180deg' }]
  },

  row: {
    flexDirection: 'row',
    height: 50,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.25)'
  },

  show: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
    height: 30,
    width: '90%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#E5E5E5',
  },

  dashboardContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    height: 850,
    width: '100%',
    alignItems: 'center',
    marginTop: '5%'
  },

  firstContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    width: '95%',
    marginHorizontal: '4%',
    flexDirection: 'row',
    alignItems: 'center',
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