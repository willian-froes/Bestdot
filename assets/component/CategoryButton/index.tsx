import { ReactElement } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import style from './style';

interface Props {
    /** Nome da categoria a ser disponibilizada para filtro */
    categoryName: string,
    /** Flag para verificar se o botão foi selecionado ou não */
    selected: boolean,
    /** Método a ser executado quando a categoria é selecionada */
    selectedMethod: CallableFunction,
    /** Método a ser executado quando a categoria não é selecionada, apenas funciona em categoria já selecionada */
    unselectedMethod: CallableFunction
}

/**
 * Componente do botão de categoria do produto
 * @param { Props } Props parâmetro que contém as propriedades que o componente recebe
 * @returns { ReactElement } arvore de elementos que compõem o componente
 */
const CategoryButton: React.FC<Props> = ({ categoryName, selected, selectedMethod, unselectedMethod }: Props): ReactElement => {
    return(
        <TouchableOpacity style={[style.categoryButton, {backgroundColor: !selected ? '#F0F0F0' : '#000000' }]} onPress={(): void => {
            if(categoryName == "all") {
                unselectedMethod();
            } else {
                selectedMethod();
            }
        }}>
            <Text style={[style.categoryText, { color: !selected ? '#B5B5B5' : '#FFFFFF' }]}>{categoryName}</Text>
        </TouchableOpacity>
    );
}

export default CategoryButton;