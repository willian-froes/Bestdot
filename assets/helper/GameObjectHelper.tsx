import { ReactElement } from 'react';
import { View } from 'react-native';
import { Bodies, Body, Composite, World } from 'matter-js';

/**
 * Helper que contém métodos que auxiliam em operações relacionadas a objetos no minigame
 */
export const GameObjectHelper: any = {
    /**
     * MountObject, método responsável por construir o objeto a partir de um ReactElement
     * @param { any } props propriedades do objeto a ser construido
     * @returns { ReactElement } retorna um elemento que representa o objeto estilizado
     */
    MountObject: function(props: any): ReactElement {
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
    /**
     * CreateGameObject, método que elabora a mesh do objeto e adiciona essa mesh na cena do minigame
     * @param { World } world cena do minigame criado na game engine
     * @param { string } label nome do objeto criado
     * @param { string } color cor do objeto em hexadecimal
     * @param { any } position posição inicial do objeto
     * @param { any } size tamanho inicial do objeto
     * @param { boolean } isStatic flag que indica se a colisão deve ser detectada ou não
     * @returns { any } retorna um elemento que representa o objeto criado
     */
    CreateGameObject: function(world: World, label: string, color: string, position: any, size: any, isStatic: boolean): any {
        const gameObjectRenderer: Body = Bodies.rectangle( position.x, position.y, size.width, size.height, { label, isStatic });

        Composite.add(world, gameObjectRenderer);
        return { body: gameObjectRenderer, color, position, renderer: GameObjectHelper.MountObject }
    }
}