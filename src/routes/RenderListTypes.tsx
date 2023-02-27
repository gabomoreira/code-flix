import { ExpandLess, ExpandMore, Inbox, Create } from '@mui/icons-material';
import {
	Collapse,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import React, { useState } from 'react';
import MyListItem from './MyListItem';

// import { Container } from './styles';

const HandleSubMenus = ({
	data,
	title,
	barOpen,
	Icon,
}: {
	data: any;
	title: any;
	barOpen: boolean;
	Icon: any;
}) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<ListItemButton
				onClick={() => setOpen((prevstate) => !prevstate)}
				sx={{
					minHeight: 48,
					justifyContent: 'initial',
					px: 2.5,
				}}
			>
				<ListItemIcon
					sx={{
						minWidth: 0,
						mr: barOpen ? 3 : 'auto',
						justifyContent: 'flex-end',
						// color: open ? colors.orange[100] : colors.gray[70],
					}}
				>
					<Icon />
				</ListItemIcon>
				<ListItemText primary={title} sx={{ opacity: barOpen ? 1 : 0 }} />
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{data.map((item: any, index: any) => (
						<MyListItem
							style={{ marginLeft: '10px' }}
							key={index}
							text={item?.name}
							Icon={item.icon}
							path={item.path}
							open={barOpen}
						/>
					))}
				</List>
			</Collapse>
		</>
	);
};

const RenderListTypes = ({ data, barOpen = false }: any) => {
	if (data.type === 'sub-menus') {
		return (
			<HandleSubMenus
				data={data.data}
				title={data.title}
				barOpen={barOpen}
				Icon={data.icon}
			/>
		);
	} else {
		return (
			<List component="div" disablePadding>
				{data.data.map((item: any, index: any) => (
					<MyListItem
						key={index}
						text={item?.name}
						Icon={item.icon}
						path={item.path}
						open={barOpen}
					/>
				))}
			</List>
		);
	}
};

export default RenderListTypes;
