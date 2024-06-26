import * as React from 'react';
import {
    Text as NativeText,
    TextStyle,
    StyleProp,
    StyleSheet,
} from 'react-native';
import {appTheme, withTheme} from '../../core/theming';

type Props = React.ComponentProps<typeof NativeText> & {
    style?: StyleProp<TextStyle>;
    /**
     * @optional
     */
};

// @component-group Typography

/**
 * Text component which follows styles from the theme.
 *
 * @extends Text props https://reactnative.dev/docs/text#props
 */
const Text: React.RefForwardingComponent<{}, Props> = (
    {style, ...rest}: Props,
    ref
) => {
    const root = React.useRef<NativeText | null>(null);
    const theme = appTheme()

    React.useImperativeHandle(ref, () => ({
        setNativeProps: (args: Object) => root.current?.setNativeProps(args),
    }));

    return (
        <NativeText
            {...rest}
            ref={root}
            style={[
                {
                    ...theme.fonts.sans.regular,
                    color: theme.colors.text.primary,
                },
                styles.text,
                style,
            ]}
        />
    );
};

const styles = StyleSheet.create({
    text: {
        textAlign: 'left',
    },
});

export default React.forwardRef(Text);
