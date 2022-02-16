import { Text, View } from 'react-native';

import LargeButton from '../LargeButton';

import style from './style';

interface Props {
    description: string,
    buttonTitle: string,
    method: CallableFunction
}
    
const Modal: React.FC<Props> = ({ description, buttonTitle, method }: Props) => {
    return(
        <View style={style.modalBackground}>
            <View style={style.modalLabel}>
                <Text style={style.modalDescription}>{description}</Text>
                <LargeButton title={buttonTitle} method={method} />
            </View>
        </View>
    );
}

export default Modal;