import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface Props {
    categoryName: string,
    selected: boolean
}
    
const CategoryButton: React.FC<Props> = ({ categoryName, selected }) => {
    const [isSelected, SetIsSelected] = useState(selected);

    return(
        <TouchableOpacity style={{ backgroundColor: !isSelected ? '#F0F0F0' : '#000000', paddingHorizontal: 20, borderRadius: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }} onPress={() => {
            SetIsSelected(!isSelected);
        }}>
            <Text style={{ color: !isSelected ? '#B5B5B5' : '#FFFFFF', fontWeight: 'bold' }}>{categoryName}</Text>
        </TouchableOpacity>
    );
}

export default CategoryButton;