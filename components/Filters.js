import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {FiltersData} from '../Constants';

class Filters extends React.Component {
  renderItem(filter) {
    const isActive = this.props.filter === filter.name;
    return (
      <TouchableOpacity
        style={[styles.Filter, isActive ? styles.activeFilter : null]}
        onPress={() => this.props.addFilter(filter.name)}>
        <Text
          style={[
            styles.FilterText,
            isActive ? styles.activeFilterText : null,
          ]}>
          {filter.name}
        </Text>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <View style={styles.FiltersContainer}>
        <Text style={styles.textHeading}>Sizes</Text>
        <FlatList
          style={{marginHorizontal: 16,paddingVertical: 16}}
          keyExtractor={item => item.name}
          horizontal={true}
          data={FiltersData}
          renderItem={item => this.renderItem(item.item)}
        />
        <View style={styles.orderByWrapper}>
          <Text style={styles.orderByText}>Order By</Text>
          <Picker
            style={styles.picker}
            selectedValue={this.props.order}
            itemStyle={styles.itemStyle}
            dropdownIconColor="#fff"
            mode="dropdown"
            onValueChange={e => this.props.changeOrder(e)}>
            <Picker.Item
              style={styles.pickerItem}
              label="Low to High"
              value="low"
            />
            <Picker.Item
              style={styles.pickerItem}
              label="High to Low"
              value="high"
            />
          </Picker>
        </View>
        <Text>{`${this.props.productCount} Product(s) found`}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  textHeading: {
    fontSize: 24,
    color: '#25282b',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  FiltersContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  FilterWrapper: {
    paddingHorizontal: 4,
    flexDirection: 'row',
    marginTop: 8,
  },
  Filter: {
    width: 40,
    height: 40,
    backgroundColor: '#f7f7f7',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  FilterText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
  },
  activeFilter: {
    backgroundColor: '#000',
  },
  activeFilterText: {
    color: '#fff',
  },
  orderByWrapper: {
    marginTop: 8,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    width: 220,
  },
  pickerItem: {
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  orderByText: {
    fontSize: 16,
    marginRight: 8,
    fontWeight: 'bold',
  },
});
export default Filters;
