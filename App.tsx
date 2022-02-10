import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';

import ProductCard from './assets/component/ProductCard';
import InputWithButton from './assets/component/InputWithButton';

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

export default function App() {
  const [productsList, SetProductsList] = useState<Product[]>([]);
  const [searchableList, SetSearchableList] = useState<Product[]>([]);

  const [searchText, SetSearchText] = useState<string>("");

  useEffect(() => {
    ProductService.GetProducts().then(products => {
      SetProductsList(products);
      SetSearchableList(products);
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>List of products</Text>

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

      {productsList.length == 0 
        ?
        <Text>Carregando...</Text>
        :
        <FlatList<Product>
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
