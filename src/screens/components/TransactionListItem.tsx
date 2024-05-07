import React, { useEffect, useState } from "react";
import { CategoriesModel } from "../../models/CategoriesModel";
import { Divider, Icon, Stack, appTheme } from "../../../tmd";
import Typography from "../../../tmd/components/Typography/Typography";
import { TransactionModel, TransactionType } from "../../models/TransactionModel";
import { formatCurrency } from "../../utils/formatter";
import moment from "moment";
import { Dimensions, TouchableOpacity } from "react-native";

type TransactionListProps = {
  item: TransactionModel;
  categories: CategoriesModel[];
  withHeaders: boolean;
  onPress: (item: TransactionModel) => void;
}

const TransactionListItem = ({
  item,
  categories,
  withHeaders,
  onPress
} : TransactionListProps) => {
  const { colors } = appTheme();
  const category = () : CategoriesModel => {
    console.log(item.date, withHeaders);
    return categories.filter(value => value.id == item.category)[0]
  }

  return (
    <TouchableOpacity
      onPress={() => {onPress(item)}}>
      <Stack>
        { withHeaders ?
          <Typography style={{ margin: 8 }} color={colors.text.tertiary} >{moment(item.date).format("dddd, DD MMM YYYY")}</Typography>
          : <></>
        }

        <Stack direction="row" p={8} items="center" spacing={16}
          style={{
            width: Dimensions.get("screen").width - 32,
            marginHorizontal: 16,
            marginVertical: 8
          }} >
            <Stack style={{ flex: 1 }} >
              <Typography style={{ fontWeight: "900" }} >{category().name}</Typography>
              <Typography color={colors.text.tertiary} type="label2" >{moment(item.date).format("hh.mm")}</Typography>
            </Stack>
            
            <Typography style={{ fontWeight: "900" }} type="body2"
              color={item.type == TransactionType.EXPENSES ? colors.danger.main : colors.text.brand} >{formatCurrency(item.amount)}</Typography>

        </Stack>
        <Divider style={{ marginHorizontal: 16 }} color={colors.neutral.neutral_20} size="xs" />
      </Stack>
    </TouchableOpacity>
  );
}

export default TransactionListItem;