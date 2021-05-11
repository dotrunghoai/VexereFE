import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'block',
        textAlign: 'center',
        marginTop: '1rem',
        height: '38px',
        cursor: 'not-allowed',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));


export default function LoadingComponent() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CircularProgress />
        </div>
    )
}
