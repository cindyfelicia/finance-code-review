/**
 * Created by Widiana Putra on 06/07/2022
 * Copyright (c) 2022 - Made with love
 */

import React from "react";
import { FlexAlignType, StyleProp, View, ViewStyle } from "react-native";

export type StackDirection = "row" | "column" | "row-reverse" | "column-reverse"

interface Props {
  children: React.ReactNode[] | React.ReactNode;
  spacing?: number;
  direction?: StackDirection;
  style?: StyleProp<ViewStyle>;
  p?: number;
  pt?: number;
  pb?: number;
  pl?: number;
  pr?: number;
  px?: number;
  py?: number;

  m?: number;
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
  mx?: number;
  my?: number;
  items?: FlexAlignType;
  /**
   * Shorthand for the `alignSelf` style property.
   */
  self?: FlexAlignType;
  /**
   * Shorthand for the `alignContent` style property.
   */
  content?: "flex-start" | "flex-end" | "center" | "space-evenly" | "space-between" | "space-around";
}

export default function Stack({
                                children,
                                spacing = 0,
                                direction = "column",
                                style: viewStyle,
                                items,
                                content, self,
                                p = 0,
                                pt, pb, pl, pr, px, py,
                                m, mt, mb, ml, mr, mx, my,
                              }: Props) {
  const activeChildren = (children instanceof Array) ? children?.filter(it => it != undefined) : children;
  const itemCount = (activeChildren instanceof Array) ? activeChildren.length : 1;

  const spacingStyle = (index?: number) => {
    if (index != undefined) {
      if (index !== itemCount - 1) {
        switch (direction) {
          case "column":
            return { marginBottom: spacing };
          case "row":
            return { marginEnd: spacing };
          case "column-reverse":
            return { marginTop: spacing };
          case "row-reverse":
            return { marginStart: spacing };
        }
      }
    }
    return {};
  };

  return <View style={[{
    flexDirection: direction ?? "column",
    padding: p,
    paddingTop: py ?? pt,
    paddingBottom: py ?? pb,
    paddingLeft: px ?? pl,
    paddingRight: px ?? pr,
    margin: m,
    marginTop: my ?? mt,
    marginBottom: my ?? mb,
    marginLeft: mx ?? ml,
    marginRight: mx ?? mr,
    alignItems: items,
    justifyContent: content,
    alignSelf: self,
  }, viewStyle]}>
    {
      (activeChildren instanceof Array)
        ? <>
          {
            activeChildren.map((child, index) => {
              return <>
                {
                  child &&
                  React.cloneElement(child, {
                    key: index,
                    style: {
                      ...child?.props?.style,
                      ...spacingStyle(index),
                    },
                  })
                }
              </>;
            })
          }
        </>
        : <>
          {activeChildren}
        </>
    }
  </View>;
}
