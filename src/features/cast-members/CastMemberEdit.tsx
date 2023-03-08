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
import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useSnackbar } from 'notistack';
import { CastMemberForm } from './components/CastMemberForm';
import {
	useGetCastMemberQuery,
	useUpdateCastMemberMutation,
} from './CastMemberSlice';
import { CastMemberUpdateEntity } from '../../@types/CastMember';

export const CastMemberEdit = () => {
	const id = useParams().id || '';

	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const { data: castMember, isFetching, error } = useGetCastMemberQuery({ id });
	const [updateCastMember, updateCastMemberStatus] =
		useUpdateCastMemberMutation();

	const [isLoading, setIsLoading] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);
	const [castMemberState, setCastMemberState] =
		useState<CastMemberUpdateEntity>({
			name: '',
			type: null,
		});

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		await updateCastMember(castMemberState);
	}

	function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
		setCastMemberState((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	}

	function handleOnChangeToggle(e: React.ChangeEvent<HTMLInputElement>) {
		setCastMemberState((prev) => ({
			...prev,
			[e.target.name]: e.target.checked,
		}));
	}

	useEffect(() => {
		setIsDisabled(true);

		if (castMember) {
			setCastMemberState(castMember);
		}

		setIsDisabled(false);
	}, [castMember]);

	useEffect(() => {
		if (updateCastMemberStatus.isSuccess) {
			enqueueSnackbar('Success updated cast member!', { variant: 'success' });
		}
		if (updateCastMemberStatus.isError) {
			enqueueSnackbar('Error updated cast member!', { variant: 'error' });
		}
	}, [updateCastMemberStatus]);

	return (
		<Box>
			<Paper>
				<Box p={2}>
					<Box mb={2}>
						<Typography variant="h4">Edit Cast member</Typography>
					</Box>
				</Box>

				<CastMemberForm
					castMember={castMemberState}
					handleOnChange={handleOnChange}
					isLoading={isDisabled}
					handleSubmit={handleSubmit}
					isDisabled={isDisabled}
					handleOnChangeToggle={handleOnChangeToggle}
				/>
			</Paper>
		</Box>
	);
};
