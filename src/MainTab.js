import React from 'react';
import {Image,StyleSheet,View} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation';
import HomeScreen from "./bottom/HomeScreen";
import HotShowScreen from "./bottom/HotShowScreen";
import RankListScreen from "./bottom/RankListScreen";
import MineScreen from "./bottom/MineScreen";

/**
 * 四个tab页面
 * @type {NavigationContainer}
 */

export const MainTab=createBottomTabNavigator(

    {
        Home:{
            screen:HomeScreen,
            navigationOptions:{
                tabBarLabel:'首页',
                tabBarIcon:({focused,horizontal,tintColor})=>{
                    if (focused){
                        return(
                            <Image style={styles.tabBarIconStyle} source={require('../images/tab_home_pressed.png')}/>
                        );
                    }

                    return(
                        <Image style={styles.tabBarIconStyle} source={require('../images/tab_home_normal.png')}/>
                    );
                }

            }
        },
        HotShow:{
            screen:HotShowScreen,
            navigationOptions:{
                tabBarLabel:'热映',
                tabBarIcon:({focused,horizontal,tintColor})=>{
                    if (focused){
                        return(
                            <Image style={styles.tabBarIconStyle} source={require('../images/tab_hotshow.png')}/>
                        );
                    }

                    return(
                        <Image style={styles.tabBarIconStyle} source={require('../images/tab_hotshow_off.png')}/>
                    );
                }

            }
        },
        RankList:{
            screen:RankListScreen,
            navigationOptions:{
                tabBarLabel:'排行',
                tabBarIcon:({focused,horizontal,tintColor})=>{
                    if (focused){
                        return(
                            <Image style={styles.tabBarIconStyle} source={require('../images/tab_ranklist_check.png')}/>
                        );
                    }

                    return(
                        <Image style={styles.tabBarIconStyle} source={require('../images/tab_ranklist_normal.png')}/>
                    );
                }

            }
        },
        Mine:{
            screen:MineScreen,
            navigationOptions:{
                tabBarLabel:'我的',
                tabBarIcon:({focused,horizontal,tintColor})=>{
                    if (focused){
                        return(
                            <Image style={styles.tabBarIconStyle} source={require('../images/tab_mine_pressed.png')}/>
                        );
                    }

                    return(
                        <Image style={styles.tabBarIconStyle} source={require('../images/tab_mine_normal.png')}/>
                    );
                }

            }
        }
    },

    {
        tabBarOptions:{
            activeTintColor:'#00BD30',  //当前选中的tab bar的文本颜色和图标颜色
            inactiveTintColor:'gray',   //当前未选中的tab bar的文本颜色和图标颜色
            showIcon:true,              //是否显示tab bar的图标，默认是false
            showLabel:true,             //showLabel - 是否显示tab bar的文本，默认是true

            //tab bar的样式
            style:{
                backgroundColor:'#fff',
                paddingBottom:1,
                borderTopWidth:0.2,
                paddingTop:1,
                borderTopColor:'#ccc'
            },

            //tab bar的文本样式
            labelStyle:{
                fontSize:11,
                margin:1
            },

            tabStyle:{
                height:45,
            },

            indicatorStyle:{
                height:0
            }
        },

    //    tabBarPosition:'bottom',
       //  swipeEnabled:true,
    },


    {
        tabBarOptions:{
            activeTintColor:'#00BD30',  //当前选中的tab bar的文本颜色和图标颜色
            inactiveTintColor:'gray',   //当前未选中的tab bar的文本颜色和图标颜色
            showIcon:true,              //是否显示tab bar的图标，默认是false
            showLabel:true,             //showLabel - 是否显示tab bar的文本，默认是true

            //tab bar的样式
            style:{
                backgroundColor:'#fff',
                paddingBottom:1,
                borderTopWidth:0.2,
                paddingTop:1,
                borderTopColor:'#ccc'
            },

            //tab bar的文本样式
            labelStyle:{
                fontSize:11,
                margin:1
            },

            tabStyle:{
                height:45,
            },

            indicatorStyle:{
                height:0
            }

        }
    }




);

const styles=StyleSheet.create({
    tabBarIconStyle:{
        width:22,
        height:22,
    },
});