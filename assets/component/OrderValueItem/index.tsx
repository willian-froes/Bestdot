import { ReactElement } from 'react';
import { Text, View } from 'react-native';

import style from './style';

interface Props {
    /** Descrição da informação a ser demonstrada */
    description: string,
    /** Valor da informação */
    value: string,
    /** Cor do texto da informação */
    valueTextColor: string
}

/**
 * Componente de um item do resumo total do pedido, por padrão é utilizado para representar valores baseados no total do pedido
 * @param { Props } Props parâmetro que contém as propriedades que o componente recebe
 * @returns { ReactElement } arvore de elementos que compõem o componente
 */
const OrderValueItem: React.FC<Props> = ({ description, value, valueTextColor }: Props): ReactElement => {
    return(
        <View style={style.orderLabel}>
            <Text style={style.orderDescription}>{description}</Text>
            <Text style={[style.orderValue, { color: valueTextColor }]}>{value}</Text>
        </View>
    );
}

export default OrderValueItem;