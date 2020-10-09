import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

function ProjectButton(props) {

	const buttonStyle = {
	    background: props.backgroundColor,
	    width: '50px',
	    borderRadius: '5px',
	    color: '#fff'
	};

	if (props.visible) {
		return <button style={buttonStyle} onClick={props.onClick} >
			<img style={{'width' : '35px', 'height': '40px'}} src={props.iconPath}/>
		</button>
	} else {
		return <span></span>
	}

}

export default ProjectButton;