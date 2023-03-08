import {
	Box,
	Button,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	Grid,
	Radio,
	RadioGroup,
	Switch,
	TextField,
} from '@mui/material';
import React, { ChangeEventHandler, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { CastMember, CastMemberCreateEntity } from '../../../@types/CastMember';

// import { , useCreateCategoryMutation } from '../CastMemberSlice';

type Props = {
	castMember: CastMemberCreateEntity;
	isDisabled?: boolean;
	isLoading?: boolean;
	handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
	handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleOnChangeToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const CastMemberForm = ({
	castMember,
	isLoading,
	isDisabled,
	handleSubmit,
	handleOnChange,
	handleOnChangeToggle,
}: Props) => {
	return (
		<Box p={2}>
			<form onSubmit={handleSubmit}>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<FormControl fullWidth>
							<TextField
								required
								name="name"
								label="Name"
								disabled={isDisabled}
								onChange={handleOnChange}
								value={castMember?.name}
							/>
						</FormControl>
					</Grid>

					<Grid item xs={12} sx={{ color: '#000' }}>
						<FormGroup>
							<FormLabel>Type</FormLabel>
							<RadioGroup
								aria-labelledby="type of cast member"
								name="type"
								value={castMember?.type}
								onChange={handleOnChange}
								defaultValue="Diretor"
							>
								<FormControlLabel
									value={1}
									control={<Radio />}
									label="Diretor"
								/>
								<FormControlLabel value={2} control={<Radio />} label="Actor" />
							</RadioGroup>
						</FormGroup>
					</Grid>

					<Grid item xs={12}>
						<Box display="flex" gap={2}>
							<Button variant="contained" component={Link} to="/cast-members">
								Back
							</Button>

							<Button
								type="submit"
								variant="contained"
								color="secondary"
								disabled={isDisabled}
							>
								Save
							</Button>
						</Box>
					</Grid>
				</Grid>
			</form>
		</Box>
	);
};
