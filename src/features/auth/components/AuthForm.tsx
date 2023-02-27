import React, { useState } from 'react';
import {
	Box,
	Button,
	FormControl,
	FormControlLabel,
	FormGroup,
	Grid,
	Paper,
	Switch,
	TextField,
	Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

type User = {
	username?: string;
	email?: string;
	password: string;
	password_confirmation?: string;
};

type Props = {
	user: User;
	type: 'signIn' | 'register';
	isDisabled: boolean;

	handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

export const AuthForm = ({
	user,
	type,
	isDisabled,
	handleSubmit,
	handleOnChange,
}: Props) => {
	return (
		<form onSubmit={handleSubmit}>
			<Grid container spacing={3}>
				{type === 'register' && (
					<Grid item xs={12}>
						<FormControl fullWidth>
							<TextField
								required
								name="username"
								label="Username"
								disabled={isDisabled}
								onChange={handleOnChange}
								value={user.username}
							/>
						</FormControl>
					</Grid>
				)}

				<Grid item xs={12}>
					<FormControl fullWidth>
						<TextField
							required
							name="email"
							label="Email"
							disabled={isDisabled}
							onChange={handleOnChange}
							value={user.email}
						/>
					</FormControl>
				</Grid>

				<Grid item xs={12}>
					<FormControl fullWidth>
						<TextField
							type="password"
							required
							name="password"
							label="Password"
							disabled={isDisabled}
							onChange={handleOnChange}
							value={user.password}
						/>
					</FormControl>
				</Grid>

				{type === 'register' && (
					<Grid item xs={12}>
						<FormControl fullWidth>
							<TextField
								type="password"
								required
								name="password_confirmation"
								label="Confirm Password"
								disabled={isDisabled}
								onChange={handleOnChange}
								value={user.password_confirmation}
							/>
						</FormControl>
					</Grid>
				)}

				<Grid item xs={12}>
					<Box
						display="flex"
						alignItems="center"
						justifyContent="center"
						flexDirection="column"
					>
						<Typography
							mb={2}
							component={Link}
							to={type === 'register' ? '/auth' : '/register'}
						>
							{type === 'register'
								? 'Already a account'
								: 'Create a new account'}
						</Typography>

						<Button
							type="submit"
							variant="contained"
							disabled={isDisabled}
							fullWidth
							sx={{ maxWidth: '60%' }}
						>
							{type === 'register' ? 'Register' : 'Login'}
						</Button>
					</Box>
				</Grid>
			</Grid>
		</form>
	);
};
