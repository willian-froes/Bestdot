import { ReactElement } from 'react';
import { View } from 'react-native';

import style from './style';

/**
 * Componente de linha horizontal, por padrão é cinza
 * @returns { ReactElement } arvore de elementos que compõem o componente
 */
const Line: React.FC = (): ReactElement => {
    return(
        <View style={style.line} />
    );
}

export default Line;