import React, { ComponentProps, useEffect, useRef, useState } from "react";
import { IconButton, Image, Stack, appTheme } from "../../index";
import { ImageRatioType } from "../../types/types";
import { Dimensions, FlatList, ImageBackground, Pressable, View, ViewToken } from "react-native";
import { useLocale } from "../../../src/providers/LocaleProvider";
import { goBack } from "../../../src/navigations/RootNavigation";
import ImageViewerModal from "../Modal/ImageViewerModal";
import Color from "color";
import Typography from "../Typography/Typography";
import elevation from "../../styles/elevation";
import Carousel from "./Carousel";

export default function CarouselFullWidth({
                                            data,
                                            ratio = "16:9",
                                            onPressItem,
                                            loop,
                                            autoPlayInterval = 3500,
                                            autoPlay,
                                            indicator = true,
                                            indicatorPosition = "flex-start",
                                          }: ComponentProps<typeof Carousel>) {
  const ref = useRef<FlatList>(null);

  const width = Dimensions.get("window").width;

  const usedRatio = ratio.split(":");

  const height = ((width / parseInt(usedRatio[0])) * parseInt(usedRatio[1]));
  const [currIndex, setCurrIndex] = useState(0);

  const indicatorSize = 8;

  const { colors } = appTheme();
  const renderIndicator = ({ item, index }) => {
    const isCurr = currIndex === index;
    return <Pressable
      onPress={() => {
        handleChangePosition(index);
      }}
      style={{
        height: indicatorSize,
        width: indicatorSize,
        borderRadius: indicatorSize / 2,
        marginHorizontal: 2,
        backgroundColor: isCurr ? colors.primary.main : colors.neutral.neutral_60,
      }}>
    </Pressable>;
  };

  const handleChangePosition = (index: number) => {
    const finalIndex = index > data.length - 1 ? (loop ? 0 : index - 1) : index;
    setCurrIndex(finalIndex);
    ref?.current?.scrollToIndex({
      index: finalIndex,
      animated: true,
    });
  };


  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        handleChangePosition(currIndex + 1);
      }, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [currIndex]);


  const onViewRef = React.useRef((info: { viewableItems: ViewToken[] }) => {
    if (info.viewableItems.length) {
      setCurrIndex(info.viewableItems[0]?.index);
    }
    // Use viewable items in state or as intended
  });
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 100 });


  const indRef = useRef<FlatList>(null);
  useEffect(() => {
    if (currIndex != null) {
      indRef?.current?.scrollToIndex({
        index: currIndex,
        animated: true,
      });
    }
  }, [currIndex]);

  return (
    <>
      <View style={{
        position: "relative",
      }}>
        <FlatList
          ref={ref}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          horizontal={true}
          data={data}
          viewabilityConfig={viewConfigRef.current}
          onViewableItemsChanged={onViewRef.current}
          style={{
            width,
            height: height,
          }}
          renderItem={({ item }) => {
            return <Pressable
              onPress={() => {
                if (onPressItem) {
                  onPressItem(item);
                }
              }}
              style={{ flex: 1 }}>
              <Image
                source={{ uri: item?.image_url }}
                style={{
                  height: height,
                  width,
                }} />
            </Pressable>;
          }} />


        {
          indicator &&
          <View
            style={
              [{
                position: "absolute",
                margin: 16,
              },
                indicatorPosition === "flex-start" && {
                  bottom: 0,
                  left: 0,
                },
                indicatorPosition === "flex-end" && {
                  bottom: 0,
                  right: 0,
                },
                indicatorPosition === "center" && {
                  bottom: 0,
                  left: 0,
                  right: 0,
                  justifyContent: "center", alignItems: "center",
                },
              ]}
          >
            <View style={{
              width: width/5
            }}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                ref={indRef}
                horizontal={true}
                data={data}
                renderItem={renderIndicator} />
            </View>
          </View>
        }

      </View>

    </>
  );
}
