import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ProductService }  from './assets/service/ProductService';

export default function App() {
  const [productsList, SetProductsList] = useState([]);

  useEffect(() => {
    ProductService.GetProducts().then(products => {
      SetProductsList(products);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>List of products</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
