import React from "react";
import { Page, Stack } from "../../../tmd";
import Typography from "../../../tmd/components/Typography/Typography";

const BudgetScreen = () => {
    return (
        <Page>
            <Stack style={{ flex: 1 }}>
                <Typography type="h1" style={{ alignSelf: 'center' }}>
                    BUDGET
                </Typography>
            </Stack>
        </Page>
    );
}

export default BudgetScreen;