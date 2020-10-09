import React, {useState, useEffect} from 'react';

function EditableText(props) {
	const [isEditing, setEditing] = useState(false);
	const [title, setTitle] = useState(props.title);

	const handleChange = e => setTitle(e.target.value);

	const endEditing = () => {
		setEditing(false);
		props.onSave(title);
	}

	const editableStyle = {
		marginLeft: '8px',
		marginRight: '8px',
	    backgroundColor: props.background || '#ffffff',
	    color: props.color || 'black',
	    border: 'none',
	    fontFamily: 'Arial, Helvetica, sans-serif',
	    fontSize: '16'
	};

	const nonEditableStyle = {
		marginLeft: '8px',
		marginRight: '8px',
		marginTop: 'auto',
	    marginBottom: 'auto',
	    fontFamily: 'Arial, Helvetica, sans-serif',
	    fontSize: '16'
	};

	if (isEditing) {
		return <input
			style={editableStyle}
			type="text"
			value={title}
			onChange={handleChange}
			onBlur={endEditing}
			autoFocus
		/>
	} else {
		return <p
			onClick={setEditing}
			style={nonEditableStyle}
		> {title} </p>
	}
}

export default EditableText;