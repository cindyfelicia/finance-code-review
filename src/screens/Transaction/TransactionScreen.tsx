import React from "react";
import { IconButton, Page, Stack, Toolbar, appTheme } from "../../../tmd";
import Typography from "../../../tmd/components/Typography/Typography";
import { useLocale } from "../../providers/LocaleProvider";
import { FlatList } from "react-native";
import { TransactionAccount, TransactionModel, TransactionType } from "../../models/TransactionModel";
import TransactionListItem from "../components/TransactionListItem";
import { _baseExpensesCategories, _baseIncomeCategories } from "../../data/_baseCategories";
import { navigate } from "../../navigations/RootNavigation";

const TransactionScreen = () => {
    const { colors } = appTheme();
    const { t } = useLocale();
    
    const categories = [..._baseExpensesCategories, ..._baseIncomeCategories];
    const transaction: TransactionModel[] = [{
        id: 1,
        account: TransactionAccount.CARD,
        amount: 100000,
        category: 2,
        date: Date(),
        type: TransactionType.EXPENSES
    }, {
        id: 2,
        account: TransactionAccount.CARD,
        amount: 100000,
        category: 2,
        date: "Sun May 05 2024 13:31:19 GMT+0800",
        type: TransactionType.INCOME
    }, {
        id: 3,
        account: TransactionAccount.CARD,
        amount: 100000,
        category: 2,
        date: "Mon May 06 2024 13:31:19 GMT+0800",
        type: TransactionType.EXPENSES
    }, {
        id: 4,
        account: TransactionAccount.CARD,
        amount: 100000,
        category: 2,
        date: "Mon May 06 2024 13:31:19 GMT+0800",
        type: TransactionType.INCOME
    }]

    const onTransactionEdit = (item: TransactionModel) => {
        console.log("EDIT", item);
        navigate("TransactionEditScreen", {id: item.id})
    }

    const isHeader = (item: TransactionModel) => {
        let index = transaction.indexOf(item)
        console.log(index);
        if (index == 0) { return true }
        else {
            return transaction[index-1].date != item.date
        }
    }

    return (
        <>
        <Page>
            <Toolbar
                backable={false}
                title={t("common.transaction")}
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
                data={transaction.sort((a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    return dateA.getTime() - dateB.getTime();
                  })}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => {
                    return <TransactionListItem
                        item={item} categories={categories} withHeaders={isHeader(item)}
                        onPress={(item) => onTransactionEdit(item)}
                    />
                }}/>
        </Page>
        </>
    );
}

export default TransactionScreen;