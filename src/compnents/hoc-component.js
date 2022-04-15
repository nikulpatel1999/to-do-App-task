import React, { Component, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const HocComponent = (Component) => {
  const [taskName, setTaskName] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [checkedRecordIds, setCheckedRecordIds] = useState([]);
  const [editId, setEditId] = useState();
  const setEntityValue = (e) => setTaskName(e.target.value);

  /**
   * Add new Task
   */
  const addTask = () => {
    if (taskName !== "") {
      const taskData = {
        id: uuidv4(),
        taskName: taskName,
        isCompleted: false,
        isChecked: false,
      };
      setTaskList((oldValues) => [...oldValues, { ...taskData }]);
      setTaskName("");
    }
  };

  /**
   * Set values for edit 
   * @param {*} task 
   */
  const editTask = (task) => {
    setEditId(task.id);
    setTaskName(task.taskName);
    setTaskList([...taskList]);
  };

  /**
   * Save task
   * Perform update operation
   */
  const saveTask = () => {
    const index = taskList.findIndex((x) => x.id == editId);
    if (index != -1) {
      taskList[index].taskName = taskName;
      setTaskList([...taskList]);
      setEditId(undefined);
      setTaskName("");
    }
  };

  /**
   * On chaeckbox change
   * @param {*} e 
   * @param {*} index 
   */
  const onCheckChange = (e, index) => {
    if (e.target.checked == true) {
      taskList[index].isChecked = true;
      setCheckedRecordIds((oldValues) => [...oldValues, e.target.value]);
    } else {
      taskList[index].isChecked = false;
      const itemIndex = checkedRecordIds.findIndex(
        (value) => value == e.target.value
      );
      if (itemIndex != -1) {
        checkedRecordIds.splice(itemIndex, 1);
        setCheckedRecordIds([...checkedRecordIds]);
      }
    }
    setTaskList(taskList);
  };

  /**
   * On delete task 
   * @param {*} index 
   */
  const deleteTask = (index) => {
    taskList.splice(index, 1);
    setTaskList([...taskList]);
  };

  /**
   * Perform actions : Complete Tasks, Delete Tasks
   * Complete or delete multiple tasks
   * @param {*} action 
   */
  const triggerAction = (action) => {
    const data = [...taskList];
    checkedRecordIds.forEach((id) => {
      const taskIndex = data?.findIndex((x) => x.id == id);
      if (taskIndex != -1) {
        if (action == "complete") {
          data[taskIndex].isCompleted = true;
        } else if (action == "delete") {
          data.splice(taskIndex, 1);
        }
      }
    });
    data.forEach((task) => {
      task.isChecked = false;
    });
    setTaskList([...data]);
    setCheckedRecordIds([]);
  };

  /**
   * Higher Order Function
   * @returns Component
   */
  const hocFunctionalComponent = () => {
    return (
      <Component
        setTaskName={setEntityValue}
        taskName={taskName}
        editId={editId}
        addTask={addTask}
        taskList={taskList}
        onCheckChange={onCheckChange}
        triggerAction={triggerAction}
        deleteTask={deleteTask}
        checkedRecordIds={checkedRecordIds}
        editTask={editTask}
        saveTask={saveTask}
      />
    );
  };
  return hocFunctionalComponent();
};
export default HocComponent;
