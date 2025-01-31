import React from 'react';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';

const BoxForm = ({ dimensions, setDimensions, onSubmit }) => {
  const handleChange = (e) => {
    setDimensions({ ...dimensions, [e.target.name]: Number(e.target.value) });
  };

  return (
    <Card variant="outlined" sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
      <CardContent>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Box Settings
        </Typography>
        <TextField fullWidth label="Length" name="length" value={dimensions.length} onChange={handleChange} type="number" margin="normal" />
        <TextField fullWidth label="Width" name="width" value={dimensions.width} onChange={handleChange} type="number" margin="normal" />
        <TextField fullWidth label="Height" name="height" value={dimensions.height} onChange={handleChange} type="number" margin="normal" />
        <Button variant="contained" onClick={onSubmit} fullWidth sx={{ marginTop: 2 }}>
          Update Box
        </Button>
      </CardContent>
    </Card>
  );
};

export default BoxForm;
