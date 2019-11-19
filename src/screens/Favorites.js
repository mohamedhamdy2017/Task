import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {removeFromFavorite} from '../redux/actions';

class Favorites extends Component {
  static navigationOptions = {
    headerTitle: 'Favorites',
  };

  handleFavorite(item, isExist) {
    if (isExist) {
      this.props.removeFromFavorite(item.id);
    }
  }
  render() {
    const {
      itemContainer,
      imageContainer,
      imageStyle,
      heartIconContainer,
      saleTextLabelStyle,
      brandNameContainer,
      brandNameText,
      salePriceText,
      priceContainer,
      currencyText,
      buttonsContainer,
      buttonStyle,
    } = styles;

    const {favorites} = this.props;

    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <FlatList
          data={favorites}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => {
            const {iconName, image, brandName, salePrice, price} = item;
            const isExist = favorites.includes(item);
            return (
              <TouchableOpacity style={itemContainer}>
                <TouchableOpacity
                  style={heartIconContainer}
                  onPress={() => this.handleFavorite(item, isExist)}>
                  <Icon
                    name={iconName}
                    size={hp('2.5%')}
                    color={isExist ? 'red' : 'gray'}
                  />
                </TouchableOpacity>
                <View style={saleTextLabelStyle}>
                  <Text style={{color: 'white', fontWeight: '800'}}>Sale</Text>
                </View>
                <View style={imageContainer}>
                  <Image source={{uri: image}} style={imageStyle} />
                </View>
                <View style={brandNameContainer}>
                  <Text numberOfLines={2} style={brandNameText}>
                    {brandName}
                  </Text>
                  <View style={[priceContainer]}>
                    <Text
                      style={[
                        currencyText,
                        {textDecorationLine: 'line-through'},
                      ]}>
                      AED
                    </Text>
                    <Text
                      style={[
                        salePriceText,
                        {textDecorationLine: 'line-through'},
                      ]}>
                      {salePrice}
                    </Text>
                  </View>
                  <View style={priceContainer}>
                    <Text style={[currencyText, {fontSize: hp('2%')}]}>
                      AED
                    </Text>
                    <Text style={[salePriceText, {fontSize: hp('2%')}]}>
                      {price}
                    </Text>
                  </View>
                  <View style={buttonsContainer}>
                    <TouchableOpacity style={buttonStyle}>
                      <Text style={{fontSize: hp('1.5%'), color: 'white'}}>
                        ADD TO CART
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[buttonStyle, {backgroundColor: '#d0d6d1'}]}>
                      <Text style={{fontSize: hp('1.5%'), color: '#6ab06a'}}>
                        VIEW DETAILS
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    width: wp('48%'),
    height: hp('40%'),
    alignItems: 'center',
    margin: wp('1%'),
  },
  imageContainer: {
    width: wp('35%'),
    height: hp('25%'),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
  },
  imageStyle: {
    width: wp('34%'),
    height: hp('20%'),
    resizeMode: 'cover',
  },
  heartIconContainer: {
    width: wp('9%'),
    height: hp('4%'),
    position: 'absolute',
    zIndex: 1,
    end: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saleTextLabelStyle: {
    position: 'absolute',
    backgroundColor: 'red',
    start: 0,
    top: 16,
    height: hp('2.5%'),
    width: 60,
    transform: [{rotate: '-40deg'}],
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandNameContainer: {
    width: wp('40%'),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandNameText: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    textAlign: 'center',
    height: hp('3%'),
  },
  salePriceText: {
    fontSize: hp('1.5%'),
    fontWeight: '500',
    textAlign: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    width: wp('16%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('1%'),
  },
  currencyText: {
    fontSize: hp('1.5%'),
    fontWeight: '500',
    textAlign: 'center',
  },
  buttonsContainer: {
    width: wp('48%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('1%'),
  },
  buttonStyle: {
    width: wp('24'),
    height: hp('5%'),
    backgroundColor: '#6ab06a',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = ({favReducer}) => {
  const {favorites} = favReducer;
  return {favorites};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      removeFromFavorite,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Favorites);
