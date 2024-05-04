/**
 * Created by Widiana Putra on 07/12/2022
 * Copyright (c) 2022 - Made with love
 */

import React, { ComponentProps, useCallback, useState } from "react";
import { appTheme } from "../../core/theming";
import { View, ViewStyle } from "react-native";
import Typography from "../Typography/Typography";
import { HelperText, Stack } from "../../index";
import { BaseFormType } from "../../types/BaseFormType";
import { ColorVariantType, ThumbType, ThumbValuePosition } from "../../types/types";
import LabelInput from "../TextInput/Label/LabelInput";
import RnRangeSlider from "./RnRangeSlider";


export type BaseSliderType = {
  showThumbValue?: boolean
  thumbValuePosition?: ThumbValuePosition
  thumbValueFormatter?: (value?: number) => string;
  thumbType?: ThumbType;
  colorVariant?: ColorVariantType;
}

export interface SliderRangeValue {
  low: number;
  high: number;
  fromUser?: boolean;
}

type SlideProps = Omit<ComponentProps<typeof RnRangeSlider>, "min" | "max" | "renderThumb" | "renderRail" | "renderRailSelected" | "step" | "onValueChanged" | "style">
type Props = {
  initialValue?: number;

  //controlled
  value?: number;

  min?: number;
  max?: number;
  step?: number;
  onValueChanged?: (value: number) => void;
  style?: ViewStyle;
}

export default function Slider(
  {
    min = 0,
    max = 100,
    step = 1,
    initialValue,
    onValueChanged,
    value,
    label,
    helperText,
    error, errorText, isRequiredLabel,
    thumbValueFormatter,
    showThumbValue = true,
    thumbValuePosition,
    thumbType,
    colorVariant,
    style,
    ...props
  }: SlideProps & Props & BaseFormType & BaseSliderType,
) {
  const { colors, slider } = appTheme();
  const usedInitial = initialValue ?? value;
  const [rangeValue, setRangeValue] = useState<SliderRangeValue | undefined>(
    usedInitial ? {
      low: usedInitial,
      high: usedInitial,
    } : undefined);

  const handleValueChange = useCallback((low, high, fromUser) => {
    setRangeValue({ low, high, fromUser });
    if (onValueChanged) {
      onValueChanged(low);
    }
  }, []);

  const usedThumbValuePosition = thumbValuePosition ?? slider.thumbValuePosition;
  const usedThumbType = thumbType ?? slider.thumbType;
  const usedColorVariant = colorVariant ?? slider.colorVariant;
  const thumbColor = colors[usedColorVariant].main;


  const isControlled = value !== undefined;
  return <Stack
    style={style}
    spacing={8}>
    <Stack direction={"row"} items={"center"}>
      <View style={{ flex: 1 }}>
        <LabelInput label={label} required={isRequiredLabel} typographyType={"title3"} />
      </View>
      {
        (showThumbValue && usedThumbValuePosition == "right") &&
        <Typography type={"body1"}>
          {thumbValueFormatter ? thumbValueFormatter(isControlled ? value : rangeValue?.low) : `${isControlled ? value : rangeValue?.low}`}
        </Typography>
      }
    </Stack>
    <RnRangeSlider
      min={min}
      max={max}
      step={step}
      low={isControlled ? value : rangeValue?.low}
      high={rangeValue?.high}
      onValueChanged={handleValueChange}
      style={{
        paddingBottom: 20,
      }}
      disableRange
      renderThumb={(name) => {

        return <View style={{ position: "relative" }}>
          <View style={{
            height: 20,
            width: 20,
            backgroundColor: usedThumbType == "filled" ? thumbColor : colors.neutral.neutral_10,
            borderWidth: 1.5,
            borderColor: thumbColor,
            borderRadius: 10,
          }}>
          </View>
          {
            (showThumbValue && usedThumbValuePosition == "bottom") &&
            <View style={{
              alignSelf: "center",
              position: "absolute",
              top: 20,
              width: 64,
              flex: 1,
            }}>
              <Typography style={{
                alignSelf: "center",
              }}
                          type={"title3"}>
                {name === "low"
                  ? thumbValueFormatter ? thumbValueFormatter(rangeValue?.low) : rangeValue?.low
                  : thumbValueFormatter ? thumbValueFormatter(rangeValue?.high) : rangeValue?.high
                }
              </Typography>
            </View>
          }
        </View>;
      }}
      renderRail={() => {
        return <View style={{
          width: "100%",
          height: 8,
          backgroundColor: colors.neutral.neutral_30,
          borderRadius: 4,
        }} />;
      }}
      renderRailSelected={() => {
        return <View style={{
          width: "100%",
          height: 8,
          borderRadius: 4,
          backgroundColor: thumbColor,
        }} />;
      }}
      {...props}
    />
    <Stack>

      {
        (error) &&
        <HelperText type={"error"} visible={error}>
          {errorText}
        </HelperText>
      }
      {
        helperText
          ? <HelperText type={"info"}>
            {helperText}
          </HelperText>
          : <></>
      }
    </Stack>
  </Stack>;

}
