import { createAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from 'redux-saga/effects'

import { getTodos } from "./todo.slice";
import { addTodoAPI, completeTodoAPI, deleteTodoAPI, getAllTodosAPI } from "../../../API/todo.api";

export const getAllTodosAsyncAC = createAction('GET_ALL_TODOS_ASYNC')
export const deleteTodoAsyncAC = createAction<string|undefined>('DELETE_TODO_ASYNC')
export const completeTodoAsyncAC = createAction<{id:string, title:string}>('COMPLETE_TODO_ASYNC')
export const addTodoAsyncAC = createAction<string|undefined>('ADD_TODO_ASYNC')

export function* TodoWatcher(){
  yield takeEvery(getAllTodosAsyncAC().type, GetAllTodosWorker)
  yield takeEvery(deleteTodoAsyncAC().type, DeleteTodoWorker)
  yield takeEvery('COMPLETE_TODO_ASYNC', CompleteTodoWorker)
  yield takeEvery(addTodoAsyncAC().type, AddTodoWorker)
}

function* GetAllTodosWorker():Generator{
  const allTodos = yield call(getAllTodosAPI)
  yield put(getTodos(allTodos))
}

function* DeleteTodoWorker(action:ReturnType<typeof deleteTodoAsyncAC>):Generator{
  const allTodos = yield call(deleteTodoAPI, action.payload as string)
  yield put(getTodos(allTodos))
}

function* CompleteTodoWorker(action:ReturnType<typeof completeTodoAsyncAC>):Generator{
  const allTodos = yield call(completeTodoAPI, action.payload)
  yield put(getTodos(allTodos))
}

function* AddTodoWorker(action: ReturnType<typeof addTodoAsyncAC>):Generator{
  const allTodos = yield call(addTodoAPI, action.payload as string)
  yield put(getTodos(allTodos))
}