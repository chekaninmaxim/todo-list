import React, {useState} from 'react';
import axios from 'axios';

import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';

import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

import PriorityDropdown from './PriorityDropdown.js';

const taskUrl = 'api/v1/tasks/';
function Task(props) {

	const [description, setDesctiption] = useState(props.taskData.description);
	const [deadline, setDeadline] = useState(props.taskData.deadline);
	const [priority, setPriority] = useState(props.taskData.priority);
	const [status, setStatus] = useState(props.taskData.status);
	const [unSaved, setUnSaved] = useState(props.unSaved);
	const [dbUnSaved, setDbUnSaved] = useState(props.unSaved);
	const [taskId, setTaskId] = useState(props.taskId)

	const saveTask = (isDone=status) => {
		const taskData = {
		  	description: description,
		  	priority: priority,
		  	status: isDone,
		  	deadline: deadline,
		  	project_id: props.projectId
		};

		axios({
		  method: dbUnSaved ? 'post' : 'patch',
		  url: taskUrl + (dbUnSaved ? '' : taskId),
		  data: {task : taskData}
		})
		.then(resp => {
			if (dbUnSaved) {
				setTaskId(resp.data.data.id);
			}
			setUnSaved(false);
			setDbUnSaved(false);

		})
		.catch('SAVE TASK ERROR', console.log);
	}

	const deleteTask = () => {
		if (dbUnSaved) { 
			props.onDelete();
		} else {
			axios.delete(`api/v1/tasks/${props.taskId}`, {})
			.then(resp => {
				props.onDelete();
			})
			.catch('DELETE TASK ERROR:', console.log);
		}
	}

	const elements = [
		<TextField
			value={description}
			fullWidth={false}
			label="Description"
			color="primary"
			multiline={true}
			onChange={(e) => {
				setDesctiption(e.target.value);
				setUnSaved(true);
			}}
			disabled={Boolean(status)}
		/>,
		<PriorityDropdown
			options={['low', 'high', 'highest']}
			selected={priority}
			onChange={(selected) => {
				if (selected !== priority) {
					setUnSaved(true);
					setPriority(selected);
				}
			}}
			disabled={Boolean(status)}
		/>,

		<TextField
			id="date"
			label="Deadline"
			type="date"
			defaultValue={deadline}
			InputLabelProps={{
			  shrink: true,
			}}
			onChange= {e => {
				setUnSaved(true);
				setDeadline(e.target.value)
			}}
			disabled={Boolean(status)}
		/>,

		<Checkbox
			label="Done"
			checked={Boolean(status)}
			onChange={(e) => {
				setStatus(!status);
				setUnSaved(true);
				saveTask(!status);

			}}
			color='primary'
		/>,

		<SaveOrDeleteButton
			onSave={() => saveTask(status)}
			onDelete={deleteTask}
			deleteMode={Boolean(status)}
			visible={unSaved}
		/>

	];

	const boxStyle = {
		maxWidth : '700px',
		position: 'relative',
		margin: 'auto',
		borderRadius: '5px',
		border: '1px grey solid',
	};

	const elemStyle = {
		padding: '8px',
		margin: 'auto'
	}

	return (
		<Box display='flex' style={boxStyle}>
		{elements.map((el, idx) => {
			if (idx === 0) {
				return <Box key={idx} style = {elemStyle} flexGrow={1}> {el} </Box>
			} else {
				return <Box key={idx} style = {elemStyle}> {el} </Box> 
			}
		})}
		</Box>
	);
}

function SaveOrDeleteButton(props) {
	if (props.deleteMode) {
		return <IconButton onClick={props.onDelete}>
			<DeleteIcon />
		</IconButton>
	} else {

		const invisibleStyle = {
			width: '48px',
			height: '48px',
		};

		if (props.visible) 
			return (
				<IconButton onClick={props.onSave}>
					<SaveIcon />
				</IconButton>
			)
		else
			return (<Box style= {invisibleStyle}></Box>)
	}
}

export default Task