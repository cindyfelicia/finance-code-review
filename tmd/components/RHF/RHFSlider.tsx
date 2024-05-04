/**
 * Created by Widiana Putra on 08/12/2022
 * Copyright (c) 2022 - Made with love
 */

import React, { ComponentProps } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Slider } from "../../index";

interface Props {
  name: string;
}

export default function RHFSlider({ name, ...props }: Props & ComponentProps<typeof Slider>) {
  const { control } = useFormContext();
  return <Controller
    name={name}
    control={control}
    render={({ field: { onChange, onBlur, value }, fieldState }) => {
      return <Slider
        value={value}
        error={fieldState.error != undefined}
        errorText={fieldState.error?.message}
        onValueChanged={onChange}
        {...props}
      />;
    }}
  />;

}
