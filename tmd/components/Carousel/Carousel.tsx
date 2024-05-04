import React, { useEffect, useRef, useState } from "react";
import { Image, Stack, appTheme } from "../../index";
import { ImageRatioType } from "../../types/types";
import { Dimensions, FlatList, Pressable, View, ViewToken } from "react-native";

export interface CarouselItem {
  id: number,
  image_url: string
}

export type CarouselVariant = "default" | "full";

interface Props {
  data: CarouselItem[];
  ratio?: ImageRatioType;
  onPressItem?: (item: CarouselItem) => void;
  loop?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  indicatorPosition?: "flex-start" | "flex-end" | "center";
  indicator?: boolean;
}

export default function Carousel({
                                   data,
                                   ratio = "16:9",
                                   onPressItem,
                                   loop,
                                   autoPlayInterval = 3500,
                                   autoPlay,
                                   indicatorPosition = "flex-start",
                                   indicator = true,
                                 }: Props) {
  const ref = useRef<FlatList>(null);

  const width = Dimensions.get("window").width;

  const usedRatio = ratio.split(":");

  const [currIndex, setCurrIndex] = useState(0);

  const indicatorSize = 8;

  const { colors } = appTheme();

//you need to preview n items.
  const previewCount = 1;
//to center items
//the screen will show `previewCount` + 1/4 firstItemWidth + 1/4 lastItemWidth
//so for example if previewCount = 3
//itemWidth will be =>>> itemWidth = screenWidth / (3 + 1/4 + 1/4)
  const itemWidth = width / (previewCount + .2);
//to center items you start from 3/4 firstItemWidth
  const startScroll = (itemWidth * 0);

  const height = (((itemWidth) / parseInt(usedRatio[0])) * parseInt(usedRatio[1]));

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

  React.useEffect(() => {
    if (ref.current) ref.current.scrollToOffset({
      offset: startScroll, animated: false,
    });
  }, [ref]);

  const snapToOffsets = data.map((x, i) => {
    return ((i * (itemWidth) * previewCount) + startScroll);
  });

  return (
    <>
      <Stack style={{}}>
        <View style={{
          position: "relative",
        }}>
          <FlatList
            ref={ref}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            horizontal={true}
            data={data}
            decelerationRate={0}
            snapToOffsets={snapToOffsets}
            snapToAlignment={"center"}
            viewabilityConfig={viewConfigRef.current}
            onViewableItemsChanged={onViewRef.current}
            style={{
              width,
              height: height,
            }}
            renderItem={({ item }) => {
              const isLast = item.id === data[data.length - 1].id;
              return <Pressable
                onPress={() => {
                  if (onPressItem) {
                    onPressItem(item);
                  }
                }}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 16,
                  marginRight: isLast ? 16 : 0,
                }}>
                <Image
                  source={{ uri: item?.image_url }}
                  style={{
                    width: itemWidth - 16, //20 is margin left and right
                    height: height - 16,
                    borderRadius: 12,
                  }} />
              </Pressable>;
            }} />


          {
            indicator &&
            <View
              style={{
                marginHorizontal: 16,
                width: width / 5,
                alignSelf: indicatorPosition,
              }}
            >
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={data}
                renderItem={renderIndicator} />
            </View>
          }

        </View>
      </Stack>
    </>
  );
}
