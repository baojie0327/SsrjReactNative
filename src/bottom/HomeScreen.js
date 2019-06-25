import React,{Component} from 'react';
import {Image, StyleSheet,View,Text} from 'react-native';

/**
 * 首页
 */
export default class HomeScreen extends Component{




    render(){
        return(
            <View style={styles.container}>
                <Text>首页</Text>
            </View>
        );
    }


}

const styles=StyleSheet.create({
    container:{
        flex:1,
    },
});