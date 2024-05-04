/**
 * Created by Widiana Putra on 08/12/2022
 * Copyright (c) 2022 - Made with love
 */

import React, { ReactNode, useEffect, useState } from "react";
import { Stack } from "../../index";
import Typography from "../Typography/Typography";
import Icon from "../Icon";
import { Image, LayoutAnimation, Platform, TouchableOpacity, UIManager } from "react-native";
import Divider from "../Divider";

interface Props {
  title: string;
  description?: string;
  content?: ReactNode;
}

export default function Accordion(
  { title, description, content }: Props,
) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleOpen = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  return <>
    <TouchableOpacity activeOpacity={0.8} onPress={handleToggleOpen}>
      <Stack>
        <Stack py={16} px={16} items={"center"} direction={"row"}>
          <Typography
            type={"body2"}
            style={{
              flex: 1,
            }}>
            {title}
          </Typography>
          <Icon icon={isExpanded ? "chevron-up" : "chevron-down"} />
        </Stack>
        <Divider />
      </Stack>
    </TouchableOpacity>
    {(isExpanded && content) &&
      <Stack>
        {
          content
        }
      </Stack>
    }
  </>;
}
