import { Box, Button, FormControl, FormControlLabel, FormGroup, Grid, Switch, TextField } from '@mui/material'
import React, { ChangeEventHandler } from 'react'
import { Link } from 'react-router-dom'

import { Category } from '../CategorySlice'

type Props = {
    category: Category,
    isDisabled?: boolean,
    isLoading?: boolean,
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    handleOnChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    handleOnChangeToggle: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export const CategoryForm = ({ category, isLoading, isDisabled, handleSubmit, handleOnChange, handleOnChangeToggle }: Props) => {

    return (
        <Box p={2}>
            <form>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                required
                                name='name'
                                label='Name'
                                disabled={isDisabled}
                                onChange={handleOnChange}
                                value={category?.name}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                required
                                name='description'
                                label='Description'
                                disabled={isDisabled}
                                onChange={handleOnChange}
                                value={category?.description}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch
                                        name='is_active'
                                        color='secondary'
                                        onChange={handleOnChangeToggle}
                                        checked={category?.is_active}

                                    />
                                }
                                label='Active'
                            />
                        </FormGroup>
                    </Grid>

                    <Grid item xs={12}>
                        <Box display='flex' gap={2}>
                            <Button variant='contained' component={Link} to='/categories'>
                                Back
                            </Button>

                            <Button
                                type='submit'
                                variant='contained'
                                color='secondary'
                                disabled={isDisabled}
                            >
                                Save
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}
