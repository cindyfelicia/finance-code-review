import React, { useState } from "react";
import { IconButton, Page, Stack, Toolbar, appTheme } from "../../../tmd";
import Typography from "../../../tmd/components/Typography/Typography";
import { useLocale } from "../../providers/LocaleProvider";
import { FlatList } from "react-native";
import { BudgetModel } from "../../models/BudgetModel";
import BudgetItem from "../components/BudgetItem";
import { _baseExpensesCategories, _baseIncomeCategories } from "../../data/_baseCategories";
import AddEditBudgetBS from "./AddEditBudgetBs";

const BudgetScreen = () => {
    const [showAddBs, setShowAddBs] = useState(false);
    const [selectedBudget, setSelectedBudget] = useState<BudgetModel|null>();
    const { colors } = appTheme();
    const { t } = useLocale();

    const categories = [..._baseExpensesCategories, ..._baseIncomeCategories]
    const budget: BudgetModel[] = [{
        id: 1,
        amount: 1000000,
        categories_id: [1, 3, 4],
        name: "Foods"
    }, {
        id: 2,
        amount: 500000,
        categories_id: [2, 5],
        name: "Clothes"
    }]

    return (
        <>
        <Page>
            <Toolbar
                backable={false}
                title={t("common.budget")}
                actionButton={ 
                    <IconButton
                        variant="tertiary"
                        style={{ paddingHorizontal: 8}}
                        color={colors.primary.main} icon="add"
                        onPress={() => setShowAddBs(true)}
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
                        onPressEdit={() => {
                            setShowAddBs(true);
                            setSelectedBudget(item)
                        }}
                    />
                }}/>
        </Page>
        <AddEditBudgetBS
            isOpen={showAddBs}
            data={selectedBudget}
            onClose={() => {
                setShowAddBs(false)
                setSelectedBudget(null);
            }}
        />
        </>
    );
}

export default BudgetScreen;