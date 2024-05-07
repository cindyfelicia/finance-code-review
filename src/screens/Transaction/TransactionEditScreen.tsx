import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AppNavigationType from "../../navigations/AppNavigationType";
import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { Button, Chip, Page, RHFDatePicker, RHFTextField, Stack, Toolbar } from "../../../tmd";
import { useLocale } from "../../providers/LocaleProvider";
import { Dimensions, ScrollView } from "react-native";
import { TransactionAccount, TransactionType } from "../../models/TransactionModel";
import { _transactionAccount, _transactionType } from "../../data/_baseTransaction";
import { capitalize } from "lodash";
import Select from "../../../tmd/components/Select/Select";
import { _baseExpensesCategories, _baseIncomeCategories } from "../../data/_baseCategories";
import { CategoriesModel } from "../../models/CategoriesModel";

const TransactionEditScreen = ({route, ...props} : NativeStackScreenProps<AppNavigationType, "TransactionEditScreen">) => {
  const [selectedTransType, setTransType] = useState<TransactionType>(TransactionType.EXPENSES);
  const [selectedTransAccount, setTransAcc] = useState<TransactionAccount>();
  const [selectedCategory, setCategory] = useState<number>();
  const { t } = useLocale();
  const { id } = route.params;

  const categories = [..._baseExpensesCategories, ..._baseIncomeCategories];

  const schema = yup.object({
    date: yup.string().required(),
    amount: yup.string().required(),
  })

  const method = useForm({
    defaultValues: {
      date: "Sun May 05 2024 13:31:19 GMT+0800",
      amount: 0,
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => { console.log(data, selectedCategory, selectedTransAccount, selectedTransType);
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
          <Select
            mode="contained"
            shape="rect"
            onSelectedValueChange={(value)=> {
              let category = categories.filter((value1) => value1.id == value)[0]
              console.log(value, category);
              
              setCategory(value)}}
            options={categories.filter(value => value.type == selectedTransType)}
            placeholder={t("transaction.category")}
          />
          <Select
            mode="contained"
            shape="rect"
            onSelectedValueChange={(value)=> {setTransAcc(TransactionAccount[value.toUpperCase()])}}
            options={_transactionAccount}
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
          buttonStyle={{ width: Dimensions.get("screen").width - 40}} shape="rect"
          onPress={method.handleSubmit(onSubmit, async (e) => {
            console.log(e);
          })}
        >{t("save")}</Button>
      </Stack>
    </Page>
  )
}

export default TransactionEditScreen;