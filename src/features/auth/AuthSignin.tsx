import { Box, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignInMutation } from '../api/apiSlice';
import { AuthForm } from './components/AuthForm';

export const AuthSignIn = () => {
	const [auth, setAuth] = useState({
		email: '',
		password: '',
	});
	const [isDisabled, setIsDisabled] = useState(false);

	const [signIn, signInStatus] = useSignInMutation();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setIsDisabled(true);
		await signIn(auth);
	};

	function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
		setAuth((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	}

	React.useEffect(() => {
		if (signInStatus.isSuccess) {
			navigate('/');
			setIsDisabled(false);
		}
	}, [signInStatus]);

	return (
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
	);
};
