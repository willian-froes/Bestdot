import { StatusBar } from 'expo-status-bar';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';

import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';

import ProductCard from '../component/ProductCard';
import InputWithButton from '../component/InputWithButton';
import CategoryButton from '../component/CategoryButton';
import Navbar from '../component/Navbar';

import Product from '../model/Product';
import CartProduct from '../model/CartProduct';

import { ProductService }  from '../service/ProductService';


interface Props {
    navigation: StackNavigationProp<any, any>
}

const MainView: React.FC<Props> = ({ navigation }) => {
    const [productsList, SetProductsList] = useState<Product[]>([]);
    const [searchableList, SetSearchableList] = useState<Product[]>([]);
    const [searchText, SetSearchText] = useState<string>("");
    const [categoriesList, SetCategoriesList] = useState<string[]>([]);

    const [cart, SetCart] = useState<CartProduct[]>([]);
    const [cartLength, SetCartLength] = useState<number>(0); 

    useFocusEffect(useCallback(() => { 
        SetProductsList([]);

        ProductService.GetProducts().then((products) => {
            SetProductsList(products);
            SetSearchableList(products);
        });
    
        ProductService.GetCategories().then(categories => {
            SetCategoriesList(["all", ...categories]);
        });
    }, []));

    return (
        <View style={styles.container}>
            <StatusBar style='dark' backgroundColor='#ffffff' translucent={false} />

            <Navbar isMain={true} cartLength={cartLength} callableGoTo={() => navigation.navigate("Order", { cart, cartLength, callableSetCart: SetCart, callableSetCartLength: SetCartLength })}>
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
                    buttonIcon={require("../image/search-icon.png")}
                    callableSetter={SetSearchText}
                    value={searchText}
                />
            </Navbar>

            {productsList.length == 0 || categoriesList.length == 0
                ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View>
                        <ActivityIndicator size="large" color="#FF6E63" />
                        <Text style={{ color: '#B5B5B5', fontWeight: 'bold', marginTop: 20 }}>Wait, we get the bests for you!</Text>
                    </View>
                </View>
                :
                <FlatList<Product>
                    ListHeaderComponent={
                        <>
                            <View style={{ width: '100%', height: 145, marginVertical: 10 }}>
                                <Image style={{ flex: 1, resizeMode: 'contain', height: undefined, width: undefined }} source={require("../image/banner-sales-image.png")} />
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
                        let boughtItems = cart.filter((cartItem) => {
                            return cartItem.productId == item.id
                        });

                        item.isBought = boughtItems != undefined && boughtItems.length > 0;
                        
                        return(
                            <ProductCard product={item} 
                                callableAddMethod={() => {
                                    SetCart([{ productId: item.id, quantity: 1 }, ...cart]);

                                    let length = cartLength+1;
                                    SetCartLength(length);
                                }}

                                callableRemoveMethod={() => {
                                    const index = cart.map(product => product.productId).indexOf(item.id);
                                    cart.splice(index, 1);
                                    SetCart(cart);

                                    let length = cartLength-1;
                                    SetCartLength(length);
                                }}
                            />
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

export default MainView;