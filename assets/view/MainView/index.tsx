import { StatusBar } from 'expo-status-bar';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';

import { useCallback, useState } from 'react';
import { FlatList, Text, View, Image, TouchableOpacity } from 'react-native';

import ProductCard from '../../component/ProductCard';
import InputWithButton from '../../component/InputWithButton';
import CategoryButton from '../../component/CategoryButton';
import Navbar from '../../component/Navbar';
import Loader from '../../component/Loader';

import { ProductController } from '../../controller/ProductController';
import { CartController } from '../../controller/CartController';

import Product from '../../model/Product';
import CartProduct from '../../model/CartProduct';

import style from './style';

interface Props {
    navigation: StackNavigationProp<any, any>
}

const MainView: React.FC<Props> = ({ navigation }) => {
    const [productsList, SetProductsList] = useState<Product[]>([]);
    const [categoriesList, SetCategoriesList] = useState<string[]>([]);

    const [searchableList, SetSearchableList] = useState<Product[]>([]);
    const [searchText, SetSearchText] = useState<string>("");

    const [cart, SetCart] = useState<CartProduct[]>([]);
    const [cartCount, SetCartCount] = useState<number>(0);

    const [isLoading, SetIsLoading] = useState<boolean>(false);

    useFocusEffect(useCallback(() => { 
        SetIsLoading(true);
        ProductController.LoadProducts(SetProductsList, SetSearchableList, SetCategoriesList, SetIsLoading);
        CartController.LoadCart().then(cart => { SetCart(cart); SetCartCount(cart.length) });
    }, []));

    return (
        <View style={style.container}>
            <StatusBar style='dark' backgroundColor='#ffffff' translucent={false} />

            <Navbar title="" isMain={true} cartLength={cartCount} callableGoTo={() => {
                CartController.SaveCart(cart);
                navigation.navigate("Order");
            }}>
                {productsList.length == 0 || categoriesList.length == 0
                    ?
                    <></>
                    :
                    <InputWithButton 
                        callableMethod={() => { ProductController.FilterProductsByText(searchableList, searchText, SetProductsList); }}
                        callableCancelMethod={()=> { ProductController.ResetProductsFilter(productsList, SetProductsList, SetSearchText) }}
                        inputPlaceholder={"Find the best for you!"}
                        buttonIcon={require("../../image/search-icon.png")}
                        callableSetter={SetSearchText}
                        value={searchText}
                    />
                }
                
            </Navbar>

            {isLoading
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
                                renderItem={({ item }) => <CategoryButton categoryName={item} selected={item === "all"} /> }
                                keyExtractor={(item, index) => index.toString()}
                                numColumns={1}
                            />
                        </>
                    }
                    style={style.productListContainer}
                    data={productsList}
                    renderItem={({ item }) => {
                        item.isBought = ProductController.CheckProductIsBought(cart, item);
                        
                        return(
                            <ProductCard product={item} 
                                callableAddMethod={() => CartController.InsertProductInCart(cart, item).then(newCart => SetCart(newCart)).then(() => SetCartCount(cart.length))}
                                callableRemoveMethod={() => CartController.RemoveProductFromCart(cart, item).then(newCart => SetCart(newCart)).then(() => SetCartCount(cart.length))}
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