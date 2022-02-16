import { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import style from './style';

interface Props {
    categoryName: string,
    selected: boolean,
    selectedMethod: CallableFunction,
    unselectedMethod: CallableFunction
}
    
const CategoryButton: React.FC<Props> = ({ categoryName, selected, selectedMethod, unselectedMethod }: Props) => {
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