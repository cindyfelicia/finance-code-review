import React from "react";
import { BudgetAnalysisModel } from "../../models/BudgetModel";
import { Icon, Stack, appTheme, shadow } from "../../../tmd";
import Typography from "../../../tmd/components/Typography/Typography";
import { StyleSheet } from "react-native";

type BudgetAnalysisProps = {
  item: BudgetAnalysisModel;
}

const BudgetAnalysisItem = ({item, ...props} : BudgetAnalysisProps) => {
  const { colors } = appTheme();

  return (
    <Stack p={8} m={8} spacing={4} items="center">
      <Stack style={styles.shadow} >
        <Icon style={styles.icon} icon={item.icon} size={36} color={colors.backdrop} />
      </Stack>
      <Typography type="title2" style={{ fontWeight: "900" }}>{item.name}</Typography>
      <Typography type="label2" color={colors.text.muted}>{item.percentage}%</Typography>
    </Stack>
  );
}

const styles = StyleSheet.create({
  icon: {
    padding: 10
  },
  shadow: {
    shadowColor: '#A0A0A0',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 5,
    elevation: 4
  }
})

export default BudgetAnalysisItem;