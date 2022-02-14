import { ActivityIndicator, View, Text } from 'react-native';
import style from './style';

interface Props {
    description: string
}
    
const Loader: React.FC<Props> = ({ description }: Props) => {
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