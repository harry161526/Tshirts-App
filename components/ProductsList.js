import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  // TouchableOpacity,
  Button,
} from 'react-native';

const renderItem = (Tshirt, addToCart) => {
  // console.log(Tshirt.price);
  const price = Tshirt.price.toString().split('.');
  return (
    <View style={styles.productContainer}>
      {Tshirt.isFreeShipping ? (
        <Text style={styles.freeShipping}>Free Shipping</Text>
      ) : null}
      <Image style={styles.productImage} source={Tshirt.src_1} />
      <Text style={styles.productName}>{Tshirt.title}</Text>
      <View style={styles.productNameBar} />
      <Text style={styles.price}>
        $ <Text style={styles.highlightPrice}>{`${price[0]}.`}</Text>
        {price[1] !== undefined ? price[1] : '0'}
      </Text>
      <View style={styles.buttonWrapper}>
        <Button title="Add To Cart" onPress={() => addToCart(Tshirt.id)} />
      </View>
    </View>
  );
};
const renderListEmpty = () => (
  <View style={styles.emptyListWrapper}>
    <Image
      style={styles.emptyStoreImage}
      source={require('../assets/empty-shop.jpg')}
    />
    <Text style={styles.emptyListText}>Oops ! Store is Empty. Visit Later</Text>
  </View>
);
const ProductsList = ({productsData, addToCart}) => {
  return (
    <View style={styles.productsList}>
      <FlatList
        numColumns={2}
        ListEmptyComponent={renderListEmpty}
        keyExtractor={item => item.id}
        data={productsData}
        renderItem={item => renderItem(item.item, addToCart)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  productsList: {
    marginTop: 20,
    width: '100%',
    flex: 1,
  },
  productContainer: {
    position: 'relative',
    width: '50%',
    height: 280,
    //backgroundColor: '#feb546',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderBottomWidth: 0.2,
    borderLeftWidth: 0.2,
    borderRightWidth: 0.2,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  productImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 13,
    color: '#000',
    //textAlign: 'center',
    marginTop: 8,
    textAlignVertical: 'center',
  },
  productNameBar: {
    width: 40,
    height: 3,
    backgroundColor: '#feb546',
    marginTop: 4,
  },
  price: {
    marginTop: 8,
  },
  highlightPrice: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonWrapper: {
    width: '100%',
    marginTop: 8,
  },
  freeShipping: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#000',
    color: '#fff',
    fontSize: 10,
    padding: 8,
    zIndex: 1,
  },
  emptyListWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStoreImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  emptyListText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default ProductsList;
