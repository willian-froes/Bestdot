import React, { ReactNode } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

import style from './style';

interface Props {
    isMain: boolean,
    cartLength?: number,
    callableGoTo: CallableFunction
    children?: ReactNode,
    title: string,
    welcomeState?: boolean
}
    
const Navbar: React.FC<Props> = ({ isMain=false, cartLength, callableGoTo, children, title, welcomeState }: Props) => {
    let splitedTitle: string[] = title.split(" ");

    return(
        <View style={style.container}>
            {isMain
                ?
                welcomeState
                    ?
                    <>
                        <Text style={style.usernameText}>Hi, Willian!</Text>
                        <Text style={style.welcomeText}>Welcome to</Text>
                    </>
                    :
                    <></>
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
                            <TouchableOpacity style={style.returnButton} onPress={(): void => callableGoTo()}>
                                <MaterialIcons name="arrow-back-ios" size={32} color="#ffffff" />
                            </TouchableOpacity>

                            <Text style={style.titleBlackText}>{splitedTitle[0]} </Text>
                            <Text style={style.titleDefaultText}>{splitedTitle[1]}</Text>
                        </View>
                    }
                </View>

                <View style={style.rightContentLabel}>
                    
                    {isMain
                        ?
                        <TouchableOpacity style={style.cartButton} onPress={(): void => callableGoTo()}>
                            <Text style={style.cartSize}>{cartLength}</Text>
                            <MaterialIcons name="shopping-cart" size={24} color="#ffffff" />
                        </TouchableOpacity>
                        :
                        <></>
                    }

                    <Image style={[style.userImage, { marginTop: isMain ? 0 : 15, marginRight: isMain ? 0 : 10 }]} source={{ uri: "https://media-exp1.licdn.com/dms/image/C4E03AQGCgJx7PLF4oQ/profile-displayphoto-shrink_800_800/0/1569217099636?e=1650499200&v=beta&t=6T2GcJMKmfiKD5x4Dxsywp3Z-GZEA1BxnIUmtC7t-vo" }} />
                </View>
            </View>

            {children}

            <View style={style.divider} />
        </View>
    );
}

export default Navbar;