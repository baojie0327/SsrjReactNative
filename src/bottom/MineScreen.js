import React,{Component} from 'react';
import {Image, StyleSheet,View,Text} from 'react-native';

/**
 * 首页
 */
export default class MineScreen extends Component{




    render(){
        return(
            <View style={styles.container}>
                <Text>我的</Text>
            </View>
        );
    }


}

const styles=StyleSheet.create({
    container:{
        flex:1,
    },
});