import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'inline-block',
        textAlign: 'center',
        marginLeft: '10px',
        maxHeight: '38px',
        width: '81px',
        fontSize: '10px',
        cursor: 'not-allowed',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));


export default function LoadingButton() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CircularProgress />
        </div>
    )
}
