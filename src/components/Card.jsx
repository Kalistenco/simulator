import { Alert, Grid, Card as UICard } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import React, { useState } from 'react';

export default function Card({ name, img, state, id }) {

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const executeAction = async (action) => {
        try {
            await axios.post(`${process.env.REACT_APP_CONTROL_URL}/control/api/action`, {
                action: {
                    code: action,
                    dronId: id
                }
            });
            setSuccess(true);
            setTimeout(() => setSuccess(false), 50000);
        } catch {
            setError(true);
            setSuccess(false);
            setTimeout(() => setError(false), 5000);
        }
    }

    return (
        <UICard sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={img}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                    Estado: {state}
                </Typography>
                <Alert severity="success" style={{
                    display: success ? 'flex' : 'none'
                }}>Información enviada!</Alert>
                <Alert severity="error" style={{
                    display: error ? 'flex' : 'none'
                }}>Ha ocurrido un error</Alert>
            </CardContent>
            <CardActions style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Button size="small" onClick={() => executeAction("GO_BACK_TO_BASE")}>Ir a base</Button>
                <Button size="small" onClick={() => executeAction("GO_TO_LOCATION")}>Ir a locación</Button>
                <Button size="small" onClick={() => executeAction("SPRAY")}>Rociar</Button>
            </CardActions>
        </UICard>
    );
}