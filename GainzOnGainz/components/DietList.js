import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {format} from 'date-fns';
import DietDateContext from '../contexts/DietDateContext';
import DietListItem from './DietListItem';


const HorizontalSep = () => {
  return <View style={{padding: 10}} />;
};

const EmptyList = () => (
  <Text style={styles.emptyList}>Diet 내역이 없습니다{"\n"}버튼을 통해 추가해주세요</Text>
);


const DietList = () => {
  const {dietdate, setDietdate} = useContext(DietDateContext);
  const temp_dt = {
    "24:00:01" : "no food :(",
    "24:00:02" : "no food ::("
  }
  const [dis_data, setDis_data] = useState(temp_dt)
  const [is_data_exist, setIs_data_exist] = useState(false)
  const async_load = async (date, debug = false) => {
    try{
      const value = await AsyncStorage.getItem("dietdata")
      const real_value = JSON.parse(value)[format(date, "yyyy-MM-dd")]??{"24:00:01" : "no food :("} 
      if (debug){
          console.log(real_value)
          console.log(is_data_exist)
      }
      if (Object.keys(real_value).includes("24:00:01")) {
        setIs_data_exist(false)
      } else {
        setIs_data_exist(true)
        setDis_data(real_value)
      }
    } catch(e) {
      setIs_data_exist(false)
      setDis_data({"24:00:01" : "no food :("})
      console.log(e)
    }  
  }
  useEffect(() => {
    async_load(dietdate, debug = false)
  }, [dietdate])
  return (
    <View style={styles.block}>
      {is_data_exist?
        (<FlatList
        data={Object.keys(dis_data)}
        ItemSeparatorComponent={HorizontalSep}
        renderItem={({item}) => {
          return (
              <DietListItem time = {item} data = {dis_data[item]}/>
            )
          }
        }
      />) 
      :
      <EmptyList/>
      }      
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
  },
  emptyList:{
    color:"#BDBDBD",
    textAlign: 'center',
  },
});

export default DietList;
