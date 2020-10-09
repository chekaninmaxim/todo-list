import React, {useState, useEffect} from 'react';
import axios from 'axios';

import ProjectHeader from './ProjectHeader.js';
import TasksList from './TasksList';
import icon from './to-do-list.svg';

function Project(props) {
 
	console.log(props.projectData.tasks);
 
 
	return (
		<div style={{'paddingTop' : '15px', 'paddingBottom' : '15px'}}>
			<ProjectHeader
				projectTitle={props.projectData.title}
				projectId={props.projectData.id}
				onDelete={props.onDelete}
			/>
			<TasksList
				tasks={props.projectData.tasks}
				projectId={props.projectData.id}
			/>
		</div>
	);
}

export default Project
