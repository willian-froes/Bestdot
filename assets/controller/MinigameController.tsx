import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions } from 'react-native';
import { Body, Engine, Events, World } from 'matter-js';

import { GameObjectHelper } from '../helper/GameObjectHelper';

/** Altura da janela do dispositivo */
const windowHeight = Dimensions.get('window').height;
/** Largura da janela do dispositivo */
const windowWidth = Dimensions.get('window').width;

/**
 * Controller que contém todos métodos referentes ao minigame
 */
export const MinigameController = {
    /**
     * ActivePhysics, método que atualiza o comportamento dos objetos na cena do minigame e altera o comportamento de acordo com regras físicas
     * @param { any } entities entidades/objetos contidos no mundo 2d
     * @param { any } props propriedades que a game engine retorna, sendo a lista de touches, tempo alterado realtime e o dispatcher
     */
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
    /**
     * GetRandom, método que calcula um valor no intervalo de um valor mínimo e máximo
     * @param { number } min valor inicial do intervalo
     * @param { number } max valor final do intervalo
     * @returns { number } retorna um valor gerado entrdentro do intervalo
     */
    GetRandom: function(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    /**
     * GetPipeSizePosPair, método que obtém a posição e tamanho de um par de obstáculos, além disso o espaço entre o obstáculo superior e inferir
     * @param { number } addToPosX valor do primeiro cano na posição x, onde deve aparecer o seguinte (spawnner)
     * @returns { any } retorna um objeto contendo posição e tamanho de um par de obstáculos
     */
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
    /**
     * Restart, método que configura a física e reseta os objetos da cena quando chamado
     * @returns { any } retorna a física e todos objetos necessários para inicalizar a partida
     */
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
    /**
     * StartGame, método que inicia a partida, salva o score anterior e reseta o estado de um cupom obtido
     * @param { number } currentPoints valor atual da pontuação
     * @param { CallableFunction } SetCurrentPoints método que atualiza o estado dos pontos atuais, por default reseta para zero
     * @param { CallableFunction } SetIsRunning método que atualiza o estado da flag que indica se a engine está em execução ou não
     * @param { CallableFunction } SetGettedCoupon método que atualiza o estado do cupom obtido, por padrão reseta para o estado inicial de "a encontrar"
     * @param { CallableFunction } SetLoading método que atualiza o estado do componente Loader
     * @param { CallableFunction } SetCouponIsCopied método que atualiza o estado da flag que indica quando o usuário copiou a hash do cupom encontrado no sorteio
     * @param { CallableFunction } SetScore método que atualiza o estado do score demonstrado na tela
     */
    StartGame: function(currentPoints: number, SetCurrentPoints: CallableFunction, SetIsRunning: CallableFunction, SetGettedCoupon: CallableFunction, SetLoading: CallableFunction, SetCouponIsCopied: CallableFunction, SetScore: CallableFunction): void {
        SetIsRunning(true);
        MinigameController.SaveScore(currentPoints, SetScore);
        SetCurrentPoints(0);

        SetGettedCoupon({ coupon: null, state: 'to-find' });
        SetLoading(false);
        SetCouponIsCopied(false);
    },
    /**
     * LoadScore, método que acessa o AsyncStorage e obtém o score registrado, serializa e atualiza o estado na tela do minigame
     * @param { CallableFunction } SetScore método que atualiza o estado atual do score na tela
     * @returns { Promise<void> } retorna uma promise para acessar o then() após executar a ação
     */
    LoadScore: async function(SetScore: CallableFunction): Promise<void> {
        let data: string | null = await AsyncStorage.getItem("score");
        
        if(data) {
            let score: any = JSON.parse(data);
            SetScore(score);
        } else {
            SetScore({ last: 0, best: 0 });
        }
    },
    /**
     * SaveScore, método que verifica o score da última partida e atualiza a melhor pontuação e a última pontuação no AsyncStorage e na tela
     * @param { number } currentPoints pontuação da última partida
     * @param { CallableFunction } SetScore método que atualiza o estado atual do score na tela
     * @returns { Promise<void> } retorna uma promise para acessar o then() após executar a ação
     */
    SaveScore: async function(currentPoints: number, SetScore: CallableFunction): Promise<void> {
        let data: string | null = await AsyncStorage.getItem("score");

        if(data) { 
            let score: any = JSON.parse(data);
            let bestPoints: number = score.best < currentPoints ? currentPoints : score.best;
            let newScore: any = { last: currentPoints, best: bestPoints };

            SetScore(newScore);

            let newScoreString: string = JSON.stringify(newScore);
            AsyncStorage.setItem("score", newScoreString)
        } else {
            let newScoreString: string = JSON.stringify({ last: currentPoints, best: currentPoints });
            AsyncStorage.setItem("score", newScoreString);
        }
    },
    /**
     * SetGameState, método que monitora os eventos dentro da cena do minigame e, de acordo com o retorno executa uma determinada ação
     * @param { any } e nome do evento detectado durante a partida
     * @param { any } gameEngine engine que executa o mingame
     * @param { CallableFunction } SetIsRunning método que atualiza o estado atual da flag que indica se a engine foi inicializada
     * @param { CallableFunction } SetCurrentPoints método que atualiza o estado atual da última partida
     * @param { number } currentPoints pontuação da última partida
     */
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
    }
}