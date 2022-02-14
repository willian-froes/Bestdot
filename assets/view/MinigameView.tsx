import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

import Navbar from '../component/Navbar';
import LargeButton from '../component/LargeButton';
import ScoreLabel from '../component/ScoreLabel';

import { GameEngine } from 'react-native-game-engine';
import entities from './entities';
import Physics from './physics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MatchInfoLabel from '../component/MatchInfoLabel';
import { CouponService } from '../service/CouponService';
import Loader from '../component/Loader';

interface Props {
    navigation: StackNavigationProp<any, any>
}

const MinigameView: React.FC<Props> = ({ navigation }) => {
    const [isRunning, SetIsRunning] = useState<boolean>(false);
    const [gameEngine, SetGameEngine] = useState<any>(null);
    const [currentPoints, SetCurrentPoints] = useState<number>(0);
    const [score, SetScore] = useState<any | null>({ last: 0, best: 0 });
    const [gettedCoupon, SetGettedCoupon] = useState<any>({ coupon: null, state: 'to-find' });

    const [loading, SetLoading] = useState(false);
    const [couponIsCopied, SetCouponIsCopied] = useState(false);

    let minimunPoints = 3;

    useEffect(() => {
        SetIsRunning(true);
        LoadScore();
    }, []);

    const StartGame = (isRestart: boolean) => {
        SetCurrentPoints(0);
        SetIsRunning(true);
        if (isRestart) SaveScore();

        SetGettedCoupon({ coupon: null, state: 'to-find' });
        SetLoading(false);
        SetCouponIsCopied(false);
    }

    const LoadScore = async () => {
        let data: any = await AsyncStorage.getItem("score");

        if(data) {
            let score: any = JSON.parse(data);
            SetScore(score);
        } else {
            SetScore({ last: 0, best: 0 });
        }
    }

    const SaveScore = async () => {
        let data: any = await AsyncStorage.getItem("score");

        if(data) { 
            let score: any = JSON.parse(data);
            let bestPoints = score.best < currentPoints ? currentPoints : score.best;
            let newScore = { last: currentPoints, best: bestPoints };

            SetScore(newScore);

            let newScoreString = JSON.stringify(newScore);
            AsyncStorage.setItem("score", newScoreString)
        }
    }

    return(
        <View style={styles.container}>
            <StatusBar style='dark' backgroundColor='#ffffff' translucent={false} />
            <Navbar isMain={false} callableGoTo={() => navigation.goBack()} title="Flappy dot">
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <MatchInfoLabel value={currentPoints.toString()} description={`point${currentPoints == 1 ? '' : 's'}`} />

                    {currentPoints >= minimunPoints && !isRunning
                        ?
                        <>
                            <Image style={{ width: 20, height: 20, alignSelf: 'center' }} source={require("../image/equals-icon.png")} />
                            <MatchInfoLabel value={`${(Math.round((currentPoints + (currentPoints / 2)) * 100) / 100).toFixed(1)} %`} description="chance" />
                        </>
                        :
                        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderLeftWidth: 1, borderColor: '#B5B5B5' }}>
                            <Text style={{ color: '#FF6E63', fontWeight: 'bold', fontSize: 20, textTransform: 'uppercase' }}>score</Text>
                            
                            <ScoreLabel description="Best" value={score.best} />
                            <ScoreLabel description="Last" value={score.last} />
                        </View>
                    }

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
                                break;
                            case 'new_point':
                                let points = currentPoints + 1;
                                SetCurrentPoints(points);
                                break;
                        }
                    }}
                />
                :
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    {loading 
                        ?
                        <Loader description="Wait, find a coupon for you!" />
                        :
                        <>
                            {gettedCoupon.state === 'to-find'
                                ?
                                <>
                                    <View />
                
                                    <Image style={{ width: 230, height: 230, alignSelf: 'center' }} source={currentPoints >= minimunPoints ? require("../image/coupon-dot-image.png") : require("../image/dot-cry-image.png")} />
                
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#EC2B2B', marginBottom: 10 }}>Ooops...</Text>
                                        <Text style={{ fontWeight: 'bold', color: '#404040', fontSize: 16, textAlign: 'center', marginHorizontal: 70 }}>{currentPoints >= minimunPoints ? "The dot lost this match, but you have a chance to get a coupon!" : "The dot lost this match, but you can do it, try again!"}</Text>
                                    </View>
                                </>
                                :
                                gettedCoupon.state === 'found'
                                    ?
                                    <>
                                        <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#00C851', textAlign: 'center', marginTop: 10 }}>Congratulations!</Text>

                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ flexDirection: 'column' }}>
                                                <View style={{ backgroundColor: '#FF6E63', alignItems: 'center', borderTopLeftRadius: 15, borderTopRightRadius: 15, paddingHorizontal: 30, paddingVertical: 10 }}>
                                                    <Text style={{ textTransform: 'uppercase', fontSize: 58, color: '#ffffff' }}>{gettedCoupon.coupon.discount * 100}%</Text>
                                                    <Text style={{ textTransform: 'uppercase', fontSize: 46, color: '#ffffff' }}>Sale</Text>
                                                </View>
                                                <View style={{ alignItems: 'center', borderColor: '#B5B5B5', borderLeftWidth: 1, borderRightWidth: 1, borderBottomWidth: 1, borderBottomLeftRadius: 15, borderBottomRightRadius: 15, padding: 10 }}>
                                                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#B5B5B5' }}>{gettedCoupon.coupon.hash}</Text>
                                                </View>
                                                <TouchableOpacity style={{ alignItems: 'center', borderColor: '#B5B5B5', borderWidth: 1, borderRadius: 15, padding: 20 }} onPress={() => {
                                                    if(couponIsCopied == false) {
                                                        SetCouponIsCopied(true);
                                                        let couponString = JSON.stringify(gettedCoupon.coupon);
                                                        AsyncStorage.setItem("coupon", couponString);
                                                    }
                                                }}>
                                                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: couponIsCopied ? '#B5B5B5' : '#FF6E63' }}>{couponIsCopied ? 'CODE SAVED!' : 'SAVE THIS CODE'}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        <Text style={{ fontWeight: 'bold', color: '#404040', fontSize: 16, textAlign: 'center', marginHorizontal: 70 }}>You find this discount coupon, use when get your bests!</Text>
                                    </>
                                    :
                                    <>
                                        <View />
                    
                                        <Image style={{ width: 230, height: 230, alignSelf: 'center' }} source={require("../image/dot-cry-image.png")} />
                    
                                        <View style={{ alignItems: 'center' }}>
                                            <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#EC2B2B', marginBottom: 10 }}>Buaa...</Text>
                                            <Text style={{ fontWeight: 'bold', color: '#404040', fontSize: 16, textAlign: 'center', marginHorizontal: 70 }}>Sorry... no drawn coupon found, try again later...</Text>
                                        </View>
                                    </>
                            }
        
        
                            {currentPoints >= minimunPoints && gettedCoupon.state === 'to-find'
                                ?
                                <View style={{ flexDirection: 'row', marginHorizontal: 5, marginBottom: 10 }}>
                                    <TouchableOpacity style={{ flex: 1, backgroundColor: '#FF6E63', borderRadius: 15, padding: 20, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }} onPress={() => StartGame(true)}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#ffffff' }}>Try again!</Text>
                                    </TouchableOpacity>
        
                                    <TouchableOpacity style={{ flex: 1, backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#00C851', borderRadius: 15, padding: 20, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }} onPress={() => {
                                        let luckNumber = currentPoints + (currentPoints / 2);
                                        let random = Math.random() * 100;
        
                                        SetLoading(true);
                                        if(random <= luckNumber) {
                                            CouponService.GetCoupons(true).then((response) => {
                                                let coupons: any = response.data;
                                                if(coupons.length > 0) {
                                                    let couponIndex = Math.floor(Math.random() * coupons.length);

                                                    SetGettedCoupon({ coupon: coupons[couponIndex], state: 'found' });
                                                } else {
                                                    SetGettedCoupon({ coupon: null, state: 'not-found' });
                                                }
                                            }).then(() =>  SetLoading(false));
                                        } else {
                                            SetLoading(false);
                                            SetGettedCoupon({ coupon: null, state: 'not-found' });
                                        }
                                    }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#00C851' }}>Try get coupon!</Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                <LargeButton title="Try again!" method={() => { StartGame(true) }} />
                            }
                        </>
                    }

                </View>
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