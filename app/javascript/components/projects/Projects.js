import React, {useState, useEffect} from 'react';
import NewProjectDialog from './NewProjectDialog.js';
import axios from 'axios';

import Project from '../project/Project.js';

function Projects(props){
	const [projectsList, setProjectsList] = useState([]);

	useEffect(() => {
		axios.get('/api/v1/projects')
		.then(response => {
			setProjectsList(
				response.data.data.map(p => {
					return {
						id: p.id,
						title: p.attributes.title,
						tasks: response.data.included.filter(t => t.attributes.project_id == p.id)
					}
				})
			)
		})
		.catch(console.log);
	}, [projectsList.length]);

	const deleteProject = (idx) => {
		setProjectsList(projectsList.filter((p, i) => i !== idx))
	}

	const projects = projectsList.map((p, idx) =>
		<Project
			key={p.id}
			projectData={p}
			onDelete={() => deleteProject(idx)}
		/>
	);

	const addProject = (projectData) => {
		setProjectsList(projectsList.concat([projectData]))
	};

	return (
		<div> 
			<NewProjectDialog addNewProject={addProject} />
			{projects}
		</div>
	)
}

export default Projects

