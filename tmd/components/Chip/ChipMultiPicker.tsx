import React, { ComponentProps, useEffect, useMemo, useState } from "react";
import Chip, { ChipShape, ChipVariant } from "./Chip";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { IconProps } from "../Icon";
import { ColorVariantType } from "../../types/types";
import MultiPickerBottomSheet from "../BottomSheet/MultiPickerBottomSheet";
import { PickerItem } from "../../model/PickerItem";

interface Props {
  shape?: ChipShape;
  variant?: ChipVariant;
  text?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: IconProps;
  suffixIcon?: IconProps;
  selected?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  colorVariant?: ColorVariantType;
  onPickerChanges?: (item?: PickerItem[] | undefined) => void;
  initialPickerValue?: string[] | number[];
}

export default function ChipMultiPicker({
                                          value,
                                          data,
                                          onReset,
                                          title,
                                          search,
                                          onPickerChanges,
                                          initialPickerValue,
                                          ...rest
                                        }: Props & Omit<ComponentProps<typeof MultiPickerBottomSheet>, "open" | "onClose" | "onSave">) {
  const [isOpenBS, setIsOpenBS] = useState(false);
  const [selectedObjs, setSelectedObjs] = useState<PickerItem[] | undefined>([]);
  const handleCloseBS = () => {
    setIsOpenBS(false);
  };

  useEffect(() => {
    if (initialPickerValue) {
      const selected = data?.filter((item) => initialPickerValue.includes(item.id));
      setSelectedObjs(selected);
    }
  }, [initialPickerValue]);


  const handleOpenBS = () => {
    setIsOpenBS(true);
  };

  useEffect(() => {
    if (onPickerChanges) {
      onPickerChanges(selectedObjs);
    }
  }, [selectedObjs]);

  const displayedName = useMemo(() => {
    if (selectedObjs?.length) {
      if (selectedObjs?.length > 0) {
        let name = "";
        if (selectedObjs?.length > 1) {
          name = selectedObjs[0].name;
          const leftCount = selectedObjs?.length - 1;
          return `${name}${leftCount > 0 ? `, +${leftCount} more` : ""}`;
        }
        return selectedObjs[0].name;
      }
    }
  }, [selectedObjs]);

  return (
    <>
      <Chip
        {...rest}
        text={displayedName ? displayedName : rest.text}
        suffixIcon={{
          icon: "chevron-down",
        }}
        onPress={() => {
          handleOpenBS();
        }}
      />

      <MultiPickerBottomSheet
        value={selectedObjs?.map((item) => item.id) ?? []}
        onClose={handleCloseBS}
        open={isOpenBS}
        onSave={(data) => {
          setSelectedObjs(data ?? []);
        }}
        data={data}
        onReset={onReset}
        search={search}
        title={title}
      />
    </>
  );
}

