import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '169px',
        backgroundColor: 'rgb(255, 197, 0)',
        textAlign: 'center',
        paddingTop: '9px',
        cursor: 'not-allowed',
        [theme.breakpoints.down(992)]: {
            width: '400px',
        },
        [theme.breakpoints.down(576)]: {
            width: '300px',
        },
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));


export default function LoadingSearch() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CircularProgress />
        </div>
    )
}
