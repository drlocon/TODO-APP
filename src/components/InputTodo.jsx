import React from "react";

export const InputTodo = (props) => {
  const {
    isEditable,
    newTitle,
    newContents,
    handleEditFormChangeTitle,
    handleEditFormChangeContents,
    handleEditTodo,
    handleCloseEditForm,
    todoTitle,
    handleAddFormChangesTitle,
    todoContents,
    handleAddFormChangesContents,
    handleAddTodo,
    filter,
    setFilter
  } = props;

  return (
    <div>
      <h1>TODOリスト</h1>
      {isEditable ? (
        // 編集フォーム
        <div>
          <input
            type="text"
            label="新しいタイトル"
            value={newTitle}
            onChange={handleEditFormChangeTitle}
            placeholder="タイトルを入力"
          />
          <input
            type="textarea"
            label="新しい詳細"
            value={newContents}
            onChange={handleEditFormChangeContents}
            placeholder="詳細を入力"
          />
          <button onClick={handleEditTodo}>更新</button>
          <button onClick={handleCloseEditForm}>キャンセル</button>
        </div>
      ) : (
        // 追加フォーム
        <div>
          <input
            type="title"
            label="タイトル"
            value={todoTitle}
            onChange={handleAddFormChangesTitle}
            placeholder="タイトルを入力"
          />
          <input
            type="textarea"
            label="詳細"
            value={todoContents}
            onChange={handleAddFormChangesContents}
            placeholder="詳細を入力"
          />
          <button onClick={handleAddTodo}>追加</button>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">すべて</option>
            <option value="notStarted">未着手</option>
            <option value="inProgress">作業中</option>
            <option value="done">完了</option>
          </select>
        </div>
      )}
    </div>
  );
};
