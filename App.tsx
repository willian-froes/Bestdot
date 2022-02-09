import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [productsList, SetProductsList] = useState([]);

  const GetProducts = async () => {
    const data = await fetch("https://fakestoreapi.com/products");
    return await data.json();
  }

  useEffect(() => {
    GetProducts().then(products => {
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
