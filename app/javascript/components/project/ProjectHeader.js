import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';

import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import EditableText from './EditableText.js';
import ListAltIcon from '@material-ui/icons/ListAlt';
import icon from './to-do-list.svg';


function ProjectHeader(props) {
	const [unSaved, setUnSaved] = useState(false);
	const [title, setTitle] = useState(props.projectTitle);

	const saveNewProjectTitle = (newTitle) => {
		setTitle(newTitle);
		if (title !== newTitle) setUnSaved(true);
	}

	const saveProject = () => {
		axios({
		  method: 'patch',
		  url: `api/v1/projects/${props.projectId}`,
		  data: { title: title }
		})
		.then(resp => {
			setUnSaved(false);
		})
		.catch('SAVE PROJECT ERROR', console.log);
	}

	const deleteProject = () => {
		axios({
		  method: 'delete',
		  url: `api/v1/projects/${props.projectId}`
		})
		.then(resp => {
			setUnSaved(false);
			props.onDelete();
		})
		.catch('DELETE PROJECT ERROR:', console.log);
	}

	const buttons = [
		<IconButton
			style = {{margin: 'auto, 0px'}}
			disabled={!unSaved}
			onClick={saveProject}
		>
			<SaveIcon fontSize='large' style={{color:'white'}}/>
		</IconButton>,
		<IconButton
			style = {{margin: 'auto, 0px'}}
			onClick={deleteProject} >
			<DeleteIcon fontSize='large' style={{color:'white'}}/>
		</IconButton>
	];


	const header = <div
		style={{
			'position': 'relative',
			'margin':'auto',
			'width' : '716px',
			'display':'flex',
		    'background': '#6200EE',
		    'borderRadius': '5px',
		    'color': '#fff',
		    'padding': '8px',
		    'height': '50px'
		}}>

		<ListAltIcon style ={{display: "block", margin: 'auto 0px'}} fontSize='large'/>

		<EditableText
			title = {props.projectTitle}
			onSave = {saveNewProjectTitle}
			background='#6200EE'
			color='#fff'
		/>
		<div style= {{margin: 'auto', display: 'block', position:'absolute', right: '8px'}}>{buttons}</div> 
	</div>;

	return header;
}

export default ProjectHeader;