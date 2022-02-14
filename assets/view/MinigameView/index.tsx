import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

import Navbar from '../../component/Navbar';
import LargeButton from '../../component/LargeButton';
import ScoreLabel from '../../component/ScoreLabel';

import { GameEngine } from 'react-native-game-engine';
import entities from '../entities';
import Physics from '../physics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MatchInfoLabel from '../../component/MatchInfoLabel';
import { CouponService } from '../../service/CouponService';
import Loader from '../../component/Loader';
import Modal from '../../component/Modal';
import style from './style';

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

    const [modalIsVisible, SetModalIsVisible] = useState(true);
    const [modalMessage, SetModalMessage] = useState("To have a chance to win a coupon, you need to earn a minimum of 5 points.");

    let minimunPoints = 5;

    useEffect(() => {
        SetIsRunning(false);
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

            {modalIsVisible
                ?
                <Modal buttonTitle="Ok, let's go!" description={modalMessage} method={() => {
                    SetModalIsVisible(false); 
                    SetModalMessage(""); 
                    SetIsRunning(true);
                }} /> 
                :
                <></>
            }

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
                        <View style={style.scoreLabel}>
                            <Text style={style.scoreTitle}>score</Text>
                            <ScoreLabel description="Best" value={score.best} />
                            <ScoreLabel description="Last" value={score.last} />
                        </View>
                    }

                </View>
            </Navbar>

            {isRunning || modalIsVisible
                ?
                <GameEngine
                    ref={(ref) => SetGameEngine(ref)}
                    style={style.minigameScene}
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
                
                                    <Image style={style.dotStateImage} source={currentPoints >= minimunPoints ? require("../image/coupon-dot-image.png") : require("../image/dot-cry-image.png")} />
                
                                    <View style={style.feedbackLabel}>
                                        <Text style={style.feedbackTitle}>Ooops...</Text>
                                        <Text style={style.feedbackMessage}>{currentPoints >= minimunPoints ? "The dot lost this match, but you have a chance to get a coupon!" : "The dot lost this match, but you can do it, try again!"}</Text>
                                    </View>
                                </>
                                :
                                gettedCoupon.state === 'found'
                                    ?
                                    <>
                                        <Text style={style.winnerTitle}>Congratulations!</Text>

                                        <View style={style.couponLabel}>
                                            <View style={style.coupon}>
                                                <View style={style.couponDiscountLabel}>
                                                    <Text style={style.couponDiscountText}>{gettedCoupon.coupon.discount * 100}%</Text>
                                                    <Text style={style.couponSaleText}>Sale</Text>
                                                </View>
                                                <View style={style.couponHashLabel}>
                                                    <Text style={style.couponHashText}>{gettedCoupon.coupon.hash}</Text>
                                                </View>
                                                <TouchableOpacity style={style.couponSaveButton} onPress={() => {
                                                    if(couponIsCopied == false) {
                                                        SetCouponIsCopied(true);
                                                        let couponString = JSON.stringify(gettedCoupon.coupon);
                                                        AsyncStorage.setItem("coupon", couponString);
                                                    }
                                                }}>
                                                    <Text style={[style.couponSaveButtonText, { color: couponIsCopied ? '#B5B5B5' : '#FF6E63' }]}>{couponIsCopied ? 'CODE SAVED!' : 'SAVE THIS CODE'}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        <Text style={style.feedbackMessage}>You find this discount coupon, use when get your bests!</Text>
                                    </>
                                    :
                                    <>
                                        <View />
                    
                                        <Image style={style.dotStateImage} source={require("../image/dot-cry-image.png")} />
                    
                                        <View style={style.feedbackLabel}>
                                            <Text style={style.feedbackTitle}>Buaa...</Text>
                                            <Text style={style.feedbackMessage}>Sorry... no drawn coupon found, try again later...</Text>
                                        </View>
                                    </>
                            }
        
                            {currentPoints >= minimunPoints && gettedCoupon.state === 'to-find'
                                ?
                                <View style={style.footer}>
                                    <TouchableOpacity style={style.tryAgainButton} onPress={() => StartGame(true)}>
                                        <Text style={style.tryAgainButtonText}>Try again!</Text>
                                    </TouchableOpacity>
        
                                    <TouchableOpacity style={style.getCouponButton} onPress={() => {
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
                                        <Text style={style.getCouponButtonText}>Try get coupon!</Text>
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