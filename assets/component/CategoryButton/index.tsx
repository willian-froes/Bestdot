import { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import style from './style';

interface Props {
    categoryName: string,
    selected: boolean
}
    
const CategoryButton: React.FC<Props> = ({ categoryName, selected }: Props) => {
    const [isSelected, SetIsSelected] = useState(selected);

    return(
        <TouchableOpacity style={[style.categoryButton, {backgroundColor: !isSelected ? '#F0F0F0' : '#000000' }]} onPress={() => SetIsSelected(!isSelected)}>
            <Text style={[style.categoryText, { color: !isSelected ? '#B5B5B5' : '#FFFFFF' }]}>{categoryName}</Text>
        </TouchableOpacity>
    );
}

export default CategoryButton;