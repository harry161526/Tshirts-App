import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  Modal,
  Picker
} from 'react-native';
import Filters from './components/Filters';
import ProductsList from './components/ProductsList';
import ViewCart from './components/viewCart';
import {tshirtdata} from './Constants';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      productsData: tshirtdata,
      showModal: false,
      filters: '',
      filterProducts: [],
      order: 'low',
    };
  }
  componentDidMount() {
    this.prepareProducts();
  }
  changeOrder(order) {

    const {filterProducts} = this.state;
    this.setState({ order: order})
    let newFilterProducts;
    if (order === 'low') {
      newFilterProducts = filterProducts.sort((a,b) => {
        return a.price > b.price;
      });
    } else {
      newFilterProducts = filterProducts.sort((a,b) => {
        return a.price < b.price;
      });
    }
    this.setState({filterProducts: newFilterProducts});
  }
  addFilter(size) {
    const { filters, filterProducts, productsData } = this.state;
    let newSize = size;
    if (size === filters) {
      newSize = '';
    }
    this.setState({filters: newSize}, () => this.prepareProducts());
  }
  prepareProducts() {
    const {filters, filterProducts, productsData} = this.state;
    let newData = productsData;
    if (filters.length) {
      newData = productsData.filter(item => {
        return item.availableSizes.includes(filters);
      });
    }
    this.setState({filterProducts: newData}, () => this.changeOrder(this.state.order));
  }
  addItemsToCart = ItemId => {
    const {productsData, cartItems} = this.state;
    const Item = productsData.find(product => product.id === ItemId);
    const Cart = [...cartItems, {...Item, quantity: 1}];
    const newProductData = productsData.filter(
      product => product.id !== ItemId,
    );
    this.setState({cartItems: Cart, productsData: newProductData}, () => this.prepareProducts());
  };
  ManageItemQuantity = (status, ItemId) => {
    const {cartItems, productsData} = this.state;
    let cart;
    let removeIndex = -1;
    let removingProduct = null;
    if (status === 'add') {
      cart = cartItems.map(item => {
        if (item.id === ItemId) {
          item.quantity++;
        }
        return item;
      });
    } else {
      cart = cartItems.map((item, index) => {
        if (item.id === ItemId) {
          if (item.quantity === 1) {
            removeIndex = index;
            removingProduct = item;
          } else {
            item.quantity--;
          }
        }
        return item;
      });
    }
    if (removeIndex !== -1) {
      cart.splice(removeIndex, 1);
      if (removingProduct !== null) {
        productsData.push(removingProduct);
      }
    }
    this.setState({cartItems: cart, productsData: productsData},() => this.prepareProducts());
  };
  closeModal = () => {
    this.setState({showModal: false});
  };
  render() {
    const {showModal, cartItems, filterProducts, productsData} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar animated={true} backgroundColor={'gray'} barStyle="default" />
        <Modal
          animationType="slide"
          onRequestClose={() => this.setState({showModal: false})}
          visible={showModal}
          transparent={true}>
          <ViewCart
            closeModal={this.closeModal}
            cartItems={cartItems}
            manageItemQuantity={this.ManageItemQuantity}
          />
        </Modal>
        <View style={styles.HeaderSection}>
          <TouchableOpacity
            style={styles.cartWrapper}
            onPress={() => this.setState({showModal: true})}>
            <Image
              style={styles.cartImg}
              source={require('./assets/shopping-cart.png')}
            />
            <View style={styles.countWrapper}>
              <Text style={styles.countText}>{cartItems.length}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Filters
          addFilter={this.addFilter.bind(this)}
          filter={this.state.filters}
          order={this.state.order}
          changeOrder={this.changeOrder.bind(this)}
        />
        <ProductsList
          productsData={filterProducts}
          addToCart={this.addItemsToCart}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  HeaderSection: {
    width: '100%',
    height: '8%',
    backgroundColor: '#fff',
    elevation: 5,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  cartWrapper: {
    position: 'relative',
    width: 40,
    height: 40,
  },
  cartImg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  countWrapper: {
    position: 'absolute',
    backgroundColor: '#feb546',
    borderRadius: 12.5,
    width: 25,
    height: 25,
    right: -5,
    bottom: -3,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    fontSize: 12,
    color: '#fff',
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
  cartItemTitle: {
    color: '#fff',
    fontSize: 18,
    marginVertical: 4,
  },
  totalPriceContainer: {
    height: 250,
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#000',
    elevation: 1,
  },
  addMore: {
    paddingVertical: 4,
    paddingHorizontal: 14,
    color: '#fff',
    backgroundColor: '#25282b',
    fontSize: 20,
    marginTop: 8,
  },
});

export default App;
