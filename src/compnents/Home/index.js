import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
const Index = (props) => {

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <>
      {/* App header */}
      <div className="app-header">
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography c variant="h6" color="white" component="div">
              ToDo List
            </Typography>
          </Toolbar>
        </AppBar>
      </div>

      {/* App container */}
      <div className="app-container">
        <div className="page-container">
          <div className="todo-list-text">ToDo List</div>

          {/* Task Form */}
          <div className="form-group-inline">
            <TextField
              required={true}
              className="task-input-field"
              onChange={props.setTaskName}
              value={props.taskName}
              id="outlined-basic"
              label="Task Name"
              variant="outlined"
            />
            {props.editId ? (
              <Button
                className="primary-btn"
                onClick={props.saveTask}
                variant="contained"
              >
                Save
              </Button>
            ) : (
              <Button
                className="primary-btn"
                onClick={props.addTask}
                variant="contained"
              >
                Add
              </Button>
            )}
          </div>

          {/* Task listing */}
          <TableContainer component={Paper} className="table-container">
            <Table>
              <TableBody>
                {props?.taskList?.map((row, index) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row" width="25px">
                      <Checkbox
                        className="check-box"
                        checked={row.isChecked}
                        value={row.id}
                        onChange={(e) => props.onCheckChange(e, index)}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </StyledTableCell>

                    <StyledTableCell
                      component="th"
                      scope="row"
                      className={row.isCompleted ? "is-task-completed" : ""}
                    >
                      <span className="task-name-label">{row.taskName}</span>
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row">
                      <DeleteIcon
                        onClick={() => props.deleteTask(index)}
                        className="delete-btn"
                      />
                      <ModeEditOutlineIcon onClick={() => props.editTask(row)} className="edit-btn" />

                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Action Buttons */}
          {props?.checkedRecordIds?.length > 0 && (
            <div className="app-footer">
              <Button
                onClick={() => props.triggerAction("complete")}
                variant="contained"
                className="complete-tasks-btn"
              >
                Complete Tasks
              </Button>

              <Button
                onClick={() => props.triggerAction("delete")}
                variant="contained"
                className="delete-tasks-btn"
              >
                Delete Tasks
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

/**
 * Prop types 
 */
Index.propTypes = {
  taskName: PropTypes.string,
  editId: PropTypes.string,
  setTaskName: PropTypes.func,
  addTask: PropTypes.func,
  taskList: PropTypes.array,
  triggerAction: PropTypes.func,
  deleteTask: PropTypes.func,
  editTask: PropTypes.func,
  saveTask: PropTypes.func,
  onCheckChange: PropTypes.func,
  checkedRecordIds: PropTypes.array,
};

export default Index;
