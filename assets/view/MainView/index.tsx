import { StatusBar } from 'expo-status-bar';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';

import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import ProductCard from '../../component/ProductCard';
import InputWithButton from '../../component/InputWithButton';
import CategoryButton from '../../component/CategoryButton';
import Navbar from '../../component/Navbar';
import Loader from '../../component/Loader';

import Product from '../../model/Product';
import CartProduct from '../../model/CartProduct';

import { ProductService }  from '../../service/ProductService';
import style from './style';

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

        ProductService.GetProducts().then((response) => {
            let products: any = response.data;

            SetProductsList(products);
            SetSearchableList(products);
        });
    
        ProductService.GetCategories().then(response => {
            let categories: any = response.data;
            SetCategoriesList(["all", ...categories]);
        });
    }, []));

    return (
        <View style={style.container}>
            <StatusBar style='dark' backgroundColor='#ffffff' translucent={false} />

            <Navbar title="" isMain={true} cartLength={cartLength} callableGoTo={() => navigation.navigate("Order", { cart, cartLength, callableSetCart: SetCart, callableSetCartLength: SetCartLength })}>
                {productsList.length == 0 || categoriesList.length == 0
                    ?
                    <></>
                    :
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
                        buttonIcon={require("../../image/search-icon.png")}
                        callableSetter={SetSearchText}
                        value={searchText}
                    />
                }
                
            </Navbar>

            {productsList.length == 0 || categoriesList.length == 0
                ?
                <Loader description="Wait, we get the bests for you!" />
                :
                <FlatList<Product>
                    ListHeaderComponent={
                        <>
                            <View style={style.salesBannerContainer}>
                                <Image style={style.salesBanner} source={require("../../image/banner-sales-image.png")} />
                            </View>

                            <View style={style.minigameAccessLabel}>
                                <Text style={style.minigameAccessDescription} numberOfLines={2}>You want to get {"\n"}coupons up to 15%?</Text>
                                <TouchableOpacity style={style.minigameAccessButton} onPress={() => navigation.navigate("Minigame")}>
                                    <Text style={style.minigameAccessButtonText}>PLAY NOW!</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={style.productListTitleContainer}>
                                <Text style={style.productListTitle}>Choose best for you</Text>
                                <Text style={style.productListCount}>+{productsList.length-1} products here!</Text>
                            </View>

                            <FlatList<string>
                                style={style.categoriesListContainer}
                                data={categoriesList}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item }) => {
                                    let isSelected = item === "all";
                                    return(
                                        <CategoryButton categoryName={item} selected={isSelected} />
                                    );
                                }}
                                keyExtractor={(item, index) => index.toString()}
                                numColumns={1}
                            />
                        </>
                    }
                    style={style.productListContainer}
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

export default MainView;