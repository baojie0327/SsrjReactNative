import React, {Component} from 'react';
import {Image, StyleSheet, View, Text, FlatList, Platform, Dimensions, TouchableOpacity} from 'react-native';
import CardView from '../utils/CardView';


/**
 * 热映
 */

const URL = "https://api.douban.com/v2/movie/in_theaters";

export default class HotShowScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productData: [],
        };

        // 在ES6中，如果在自定义的函数里使用了this关键字，则需要对其进行“绑定”操作，否则this的指向会变为空
        // 像下面这行代码一样，在constructor中使用bind是其中一种做法（还有一些其他做法，如使用箭头函数等）
        this._fetchMovieData = this._fetchMovieData.bind(this);
    }


    componentDidMount() {
        this._fetchMovieData(URL, {apikey: '0df993c66c0c636e29ecbb5344252a4a', city: '北京', start: '0', count: '100'});
    }


    /**
     * 获取电影列表
     * @param url
     * @param params
     * @private
     */
    _fetchMovieData(url, params) {

        // 组装参数
        if (params) {
            let paramsArray = [];
            // 拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]));
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }

        fetch(url)
            .then((response => response.json()))
            .then(responseData => {
                this.setState({
                    productData: this.state.productData.concat(responseData.subjects)
                })
            }).catch((err) => {

        })


    }


    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    renderItem={this.renderMovieData}
                    data={this.state.productData}
                />
            </View>
        );
    }


    renderMovieData({item}) {
        return (
            <View style={styles.container}>

                <View style={{
                    width: Dimensions.get('window').width,
                    padding:10,
                    margin:10,
                    backgroundColor: '#ffffff',
                    shadowOpacity: 0.5,
                    shadowRadius: 3,
                    elevation: Platform.OS === "android" ? 3 : undefined,}}>

                    <View>
                        <Image style={styles.productImage}
                               source={{uri: item.images.medium}}/>
                    </View>

                </View>
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

    movieContainer: {
        flex: 1,
    },
    productImage: {
        width: 100,
        height: 150,
        marginLeft: 10
    },
});