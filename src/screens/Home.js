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
import {addToFavorite, removeFromFavorite} from '../redux/actions';
import {
  addToCart,
  removeFromCart,
  incermentHeadCount,
  decermentHeadCount,
} from '../redux/actions/CartActions';
import Toast from 'react-native-simple-toast';

class Home extends Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: 'Home',
    headerRight: (
      <TouchableOpacity
        style={{
          width: wp('6%'),
          height: hp('3%'),
          marginEnd: wp('2%'),
        }}
        onPress={() =>
          navigation.navigate('Cart', navigation.getParam('Item'))
        }>
        {navigation.getParam('cartProducts') ? (
          <View
            style={{
              width: wp('4%'),
              height: wp('4%'),
              borderRadius: wp('2%'),
              position: 'absolute',
              backgroundColor: 'green',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
              top: -8,
              start: -6,
            }}>
            <Text style={{color: 'white'}}>
              {navigation.getParam('cartProducts')}
            </Text>
          </View>
        ) : (
          navigation.getParam('emptyCart')
        )}
        <Icon name="shopping-cart" size={hp('2.5%')} />
      </TouchableOpacity>
    ),
  });

  componentDidMount() {
    const {cart, navigation} = this.props;
    const haveProducts = cart.length;
    const emptyCart = cart.length == 0;
    if (haveProducts) {
      navigation.setParams({
        cartProducts: haveProducts,
        emptyCart,
      });
    }
  }

  componentDidUpdate() {
    const {navigation, cart} = this.props;
    const PrevProducts = navigation.getParam('cartProducts');
    const currentProducts = cart.length;
    if (currentProducts != PrevProducts) {
      navigation.setParams({
        cartProducts: currentProducts,
      });
    }
  }

  handleFavorite(item, isExist) {
    if (isExist) {
      this.props.removeFromFavorite(item.id);
    } else {
      this.props.addToFavorite(item);
    }
  }
  handleCartButton(isInCart, item) {
    if (isInCart) {
      this.props.removeFromCart(item.id);
      Toast.show('Removed From Cart.', Toast.SHORT);
    } else {
      this.props.addToCart(item);
      Toast.show('Added To Cart.', Toast.SHORT);
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
    const {favorites, cart, navigation} = this.props;

    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <FlatList
          data={homeData}
          extraData={this.state}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => {
            const {id, iconName, image, brandName, salePrice, price} = item;
            const isExist = favorites.includes(item);
            const isInCart = cart.includes(item);
            return (
              <View key={id} style={itemContainer}>
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
                    <TouchableOpacity
                      style={buttonStyle}
                      onPress={() =>
                        this.handleCartButton(isInCart, item, navigation)
                      }>
                      <Text style={{fontSize: hp('1.5%'), color: 'white'}}>
                        ADD TO CART
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[buttonStyle, {backgroundColor: '#d0d6d1'}]}
                      onPress={() => this.props.navigation.navigate('ProductDetails', {item})}
                      >
                      <Text style={{fontSize: hp('1.5%'), color: '#6ab06a'}}>
                        VIEW DETAILS
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const homeData = [
  {
    id: 1,
    iconName: 'heart',
    image:
      'https://timepiece360.ae/media/catalog/product/cache/1/small_image/269x259/9df78eab33525d08d6e5fb8d27136e95/t/p/tpgiw1019p1254a.jpg',
    brandName: 'Omega Speedmaster',
    salePrice: '5000',
    price: '1000',
  },
  {
    id: 2,
    iconName: 'heart',
    image:
      'https://timepiece360.ae/media/catalog/product/cache/1/small_image/269x259/9df78eab33525d08d6e5fb8d27136e95/t/p/tpgvc1019c1213a_3.jpg',
    brandName: 'Omega Speedmaster',
    salePrice: '5000',
    price: '3000',
  },
  {
    id: 3,
    iconName: 'heart',
    image:
      'https://timepiece360.ae/media/catalog/product/cache/1/small_image/269x259/9df78eab33525d08d6e5fb8d27136e95/t/p/tpgfm0919p1096a.jpg',
    brandName: 'Omega Speedmaster',
    salePrice: '5000',
    price: '5000',
  },
  {
    id: 4,
    iconName: 'heart',
    image:
      'https://timepiece360.ae/media/catalog/product/cache/1/small_image/269x259/9df78eab33525d08d6e5fb8d27136e95/t/p/tpgiw1019p1254a.jpg',
    brandName: 'Omega Speedmaster',
    salePrice: '5000',
    price: '4000',
  },
  {
    id: 5,
    iconName: 'heart',
    image:
      'https://timepiece360.ae/media/catalog/product/cache/1/small_image/269x259/9df78eab33525d08d6e5fb8d27136e95/t/p/tpgiw1019p1254a.jpg',
    brandName: 'Omega Speedmaster',
    salePrice: '5000',
    price: '2000',
  },
  {
    id: 6,
    iconName: 'heart',
    image:
      'https://timepiece360.ae/media/catalog/product/cache/1/small_image/269x259/9df78eab33525d08d6e5fb8d27136e95/t/p/tpgca0719p1078a.jpg',
    brandName: 'Omega Speedmaster',
    salePrice: '5000',
    price: '2000',
  },
  {
    id: 7,
    iconName: 'heart',
    image:
      'https://timepiece360.ae/media/catalog/product/cache/1/small_image/269x259/9df78eab33525d08d6e5fb8d27136e95/t/p/tpgiw1019p1254a.jpg',
    brandName: 'Omega Speedmaster',
    salePrice: '5000',
    price: '2000',
  },
  {
    id: 8,
    iconName: 'heart',
    image:
      'https://timepiece360.ae/media/catalog/product/cache/1/small_image/269x259/9df78eab33525d08d6e5fb8d27136e95/t/p/tpgiw1019p1254a.jpg',
    brandName: 'Omega Speedmaster',
    salePrice: '5000',
    price: '2000',
  },
  {
    id: 9,
    iconName: 'heart',
    image:
      'https://timepiece360.ae/media/catalog/product/cache/1/small_image/269x259/9df78eab33525d08d6e5fb8d27136e95/t/p/tpgiw1019p1254a.jpg',
    brandName: 'Omega Speedmaster',
    salePrice: '5000',
    price: '2000',
  },
];

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

const mapStateToProps = ({favReducer, cartReducer}) => {
  const {favorites} = favReducer;
  const {cart} = cartReducer;
  return {favorites, cart};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addToFavorite,
      removeFromFavorite,
      addToCart,
      removeFromCart,
      incermentHeadCount,
      decermentHeadCount,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
