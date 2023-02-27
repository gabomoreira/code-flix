import { Box, Paper, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from './authSlice';
import { AuthForm } from './components/AuthForm';

export const AuthRegister = () => {
	const [register, setRegister] = useState({
		username: '',
		email: '',
		password: '',
		password_confirmation: '',
	});
	const [isDisabled, setIsDisabled] = useState(false);

	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const [registerUser, registerUserStatus] = useRegisterUserMutation();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setIsDisabled(true);
		await registerUser(register);
	};

	function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
		setRegister((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	}

	React.useEffect(() => {
		if (registerUserStatus.isSuccess) {
			enqueueSnackbar('Success created account', { variant: 'success' });
			navigate('/auth');
		}
		if (registerUserStatus.isError) {
			if (registerUserStatus.error.data) {
				registerUserStatus.error?.data?.errors?.forEach((e) => {
					enqueueSnackbar(`${e.message}`, { variant: 'error' });
				});
			}
		}
		setIsDisabled(false);
	}, [registerUserStatus]);

	return (
		<Box
			component="main"
			sx={{
				height: '100vh',
				backgroundColor: (theme) => theme.palette.grey[900],
			}}
		>
			<Box
				display="flex"
				alignItems="center"
				justifyContent="center"
				sx={{ height: '100%' }}
			>
				<Box
					component={Paper}
					elevation={3}
					p={2}
					sx={{ textAlign: 'center', maxWidth: '500px' }}
				>
					<Typography variant="h4" mb={1}>
						Codeflix
					</Typography>

					<Typography variant="h6" mb={2}>
						Create Account
					</Typography>

					<AuthForm
						type="register"
						handleSubmit={handleSubmit}
						handleOnChange={handleOnChange}
						isDisabled={isDisabled}
						user={register}
					/>
				</Box>
			</Box>
		</Box>
	);
};
