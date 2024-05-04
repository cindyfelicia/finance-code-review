/**
 * Created by Widiana Putra on 07/12/2022
 * Copyright (c) 2022 - Made with love
 */

import React, { ComponentProps, useCallback, useMemo, useState } from "react";
import { BaseSliderType, SliderRangeValue } from "./Slider";
import { appTheme } from "../../core/theming";
import { View, ViewStyle } from "react-native";
import Typography from "../Typography/Typography";
import { HelperText, Stack } from "../../index";
import { BaseFormType } from "../../types/BaseFormType";
import LabelInput from "../TextInput/Label/LabelInput";
import RnRangeSlider from "./RnRangeSlider";

type SlideProps = Omit<ComponentProps<typeof RnRangeSlider>, "min" | "max" | "renderThumb" | "renderRail" | "renderRailSelected" | "step" | "onValueChanged" | "style">
type Props = {
  initialValue?: SliderRangeValue;

  //controlled
  value?: SliderRangeValue;

  min?: number;
  max?: number;
  step?: number;
  onValueChanged?: (value: SliderRangeValue) => void;
  labelFormatter?: (value?: number) => string;
  style?: ViewStyle;
}

export default function RangeSlider(
  {
    min = 0,
    max = 100,
    step = 1,
    initialValue,
    onValueChanged,
    value,
    labelFormatter,
    style,
    label, helperText, error, errorText, isRequiredLabel,
    thumbValueFormatter,
    showThumbValue = true,
    thumbValuePosition = "bottom",
    thumbType = "filled",
    colorVariant = "primary",
    ...props
  }: SlideProps & Props & BaseFormType & BaseSliderType,
) {
  const { colors, slider } = appTheme();
  const usedInitial = initialValue ?? value;
  const [rangeValue, setRangeValue] = useState<SliderRangeValue | undefined>(
    usedInitial ? {
      low: usedInitial?.low,
      high: usedInitial?.high,
    } : undefined);

  const handleValueChange = useCallback((low, high, fromUser) => {
    setRangeValue({ low, high, fromUser });
    if (onValueChanged) {
      onValueChanged({
        low,
        high,
        fromUser,
      });
    }
  }, []);

  const usedThumbValuePosition = thumbValuePosition ?? slider.thumbValuePosition;
  const usedThumbType = thumbType ?? slider.thumbType;
  const usedColorVariant = colorVariant ?? slider.colorVariant;
  const thumbColor = colors[usedColorVariant].main;
  const isControlled = value !== undefined;

  const displayValue = useMemo(() => {
    let txt = "";
    if (thumbValueFormatter) {
      txt = `${thumbValueFormatter(rangeValue?.low)} - ${thumbValueFormatter(rangeValue?.high)}`;
    } else {
      txt = `${rangeValue?.low} - ${rangeValue?.high}`;
    }
    return txt;
  }, [rangeValue]);

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
          {displayValue}
        </Typography>
      }
    </Stack>

    <RnRangeSlider
      min={min}
      max={max}
      step={step}
      low={isControlled ? value?.low : rangeValue?.low}
      high={isControlled ? value?.high : rangeValue?.high}
      onValueChanged={handleValueChange}
      style={{
        paddingBottom: 20,
      }}


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
                  ? labelFormatter ? labelFormatter(rangeValue?.low) : rangeValue?.low
                  : labelFormatter ? labelFormatter(rangeValue?.high) : rangeValue?.high
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
