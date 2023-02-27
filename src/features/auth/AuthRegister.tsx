import { Box, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignInMutation } from '../api/apiSlice';
import { AuthForm } from './components/AuthForm';

export const AuthRegister = () => {
	const [register, setRegister] = useState({
		usernmae: '',
		email: '',
		password: '',
		confirmation_password: '',
	});
	const [isDisabled, setIsDisabled] = useState(false);

	const [signIn, signInStatus] = useSignInMutation();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setIsDisabled(true);
		await signIn(register);
	};

	function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
		setRegister((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	}

	React.useEffect(() => {
		if (signInStatus.isSuccess) {
			navigate('/auth');
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
	);
};
