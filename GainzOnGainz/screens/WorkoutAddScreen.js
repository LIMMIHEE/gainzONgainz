import React, { useEffect, useState} from 'react';
import {Text, StyleSheet, View, TextInput, TouchableOpacity,ActionSheetIOS} from 'react-native';
import WorkoutAddListItem from '../components/WorkoutAddListItem';
import WorkoutTypeModal from '../components/WorkoutTypeModal';

function WorkoutAddScreen({navigation}) {
  const [workoutType, setWorkoutType] = useState('상체');
  const [workoutSubType, setWorkoutSubType] = useState('어깨');
  const [modalVisible, setModalVisible] = useState(false);
  const [mainType, setMainType] = useState(true);

  const type = ["상체","하체","유산소"];
  const subTypeMap = {
    "상체":[
      "어깨",
      "등",
      "가슴",
      "팔",
      "복부",
    ],
    "하체":[
      "엉덩이",
      "허벅지 앞",
      "허벅지 뒤",
      "허벅지 안",
      "종아리"
    ],
    "유산소":[
      "런닝머신",
      "자전거",
      "천국의 계단",
      "스텝머신",
      "일렉티컬",
      "기타"
    ]
  };

  const onTypePress = (isMainType) => {
    setMainType(isMainType);
    var typeData = isMainType ? type : subTypeMap[workoutType]

    if (Platform.OS === 'android') {
      setModalVisible(true);
      return;
    }

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [...typeData, '취소'],
        cancelButtonIndex: typeData.length,
      },
      (buttonIndex) => {
        if(buttonIndex != typeData.length){
          if(isMainType){
            setWorkoutType(typeData[buttonIndex]);
            setWorkoutSubType(subTypeMap[typeData[buttonIndex]][0]);
          }else{
            setWorkoutSubType(typeData[buttonIndex]);
          }
        }
      },
    );
  };

  return (
    <View style={styles.body}>
      <WorkoutTypeModal
        value = {mainType ? type : subTypeMap[workoutType]}
        visible={modalVisible}
        onClose={(workoutType) => {
          setModalVisible(false);
          if(workoutType != ''){
            if(mainType){
              setWorkoutType(workoutType);
              setWorkoutSubType(subTypeMap[workoutType][0]);
            }else{
              setWorkoutSubType(workoutType);
            }
          }
        }}
      />
      <View style={styles.listView}>
        <TouchableOpacity onPress={() => navigation.pop()} >
          <Text style={styles.close}>닫기</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.saveView}>
            <Text style={styles.saveText}>저장</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.separator}/>
      <View style={styles.block}>
        <View style={styles.workoutGroupView}>
          <TouchableOpacity onPress={()=> onTypePress(true)}>
            <View style={styles.workoutGroup}>
              <Text style={styles.workoutGroupText}>{workoutType}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTypePress(false)}>
            <View style={styles.workoutType}>
              <Text style={styles.workoutTypeText}>{workoutSubType}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TextInput 
            style={styles.workoutTitle}
           placeholder="운동명"/>
        <View style={styles.separator}/>
        <View style={styles.listView}>
            <WorkoutAddListItem title="무게" unit="KG" hint="25"/>
            <WorkoutAddListItem title="횟수" unit="회" hint="5"/>
            <WorkoutAddListItem title="휴식" unit="초" hint="30"/>
        </View>
        <View style={styles.separator}/>
        <TouchableOpacity>
        <View style={styles.addButtonView}>
          <Text style={styles.addButtonText}>세트 추가하기</Text>
        </View>
      </TouchableOpacity>
      </View>
    </View>
  );

}



const styles = StyleSheet.create({
  body:{
    flex:1,
    backgroundColor:"#FFF",
  },
  block: {
    flex:1,
    paddingHorizontal:25
  },
  separator:{
    width: "100%",
    textAlign: "center",
    borderWidth: 0.7,
    borderRadius: 36,
    borderStyle: 'solid',
    borderColor:"#E5E5E5"
  },
  listView : {
    flexDirection: 'row',
    justifyContent:'space-between',
    marginVertical:18
  },
  saveView:{
    backgroundColor:"#000",
    borderRadius:50,
    paddingHorizontal:20,
    paddingVertical:8,
    marginHorizontal:25
  },
  saveText:{
    color:"#FFF",
    fontSize:16,
    fontWeight:"600"
  },
  close:{
    marginHorizontal:25,
  },
  workoutTitle:{
    fontSize:24,
    fontWeight:"600",
    marginVertical:20
  },
  workoutGroupView:{
    flexDirection: 'row',
    marginVertical:20
  },
  workoutGroup:{
    borderRadius:50,
    backgroundColor:"#FF7373",
    paddingVertical:4,
    paddingHorizontal:12
  },
  workoutGroupText:{
    color:"#FFF",
    fontSize:15,
    fontWeight:"600"
  },
  workoutType:{
    borderRadius:50,
    borderWidth: 1,
    borderRadius: 36,
    borderStyle: 'solid',
    paddingVertical:4,
    paddingHorizontal:12,
    marginHorizontal:8
  },
  workoutTypeText:{
    fontSize:15,
    fontWeight:"600"
  },
  addButtonView:{
    backgroundColor:"#F4F4F4",
    borderRadius:16,
    paddingVertical:24,
    marginVertical:30,
    alignItems:'center'
  },
  addButtonText:{
    color:"#BDBDBD",
    fontSize:15
  }
});

export default WorkoutAddScreen;
