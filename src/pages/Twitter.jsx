import { Alert, Button, Grid, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'

const Twitter = () => {

    const [tweet, setTweet] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setErrror] = useState(false);

    const sendTweet = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_TWITTER_URL}/twitter/api/sendMessage`, {
                message: tweet
            });
            setSuccess(true);
            setTweet("");
            setTimeout(() => setSuccess(false), 5000);
        } catch {
            setErrror(true);
            setTimeout(() => setErrror(false), 5000);
        }
    }

    return (
        <Grid container spacing={2} flexDirection="column" style={{
            width: '100%',
            marginTop: '10%',
            alignItems: 'center',
        }}>
            <Grid item sm={6}>
                <Typography variant="h3" gutterBottom>
                    Twitter
                </Typography>
            </Grid>
            <Grid item sm={12} style={{
                width: '50%'
            }}>
                <TextField multiline fullWidth id="outlined-basic" label="Tweet" variant="outlined" value={tweet} onChange={(e) => setTweet(e.target.value)} />
            </Grid>
            <Grid item sm={6}>
                <Button variant="contained" onClick={() => sendTweet()}>Enviar</Button>
            </Grid>
            <Grid item sm={3} style={{
                display: success ? 'flex' : 'none'
            }}>
                <Alert severity="success">Tweet enviado!</Alert>
            </Grid>
            <Grid item sm={3} style={{
                display: error ? 'flex' : 'none'
            }}>
                <Alert severity="error">Ha ocurrido un error</Alert>
            </Grid>
        </Grid>
    )
}

export default Twitter