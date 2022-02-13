import { Engine, World } from 'matter-js';

import Bird from '../components/Bird';
import Floor from '../components/Floor';
import Obstacle from '../components/Obstacle';

import { Dimensions } from 'react-native';
import { getPipeSizePosPair } from '../utils/random';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const restart = () => {
    let engine: Engine = Engine.create();
    engine.enableSleeping = true;
    engine.gravity.y = 0.4;
    
    let world: World = engine.world;

    const pipeSizePosA = getPipeSizePosPair();
    const pipeSizePosB = getPipeSizePosPair(windowWidth * 0.9);
    return {
        physics: {engine, world},
        Bird: Bird(world, '#000000', { x: 50, y: 300 }, { height: 40, width: 40 }),
        Floor: Floor(world, '#FF5A4D', { x: windowWidth / 2, y: windowHeight }, { height: 20, width: windowWidth }),
        ObstacleTop1: Obstacle(world, 'ObstacleTop1', '#FF5A4D', pipeSizePosA.pipeTop.pos, pipeSizePosA.pipeTop.size ),
        ObstacleBottom1: Obstacle(world, 'ObstacleBottom1', '#FF5A4D', pipeSizePosA.pipeBottom.pos, pipeSizePosA.pipeBottom.size ),
        ObstacleTop2: Obstacle(world, 'ObstacleTop2', '#FF5A4D', pipeSizePosB.pipeTop.pos, pipeSizePosB.pipeTop.size ),
        ObstacleBottom2: Obstacle(world, 'ObstacleBottom2', '#FF5A4D', pipeSizePosB.pipeBottom.pos, pipeSizePosB.pipeBottom.size )
    }
}

export default restart;