import { View, Image } from 'react-native';

import style from './style';

interface Props {
    selected: boolean,
    icon: any
}
    
const OrderStepIndicator: React.FC<Props> = ({ selected, icon }: Props) => {
    return(
        <View style={[style.orderStepIndicator, { backgroundColor: selected ? '#FF6E63' : '#ffffff', borderColor: selected ? '#FF6E63' : '#B5B5B5' }]}>
            <Image style={style.orderStepIcon} source={icon}/>
        </View>
    );
}

export default OrderStepIndicator;