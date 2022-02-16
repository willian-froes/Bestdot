import { Text, View } from 'react-native';

import style from './style';

interface Props {
    description: string,
    value: string,
    valueTextColor: string
}
    
const OrderValueItem: React.FC<Props> = ({ description, value, valueTextColor }: Props) => {
    return(
        <View style={style.orderLabel}>
            <Text style={style.orderDescription}>{description}</Text>
            <Text style={[style.orderValue, { color: valueTextColor }]}>{value}</Text>
        </View>
    );
}

export default OrderValueItem;