import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    Button,
    TouchableHighlight,
    Dimensions,
    Alert,
    ActivityIndicator
} from 'react-native';
import Swiper from 'react-native-swiper';

const MOVIE_DETAIL_URL = 'https://api.douban.com/v2/movie/subject/';

export default class MovieDetailScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            advertisements: [],
            loaded: false,   // 刚进页面加载
            data:{}
        };
        this._fetchData = this._fetchData.bind(this);
    }


    componentDidMount() {
        // 接收前个页面传递过来的数据
        const {navigation} = this.props;
        const movieId = navigation.getParam('movieId', 'NO-ID');
        const URL = MOVIE_DETAIL_URL + movieId;
        this._fetchData(URL, {apikey: '0df993c66c0c636e29ecbb5344252a4a'});
    }

    _fetchData(url, params) {
        if (params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]));
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }

        }

        let advertise = [];
        fetch(url)
            .then((response => response.json()))
            .then(responseData => {
             //   console.log('result==' + JSON.stringify(responseData));
                responseData.trailers.forEach(function (elem) {
                    advertise.push({'medium': elem.medium});
                });
                this.setState({
                    data:responseData,
                    advertisements: this.state.advertisements.concat(advertise),
                    loaded:true,

                });
                console.log('result==' + JSON.stringify(this.state.data));
            }).catch((err) => {

        });

    }

    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }
        // 想看
        let wish_count=this.state.data.wish_count;

        if (wish_count.toString().length < 5) {
        } else {
            wish_count = Math.floor(parseFloat(wish_count) / 10000 * 10) / 10 + '万';
        }

        let ratings_count=this.state.data.ratings_count;
        if (ratings_count.toString().length < 5) {
        } else {
            ratings_count = Math.floor(parseFloat(ratings_count) / 10000 * 10) / 10 + '万';
        }

        return (
            <View style={styles.containers}>

                <View style={styles.advertisementContent}>
                    <Swiper style={styles.advertisement}
                            height={200}
                            key={this.state.advertisements.length}
                            paginationStyle={{bottom: 10}}
                            autoplay={true}>
                        {this.state.advertisements.map((advertisement, index) => {
                            return (
                                <TouchableHighlight key={index} onPress={()=>Alert.alert('onClick-'+index,null,null)}>
                                    <Image style={styles.advertisementContent}
                                           source={{uri: advertisement.medium}}/>
                                </TouchableHighlight>
                            );
                        })}
                    </Swiper>
                </View>



                <View style={{flex: 1,marginTop:8,marginLeft:5}}>
                    <View style={{flexDirection: 'row'}}>
                        <Image style={{width: 100,height:150}}
                           source={{uri: this.state.data.images.medium}} />
                        <View style={{flexDirection:'column',marginLeft:10,justifyContent: 'space-evenly'}}>
                            <Text style={{fontWeight:'bold',fontSize:18}}>{this.state.data.title}</Text>
                            <Text style={{marginTop:5,color:'#808080'}}>{this.state.data.tags.slice(0,5).join(' / ')} / {this.state.data.durations[0]} </Text>
                            <Text style={{marginTop:5,color:'#808080'}}> {this.state.data.casts.map(item=>item.name).join(' / ')}</Text>
                            <Text style={{marginTop:5,color:'#808080'}}> {this.state.data.mainland_pubdate} 在中国大陆上映</Text>
                            <View style={{marginTop:5,flexDirection:'row',justifyContent: 'space-between'}}>
                                <Text style={{color:'#808080'}}>{wish_count} 人想看</Text>
                                <Text style={{color:'#808080'}}>{ratings_count} 人已评</Text>
                            </View>
                        </View>
                    </View>

                </View>
            </View>
        );
    }

    renderLoadingView(){
        return(
            <View style={styles.activityIndicator}>
                <ActivityIndicator size={'small'} color={"#00ff00"}/>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    containers: {
        flex: 1,
    },
    activityIndicator:{   // 指示圈
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },

    advertisementContent: {  // 轮播
        width: Dimensions.get('window').width,
        height: 200,
    },
    advertisement: {        // 轮播广告
        height: 200,
    },



});