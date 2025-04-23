'use client'

import { useState } from "react"
// import { db } from "../firebase/firebase"
// import { ref, set } from "firebase/database"
// import Cookies from "universal-cookie"

interface ModalProps {
  closeModalFunction: (value: boolean) => void
}

interface TaskState {
  title: string
  list: string
}

const Modal = ({ closeModalFunction }: ModalProps) => {
//   const cookies = new Cookies(null, {
//     path: "/",
//     maxAge: 1000 * 365 * 24 * 60 * 60,
//   })

  const closeModal = () => {
    closeModalFunction(false)
  }

  const [currTask, setCurrTask] = useState<TaskState>({ title: "", list: "0" })

  const handleTaskSave = (e: React.FormEvent) => {
    e.preventDefault()
    // const randomID = Math.random().toString(36).slice(2)
    // const uid = cookies.get("uid")

    // set(ref(db, `tasks/${uid}/list${currTask.list}/${randomID}`), {
    //   title: currTask.title,
    //   EditedTime: Date.now(),
    //   isChecked: false,
    // })

    closeModal()
  }

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50" />
      <div className="fixed inset-0 flex items-center justify-center z-10">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mx-4 p-6 flex flex-col">
          <form onSubmit={handleTaskSave}>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="text-2xl bg-transparent border-none cursor-pointer"
              >
                x
              </button>
            </div>
            
            <div className="text-center mt-2">
              <h1 className="text-2xl font-bold">Add Task</h1>
            </div>
            
            <div className="flex justify-center items-center text-xl my-8">
              <div className="w-full flex flex-col">
                <label
                  htmlFor="taskInput"
                  className="text-left text-2xl mb-4 mt-8"
                >
                  Task Title
                </label>
                <input
                  id="taskInput"
                  type="text"
                  placeholder="Add your task"
                  value={currTask.title}
                  onChange={(e) => {
                    setCurrTask({
                      ...currTask,
                      title: e.target.value,
                    })
                  }}
                  className="text-2xl leading-relaxed rounded-lg border border-gray-300 p-2"
                />
                <select
                  name="taskGroup"
                  id="taskGroup"
                  value={currTask.list}
                  onChange={(e) => {
                    setCurrTask({
                      ...currTask,
                      list: e.target.value,
                    })
                  }}
                  className="text-xl mt-4 border border-black rounded-lg p-2"
                >
                  <option value="0">Do First</option>
                  <option value="1">Do Later</option>
                  <option value="2">Delegate</option>
                  <option value="3">Eliminate</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-center items-center mt-8">
              <button
                id="cancelBtn"
                onClick={closeModal}
                type="button"
                className="w-36 h-12 mx-2 bg-red-600 text-white rounded-lg text-xl cursor-pointer"
              >
                Cancel
              </button>
              <input
                type="submit"
                value="Save"
                id="saveTask"
                className="w-36 h-12 mx-2 bg-blue-500 text-white rounded-lg text-xl cursor-pointer border-none"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Modal