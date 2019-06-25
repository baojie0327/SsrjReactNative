import React,{Component} from 'react';
import {Image, StyleSheet,View,Text} from 'react-native';

/**
 * 热映
 */
export default class RankListScreen extends Component{




    render(){
        return(
            <View style={styles.container}>
                <Text>排行</Text>
            </View>
        );
    }


}

const styles=StyleSheet.create({
    container:{
        flex:1,
    },
});