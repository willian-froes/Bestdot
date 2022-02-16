import { View } from 'react-native';
import { Bodies, Body, Composite, World } from 'matter-js';

export const GameObjectHelper: any = {
    MountObject: function(props: any): any {
        const widthBody: number = props.body.bounds.max.x - props.body.bounds.min.x;
        const heightBody: number = props.body.bounds.max.y - props.body.bounds.min.y;
    
        const xBody: number = props.body.position.x - widthBody /2;
        const yBody: number = props.body.position.y - heightBody /2;
    
        const color: string = props.color;
        const label: string = props.body.label;
    
        return(
            <View style={{
                backgroundColor: color,
                borderRadius: label === 'Bird' ? heightBody / 2 : 0,
                borderWidth: 1,
                borderColor: 'transparent',
                borderStyle: 'solid',
                position: 'absolute',
                left: xBody,
                top: yBody,
                width: widthBody,
                height: heightBody
            }} />
        );
    },
    CreateGameObject: function(world: World, label: string, color: string, position: any, size: any, isStatic: boolean): any {
        const gameObjectRenderer: Body = Bodies.rectangle( position.x, position.y, size.width, size.height, { label, isStatic });

        Composite.add(world, gameObjectRenderer);
        return { body: gameObjectRenderer, color, position, renderer: GameObjectHelper.MountObject }
    }
}