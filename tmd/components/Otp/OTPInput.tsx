/**
 * Created by Widiana Putra on 28/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { ComponentProps, useEffect, useRef, useState } from "react";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { appTheme } from "../../core/theming";
import { View } from "react-native";
import HelperText from "../HelperText";
import { TextInputMode } from "../TextInput/TextField";
import { ColorVariantType } from "../../types/types";

interface Props {
  helperText?: string;
  errorText?: string;
  error?: boolean;
  mode?: TextInputMode;
  colorVariant?: ColorVariantType;
}

const OTPInput: React.RefForwardingComponent<{}, Props & ComponentProps<typeof OTPInputView>> = ({
                                                                                                   error,
                                                                                                   errorText,
                                                                                                   helperText,
                                                                                                   mode,
                                                                                                   colorVariant,
                                                                                                   ...rest
                                                                                                 }: Props & ComponentProps<typeof OTPInputView>, ref) => {
  const { colors, textInput, fonts, otpInput } = appTheme();
  const usedColorVariant = colorVariant ?? otpInput.colorVariant;
  const usedMode = mode ?? otpInput.mode;
  const [isError, setIsError] = useState(false);
  const borderColor = isError ? colors.danger.main : colors.neutral.neutral_60;
  const selectedBorderColor = isError ? colors.danger.main : colors[usedColorVariant].main;
  const filledBGColor = isError ? colors.danger.surface : colors[usedColorVariant].main;
  const selectedFilledBGColor = isError ? colors.danger.surface : colors[usedColorVariant].surface;
  const localRef = useRef(null);
  const usedRef = ref ?? localRef;
  useEffect(() => {
    setIsError(error);
  }, [error, errorText]);

  const handleChanges = (val: string) => {
    if (isError) {
      setIsError(false);
    }
    if (rest.onCodeChanged) {
      rest.onCodeChanged(val);
    }
  };

  useEffect(() => {
    if (rest.autoFocusOnLoad) {
      setTimeout(() => {
        usedRef?.current?.focusField(0);
      }, 300);
    }
  }, []);


  const renderFilled = () => {
    return (
      <OTPInputView
        ref={usedRef}
        onCodeChanged={handleChanges}
        selectionColor={colors[usedColorVariant].main}
        codeInputFieldStyle={
          [
            {
              borderWidth: 0,
              backgroundColor: filledBGColor,
              borderRadius: 8,
              color: rest.secureTextEntry ? (error ? colors.danger.main : colors.primary.main) : colors.neutral.neutral_90,
              fontSize: 24,
              paddingVertical: 0,
              marginVertical: 0,
            },
            fonts.sans.medium,
          ]
        }

        codeInputHighlightStyle={{
          backgroundColor: selectedFilledBGColor,
          borderColor: colors[usedColorVariant].border,
          borderWidth: isError ? 0 : 2,
        }}


        {...rest}
        autoFocusOnLoad={false}
        style={[{
          width: "100%",
        }, rest.style]}
      />
    );
  };
  const renderFlat = () => {
    return (
      <OTPInputView
        ref={usedRef}
        onCodeChanged={handleChanges}
        selectionColor={colors[usedColorVariant].main}
        codeInputFieldStyle={
          [
            {
              borderWidth: 0,
              borderBottomWidth: 2,
              borderBottomColor: borderColor,
              color: rest.secureTextEntry ? (error ? colors.danger.main : colors.primary.main) : colors.neutral.neutral_90,
              fontSize: 24,
              paddingVertical: 0,
              marginVertical: 0,
            },
            fonts.sans.medium,
          ]
        }
        codeInputHighlightStyle={{
          borderBottomColor: selectedBorderColor,
          borderBottomWidth: 2,
        }}
        {...rest}
        autoFocusOnLoad={false}
        style={[{
          width: "100%",
        }, rest.style]}
      />
    );
  };
  const renderContained = () => {
    return (
      <OTPInputView
        ref={usedRef}
        onCodeChanged={handleChanges}
        selectionColor={colors[usedColorVariant].main}
        codeInputFieldStyle={
          [
            {
              borderRadius: 8,
              borderColor: borderColor,
              color: rest.secureTextEntry ? (error ? colors.danger.main : colors.primary.main) : colors.neutral.neutral_90,
              fontSize: 24,
              paddingVertical: 0,
              marginVertical: 0,
            },
            fonts.sans.medium,
          ]
        }
        codeInputHighlightStyle={{
          borderColor: selectedBorderColor,
          borderWidth: 2,
        }}
        {...rest}
        autoFocusOnLoad={false}
        style={[{
          width: "100%",
        }, rest.style]}
      />
    );
  };

  const renderOtp = () => {
    switch (usedMode) {
      case "contained":
        return renderContained();
      case "flat":
        return renderFlat();
      default:
        return renderFilled();
    }
  };

  return (
    <View style={{
      flexDirection: "column",
      width: "100%",
      flex: 1,
    }}>
      <View style={
        [{
          flex: 1,
          flexDirection: "row",
          position: "relative",
        }, rest.style]
      }>
        {renderOtp()}
      </View>
      {
        isError &&
        <HelperText type={"error"} style={{
          marginTop: 12,
        }}>{errorText}</HelperText>
      }
    </View>
  );
};

export default React.forwardRef(OTPInput);
