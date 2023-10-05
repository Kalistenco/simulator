import { Alert, Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'

const Meteorologia = () => {

    const [message, setMessage] = useState("");
    const [coordX, setCoordX] = useState("");
    const [coordY, setCoordY] = useState("");
    const [level, setLevel] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setErrror] = useState(false);

    const sendInfo = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_SERVICIO_METEOROLOGICO_URL}/satelital/api/alert`, {
                alert: {
                    message: message,
                    coordinates: {
                        x: coordX,
                        y: coordY
                    },
                    level
                }
            });
            setSuccess(true);
            setMessage("");
            setCoordX("");
            setCoordY("");
            setLevel("");
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
                    Servicio Meteorológico
                </Typography>
            </Grid>
            <Grid item sm={12} style={{
                width: '50%'
            }}>
                <TextField multiline fullWidth id="outlined-basic" label="Mensaje" variant="outlined" value={message} onChange={(e) => setMessage(e.target.value)} />
            </Grid>
            <Grid item sm={12} spacing={2} style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <FormLabel id="demo-row-radio-buttons-group-label">Coordenadas</FormLabel>
                <TextField id="outlined-number" label="X" type="number" value={coordX} onChange={(e) => setCoordX(e.target.value)} style={{ marginRight: '1%', marginLeft: '1%' }} />
                <TextField id="outlined-number" label="Y" type="number" value={coordY} onChange={(e) => setCoordY(e.target.value)} />
            </Grid>
            <Grid item sm={12} style={{ width: '100%' }}>
                <FormControl style={{ width: '100%' }}>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                    >
                        <FormLabel id="demo-row-radio-buttons-group-label" style={{ marginRight: '1%' }}>Nivel</FormLabel>
                        <FormControlLabel value="Bajo" control={<Radio />} label="Bajo" />
                        <FormControlLabel value="Medio" control={<Radio />} label="Medio" />
                        <FormControlLabel value="Alto" control={<Radio />} label="Alto" />
                    </RadioGroup>
                </FormControl>
            </Grid>

            <Grid item sm={6}>
                <Button variant="contained" onClick={() => sendInfo()}>Enviar</Button>
            </Grid>
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

export default Meteorologia