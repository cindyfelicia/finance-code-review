import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import BottomSheetWrapper from "../../../tmd/components/BottomSheet/BottomSheetWrapper";
import { Button, Icon, IconButton, RHFTextField, Stack, TextField, appTheme } from "../../../tmd";
import Typography from "../../../tmd/components/Typography/Typography";
import { FlatList, View } from "react-native";
import { useLocale } from "../../providers/LocaleProvider";
import { TouchableOpacity } from "react-native";
import { BudgetModel } from "../../models/BudgetModel";
import Select from "../../../tmd/components/Select/Select";
import { _baseExpensesCategories, _baseIncomeCategories } from "../../data/_baseCategories";
import { CategoriesModel } from "../../models/CategoriesModel";
import { PickerItem } from "../../../tmd/model/PickerItem";

type BudgetBSProps = {
  isOpen: boolean;
  onClose: () => void;
  data?: BudgetModel;
}

const AddEditBudgetBS = ({isOpen, data, onClose, ...props} : BudgetBSProps) => {
  const [selected, setSelected] = useState<number[]>();
  const [selectedCategoryItem, setSelectedCategoryItem] = useState<PickerItem[]>()
  const [unusedCategories, setUnusedCategories] = useState<CategoriesModel[]>();
  const { t } = useLocale();
  const categories = [..._baseIncomeCategories, ..._baseExpensesCategories];
  const budgets : BudgetModel[] = [{
        id: 1,
        amount: 400000,
        categories_id: [1, 3, 4],
        name: "Foods"
    }, {
        id: 2,
        amount: 5000000,
        categories_id: [2, 5],
        name: "Clothes"
    }]

  const getUnusedCategories = () => {
    const usedCategoryIds = selected ? selected : budgets.flatMap(budget => budget.categories_id);
    const unusedCategories = categories.filter(category => !usedCategoryIds.includes(category.id));
    setUnusedCategories(unusedCategories)
  }

  const removeFromSelected = (item: PickerItem) => {
    console.log(item);
    
    const index = selected?.indexOf(item.id);
    let newSelected = [...selected]
    
    if (index == 0) {
      newSelected.shift();
    } else if (index && index > -1) {
      newSelected.splice(index, 1);
    }
    setSelected(newSelected);
  }

  const schema = yup.object({
    name: yup.string().required(),
    amount: yup.string().required(),
  })

  const method = useForm({
    defaultValues: {
      name: data?.name ?? "",
      amount: data?.amount ?? 0,
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    console.log(data, selected);
    if (data) {

    } else {

    }
    // onClose();
  }

  useEffect(() => {
    setSelected(data?.categories_id);
    getUnusedCategories();
    console.log("DATA", data);
  }, [data])

  useEffect(() => {
    getUnusedCategories();
    const selectedCategory = categories.filter(category => selected?.includes(category.id));
    setSelectedCategoryItem(selectedCategory.flatMap(item => {return {id: item.id, name: item.name}}))
  }, [selected])

  return (
    <>
      <BottomSheetWrapper
        open={isOpen} dismissible={false}
        onClose={() => {}}
      >
        <View style={{ height: 430 }}>
        <Stack style={{padding: 16, flex: 1}} spacing={20}>
          <Stack direction="row">
            <Typography style={{ flex: 1 }} type="h3">{data ? t("budget.edit_budget") : t("budget.add_budget")}</Typography>
            <IconButton icon="close" variant="alternate" onPress={() => {onClose()}} />
          </Stack>

          <FormProvider {...method}>
          <Stack style={{ flex: 1 }} spacing={16}>
            <RHFTextField
              mode="contained"
              name="name"
              placeholder={t("budget.name")}
            />

            <RHFTextField
              mode="contained"
              name="amount"
              prefixText="Rp"
              placeholder={t("budget.amount")}
            />

            <Select
              mode="contained"
              pickerType="select"
              shape="rect"
              onSelectedValueChange={(value)=> {setSelected([...selected, value])}}
              options={unusedCategories?.flatMap(item => { return {id: item.id, name: item.name}})}
              placeholder={t("transaction.account")}
            />

            <FlatList
              keyExtractor={(item) => item.id.toString()}
              data={selectedCategoryItem}
              renderItem={({item}) => {return <>
                <TouchableOpacity onPress={() => removeFromSelected(item)}>
                <Stack direction="row" items="center" ml={8}>
                  <Typography style={{ flex: 1 }} type="body3">{item.name}</Typography>
                  <IconButton variant="alternate" icon="close" size={18}/>
                </Stack>
                </TouchableOpacity>
              </>}}
              />
          
          </Stack>
          </FormProvider>

          <Button buttonStyle={{ width: "100%", bottom: 0 }} onPress={onSubmit} >{t("save")}</Button>
        </Stack>

        </View>
      </BottomSheetWrapper>
    </>
  );
}

export default AddEditBudgetBS;