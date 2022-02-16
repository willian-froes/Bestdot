import React, { useState, useEffect } from 'react';
import { StatusBar, View, Text, TouchableOpacity, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { GameEngine } from 'react-native-game-engine';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import Navbar from '../../component/Navbar';
import LargeButton from '../../component/LargeButton';
import ScoreLabel from '../../component/ScoreLabel';
import MatchInfoLabel from '../../component/MatchInfoLabel';
import Loader from '../../component/Loader';
import Modal from '../../component/Modal';

import { MinigameController } from '../../controller/MinigameController';
import { CouponController } from '../../controller/CouponController';

import style from './style';

interface Props {
    navigation: StackNavigationProp<any, any>
}

const MinigameView: React.FC<Props> = ({ navigation }) => {
    const [isRunning, SetIsRunning] = useState<boolean>(false);
    const [gameEngine, SetGameEngine] = useState<GameEngine | null>(null);

    const [currentPoints, SetCurrentPoints] = useState<number>(0);
    const [score, SetScore] = useState<any | null>({ last: 0, best: 0 });
    const [gettedCoupon, SetGettedCoupon] = useState<any>({ coupon: null, state: 'to-find' });

    const [loading, SetLoading] = useState<boolean>(false);
    const [couponIsCopied, SetCouponIsCopied] = useState<boolean>(false);

    const [modalIsVisible, SetModalIsVisible] = useState<boolean>(true);
    const [modalMessage, SetModalMessage] = useState<string>("To have a chance to win a coupon, you need to earn a minimum of 5 points.");

    const minimunPoints: number = 5;

    useEffect((): void => {
        SetIsRunning(false);
        MinigameController.LoadScore(SetScore);
    }, []);

    return(
        <View style={style.container}>
            <StatusBar backgroundColor='#ffffff' barStyle="dark-content" translucent={false} />

            {modalIsVisible
                ?
                <Modal buttonTitle="Ok, let's go!" description={modalMessage} method={(): void => {
                    SetModalIsVisible(false); 
                    SetModalMessage(""); 
                    SetIsRunning(true);
                }} /> 
                :
                <></>
            }

            <Navbar isMain={false} callableGoTo={(): void => navigation.goBack()} title="Flappy dot">
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <MatchInfoLabel value={currentPoints.toString()} description={`point${currentPoints == 1 ? '' : 's'}`} />

                    {currentPoints >= minimunPoints && !isRunning
                        ?
                        <>
                        <View style={style.equalsAlign}>
                            <MaterialCommunityIcons name="equal" size={32} color="#C4C4C4" />
                        </View>
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
                    ref={(ref): void => SetGameEngine(ref)}
                    style={style.minigameScene}
                    systems={[MinigameController.ActivePhysics]}
                    entities={MinigameController.Restart()}
                    running={isRunning}
                    onEvent={(e: any): void => MinigameController.SetGameState(e, gameEngine, SetIsRunning, SetCurrentPoints, currentPoints)}
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
                
                                    <Image style={style.dotStateImage} source={currentPoints >= minimunPoints ? require("../../image/coupon-dot-image.png") : require("../../image/dot-cry-image.png")} />
                
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
                                                <TouchableOpacity style={style.couponSaveButton} onPress={(): void => MinigameController.SaveCoupon(gettedCoupon, couponIsCopied, SetCouponIsCopied)}>
                                                    <Text style={[style.couponSaveButtonText, { color: couponIsCopied ? '#B5B5B5' : '#FF6E63' }]}>{couponIsCopied ? 'CODE SAVED!' : 'SAVE THIS CODE'}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        <Text style={style.feedbackMessage}>You find this discount coupon, use when get your bests!</Text>
                                    </>
                                    :
                                    <>
                                        <View />
                    
                                        <Image style={style.dotStateImage} source={require("../../image/dot-cry-image.png")} />
                    
                                        <View style={style.feedbackLabel}>
                                            <Text style={style.feedbackTitle}>Buaa...</Text>
                                            <Text style={style.feedbackMessage}>Sorry... no drawn coupon found, try again later...</Text>
                                        </View>
                                    </>
                            }
        
                            {currentPoints >= minimunPoints && gettedCoupon.state === 'to-find'
                                ?
                                <View style={style.footer}>
                                    <TouchableOpacity style={style.tryAgainButton} onPress={(): void => MinigameController.StartGame(currentPoints, SetCurrentPoints, SetIsRunning, SetGettedCoupon, SetLoading, SetCouponIsCopied, SetScore)}>
                                        <Text style={style.tryAgainButtonText}>Try again!</Text>
                                    </TouchableOpacity>
        
                                    <TouchableOpacity style={style.getCouponButton} onPress={async (): Promise<void> => CouponController.TryGetCoupon(currentPoints, SetLoading, SetGettedCoupon)}>
                                        <Text style={style.getCouponButtonText}>Try get coupon!</Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                <LargeButton title="Try again!" method={(): void => MinigameController.StartGame(currentPoints, SetCurrentPoints, SetIsRunning, SetGettedCoupon, SetLoading, SetCouponIsCopied, SetScore)} />
                            }
                        </>
                    }

                </View>
            }

        </View>
    );
}

export default MinigameView;