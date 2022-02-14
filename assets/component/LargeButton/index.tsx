import { TouchableOpacity, Text } from 'react-native';
import style from './style';

interface Props {
    title: string,
    method: CallableFunction
}
    
const LargeButton: React.FC<Props> = ({ title, method }: Props) => {
    return(
        <TouchableOpacity style={style.button} onPress={() => method()}>
            <Text style={style.title}>{title}</Text>
        </TouchableOpacity>
    );
}

export default LargeButton;