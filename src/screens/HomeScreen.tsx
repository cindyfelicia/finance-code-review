import React, { useState } from "react";
import { Chip, Divider, Icon, Page, Stack, appTheme } from "../../tmd";
import Typography from "../../tmd/components/Typography/Typography";
import { ScrollView } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import { PickerItem } from "../../tmd/model/PickerItem";
import { FlatList, StyleSheet, View } from "react-native";
import { useLocale } from "../providers/LocaleProvider";
import { _months } from "../data/_months";
import BudgetAnalysisItem from "./components/BudgetAnalysisItem";
import { BudgetAnalysisModel } from "../models/BudgetModel";
import { TransactionAccount, TransactionModel, TransactionType } from "../models/TransactionModel";
import { _baseExpensesCategories, _baseIncomeCategories } from "../data/_baseCategories";
import TransactionItem from "./components/TransactionItem";
import { navigate } from "../navigations/RootNavigation";

const HomeScreen = () => {
    const [selectedMonth, setSelectedMonth] = useState(1);
    const {colors} = appTheme();
    const { t } = useLocale();

    const categories = [..._baseExpensesCategories, ..._baseIncomeCategories];
    const pickerItems = _months;
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
        date: Date(),
        type: TransactionType.INCOME
    }]
    const budget: BudgetAnalysisModel[] = [{
        id: 1,
        name: "Food",
        icon: "fast-food",
        percentage: 18
    }, {
        id: 2,
        name: "Food",
        icon: "fast-food",
        percentage: 18
    }]
    
    const onTransactionEdit = (item: TransactionModel) => {
        console.log("EDIT", item);
        navigate("TransactionEditScreen", {id: item.id})
    }

    return (
        <Page>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Stack style={{ flex: 1 }}>
                    <LinearGradient style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }} colors={["#49C6CD", "#B6EFF3"]}>
                        <Stack style={{ flex: 1 }} >
                            <Icon
                                style={{ position: 'absolute', right: 20, top: 20 }}
                                icon="person"
                                color="white"
                                />
                            <Chip
                                style={{ ...styles.header, marginTop: 16 }}
                                pickerList={pickerItems}
                                type="picker"
                                text={pickerItems.find((value) => value.id == selectedMonth)?.name}
                                pickerTitle="Select Month" selected
                                variant="outlined" colorVariant="primary"
                                onPickerChanges={(item) => { setSelectedMonth(item?.id) }}
                            />
                            <Typography
                                style={{ ...styles.header, marginTop: 20 }}
                                type="label2"
                                color={colors.text.secondary}>{t("home.current_balance")}</Typography>
                            <Stack self="center" direction="row">
                                <Typography type="label1" color={colors.neutral.neutral_10}>{t("currency")}</Typography>
                                <Typography
                                    style={styles.total_balance}
                                    color={colors.neutral.neutral_10}
                                    >300.300</Typography>
                            </Stack>

                            <Stack style={{ margin: 20, borderColor: colors.neutral.neutral_10, borderWidth: 1, borderRadius: 20 }} p={16} spacing={16} self="center" direction="row">
                                <Stack style={{ flex: 1 }} self="center">
                                    <Typography
                                        style={styles.header}
                                        type="label1"
                                        color={colors.text.secondary}
                                        >{t("home.incomes")}</Typography>
                                    <Stack self="center" direction="row">
                                        <Typography type="label1" color={colors.neutral.neutral_10}>{t("currency")}</Typography>
                                        <Typography
                                            style={styles.total_in_expense}
                                            color={colors.neutral.neutral_10}
                                            >300.300</Typography>
                                    </Stack>
                                </Stack>
                                <View style={{ width: 1, backgroundColor: colors.neutral.neutral_10 }} />
                                <Stack style={{ flex: 1 }} self="center">
                                    <Typography
                                        style={styles.header}
                                        type="label1"
                                        color={colors.text.secondary}
                                        >{t("home.expenses")}</Typography>
                                    <Stack self="center" direction="row">
                                        <Typography type="label1" color={colors.neutral.neutral_10}>{t("currency")}</Typography>
                                        <Typography
                                            style={styles.total_in_expense}
                                            color={colors.neutral.neutral_10}
                                            >300.300</Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>
                    </LinearGradient>

                    <Stack style={{ flex: 1 }}>
                        <Stack mt={20} mx={16} direction="row" content="space-between">
                            <Typography style={styles.title} type="title3">{t("home.budget_analysis")}</Typography>
                            <Icon
                                icon="chevron-forward"
                                />
                        </Stack>
                        <FlatList
                            horizontal
                            data={budget}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({item}) => {
                                return <BudgetAnalysisItem item={item}
                                />
                            }}/>

                        <Stack mt={20} mx={16} direction="row" content="space-between">
                            <Typography style={styles.title} type="title3">{t("home.transactions_history")}</Typography>
                            <Icon
                                icon="chevron-forward"
                                />
                        </Stack>
                        <FlatList
                            data={transaction}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({item}) => {
                                return <TransactionItem
                                    item={item} categories={categories}
                                    onPress={(item) => {onTransactionEdit(item)}} />
                            }}/>
                    </Stack>
                </Stack>
            </ScrollView>
        </Page>
    );
}

const styles = StyleSheet.create({
    header: {
        marginStart: 16,
        marginEnd: 16,
        alignSelf: "center" 
    },
    total_balance: {
        alignItems: 'flex-start',
        alignSelf: 'center',
        includeFontPadding: false,
        fontSize: 48,
        fontWeight: '900'
    },
    total_in_expense: {
        alignItems: 'flex-start',
        alignSelf: 'center',
        includeFontPadding: false,
        fontSize: 28,
        fontWeight: '900'
    },
    title: {
        alignItems: 'flex-start',
        fontWeight: '900'
    }
})

export default HomeScreen;