import { Box, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

export const CategoryEdit = () => {
    const { id } = useParams()

    console.log(id, 'CategoryEdit => params')

    return (
        <Box>
            <Typography variant='h3' component='h1'>Edit Category ID: {id}</Typography>
        </Box>
    )
}
