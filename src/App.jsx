import React, { useEffect, useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";

export const App = () => {
  // ダミーデータ
  const [todos, setTodos] = useState([
    { id: 1, title: "プログラミング学習", contents: "JavaScript" },
    { id: 2, title: "自宅学習", contents: "React" },
    { id: 3, title: "日々の学習", contents: "Ruby" }
  ]);
  // 各ステータス
  const [todoTitle, setTodoTitle] = useState("");
  const [todoContents, setTodoContents] = useState("");
  const [todoId, setTodoId] = useState(todos.length + 1);
  const [isEditable, setIsEditable] = useState(false);
  const [editId, setEditId] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newContents, setNewContents] = useState("");
  const [filter, setFilter] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  // TODO追加処理
  const handleAddFormChangesTitle = (e) => {
    setTodoTitle(e.target.value);
  };
  const handleAddFormChangesContents = (e) => {
    setTodoContents(e.target.value);
  };
  const resetFormInput = () => {
    setTodoTitle("");
    setTodoContents("");
  };

  const handleAddTodo = () => {
    setTodos([
      ...todos,
      {
        id: todoId,
        title: todoTitle,
        contents: todoContents,
        status: "notStarted"
      }
    ]);
    setTodoId(todoId + 1);
    resetFormInput();
  };

  // TODO削除
  const handleDeleteTodo = (targetTodo) => {
    setTodos(todos.filter((todo) => todo !== targetTodo));
  };

  // TODO編集
  const handleOpenEditForm = (todo) => {
    setIsEditable(true);
    setEditId(todo.id);
    setNewTitle(todo.title);
    setNewContents(todo.contents);
  };

  const handleEditFormChangeTitle = (e) => {
    setNewTitle(e.target.value);
  };

  const handleEditFormChangeContents = (e) => {
    setNewContents(e.target.value);
  };

  const handleCloseEditForm = () => {
    setIsEditable(false);
    setEditId("");
  };

  // TODO編集内容を保存
  const handleEditTodo = () => {
    const newArray = todos.map((todo) =>
      todo.id === editId
        ? { ...todo, title: newTitle, contents: newContents }
        : todo
    );
    setTodos(newArray);
    setNewTitle("");
    setNewContents("");
    setEditId();
    handleCloseEditForm();
  };

  // TODOステータスを更新
  const handleStatusChange = (targetTodo, e) => {
    const newArray = todos.map((todo) =>
      todo.id === targetTodo.id ? { ...todo, status: e.target.value } : todo
    );
    setTodos(newArray);
  };

  // フィルター
  useEffect(() => {
    const filteringTodos = () => {
      switch (filter) {
        case "notStarted":
          setFilteredTodos(
            todos.filter((todo) => todo.status === "notStarted")
          );
          break;
        case "inProgress":
          setFilteredTodos(
            todos.filter((todo) => todo.status === "inProgress")
          );
          break;
        case "done":
          setFilteredTodos(todos.filter((todo) => todo.status === "done"));
          break;
        default:
          setFilteredTodos(todos);
      }
    };
    filteringTodos();
  }, [filter, todos]);

  return (
    <>
      <InputTodo
        isEditable={isEditable}
        newTitle={newTitle}
        newContents={newContents}
        handleEditFormChangeTitle={handleEditFormChangeTitle}
        handleEditFormChangeContents={handleEditFormChangeContents}
        handleEditTodo={handleEditTodo}
        handleCloseEditForm={handleCloseEditForm}
        todoTitle={todoTitle}
        handleAddFormChangesTitle={handleAddFormChangesTitle}
        todoContents={todoContents}
        handleAddFormChangesContents={handleAddFormChangesContents}
        handleAddTodo={handleAddTodo}
        filter={filter}
        setFilter={setFilter}
      />

      {/* TODOリスト一覧 */}
      <div>
        <ul>
          {filteredTodos.map((todo) => (
            <li key={todo.id}>
              <span>{todo.id}</span>
              <sapn>{todo.title}</sapn>
              <sapn>{todo.contents}</sapn>
              <select
                value={todo.status}
                onChange={(e) => handleStatusChange(todo, e)}
              >
                <option value="notStarted">未着手</option>
                <option value="inProgress">作業中</option>
                <option value="done">完了</option>
              </select>
              <button onClick={() => handleOpenEditForm(todo)}>編集</button>
              <button onClick={() => handleDeleteTodo(todo)}>削除</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
