/**
 * Created by Widiana Putra on 22/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import Button from "./Button";
import { appTheme } from "../../core/theming";

export default function TextButton({ ...rest }: React.ComponentProps<typeof Button>) {
  const { fonts } = appTheme();
  return (
    <Button
      contentStyle={{
        marginVertical: 0,
        marginHorizontal: 0,
      }}
      labelStyle= {fonts.sans.semiBold}
      shape={"rect"}
      variant={"tertiary"}
      {...rest}
    >
      {rest.children}
    </Button>
  );
}
