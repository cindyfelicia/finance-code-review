import React, { useEffect, useState } from "react";
import { CategoriesModel } from "../../models/CategoriesModel";
import { Icon, IconButton, Stack, appTheme } from "../../../tmd";
import Typography from "../../../tmd/components/Typography/Typography";
import { Dimensions } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { TouchableOpacity } from "react-native";

type CategoryProps = {
  item: CategoriesModel;
  isEditing: Boolean;
  selected: CategoriesModel[];
  onSelected: (item: CategoriesModel) => void;
  onEdit: (item: CategoriesModel) => void;
}

const CategoryItem = ({
  item,
  isEditing,
  selected,
  onSelected,
  onEdit,
} : CategoryProps) => {
  const { colors } = appTheme();

  return (
    <TouchableOpacity
      disabled={!isEditing}
      onPress={() => {if (isEditing) {onSelected(item)}}}>
      <Stack direction="row" p={8} items="center" spacing={16}
        style={[{
          width: Dimensions.get("screen").width - 32,
          marginHorizontal: 16,
          marginVertical: 8,
          borderRadius: 8,
          borderColor: colors.primary.main,
          borderWidth: 1 },
          isEditing && selected?.indexOf(item) == -1 && { borderStyle: "dashed" },
          isEditing && selected?.indexOf(item) != -1 ? { backgroundColor: colors.neutral.neutral_20 } : { backgroundColor: colors.primary.surface }
        ]}>

          <Icon
            size={36}
            icon={item.icon}/>
          <Typography style={{ flex: 1 }} >{item.name}</Typography>
          { !isEditing ?
            <IconButton
              style={{ alignContent: "flex-end", padding: 8 }}
              variant="tertiary" size={20} color={colors.neutral.neutral_40}
              icon="pencil"
              onPress={() => onEdit(item)}/>
          : <></>}
      </Stack>
    </TouchableOpacity>
  );
}

export default CategoryItem;