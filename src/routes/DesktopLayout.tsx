import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import {
	Box,
	Drawer as MuiDrawer,
	Toolbar,
	List,
	CssBaseline,
	Typography,
	Divider,
	IconButton,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Container,
} from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

import {
	Menu as MenuIcon,
	Inbox as InboxIcon,
	ChevronLeft as ChevronLeftIcon,
	ChevronRight as ChevronRightIcon,
	ExitToAppOutlined as ExitToAppOutlined,
} from '@mui/icons-material';

import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
	selectCurrentUser,
	useSignOutMutation,
} from '../features/auth/authSlice';
import { adminListRoutes } from './ListRoutes';
import RenderListTypes from './RenderListTypes';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}));

export const DesktopLayout: React.FC = () => {
	const user = useSelector(selectCurrentUser);
	const [signInOut, signInOutStatus] = useSignOutMutation();
	const theme = useTheme();

	const [open, setOpen] = React.useState(true);
	const [register, setRegister] = React.useState(false);

	const navigate = useNavigate();

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleSignOut = async () => {
		await signInOut();
		navigate('/auth');
	};

	return (
		<Box sx={{ display: 'flex', color: '#000' }}>
			<CssBaseline />
			<AppBar position="fixed" open={open}>
				<Toolbar>
					<IconButton
						color="default"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{
							marginRight: 5,
							...(open && { display: 'none' }),
						}}
					>
						<MenuIcon />
					</IconButton>

					<Typography variant="h6" noWrap component="div">
						Codeflix
					</Typography>
				</Toolbar>
			</AppBar>

			<Drawer
				variant={user!.role === 'ADMIN' ? 'permanent' : 'permanent'}
				open={open}
			>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'rtl' ? (
							<ChevronRightIcon />
						) : (
							<ChevronLeftIcon />
						)}
					</IconButton>
				</DrawerHeader>
				<Divider />

				<List sx={{ color: '#000' }}>
					{user?.role === 'ADMIN' &&
						adminListRoutes.map((item, index) => (
							<RenderListTypes key={index} data={item} barOpen={open} />
						))}
				</List>
				<Divider />

				<ListItem
					key="logout"
					disablePadding
					sx={{ display: 'block', mt: 'auto' }}
				>
					<ListItemButton
						onClick={handleSignOut}
						sx={{
							minHeight: 48,
							justifyContent: open ? 'initial' : 'center',
							px: 2.5,
						}}
					>
						<ListItemIcon
							sx={{
								minWidth: 0,
								mr: open ? 3 : 'auto',
								justifyContent: 'center',
							}}
						>
							<ExitToAppOutlined />
						</ListItemIcon>
						<ListItemText primary="Sair" sx={{ opacity: open ? 1 : 0 }} />
					</ListItemButton>
				</ListItem>
			</Drawer>

			<Box
				component="main"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					height: '100vh',
					width: '100%',
					backgroundColor: (theme) => theme.palette.grey[900],
				}}
			>
				<DrawerHeader />
				<Container
					maxWidth="lg"
					sx={{
						mt: 4,
						mb: 4,
						color: 'white',
						flex: 1,
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<Outlet />
				</Container>
			</Box>
		</Box>
	);
};
