import React from "react";
import { Page, Stack } from "../../../tmd";
import Typography from "../../../tmd/components/Typography/Typography";

const TransactionScreen = () => {
    return (
        <Page>
            <Stack style={{ flex: 1 }}>
                <Typography type="h1" style={{ alignSelf: 'center' }}>
                    TRANSACTION
                </Typography>
            </Stack>
        </Page>
    );
}

export default TransactionScreen;