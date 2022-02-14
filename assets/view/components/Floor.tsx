import { View } from 'react-native';
import { Bodies, Body, Composite, World } from 'matter-js';

const Floor = (props: any) => {
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

    const xBody = props.body.position.x - widthBody /2;
    const yBody = props.body.position.y - heightBody /2;

    const color = props.color;

    return(
        <View style={{
            backgroundColor: color,
            borderWidth: 1,
            borderColor: color,
            borderStyle: 'solid',
            position: 'absolute',
            left: xBody,
            top: yBody,
            width: widthBody,
            height: heightBody
        }}>

        </View>
    );
}

export default function (world: World, color: string, position: any, size: any): any {
    const initialFloor: Body = Bodies.rectangle(
        position.x, 
        position.y, 
        size.width, 
        size.height, 
        { 
            label: 'Floor',
            isStatic: true
        }
    );

    Composite.add(world, initialFloor);
    
    return {
        body: initialFloor,
        color,
        position,
        renderer: <Floor />
    }
}