import React, { useEffect, useState } from "react";
import { CategoriesModel } from "../../models/CategoriesModel";
import { Icon, Stack, appTheme } from "../../../tmd";
import Typography from "../../../tmd/components/Typography/Typography";
import { TransactionModel, TransactionType } from "../../models/TransactionModel";
import { formatCurrency } from "../../utils/formatter";
import moment from "moment";
import { Dimensions, TouchableOpacity } from "react-native";

type TransactionProps = {
  item: TransactionModel;
  categories: CategoriesModel[];
  onPress: (item: TransactionModel) => void;
}

const TransactionItem = ({
  item,
  categories,
  onPress
} : TransactionProps) => {
  const { colors } = appTheme();
  const category = () : CategoriesModel => {
    return categories.filter(value => value.id == item.category)[0]
  }

  return (
    <TouchableOpacity
      onPress={() => {onPress(item)}}>
      <Stack direction="row" p={8} items="center" spacing={16}
        style={{
          width: Dimensions.get("screen").width - 32,
          marginHorizontal: 16,
          marginVertical: 8,
          borderRadius: 8,
          borderColor: colors.primary.main,
          borderWidth: 1 }}
        >
          <Icon
            size={36}
            icon={category().icon}/>
          <Stack style={{ flex: 1 }} >
            <Typography style={{ fontWeight: "900" }} >{category().name}</Typography>
            <Typography color={colors.text.tertiary} type="label2" >{moment(item.date).format("ddd, DD-MM-yyyy hh.mm")}</Typography>
          </Stack>
          
          <Typography style={{ fontWeight: "900" }} type="body2"
            color={item.type == TransactionType.EXPENSES ? colors.danger.main : colors.text.brand} >{formatCurrency(item.amount)}</Typography>

      </Stack>
    </TouchableOpacity>
  );
}

export default TransactionItem;