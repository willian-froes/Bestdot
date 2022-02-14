import { Text, View } from 'react-native';
import style from './style';

interface Props {
    description: string,
    value: string
}
    
const MatchInfoLabel: React.FC<Props> = ({ description, value }) => {
    return(
        <View style={style.infoLabel}>
            <Text style={style.infoValue}>{value}</Text>
            <Text style={style.infoDescription}>{description}</Text>
        </View>
    );
}

export default MatchInfoLabel;