import React, { Component } from 'react';
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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  removeFromCart,
  incermentCount,
  decermentCount,
  incermentHeadCount,
  decermentHeadCount,
} from '../redux/actions/CartActions';

class Cart extends Component {
  state = { totalPrice: 0 };
  static navigationOptions = {
    headerTitle: 'Cart',
  };

  removeFromCart(isExist, item) {
    if (isExist) {
      this.props.removeFromCart(item.id);
    }
  }

  render() {
    const {
      itemContainer,
      imageContainer,
      imageStyle,
      brandNameContainer,
      brandNameText,
      salePriceText,
      priceContainer,
      currencyText,
      buttonsContainer,
      buttonStyle,
      heartIconContainer,
    } = styles;
    const { cart } = this.props;

    const totalPrices = cart.map(item => {
      return Number(item.price);
    });

    const total = totalPrices.reduce((a, b) => a + b, 0);

    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {/* <TouchableOpacity
          onPress={() => this.props.navigation.navigate('CheckOut')}
          style={{ width: wp('100%'), height: hp('5%'), alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFE3AF' }}>
          <Text style={{fontSize: hp('3%')}}>Check Out</Text>
        </TouchableOpacity> */}
        <FlatList
          data={cart}
          numColumns={2}
          extraData={[this.state, this.props]}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            const isExist = cart.includes(item);
            const { id, image, brandName, salePrice, price } = item;
            return (
              <TouchableOpacity key={index} style={itemContainer}>
                <TouchableOpacity
                  style={heartIconContainer}
                  onPress={() => this.removeFromCart(isExist, item)}>
                  <Icon name={'trash'} size={hp('2.5%')} color={'red'} />
                </TouchableOpacity>
                <View style={imageContainer}>
                  <Image
                    source={image ? { uri: image } : null}
                    style={imageStyle}
                  />
                </View>
                <View style={brandNameContainer}>
                  <Text numberOfLines={2} style={brandNameText}>
                    {brandName}
                  </Text>
                  <View style={[priceContainer]}>
                    <Text
                      style={[
                        currencyText,
                        { textDecorationLine: 'line-through' },
                      ]}>
                      AED
                    </Text>
                    <Text
                      style={[
                        salePriceText,
                        { textDecorationLine: 'line-through' },
                      ]}>
                      {salePrice}
                    </Text>
                  </View>
                  <View style={priceContainer}>
                    <Text style={[currencyText, { fontSize: hp('2%') }]}>
                      AED
                    </Text>
                    <Text style={[salePriceText, { fontSize: hp('2%') }]}>
                      {price}
                    </Text>
                  </View>
                  {/* <View style={buttonsContainer}>
                    <TouchableOpacity
                      style={buttonStyle}
                      onPress={() => this.handleDecrement()}>
                      <Text style={{fontSize: hp('1.5%'), color: 'white'}}>
                        -
                      </Text>
                    </TouchableOpacity>
                    <Text>{cartCount}</Text>
                    <TouchableOpacity
                      style={[buttonStyle, {backgroundColor: '#d0d6d1'}]}
                      onPress={() => this.props.incermentCount()}>
                      <Text style={{fontSize: hp('1.5%'), color: '#6ab06a'}}>
                        +
                      </Text>
                    </TouchableOpacity>
                  </View> */}
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <View
          style={{
            width: wp('100%'),
            height: hp('10%'),
            bottom: 0,
            backgroundColor: '#d0d6d1',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text style={{ fontSize: hp('3%'), marginStart: 20 }}>Total: </Text>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              marginEnd: 20,
            }}>
            <Text style={{ fontSize: hp('3%'), marginStart: 20 }}>{total}</Text>
            <Text style={{ fontSize: hp('3%'), marginStart: 20 }}>AED</Text>
          </View>
        </View>
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
    transform: [{ rotate: '-40deg' }],
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
    width: wp('30%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('1%'),
  },
  buttonStyle: {
    width: wp('8'),
    height: wp('8%'),
    borderRadius: wp('4%'),
    backgroundColor: '#6ab06a',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = ({ cartReducer }) => {
  const { cart, cartCount, headCart, total } = cartReducer;
  return { cart, cartCount, headCart, total };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      incermentCount,
      decermentCount,
      removeFromCart,
      incermentHeadCount,
      decermentHeadCount,
      // totalPrice,
    },
    dispatch,
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cart);
