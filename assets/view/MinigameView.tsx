import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import Navbar from '../component/Navbar';
import { GameEngine } from 'react-native-game-engine';
import entities from './entities';
import Physics from './physics';
import LargeButton from '../component/LargeButton';

interface Props {
    navigation: StackNavigationProp<any, any>
}

const MinigameView: React.FC<Props> = ({ navigation }) => {
    const [isRunning, SetIsRunning] = useState<boolean>(false);
    const [gameEngine, SetGameEngine] = useState<any>(null);
    const [currentPoints, SetCurrentPoints] = useState<number>(0);

    useEffect(() => {
        SetIsRunning(true);
    }, []);

    return(
        <View style={styles.container}>
            <StatusBar style='dark' backgroundColor='#ffffff' translucent={false} />
            <Navbar isMain={false} callableGoTo={() => navigation.goBack()} title="Flappy dot">
                
                <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#FF5A4D' }}>{currentPoints}</Text>
                    <Text style={{ fontWeight: 'bold', color: '#B5B5B5', fontSize: 16 }}>points</Text>
                </View>
            </Navbar>

            {isRunning
                ?
                <GameEngine
                    ref={(ref) => SetGameEngine(ref)}
                    style={{ backgroundColor: '#ECEBED', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -9999 }}
                    systems={[Physics]}
                    entities={entities()}
                    running={isRunning}
                    onEvent={(e: any) => {
                        switch(e.type) {
                            case 'game_over':
                                SetIsRunning(false);
                                gameEngine.stop();
                                SetCurrentPoints(0);
                                break;
                            case 'new_point':
                                let points = currentPoints + 1;
                                SetCurrentPoints(points);
                                break;
                        }
                    }}
                />
                :
                <LargeButton title="Try again!" method={() => {
                    SetIsRunning(true);
                }} />
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

export default MinigameView;