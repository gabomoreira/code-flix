import {
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	useTheme,
} from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// import { Container } from './styles';

interface IProps {
	text: string;
	open: boolean;
	Icon: any;
	path: string;
	style?: any;
}

const MyListItem: React.FC<IProps> = ({
	text,
	open,
	Icon,
	path,
	style = {},
}) => {
	const navigate = useNavigate();
	const location = useLocation();
	const theme = useTheme();

	return (
		<ListItem key={text} disablePadding sx={{ display: 'block' }} style={style}>
			<ListItemButton
				onClick={() => navigate(path)}
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
						color:
							location.pathname === path
								? theme.palette.secondary.main
								: '#fff',
					}}
				>
					<Icon />
				</ListItemIcon>
				<ListItemText
					primary={text}
					sx={{
						opacity: open ? 1 : 0,
						color:
							location.pathname === path
								? theme.palette.secondary.main
								: '#fff',
					}}
				/>
			</ListItemButton>
		</ListItem>
	);
};

export default MyListItem;
