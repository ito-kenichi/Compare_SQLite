import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { defaultData } from './DefaultData';


let db;

export default class App extends Component {

  state = {
    text: 'nothing..'
  };

  componentDidMount() {
    try {
      db = SQLite.openDatabase('data.db');
      db.transaction(tx => {
        tx.executeSql(
          "CREATE TABLE if not exists mainTable ( No INTEGER PRIMARY KEY autoincrement, nameId INTEGER, Title TEXT NOT NULL, details TEXT)",
          (dbError) => {
            console.log("fail to create : " + dbError);
          }
        );
        for(let data of defaultData.mainTable){
          tx.executeSql("insert into mainTable (nameId, Title, details) values(?, ?, ?)", [data.nameId, data.title, data.detail],
          (error) => {
            console.log("error : ", error)
          },
          (success) => {
            console.log("success : ", success)
          });
        }
        tx.executeSql("select * from mainTable", null, { rows: { _array } });
      });
    } catch(error) {
        console.log("error : ", error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.text}</Text>
        <Text>Hello World</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
