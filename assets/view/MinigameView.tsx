import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, StyleSheet, Text } from 'react-native';

import Navbar from '../component/Navbar';
import { GameEngine } from 'react-native-game-engine';
import entities from './entities';
import Physics from './physics';


interface Props {
    navigation: StackNavigationProp<any, any>
}

const MinigameView: React.FC<Props> = ({ navigation }) => {
    const [running, SetRunning] = useState<boolean>(false);
    const [gameEngine, SetGameEngine] = useState<any>(null);
    const [currentPoints, SetCurrentPoints] = useState<number>(0);

    useEffect(() => {
        SetRunning(true);
    }, []);

    return(
        <View style={styles.container}>
            <StatusBar style='dark' backgroundColor='#ffffff' translucent={false} />
            <Navbar isMain={false} callableGoTo={() => navigation.goBack()} title="Flappy dot">
                <Text>{currentPoints}</Text>
            </Navbar>

            <GameEngine
                ref={(ref) => SetGameEngine(ref)}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                systems={[Physics]}
                entities={entities()}
                running={running}
                onEvent={(e: any) => {
                    switch(e.type) {
                        case 'game_over':
                            SetRunning(false);
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