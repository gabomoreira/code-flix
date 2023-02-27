import { Box, Paper, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useSignInMutation } from './authSlice';
import { AuthForm } from './components/AuthForm';

export const AuthSignIn = () => {
	const [auth, setAuth] = useState({
		email: '',
		password: '',
	});
	const [isDisabled, setIsDisabled] = useState(false);

	const [signIn, signInStatus] = useSignInMutation();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setIsDisabled(true);
		try {
			await signIn(auth);
		} catch (error) {
			console.log(error);
		} finally {
			setIsDisabled(false);
		}
	};

	function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
		setAuth((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	}

	React.useEffect(() => {
		if (signInStatus.isLoading) {
			enqueueSnackbar('Loading', { variant: 'info' });
		}

		if (signInStatus.isError) {
			if (signInStatus.error.status === 400) {
				enqueueSnackbar('User not found', { variant: 'error' });
			}
		}
	}, [signInStatus]);

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
						Sign In
					</Typography>

					<AuthForm
						type="signIn"
						handleSubmit={handleSubmit}
						handleOnChange={handleOnChange}
						isDisabled={isDisabled}
						user={auth}
					/>
				</Box>
			</Box>
		</Box>
	);
};
