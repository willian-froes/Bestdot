import { ReactElement, useCallback, useState } from 'react';
import { StatusBar, FlatList, Text, View, Image, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; 

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
    /** Objeto que possibilita acesso ao navigate */
    navigation?: StackNavigationProp<any, any>
}

/**
 * View da tela principal, responsável por renderizar a lista de produtos e recursos de filtros, além do acesso ao minigame e banner de propaganda
 * @param { Props } Props parâmetro que contém as propriedades que a view recebe
 * @returns { ReactElement } arvore de elementos que compõem a tela principal
 */
const MainView: React.FC<Props> = ({ navigation }: Props): ReactElement => {
    /** Constante de estado da lista de produtos a venda */
    const [productsList, SetProductsList] = useState<Product[]>([]);
    /** Constante de estado da lista de categorias */
    const [categoriesList, SetCategoriesList] = useState<string[]>([]);
    /** Constante de estado da categoria selecionada, por padrão é "all" */
    const [selectedCategory, SetselectedCategory] = useState<string>("all");
    /** Constante de estado da cópia da lista de produtos */
    const [searchableList, SetSearchableList] = useState<Product[]>([]);
    /** Constante de estado do valor do campo de pesquisa */
    const [searchText, SetSearchText] = useState<string>("");
    /** Constante de estado do carrinho de compras */
    const [cart, SetCart] = useState<CartProduct[]>([]);
    /** Constante de estado do tamanho do carrinho de compras */
    const [cartCount, SetCartCount] = useState<number>(0);
    /** Constante de estado da flag que indica se o loader está visível */
    const [isLoading, SetIsLoading] = useState<boolean>(false);
    /** Constante de estado da flag que indica o estado do texto de boas vindas no componente Navbar */
    const [welcomeState, SetWelcomeState] = useState<boolean>(true);
    /** Constante que indica o valor no eixo y da posição da FlatList para ocular o texto de boas vindas da navbar */
    let screenInitialPosition: number = 30;

    useFocusEffect(useCallback((): void => {
        SetIsLoading(true);
        ProductController.LoadProducts(SetProductsList, SetSearchableList, SetCategoriesList, SetIsLoading);
        // CartController.LoadCart().then((cart: CartProduct[]) => { 
        //     SetCart(cart); 
        //     SetCartCount(cart.length); 
        // });
    }, []));

    return (
        <View style={style.container}>
            <StatusBar backgroundColor='#ffffff' barStyle="dark-content"  translucent={false} />

            <Navbar welcomeState={welcomeState} title="" isMain={true} cartLength={cartCount} callableGoTo={(): void => { CartController.SaveCart(cart); navigation?.navigate("Order"); }}>
                {productsList.length == 0 || categoriesList.length == 0
                    ?
                    <></>
                    :
                    <InputWithButton 
                        callableMethod={(): void => { ProductController.FilterProductsByText(searchableList, searchText, SetProductsList); }}
                        callableCancelMethod={(): void => { ProductController.ResetProductsFilter(productsList, SetProductsList, SetSearchText); }}
                        inputPlaceholder={"Find the best for you!"}
                        buttonIcon={<MaterialIcons name="search" size={32} color="#ffffff" />}
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
                    onScroll={(event): void => {
                        const isInitialPosition: boolean = event.nativeEvent.contentOffset.y < screenInitialPosition;
                        SetWelcomeState(isInitialPosition);
                    }}
                    ListHeaderComponent={
                        <>
                            <View style={style.salesBannerContainer}>
                                <Image style={style.salesBanner} source={require("../../image/banner-sales-image.png")} />
                            </View>

                            <View style={style.minigameAccessLabel}>
                                <Text style={style.minigameAccessDescription} numberOfLines={2}>Want you get coupons up to 15%?</Text>
                                <TouchableOpacity style={style.minigameAccessButton} onPress={(): void => navigation?.navigate("Minigame")}>
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
                                renderItem={({ item }): ReactElement<any, any> => {
                                    const categoryText = item;

                                    return (
                                        <CategoryButton 
                                            categoryName={item} 
                                            selected={selectedCategory == categoryText} 
                                            selectedMethod={(): void => {
                                                SetselectedCategory(item);
                                                ProductController.FilterProductsByCategory(searchableList, item, SetProductsList);
                                            }} 
                                            unselectedMethod={(): void => {
                                                SetselectedCategory(item);
                                                ProductController.ResetProductsFilter(searchableList, SetProductsList, SetSearchText);
                                            }}
                                        />
                                    );
                                }}
                                keyExtractor={(item, index): string => index.toString()}
                                numColumns={1}
                            />
                        </>
                    }
                    style={style.productListContainer}
                    data={productsList}
                    renderItem={({ item }): ReactElement<any, any> => {
                        return(
                            <ProductCard product={item} 
                                callableAddMethod={() => CartController.InsertProductInCart(cart, item).then((newCart: CartProduct[]) => SetCart(newCart)).then(() => SetCartCount(cart.length))}
                                callableRemoveMethod={() => CartController.RemoveProductFromCart(cart, item).then((newCart: CartProduct[]) => SetCart(newCart)).then(() => SetCartCount(cart.length))}
                            />
                        );
                    }}
                    keyExtractor={(item, index): string => index.toString()}
                    numColumns={2}
                />
            }
        </View>
    );
}

export default MainView;