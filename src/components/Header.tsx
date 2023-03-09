import {
	AppBar,
	Box,
	Button,
	IconButton,
	Toolbar,
	Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { useSignOutMutation } from '../features/auth/authSlice';

export const Header = () => {
	const [signOut, signOutStatus] = useSignOutMutation();

	const handleSignOut = async () => {
		await signOut();
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						News
					</Typography>
					<Button onClick={handleSignOut} color="inherit">
						Logout
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
