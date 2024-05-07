import React, { useEffect, useState } from "react";
import { BudgetModel } from "../../models/BudgetModel";
import { CategoriesModel } from "../../models/CategoriesModel";
import { Button, Divider, Stack, appTheme } from "../../../tmd";
import { StyleSheet } from "react-native";
import Typography from "../../../tmd/components/Typography/Typography";
import { formatCurrency } from "../../utils/formatter";
import { useLocale } from "../../providers/LocaleProvider";

type BudgetProps = {
  item: BudgetModel;
  categories: CategoriesModel[];
  onPressDelete: (item: BudgetModel) => void;
  onPressEdit: (item: BudgetModel) => void;
}

const BudgetItem = ({
  item,
  categories,
  onPressDelete,
  onPressEdit
}: BudgetProps) => {
  const { colors } = appTheme();
  const { t } = useLocale();
  const [selectedCategories, setSelected] = useState("");

  useEffect(() => {
    const category = categories.filter(value => item.categories_id.includes(value.id));
    setSelected(category.map(value => value.name).join(", "));
    console.log(category, selectedCategories);
  }, [])

  return (
    <Stack style={styles.shadow} spacing={8} m={8}>
      <Stack direction="row" content="space-between">
        <Typography type="title1" color={colors.text.placeholder} style={{ fontWeight: "900" }}>{item.name}</Typography>
        <Typography type="title1"  style={{ fontWeight: "900" }}>{formatCurrency(item.amount)}</Typography>
      </Stack>
      <Divider />
      <Typography type="label2" color={colors.text.placeholder}>{selectedCategories}</Typography>
      <Stack spacing={10} direction="row" content="flex-end">
        
        <Button
          shape="rect" size="xs"
          variant="secondary" colorVariant="danger"
          onPress={() => {onPressDelete(item)}}
          >{t("delete")}</Button>
        <Button
          shape="rect" size="xs"
          variant="secondary" colorVariant="primary"
          onPress={() => {onPressEdit(item)}}
          >{t("edit")}</Button>

      </Stack>
    </Stack>
  );
}

const styles = StyleSheet.create({
  shadow: {
    padding: 16,
    shadowColor: '#A0A0A0',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    elevation: 4
  }
});

export default BudgetItem;