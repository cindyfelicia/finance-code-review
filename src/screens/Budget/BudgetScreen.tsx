import React from "react";
import { IconButton, Page, Stack, Toolbar, appTheme } from "../../../tmd";
import Typography from "../../../tmd/components/Typography/Typography";
import { useLocale } from "../../providers/LocaleProvider";
import { FlatList } from "react-native";
import { BudgetModel } from "../../models/BudgetModel";
import BudgetItem from "../components/BudgetItem";
import { _baseExpensesCategories, _baseIncomeCategories } from "../../data/_baseCategories";

const BudgetScreen = () => {
    const { colors } = appTheme();
    const { t } = useLocale();

    const categories = [..._baseExpensesCategories, ..._baseIncomeCategories]
    const budget: BudgetModel[] = [{
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

    return (
        <Page>
            <Toolbar
                backable={false}
                title={t("common.budget")}
                actionButton={ 
                    <IconButton
                        variant="tertiary"
                        style={{ paddingHorizontal: 8}}
                        color={colors.primary.main} icon="add"
                        onPress={() => console.log("add")}
                        />
                }
            />
            <FlatList
                data={budget}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => {
                    return <BudgetItem
                        item={item} categories={categories}
                        onPressDelete={() => {}}
                        onPressEdit={() => {}}
                    />
                }}/>
        </Page>
    );
}

export default BudgetScreen;