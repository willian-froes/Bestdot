import { ReactElement } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';

import style from './style';

interface Props {
    /** Descrição da ocorrência em processo */
    description: string
}

/**
 * Componente loader, renderiza um indicador de carregamento incluindo a descrição da ocorrência
 * @param { Props } Props parâmetro que contém as propriedades que o componente recebe
 * @returns { ReactElement } arvore de elementos que compõem o componente
 */
const Loader: React.FC<Props> = ({ description }: Props): ReactElement => {
    return(
        <View style={style.loaderLabel}>
            <View>
                <ActivityIndicator size="large" color="#FF6E63" />
                <Text style={style.description}>{description}</Text>
            </View>
        </View>
    );
}

export default Loader;