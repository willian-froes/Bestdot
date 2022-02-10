import React, { ReactChildren, ReactNode } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

interface Props {
    cartLength: number,
    callableGoTo: CallableFunction
    children: ReactNode
}
    
const Navbar: React.FC<Props> = ({ cartLength, callableGoTo, children }) => {
    return(
        <>
            <Text style={{ color: '#000000', fontSize: 26, fontWeight: 'bold', marginBottom: 15, marginHorizontal: 10  }}>Hi, Willian!</Text>
            <Text style={{ color: '#B5B5B5', fontWeight: 'bold', marginHorizontal: 10  }}>Welcome to</Text>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10, marginBottom: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#000000' }}>Best</Text>
                    <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#FF5A4D' }}>dot</Text>
                    <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#000000' }}>.</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={{ backgroundColor: '#FF5A4D', flexDirection: 'row', alignItems: 'center', padding: 10, borderRadius: 15, marginRight: 12 }} onPress={() => callableGoTo()}>
                        <Text style={{ color: '#ffffff', fontWeight: 'bold', marginRight: 10 }}>{cartLength}</Text>
                        <Image style={{ width: 20, height: 20 }} source={require("../image/cart-white-icon.png")} />
                    </TouchableOpacity>

                    <Image style={{ width: 42, height: 42, borderRadius: 42, borderWidth: 3, borderColor: '#FF5A4D'}} source={require("../image/user-temp-image.jpg")} />
                </View>
            </View>

            {children}

            <View style={{ width: '100%', height: 3, backgroundColor: '#FF5A4D', marginTop: 10 }}/>
        </>
    );
}

export default Navbar;