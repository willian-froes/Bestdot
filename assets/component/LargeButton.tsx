import { TouchableOpacity, Text } from 'react-native';

interface Props {
    title: string,
    method: CallableFunction
}
    
const LargeButton: React.FC<Props> = ({ title, method }) => {
    return(
        <TouchableOpacity style={{ backgroundColor: '#FF6E63', margin: 10, borderRadius: 15, padding: 20, justifyContent: 'center', alignItems: 'center' }} onPress={() => method()}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#ffffff' }}>{title}</Text>
        </TouchableOpacity>
    );
}

export default LargeButton;