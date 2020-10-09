import React, {useState} from 'react';
import axios from 'axios';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add'

import Task from './Task.js';

function TasksList(props) {
	const [tasks, setTasks] = useState(props.tasks);

	const deleteTask = (idx) => setTasks(tasks.filter((t, i) => idx !== i));
	const onSaveTaskToDb = (idx, newId) => setTasks(
		tasks.map((t, i) => {
			if (i === idx) {
				return {...t, id: newId};
			} else {
				return t;
			}
		})
	);

	const getNewTaskId = () => Math.max(0, Math.max(...tasks.map(t => t.id)) + 1);

	const addTask = () => {
		const newTaskData = createNewTaskData(
			getNewTaskId(),
			props.projectId
		);
		setTasks(tasks.concat([newTaskData]))
	}

	const tasksViews = tasks.map((t, idx) => <Task
		key={t.id}
		taskId={t.id}
		taskData={t.attributes}
		unSaved = {t.unSaved}
		onDelete={() => deleteTask(idx)}
		projectId={props.projectId}
		onSaveTaskToDb={onSaveTaskToDb}
	/>);

	const addTaskButton =
		<Tooltip
			style = {{
				display: 'block',
				margin: '10px auto 0px auto',
			}} 
			title="Add task">
			<IconButton
				onClick={addTask}
			>
				<AddIcon fontSize="large" />
			</IconButton>
		</Tooltip>

	return (
		<div>
			{tasksViews}
			{addTaskButton}
		</div>
	);
}

function createNewTaskData(newKeyId, projectId) {
	return {
		id : newKeyId,
		unSaved : true,
		attributes : {
		  	description: 'New Task',
		  	deadline: new Date(),
		  	priority: 'low',
		  	status: 0,
		  	project_id: projectId
		},
	}
}

export default TasksList;