import React, { ReactNode } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import style from './style';

interface Props {
    isMain: boolean,
    cartLength?: number,
    callableGoTo: CallableFunction
    children?: ReactNode,
    title: string
}
    
const Navbar: React.FC<Props> = ({ isMain=false, cartLength, callableGoTo, children, title }) => {
    let splitedTitle = title.split(" ");

    return(
        <View style={style.container}>
            {isMain
                ?
                <>
                    <Text style={style.usernameText}>Hi, Willian!</Text>
                    <Text style={style.welcomeText}>Welcome to</Text>
                </>
                :
                <></>
            }
            
            <View style={[style.navbarLabel, { marginHorizontal: isMain? 10 : 0 }]}>
                <View style={style.pageTitleLabel}>
                    {isMain
                        ?
                        <>
                            <Text style={style.titleBlackText}>Best</Text>
                            <Text style={style.titleDefaultText}>dot</Text>
                            <Text style={style.titleBlackText}>.</Text>
                        </>
                        :
                        <View style={style.secundaryPageTitle}>
                            <TouchableOpacity style={style.returnButton} onPress={() => callableGoTo()}>
                                <Image style={style.returnButtonText} source={require("../../image/return-icon.png")} />
                            </TouchableOpacity>

                            <Text style={style.titleBlackText}>{splitedTitle[0]} </Text>
                            <Text style={style.titleDefaultText}>{splitedTitle[1]}</Text>
                        </View>
                    }
                </View>

                <View style={style.rightContentLabel}>
                    
                    {isMain
                        ?
                        <TouchableOpacity style={style.cartButton} onPress={() => callableGoTo()}>
                            <Text style={style.cartSize}>{cartLength}</Text>
                            <Image style={style.cartIcon} source={require("../../image/cart-white-icon.png")} />
                        </TouchableOpacity>
                        :
                        <></>
                    }

                    <Image style={[style.userImage, { marginTop: isMain ? 0 : 15, marginRight: isMain ? 0 : 10 }]} source={require("../../image/user-temp-image.jpg")} />
                </View>
            </View>

            {children}

            <View style={style.divider} />
        </View>
    );
}

export default Navbar;