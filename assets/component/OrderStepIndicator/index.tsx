import { ReactElement } from 'react';
import { View } from 'react-native';

import style from './style';

interface Props {
    /** Flag para verificar se a etapa está selecionada ou não */
    selected: boolean,
    /** Icone da etapa, renderiza um vector-icon */
    icon: ReactElement
}

/**
 * Componente que renderiza um indicator da etapa atual do pedido, por padrão são três etapas renderizadas na tela responsável
 * @param { Props } Props parâmetro que contém as propriedades que o componente recebe
 * @returns { ReactElement } arvore de elementos que compõem o componente
 */
const OrderStepIndicator: React.FC<Props> = ({ selected, icon }: Props): ReactElement => {
    return(
        <View style={[style.orderStepIndicator, { backgroundColor: selected ? '#FF6E63' : '#ffffff', borderColor: selected ? '#FF6E63' : '#B5B5B5' }]}>
            {icon}
        </View>
    );
}

export default OrderStepIndicator;