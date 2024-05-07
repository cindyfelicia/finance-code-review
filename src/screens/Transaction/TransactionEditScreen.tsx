import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AppNavigationType from "../../navigations/AppNavigationType";
import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { Button, Chip, Page, RHFDatePicker, RHFTextField, Stack, Toolbar } from "../../../tmd";
import { useLocale } from "../../providers/LocaleProvider";
import { Dimensions, ScrollView } from "react-native";
import { TransactionType } from "../../models/TransactionModel";
import { _transactionAccount, _transactionType } from "../../data/_baseTransaction";
import { capitalize } from "lodash";

const TransactionEditScreen = ({route, ...props} : NativeStackScreenProps<AppNavigationType, "TransactionEditScreen">) => {
  const [selectedTransType, setTransType] = useState<string>(TransactionType.EXPENSES);
  const { t } = useLocale();
  const { id } = route.params;

  const schema = yup.object({
    // type: yup.string().required(),
    date: yup.string().required(),
    amount: yup.string().required(),
    category: yup.string().required(),
    account: yup.string().required(),
    notes: yup.string()
  })

  const method = useForm({
    defaultValues: {
      // type: selectedTransType,
      // date: Date(),
      date: "Sun May 05 2024 13:31:19 GMT+0800",
      amount: 0,
      category: null,
      account: null,
      notes: null
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => { console.log(data, selectedTransType);
  }

  return (
    <Page>
      <Toolbar title={t("transaction.detail_toolbar_title")} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <FormProvider {...method}>
        <Stack style={{ flex: 1 }} spacing={20} >
          <Stack direction="row" mt={20} mx={10} >
            { _transactionType.map((item) => { return <>
              <Chip
                style={{ flex: 1, marginHorizontal: 10 }}
                variant="outlined" shape="rect"
                selected={selectedTransType == item.id}
                onPress={() => setTransType(TransactionType[item.name.toUpperCase()])}
                text={capitalize(item.name)}
              />
            </> })}
          </Stack>

          <Stack spacing={20} px={20}>
          <RHFDatePicker
            mode="contained"
            name="date"
            placeholder={t("transaction.date")}
          />
          <RHFTextField
            mode="contained"
            name="amount"
            prefixText="Rp"
            placeholder={t("transaction.amount")}
          />
          <RHFTextField
            mode="contained"
            name="category"
            placeholder={t("transaction.category")}
          />
          <RHFTextField
            mode="contained"
            name="account"
            placeholder={t("transaction.account")}
          />
          <RHFTextField
            mode="contained"
            name="notes"
            placeholder={t("transaction.notes")}
          />
        </Stack>
        </Stack>
        </FormProvider>
      </ScrollView>
      <Stack p={20}>
        <Button
          buttonStyle={{ width: Dimensions.get("screen").width - 40}}
          onPress={method.handleSubmit(onSubmit, async (e) => {
            console.log(e);
          })}
        >{t("save")}</Button>
      </Stack>
    </Page>
  )
}

export default TransactionEditScreen;