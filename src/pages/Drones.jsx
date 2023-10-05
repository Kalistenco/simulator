import { Alert, CircularProgress, Grid, Typography } from '@mui/material'
import axios from 'axios';
import Card from 'components/Card'
import React, { useEffect, useState } from 'react'
import Dron from '../images/dron1.jpg';

const Drones = () => {

    const [onSync, setOnSync] = useState(true);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [drones, setDrones] = useState([]);

    useEffect(() => {
        const getSync = async () => {
            try {
                await axios.get(`${process.env.REACT_APP_CONTROL_URL}/control/api/syncronize`);
                sessionStorage.setItem("timeFrom", new Date().toDateString());
                await getDrones();
            } catch {
                setError(true);
                setSuccess(false);
            }
        }
        getSync();
    }, []);

    const getDrones = async () => {
        try {
            const timeFrom = sessionStorage.getItem("timeFrom");
            const response = await axios.get(`${process.env.REACT_APP_CONTROL_URL}/control/api/changes`, {
                params: {
                    timeFrom: timeFrom ?? new Date(Date.now() - 2000)
                }
            });
            setDrones(response.data.filter(value => value.type === 'DRON').map(value => value.data.dron));
            setOnSync(false);
        } catch {
            setError(true);
            setSuccess(false);
        }

    }

    return (
        <Grid container spacing={2} flexDirection="row" style={{
            width: '100%',
            margin: '2%',
            alignItems: 'center',
        }}>
            <Grid item sm={12}>
                <Typography variant="h3" gutterBottom>
                    Drones
                </Typography>
            </Grid>
            {
                onSync ?
                    <Grid item sm={3}>
                        <Typography variant="h5" gutterBottom>
                            Sincronizando...
                        </Typography>
                        <CircularProgress />
                    </Grid> :
                    <>
                        {
                            drones.map(dron => <Grid item sm={3}>
                                <Card img={Dron} name={dron.name} state={dron.state} id={dron.id} />
                            </Grid>)
                        }
                    </>
            }
            <Grid item sm={3} style={{
                display: success ? 'flex' : 'none'
            }}>
                <Alert severity="success">Información enviada!</Alert>
            </Grid>
            <Grid item sm={3} style={{
                display: error ? 'flex' : 'none'
            }}>
                <Alert severity="error">Ha ocurrido un error</Alert>
            </Grid>
        </Grid>

    )
}

export default Drones