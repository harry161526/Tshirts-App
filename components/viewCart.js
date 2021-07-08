import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const ViewCart = ({cartItems, closeModal, manageItemQuantity}) => {
  const renderCartItem = item => {
    return (
      <View style={styles.cartItemWrapper}>
        <View style={[styles.cartItemImgWrapper,{flex:0.2}]}>
          <Image style={styles.cartItemImg} source={item.src_2} />
        </View>
        <View style={{flex:0.5}}>
          <Text style={styles.cartItemTitle}>{item.title}</Text>
          {item.description.length ? (
            <Text style={styles.cartItemDescription}>{item.description}</Text>
          ) : null}
          <Text style={styles.cartItemQuantity}>{`Quantity : ${item.quantity}`}</Text>
        </View>
        <View style={{flex: 0.25}}>
          <Text style={styles.cartItemPrice}>{`$ ${(item.price * item.quantity).toFixed(2)}`}</Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => manageItemQuantity('remove', item.id)}>
              <Text style={styles.addMore}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => manageItemQuantity('add', item.id)}>
              <Text style={styles.addMore}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  const renderListEmpty = () => (
    <View style={styles.emptyListWrapper}>
      <Image
        style={styles.emptyStoreImage}
        source={require('../assets/empty-cart.jpg')}
      />
      <Text style={styles.emptyListText}>Go back and add items to cart</Text>
    </View>
  );
  const getTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach(item => {
      totalPrice += item.quantity * item.price;
    });
    return totalPrice.toFixed(2);
  };
  return (
    <View style={{flex: 1,backgroundColor: 'rgba(0,0,0,0.9)'}}>
      <View style={[styles.HeaderSection,{backgroundColor: 'transparent'}]}>
        <Text
          style={{color: '#fff',fontSize: 42, flex: 0.5}}
          onPress={() => closeModal(false)}>
          &#10539;
        </Text>
        <View style={styles.cartIconWrapper}>
          <Image
            style={styles.cartIcon}
            source={require('../assets/shopping-cart-xxl.png')}
          />
          <View style={styles.cartIconTextWrapper}>
            <Text style={styles.cartIconText}>{cartItems.length}</Text>
          </View>
        </View>
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id.toString()}
        renderItem={item => renderCartItem(item.item)}
        ListEmptyComponent={renderListEmpty}
      />
      <View
        style={[
          styles.totalPriceContainer,
          {display: cartItems.length ? 'flex' : 'none'}
        ]}>
        <View style={styles.checkoutPriceWrapper}>
          <Text style={styles.totalPriceTitle}>subtotal</Text>
          <Text style={styles.totalPrice}>{`$ ${getTotalPrice()}`}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton} activeOpacity={0.6}>
          <Text style={styles.checkoutButtonText}>checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  HeaderSection: {
    width: '100%',
    height: '10%',
    backgroundColor: '#fff',
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  cartIconWrapper: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cartIcon: {
    width: 50,
    height: 50,
  },
  cartIconTextWrapper: {
    position: 'absolute',
    backgroundColor: '#feb546',
    width: 32,
    height: 32,
    bottom: -2,
    right: -2,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartIconText: {
    color: '#fff',
    fontSize: 16,
  },
  cartItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  cartItemImgWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartItemImg: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
  },
  totalPriceContainer: {
    height: Dimensions.get('window').height * 0.3,
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#25282b',
    elevation: 5,
    shadowColor: '#25282b',
  },
  cartItemDescription: {
    color: '#fff',
    fontSize: 14,
    marginVertical: 4,
    opacity: 0.7,
  },
  cartItemTitle: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 4,
  },
  cartItemQuantity: {
    color: '#fff',
    fontSize: 14,
    marginVertical: 4,
    opacity: 0.7,
  },
  cartItemPrice: {
    color: '#feb546',
    fontSize: 20,
    marginVertical: 4,
  },
  addMore: {
    paddingVertical: 4,
    paddingHorizontal: 14,
    color: '#fff',
    backgroundColor: '#25282b',
    fontSize: 20,
    marginTop: 8,
  },
  emptyListWrapper: {
    flex: 1,
    marginTop: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStoreImage: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
  },
  emptyListText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: -20,
  },
  checkoutPriceWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 32,
  },
  totalPriceTitle: {
    color: '#fff',
    fontSize: 24,
    textTransform: 'uppercase',
    opacity: 0.4,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  totalPrice: {
    fontSize: 36,
    color: '#feb546',
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    marginHorizontal: 24,
    marginVertical: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  checkoutButtonText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 1.3,
  },
});
export default ViewCart;
