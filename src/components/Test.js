import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

export default function Test() {
    return (
        <>
            <Stack spacing={2} direction="row">
                <Button variant="text" >Text</Button>
                <Button variant="contained" >Contained</Button>
                <Button variant="outlined" >Outlined</Button>
            </Stack>
            <AccessAlarmIcon style={{ color: "red", fontSize: "40px" }} />
        </>
    );
}