import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    View,
    Text,
    FlatList,
    Platform,
    Dimensions,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    Animated,
    Easing,


} from 'react-native';
import CardView from '../utils/CardView';
import {Rating, Button} from 'react-native-elements';
import SmartRefresh from '../utils/SmartRefresh';


/**
 * 热映
 */

const url = "https://api.douban.com/v2/movie/in_theaters";
const params={apikey: '0df993c66c0c636e29ecbb5344252a4a', city: '北京', start: '0', count: '100'};

export default class HotShowScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            productData: [],
            prArrowDeg: new Animated.Value(0),
        };
        this.base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAABQBAMAAAD8TNiNAAAAJ1BMVEUAAACqqqplZWVnZ2doaGhqampoaGhpaWlnZ2dmZmZlZWVmZmZnZ2duD78kAAAADHRSTlMAA6CYqZOlnI+Kg/B86E+1AAAAhklEQVQ4y+2LvQ3CQAxGLSHEBSg8AAX0jECTnhFosgcjZKr8StE3VHz5EkeRMkF0rzk/P58k9rgOW78j+TE99OoeKpEbCvcPVDJ0OvsJ9bQs6Jxs26h5HCrlr9w8vi8zHphfmI0fcvO/ZXJG8wDzcvDFO2Y/AJj9ADE7gXmlxFMIyVpJ7DECzC9J2EC2ECAAAAAASUVORK5CYII=';

        // 在ES6中，如果在自定义的函数里使用了this关键字，则需要对其进行“绑定”操作，否则this的指向会变为空
        // 像下面这行代码一样，在constructor中使用bind是其中一种做法（还有一些其他做法，如使用箭头函数等）
     //   this.onFetch = this.onFetch.bind(this);
    }


    componentDidMount() {
      //  this.onFetch(URL, {apikey: '0df993c66c0c636e29ecbb5344252a4a', city: '北京', start: '0', count: '100'});
    }


    /**
     * 获取电影列表
     * @param url
     * @param params
     * @private
     */
    async onFetch(page, pageSize, callback) {

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

     renderMovieData({item}) {
        // 主演
        let mainCast = item.casts.map(cast => cast.name).join(' / ');
        // 观看人数
        var total_count;
        let count = item.collect_count;
        if (count.toString().length < 5) {
            total_count = count;
        } else {
            total_count = Math.floor(parseFloat(count) / 10000 * 10) / 10 + '万';
        }

        return (
            <View style={styles.container}>

                <CardView style={styles.cardStyle}>
                    <View style={styles.movieContainer}>
                        <Image style={styles.productImage}
                               source={{uri: item.images.medium}}/>

                        <View style={styles.movieContentContainer}>
                            <View style={styles.contentLeft}>
                                <Text style={styles.movieTitle}>{item.title}</Text>
                                <Rating
                                    style={{marginTop: 10}}
                                    imageSize={15}
                                    readonly
                                    fractions={1}
                                    startingValue={item.rating.average / 2}
                                    ratingCount={5}/>
                                <Text style={{marginTop: 10, fontSize: 11}}>导演： {item.directors[0].name}</Text>
                                <Text style={{marginTop: 10, fontSize: 11}}>主演： {mainCast}</Text>
                            </View>

                            <View style={styles.contentRight}>
                                <Text style={{fontSize: 9}}>{total_count}人看过</Text>
                                <Button
                                    buttonStyle={{
                                        marginTop: 15,
                                        width: 50,
                                        height: 25,
                                        borderColor: 'red',
                                        borderWidth: 1
                                    }}
                                    title={'购票'}
                                    titleStyle={{fontSize: 12, color: 'red'}}
                                    type='outline'
                                    onPress={() => Alert.alert('购票', null, null)}/>
                            </View>


                        </View>

                    </View>
                </CardView>

            </View>


        );
    }

    footerView() {
        let footerLoading = () => (<View style={styles.footer}><ActivityIndicator animating={true} size="small" /><View style={{ marginLeft: 20 }}><Text style={{ textAlign: 'center' }}>正在加载中...</Text></View></View>);
        let loadingNoMore = () => <View style={styles.footer}><Text style={{ textAlign: 'center' }}>已经到底了</Text></View>;
        let loadingMore = (_getMore) =>
            <TouchableOpacity style={styles.footer} onPress={() => _getMore()} >
                <Text style={{ textAlign: 'center' }}>加载更多</Text>
        </TouchableOpacity> ;

        let noDataView = (_rePostFetch) => <View>
            <Text style={{ textAlign: 'center' }}>没有数据</Text>
            <TouchableOpacity

                onPress={() => _rePostFetch()}
            >
                <Text style={{ color: '#333', textAlign: 'center' }}>点击立即刷新</Text>
            </TouchableOpacity>
        </View>;
        let errorView = (_rePostFetch) => <View>
            <Text style={{ textAlign: 'center' }}>网络请求失败</Text>
            <TouchableOpacity

                onPress={() => _rePostFetch()}
            >
                <Text style={{ color: '#333', textAlign: 'center' }}>点击立即刷新</Text>
            </TouchableOpacity>
        </View>;
        let loading = () => <Text style={{ textAlign: 'center' }}>正在加载中。。。</Text>;
        return {
            footerLoading,
            loadingNoMore,
            loadingMore,
            noDataView,
            errorView,
            loading
        }
    }

    defaultTopIndicatorRender = (pulling, pullok, pullrelease, pullSuccess, gesturePosition) => {
        // console.log(pulling, pullok, pullrelease, pullSuccess, gesturePosition)
        this.transform = [{
            rotate: this.state.prArrowDeg.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '-100deg']
            })
        }];
        if (pulling) {
            Animated.timing(this.state.prArrowDeg, {
                toValue: 0,
                duration: 100,
                easing: Easing.inOut(Easing.quad)
            }).start();
        } else if (pullok) {
            Animated.timing(this.state.prArrowDeg, {
                toValue: 1,
                duration: 100,
                easing: Easing.inOut(Easing.quad)
            }).start();
        }
        return (
            <View style={[styles.headWrap]}>
                <View ref={(c) => { this.txtPulling = c; }} style={pulling ? styles.show : styles.hide}>
                    <Animated.Image style={[styles.arrow, { transform: this.transform }]}
                                    resizeMode={'contain'}
                                    source={{ uri: this.base64Icon }} />
                    <Text style={styles.arrowText}>{"下拉可以刷新"}</Text>
                </View>

                <View ref={(c) => { this.txtPullok = c; }} style={pullok ? styles.show : styles.hide}>

                    <Animated.Image style={[styles.arrow, { transform: this.transform }]}
                                    resizeMode={'contain'}
                                    source={{ uri: this.base64Icon }} />
                    <Text style={styles.arrowText}>{"释放立即刷新"}</Text>
                </View>

                <View ref={(c) => { this.txtPullrelease = c; }} style={pullrelease ? styles.show : styles.hide}>
                    <ActivityIndicator size="small" color="gray" style={styles.arrow} />
                    <Text style={styles.arrowText}>{"刷新数据中..."}</Text>
                </View>
                <View ref={(c) => { this.txtPullSuccess = c; }} style={pullSuccess ? styles.show : styles.hide}>
                    <Text style={styles.arrowText}>{"刷新成功.."}</Text>
                </View>

            </View>
        );

    };


    render() {


        return (
            <View style={styles.container}>
                <SmartRefresh
                    topBackgroundColor={'#fccb57'}
                    initialNumToRender={7}
                    renderItem={this.renderMovieData}
                    initialPage={1}
                    pageSize={10}
                    AsycConnectedChange={'connectionChange'}
                    onFetch={this.onFetch.bind(this)}
                    topIndicatorRender={this.defaultTopIndicatorRender}
                    {...this.footerView() }
                />

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

    cardStyle: {
        padding: 5,
        margin: 5,
    },

    movieContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 5
    },

    productImage: {
        width: 100,
        height: 140,
        marginLeft: 5,

    },
    movieContentContainer: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    contentLeft: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    contentRight: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    movieTitle: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
    },
    footer: {
        backgroundColor: '#f2f2f2',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 60
    },
    headWrap: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eca02a',
        height: 100,
    },
    arrow: {
        height: 30,
        width: 30,
        marginRight: 20,
    },
    hide: {
        position: 'absolute',
        left: 10000
    },
    show: {
        position: 'relative',
        left: 0,
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999
    },
    arrowText: {
        marginLeft: 20,
    },
});