import React from "react";
import Task from "./Task";
import PropTypes from "prop-types";

export default function TaskList({ loading, tasks, onPinTask, onArchiveTask}) {
    const events = {
        onPinTask,
        onArchiveTask
    };

    const LoadingRow = (
        <div className="loading-item">
            <span className="glow-checkbox" />
            <span className="glow-text">
                <span>Loading</span> <span>cool</span> <span>state</span>
            </span>
        </div>
    );
    console.log("loading")
    console.log(loading)
    if (loading) {
        return (
            <div className="list-items" data-testid="loading" key={"loading"}>
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
            </div>
        )
    }

    if (tasks.length === 0) {
        return (
          <div className="list-items" key={"empty"} data-testid="empty">
            <div className="wrapper-message">
              <span className="icon-check" />
              <p className="title-message">You have no tasks</p>
              <p className="subtitle-message">Sit back and relax</p>
            </div>
          </div>
        );
      }

    // PinnedTasksが上に来るように並べ替え
    const tasksInOrder = [
        ...tasks.filter((t)=> t.state === 'TASK_PINNED'),
        ...tasks.filter((t)=> t.state !== 'TASK_PINNED'),
    ]

    return (
        <div className="list-items">
            {tasksInOrder.map((task)=> 
                <Task key={task.id} task={task} {...events} />
            )}
        </div>
    );
}

TaskList.PropTypes = {
    loading: PropTypes.bool,
    tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired, // 効率的に記載するためImportしたTaskの propTypes を再利用する
    onPinTask: PropTypes.func,
    onArchiveTask: PropTypes.func,
};
TaskList.defaultProps = {
    loading: false,
}
