import {
    StatusBar,
    useColorScheme,
} from 'react-native';
import AppColors from '../../constants/AppColors';

function CommonStatusBar(props: { backgroundColor?: string }): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    let backgroundStyle = {
        backgroundColor: isDarkMode ? AppColors.BLACK : AppColors.WHITE,
    };
    if (props.backgroundColor != null) {
        backgroundStyle = {
            backgroundColor: props.backgroundColor,
        };
    }

    return (
        <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
        />
    );
};

export default CommonStatusBar;