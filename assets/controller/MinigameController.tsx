import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions } from 'react-native';
import { Body, Engine, Events, World } from 'matter-js';

import { GameObjectHelper } from '../helper/GameObjectHelper';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export const MinigameController = {
    ActivePhysics: function(entities: any, {touches, time, dispatch}: any): void {
        let engine: Engine = entities.physics.engine;
        Engine.update(engine, time.delta);

        touches.filter((touch : any) => touch.type === 'press').forEach((touch: any) => {
            Body.setVelocity(entities.Bird.body, { x: 0, y: -8 });
        })
        
        for (let index = 1; index <= 2; index++) {
            if (entities[`ObstacleTop${index}`].body.bounds.max.x <= 50 && !entities[`ObstacleTop${index}`].point) {
                entities[`ObstacleTop${index}`].point = true;
                dispatch({ type: 'new_point' })
            }
            
            if(entities[`ObstacleTop${index}`].body.bounds.max.x <= 0) {
                const pipeSizePos: any = MinigameController.GetPipeSizePosPair(windowWidth * 0.9);
                
                Body.setPosition(entities[`ObstacleTop${index}`].body, pipeSizePos.pipeTop.pos);
                Body.setPosition(entities[`ObstacleBottom${index}`].body, pipeSizePos.pipeBottom.pos);

                entities[`ObstacleTop${index}`].point = false;
            }
            
            Body.translate(entities[`ObstacleTop${index}`].body, { x: -3, y: 0 });
            Body.translate(entities[`ObstacleBottom${index}`].body, { x: -3, y: 0 });
        }

        Events.on(engine, 'collisionStart', (event: any) => dispatch({ type: 'game_over' }));
        
        return entities;
    },
    GetRandom: function(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    GetPipeSizePosPair: function(addToPosX: number = 0): any {
        let yPosTop: number = - MinigameController.GetRandom(300, windowHeight - 100);
        const pipeTop: any = {
            pos: { x: windowWidth + addToPosX, y: yPosTop },
            size: { height: windowHeight * 2, width: 75 }
        }
    
        const pipeBottom: any = {
            pos: { x: windowWidth + addToPosX, y: windowHeight * 2 + 200 + yPosTop },
            size: { height: windowHeight * 2, width: 75 }
        }
    
        return { pipeTop, pipeBottom };
    },
    Restart: function(): any {
        let engine: Engine = Engine.create();
        engine.enableSleeping = true;
        engine.gravity.y = 0.6;
        
        let world: World = engine.world;

        const pipeSizePosA: any = MinigameController.GetPipeSizePosPair();
        const pipeSizePosB: any = MinigameController.GetPipeSizePosPair(windowWidth * 0.9);

        return {
            physics: {engine, world},
            Bird: GameObjectHelper.CreateGameObject(world, 'Bird', '#000000', { x: 50, y: 300 }, { height: 40, width: 40 }, false),
            Floor:  GameObjectHelper.CreateGameObject(world, 'Floor', '#FF5A4D', { x: windowWidth / 2, y: windowHeight }, { height: 20, width: windowWidth }, true),
            ObstacleTop1:  GameObjectHelper.CreateGameObject(world, 'ObstacleTop1', '#FF5A4D', pipeSizePosA.pipeTop.pos, pipeSizePosA.pipeTop.size, true),
            ObstacleBottom1:  GameObjectHelper.CreateGameObject(world, 'ObstacleBottom1', '#FF5A4D', pipeSizePosA.pipeBottom.pos, pipeSizePosA.pipeBottom.size, true),
            ObstacleTop2:  GameObjectHelper.CreateGameObject(world, 'ObstacleTop2', '#FF5A4D', pipeSizePosB.pipeTop.pos, pipeSizePosB.pipeTop.size, true),
            ObstacleBottom2:  GameObjectHelper.CreateGameObject(world, 'ObstacleBottom2', '#FF5A4D', pipeSizePosB.pipeBottom.pos, pipeSizePosB.pipeBottom.size, true)
        }
    },
    StartGame: function(currentPoints: number, SetCurrentPoints: CallableFunction, SetIsRunning: CallableFunction, SetGettedCoupon: CallableFunction, SetLoading: CallableFunction, SetCouponIsCopied: CallableFunction, SetScore: CallableFunction): void {
        SetCurrentPoints(0);
        SetIsRunning(true);
        MinigameController.SaveScore(currentPoints, SetScore);

        SetGettedCoupon({ coupon: null, state: 'to-find' });
        SetLoading(false);
        SetCouponIsCopied(false);
    },
    LoadScore: async function(SetScore: CallableFunction): Promise<void> {
        let data: string | null = await AsyncStorage.getItem("score");

        if(data) {
            let score: any = JSON.parse(data);
            SetScore(score);
        } else {
            SetScore({ last: 0, best: 0 });
        }
    },
    SaveScore: async function(currentPoints: number, SetScore: CallableFunction): Promise<void> {
        let data: string | null = await AsyncStorage.getItem("score");

        if(data) { 
            let score: any = JSON.parse(data);
            let bestPoints: number = score.best < currentPoints ? currentPoints : score.best;
            let newScore: any = { last: currentPoints, best: bestPoints };

            SetScore(newScore);

            let newScoreString: string = JSON.stringify(newScore);
            AsyncStorage.setItem("score", newScoreString)
        }
    },
    SetGameState: function(e: any, gameEngine: any, SetIsRunning: CallableFunction, SetCurrentPoints: CallableFunction, currentPoints: number): void {
        switch(e.type) {
            case 'game_over':
                SetIsRunning(false);
                gameEngine.stop();
                break;
            case 'new_point':
                let points: number = currentPoints + 1;
                SetCurrentPoints(points);
                break;
        }
    },
    SaveCoupon: function(gettedCoupon: any, couponIsCopied: boolean, SetCouponIsCopied: CallableFunction): void {
        if(couponIsCopied == false) {
            SetCouponIsCopied(true);
            let couponString: string = JSON.stringify(gettedCoupon.coupon);
            AsyncStorage.setItem("coupon", couponString);
        }
    }
}