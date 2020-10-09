import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

export default function NewProjectDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    axios({
      url: '/api/v1/projects',
      method: 'post',
      data: {title: title}
    })
    .then(response => {
      setOpen(false);
      console.log(response);
      props.addNewProject({
        id: response.data.data.id,
        title: response.data.data.attributes.title,
        tasks: []
      })
    })
    .catch(response => console.log(response));
  }

  return (
    <div>
      <Button 
        style = {{
          display: 'block',
          margin: 'auto',
        }}
        variant="contained"
        color="primary" onClick={handleClickOpen}>
        CREATE NEW PROJECT
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Type new project title
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Task title"
            type="text"
            fullWidth
            value = {title}
            onChange = {(e) => setTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}