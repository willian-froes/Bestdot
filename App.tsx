import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, VirtualizedList, Dimensions } from 'react-native';

import ProductCard from './assets/component/ProductCard';
import InputWithButton from './assets/component/InputWithButton';
import CategoryButton from './assets/component/CategoryButton';
import Navbar from './assets/component/Navbar';

import { ProductService }  from './assets/service/ProductService';

interface Rating {
  rate: number,
  count: number
}

interface Product {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,
  rating: Rating
}

interface CartProduct {
  productId: number,
  quantity: number
}

export default function App() {
  const [productsList, SetProductsList] = useState<Product[]>([]);
  const [searchableList, SetSearchableList] = useState<Product[]>([]);
  const [searchText, SetSearchText] = useState<string>("");
  const [categoriesList, SetCategoriesList] = useState<string[]>([]);
  const [cart, SetCart] = useState<CartProduct[]>([]);

  useEffect(() => {
    ProductService.GetProducts().then(products => {
      SetProductsList(products);
      SetSearchableList(products);
    });

    ProductService.GetCategories().then(categories => {
      SetCategoriesList(["all", ...categories]);
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style='dark' backgroundColor='#ffffff' translucent={false} />
        <Navbar cartLength={cart.length}>
          <InputWithButton callableMethod={() => {
              let filteredProducts = searchableList.filter((product) => {
                return product.title.toLowerCase().includes(searchText.toLowerCase());
              });

              SetProductsList(filteredProducts);
            }}
            callableCancelMethod={()=> {
              SetProductsList(productsList);
              SetSearchText("");
            }}
            inputPlaceholder={"Find the best for you!"}
            buttonIcon={require("./assets/image/search-icon.png")}
            callableSetter={SetSearchText}
            value={searchText}
          />
        </Navbar>

        {productsList.length == 0 
          ?
          <Text>Carregando produtos</Text>
          :
          <FlatList<Product>
            ListHeaderComponent={
              <>
                <View style={{ width: '100%', height: 145, marginVertical: 10 }}>
                  <Image style={{ flex: 1, resizeMode: 'contain', height: undefined, width: undefined }} source={require("./assets/image/banner-sales-image.png")} />
                </View>

                <View style={{ marginHorizontal: 5 }}>
                  <Text style={{ color: '#000000', fontSize: 26, fontWeight: 'bold' }}>Choose best for you</Text>
                  <Text style={{ color: '#B5B5B5', fontWeight: 'bold' }}>+{productsList.length-1} products here!</Text>
                </View>

                <FlatList<string>
                  style={{ height: 40, marginBottom: 20, marginTop: 15 }}
                  data={categoriesList}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => {
                    return(
                      <CategoryButton categoryName={item} selected={false} />
                    );
                  }}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={1}
                />
              </>
            }
            style={{ paddingHorizontal: 5}}
            data={productsList}
            renderItem={({ item }) => {
              return(
                <ProductCard product={item} />
              );
            }}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
          />
        }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
