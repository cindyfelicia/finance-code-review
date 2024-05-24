import React, { useEffect, useState } from "react";
import BottomSheetWrapper from "../../../tmd/components/BottomSheet/BottomSheetWrapper";
import { Button, Icon, IconButton, Stack, TextField, appTheme } from "../../../tmd";
import IconPicker from "react-native-icon-picker";
import Typography from "../../../tmd/components/Typography/Typography";
import { CategoriesModel } from "../../models/CategoriesModel";
import { View } from "react-native";
import { useLocale } from "../../providers/LocaleProvider";
import { TouchableOpacity } from "react-native";

type CategoryBSProps = {
  isOpen: boolean;
  onClose: () => void;
  data?: CategoriesModel;
}

const AddEditCategoryBS = ({isOpen, data, onClose, ...props} : CategoryBSProps) => {
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [selected, setSelected] = useState();
  const [name, setName] = useState("");
  const { t } = useLocale();
  const { colors } = appTheme();

  const saveData = async () => {
    if (data) {

    } else {

    }
    onClose();
  }

  useEffect(() => {
    setSelected(data?.icon);
  }, [data])

  return (
    <>
      <BottomSheetWrapper
        open={isOpen} dismissible={false}
        onClose={() => {}}
      >
        <View style={{ height: 230 }}>
        <Stack style={{padding: 16, flex: 1}} spacing={20}>
          <Stack direction="row">
            <Typography style={{ flex: 1 }} type="h3">{data ? t("category.edit_category") : t("category.add_category")}</Typography>
            <IconButton icon="close" variant="alternate" onPress={() => {onClose()}} />
          </Stack>
          <Stack items="center" direction="row" spacing={16}>
            <TouchableOpacity onPress={() => setShowIconPicker(true)}>
              <Stack style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: colors.neutral.neutral_30 }} content="center" items="center">
                <Icon icon={selected ?? "add"} size={40}/>
              </Stack>
            </TouchableOpacity>
            <TextField
              style={{ flex: 1 }}
              mode="contained"
              defaultValue={data?.name}
              onChangeText={text => setName(text)}
              placeholder="Category Name"
            />
          </Stack>

          <Button buttonStyle={{ width: "100%" }} onPress={saveData} >{t("save")}</Button>
        </Stack>

        </View>
      </BottomSheetWrapper>
      <IconPicker
          showIconPicker={showIconPicker}
          toggleIconPicker={() => setShowIconPicker(!showIconPicker)}
          iconDetails={[
              { family: "Ionicons", icons: ["wallet"] },
            ]}
          content={<></>}
          onSelect={(icon) => {
            setSelected(icon.icon);
            setShowIconPicker(!showIconPicker);
          }}
      />
    </>
  );
}

export default AddEditCategoryBS;