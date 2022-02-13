import React, { ReactChildren, ReactNode } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

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
        <>
            {isMain
                ?
                <>
                    <Text style={{ color: '#000000', fontSize: 26, fontWeight: 'bold', marginBottom: 15, marginHorizontal: 10  }}>Hi, Willian!</Text>
                    <Text style={{ color: '#B5B5B5', fontWeight: 'bold', marginHorizontal: 10  }}>Welcome to</Text>
                </>
                :
                <></>
            }
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: isMain? 10 : 0, marginBottom: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    {isMain
                        ?
                        <>
                            <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#000000' }}>Best</Text>
                            <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#FF5A4D' }}>dot</Text>
                            <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#000000' }}>.</Text>
                        </>
                        :
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <TouchableOpacity style={{ backgroundColor: '#FF6E63', borderTopRightRadius: 15, borderBottomRightRadius: 15, marginRight: 10 }} onPress={() => callableGoTo()}>
                                <Image style={{ width: 25, height: 25, marginRight: 20, marginLeft: 30, marginVertical: 22 }} source={require("../image/return-icon.png")} />
                            </TouchableOpacity>

                            <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#000000' }}>{splitedTitle[0]} </Text>
                            <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#FF5A4D' }}>{splitedTitle[1]}</Text>
                        </View>
                    }
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    
                    {isMain
                        ?
                        <TouchableOpacity style={{ backgroundColor: '#FF5A4D', flexDirection: 'row', alignItems: 'center', padding: 10, borderRadius: 15, marginRight: 12 }} onPress={() => callableGoTo()}>
                            <Text style={{ color: '#ffffff', fontWeight: 'bold', marginRight: 10 }}>{cartLength}</Text>
                            <Image style={{ width: 20, height: 20 }} source={require("../image/cart-white-icon.png")} />
                        </TouchableOpacity>
                        :
                        <></>
                    }

                    <Image style={{ width: 42, height: 42, borderRadius: 42, borderWidth: 3, borderColor: '#FF5A4D', marginTop: isMain ? 0 : 15, marginRight: isMain ? 0 : 10 }} source={require("../image/user-temp-image.jpg")} />
                </View>
            </View>

            {children}

            <View style={{ width: '100%', height: 3, backgroundColor: '#FF5A4D', marginTop: 10 }}/>
        </>
    );
}

export default Navbar;