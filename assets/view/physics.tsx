import Matter, { Body, Engine, Events } from 'matter-js';
import { getPipeSizePosPair } from './utils/random';

import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Physics = (entities: any, {touches, time, dispatch}: any) => {
    let engine: Engine = entities.physics.engine;
    
    Engine.update(engine, time.delta);

    touches.filter((touch : any) => touch.type === 'press').forEach((touch: any) => {
        Body.setVelocity(entities.Bird.body, {
            x: 0,
            y: -8
        });
    })
    
    
    for (let index = 1; index <= 2; index++) {
        if (entities[`ObstacleTop${index}`].body.bounds.max.x <= 50 && !entities[`ObstacleTop${index}`].point) {
            entities[`ObstacleTop${index}`].point = true;
            dispatch({ type: 'new_point' })
        }
        
        if(entities[`ObstacleTop${index}`].body.bounds.max.x <= 0) {
            const pipeSizePos = getPipeSizePosPair(windowWidth * 0.9);
            
            Body.setPosition(entities[`ObstacleTop${index}`].body, pipeSizePos.pipeTop.pos);
            Body.setPosition(entities[`ObstacleBottom${index}`].body, pipeSizePos.pipeBottom.pos);

            entities[`ObstacleTop${index}`].point = false;
        }
        
        Body.translate(entities[`ObstacleTop${index}`].body, { x: -3, y: 0 });
        Body.translate(entities[`ObstacleBottom${index}`].body, { x: -3, y: 0 });
    }

    Events.on(engine, 'collisionStart', (event: any) => {
        dispatch({ type: 'game_over' })
    })
    
    
    return entities;
}

export default Physics;