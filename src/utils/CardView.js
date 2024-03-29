import PropTypes from 'prop-types';
import React from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Platform,
} from 'react-native';

const CardView = props => {
    const { children, elevation, opacity, cornerRadius } = props;

    const cardStyle = Platform.select({
        ios: () =>
            StyleSheet.create({
                container: {
                    shadowRadius:elevation,
                    shadowOpacity:opacity,
                    shadowOffset:{ width: 0, height: elevation },
                    borderRadius:cornerRadius,
                    backgroundColor: props.backgroundColor,
                    width: Dimensions.get('window').width - 40,
                }
            }),
        android: () =>
            StyleSheet.create({
                container: {
                    elevation:elevation,
                    borderRadius:cornerRadius,
                    backgroundColor: props.backgroundColor,
                    width: Dimensions.get('window').width - 10,
                }
            })
    })();

    return(
        <View style={[cardStyle.container, props.style]}>
            {children}
        </View>
    )

};

CardView.prototype = {
    backgroundColor: PropTypes.string,
    elevation: PropTypes.number,
    cornerRadius: PropTypes.number,
    opacity: PropTypes.number
};

CardView.defaultProps = {
    backgroundColor: '#ffffff',
    elevation: 3,
    cornerRadius: 5,
    opacity: .5
};

export default CardView
