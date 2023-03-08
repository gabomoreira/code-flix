import { Box, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { useSnackbar } from 'notistack';
import { useCreateCastMemberMutation } from './CastMemberSlice';
import { CastMember, CastMemberCreateEntity } from '../../@types/CastMember';
import { CastMemberForm } from './components/CastMemberForm';

export const CastMemberCreate = () => {
	const [createCastMember, createCastMemberStatus] =
		useCreateCastMemberMutation();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const [isLoading, setIsLoading] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);
	const [castMember, setCastMember] = useState<CastMemberCreateEntity>({
		name: '',
		type: 1,
	});

	function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
		setCastMember((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	}

	function handleOnChangeToggle(e: React.ChangeEvent<HTMLInputElement>) {
		setCastMember((prev) => ({
			...prev,
			[e.target.name]: e.target.checked,
		}));
	}
	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		console.log(castMember);

		setIsDisabled(true);
		try {
			await createCastMember(castMember);
		} catch (error) {
			console.log('errro');
		}
		console.log('errro');
	}

	useEffect(() => {
		if (createCastMemberStatus.isSuccess) {
			enqueueSnackbar('Success creating CastMember!', { variant: 'success' });
		}
		if (createCastMemberStatus.error) {
			console.log(createCastMemberStatus.error);
			enqueueSnackbar('Error creating CastMember!', { variant: 'error' });
		}

		setIsDisabled(false);
	}, [createCastMemberStatus]);

	return (
		<Box>
			<Paper>
				<Box p={2}>
					<Box mb={2}>
						<Typography variant="h4">Create CastMember</Typography>
					</Box>
				</Box>

				<CastMemberForm
					castMember={castMember}
					handleOnChange={handleOnChange}
					isLoading={isLoading}
					handleSubmit={handleSubmit}
					isDisabled={isDisabled}
					handleOnChangeToggle={handleOnChangeToggle}
				/>
			</Paper>
		</Box>
	);
};
