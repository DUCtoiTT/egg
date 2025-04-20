import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import { products, filters } from './data';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const App = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [numCols, setNumCols] = useState(2);

  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchText.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      return matchesSearch && matchesCategory && matchesBrand;
    });
    setFilteredProducts(filtered);
  }, [searchText, selectedCategories, selectedBrands]);

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const toggleBrand = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const applyFilters = () => {
    setShowFilters(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.productItem}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productBrand}>{item.capacity}, {item.unit}</Text>
      <View style={styles.cardBottom}>
      <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
      <TouchableOpacity style={styles.addBtn}>
    <Icon name="add" size={24} color="#fff" />
  </TouchableOpacity>
  </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Thanh tìm kiếm */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <Text>Filters</Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách sản phẩm */}
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.productList}
        numColumns={numCols}
        key={numCols}
      />

      {/* Modal bộ lọc */}
      <Modal
        visible={showFilters}
        animationType="slide"
        transparent={false}
      >
        <TouchableOpacity
  onPress={() => setShowFilters(false)}
  style={styles.closeButton}
>
  <Icon name="close" size={24} color="#333" />
</TouchableOpacity>
<Text style={styles.all}> Filters</Text>

        <View style={styles.modalContainer}>
        <View style={styles.filterBox}>
          <ScrollView>
            <Text style={styles.filterTitle}>Categories</Text>
            {filters.categories.map(category => (
              <TouchableOpacity 
              key={category}
              style={styles.filterOption}
              onPress={() => toggleCategory(category)}
            >
              <Icon
                name={selectedCategories.includes(category) ? 'checkbox' : 'square-outline'}
                size={20}
                color="#A8E063"
                style={{ marginRight: 10 }}
              />
              <Text>{category}</Text>
            </TouchableOpacity>
            ))}

            <Text style={styles.filterTitle}>Brand</Text>
            {filters.brands.map(brand => (
             <TouchableOpacity 
             key={brand}
             style={styles.filterOption}
             onPress={() => toggleBrand(brand)}
           >
             <Icon
               name={selectedBrands.includes(brand) ? 'checkbox' : 'square-outline'}
               size={20}
               color="#A8E063"
               style={{ marginRight: 10 }}
             />
             <Text>{brand}</Text>
           </TouchableOpacity>
           
            ))}

            <TouchableOpacity 
              style={styles.applyButton}
              onPress={applyFilters}
            >
              <Text style={styles.applyButtonText}>Apply Filter</Text>
            </TouchableOpacity>
          </ScrollView>
          </View>
        </View>
        
      </Modal>
       <View style={styles.bottomNav}>
              {['home-outline', 'compass-outline', 'cart-outline', 'heart-outline', 'person-outline'].map((icon, i) => (
                <Icon key={i} name={icon} size={24} color="#666" />
              ))}
            </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  productList: {
    padding: 10,
  },
  productItem: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 250,
  },
  
  
  productName: {
    fontSize: 16,
    fontWeight: 'bold',

  },
  productBrand: {
    fontSize: 14,
    color: '#666',
  },
  productPrice: {
    fontSize: 16,
    color: '#e53935',
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  filterBox: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,  // 👈 thêm dòng này
    paddingTop: 10,            // 👈 không nên để giá trị âm
    marginTop: 27,              // 👈 margin hợp lý
    marginBottom: -30,
    marginLeft: -20,
    marginRight: -20,
    padding: 30,
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',        // 👈 giúp bo góc hiển thị đúng
  },
  
  
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  filterOption: {
    padding: 10,
  },
  applyButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    
  },
  applyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  productImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
    padding: 10,
  },
  
  addBtn: {
    marginTop: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 'auto',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingVertical: 10,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  all:{
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10, // Thêm khoảng cách giữa icon và text
    textAlign: 'center',
    top:24,
  }
});

export default App;
