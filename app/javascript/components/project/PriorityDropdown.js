
import React from 'react';
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) =>
  createStyles({
    formControl: {
      // marginTop: -20,
      minWidth: 100,
    },
  }),
);

export default function PriorityDropdown(props) {
  const classes = useStyles();
  const [selected, setSelected] = React.useState(props.selected);
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    console.log(event);
    setSelected(event.target.value);
    props.onChange(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
  <FormControl className={classes.formControl}>
    <InputLabel id="demo-controlled-open-select-label">Priority</InputLabel>
    <Select
        labelId="demo-controlled-open-select-label"
        id="demo-controlled-open-select"
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={selected}
        onChange={handleChange}
        disabled={props.disabled}
    >
        {props.options.map((p, i) => <MenuItem key={i} value={p}>{p}</MenuItem>)}
    </Select>
  </FormControl>
  );
}
