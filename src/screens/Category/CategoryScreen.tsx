import React, { useEffect, useState } from "react";
import { Button, Icon, IconButton, Page, Stack, Toolbar, appTheme } from "../../../tmd";
import Typography from "../../../tmd/components/Typography/Typography";
import IconPicker from "react-native-icon-picker";
import { useLocale } from "../../providers/LocaleProvider";
import { Dimensions, FlatList, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { _baseExpensesCategories, _baseIncomeCategories } from "../../data/_baseCategories";
import CategoryItem from "../components/CategoryItem";
import { CategoriesModel } from "../../models/CategoriesModel";
import { defaultThemeColors } from "../../../tmd/styles/defaultThemeColors";

const CategoryScreen = () => {
    const [showIconPicker, setShowIconPicker] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selected, setSelected] = useState<CategoriesModel[]>([]);
    const { colors } = appTheme();
    const { t } = useLocale();
    const categories = [..._baseExpensesCategories, ..._baseIncomeCategories];

    const onEdit = (item: CategoriesModel) => {
        console.log("EDIT", item);
    }

    const onRemoveSelectedItem = () => {
        console.log("REMOVE", selected);
        setIsEditing(false);
    }

    const onItemSelected = (item: CategoriesModel) => {
        if (isEditing) {
        let index = selected?.indexOf(item);
        if (index >= 0) {
            let update = selected?.filter(value => value != item);
            setSelected(update);
        } else {
            setSelected([item, ...selected]);
        }
        }
    }

    return (
        <>
        <Page>
            <Toolbar
                backable={false}
                title={t("common.category")}
                actionButton={ isEditing ?
                    <IconButton
                        variant="tertiary"
                        style={styles.actionButton}
                        color={colors.error} icon="close"
                        onPress={() => {setIsEditing(false)}}
                    />
                    :
                    <Stack direction="row" >
                        <IconButton
                            variant="tertiary"
                            style={styles.actionButton}
                            color={ isEditing ? colors.error : colors.placeholder } icon="trash-outline"
                            onPress={() => {setIsEditing(isEditing => !isEditing)}}
                            />
                        <IconButton
                            variant="tertiary"
                            style={styles.actionButton}
                            color={colors.primary.main} icon="add"
                            onPress={() => console.log("add")}
                            />
                    </Stack>
                }
                />
            <FlatList
                data={categories}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => {
                    return <CategoryItem
                        isEditing={isEditing} item={item}
                        selected={selected}
                        onSelected={onItemSelected}
                        onEdit={onEdit}
                    />
                }}/>
            { isEditing ?
                <Stack p={20} style={styles.shadow}>
                    <Button
                        disabled={selected.length < 1}
                        buttonStyle={{ width: Dimensions.get("screen").width - 40}}
                        onPress={() => onRemoveSelectedItem() }
                    >{t("remove")}</Button>
                </Stack>
            : <></>   
            }
        </Page>
        <IconPicker
            showIconPicker={showIconPicker}
            toggleIconPicker={() => setShowIconPicker(!showIconPicker)}
            iconDetails={[
                { family: "AntDesign", color: "blue", icons: ["wallet"] },
                { family: "Entypo", icons: ["wallet"] },
                { family: "FontAwesome", icons: ["google-wallet"] },
                { family: "FontAwesome5", icons: ["wallet"] },
                { family: "Fontisto", icons: ["wallet"] },
                {
                    family: "MaterialCommunityIcons",
                    icons: ["wallet-membership"]
                },
                { family: "MaterialIcons", icons: ["wallet-travel"] }
                ]
            }
            // content={<Icon icon={"add"}/> }
            content={<></>}
            onSelect={(icon) => console.log(icon)}
        />
        </>
    );
}

const styles = StyleSheet.create({
    actionButton: {
        paddingHorizontal: 8
    },
    shadow: {
        shadowRadius: 20,
        shadowOpacity: 40,
        shadowColor: defaultThemeColors.neutral.neutral_20
    }
})

export default CategoryScreen;