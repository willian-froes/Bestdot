import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import ProductCard from './assets/component/ProductCard';
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

  useEffect(() => {
    ProductService.GetProducts().then(products => {
      SetProductsList(products);
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>List of products</Text>

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
