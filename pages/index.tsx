import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import {
  useColorMode,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  Input,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { MyContext } from "./../data/AppContext";
const Home: NextPage = () => {
  // togglecolormode is a function which will be called to change app theme to dark/light mode
  const { data, dispatch } = useContext(MyContext);
  const { colorMode, toggleColorMode } = useColorMode();
  const [activeTodoId, setActiveTodoId] = useState(data[0].id);
  const [activeTodo, setActiveTodo] = useState(data[0]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [todoModalOpen, setTodoModalOpen] = useState(false);

  useEffect(() => {
    let todo = data.filter((todo) => todo.id === activeTodoId)[0];
    if (todo.name) {
      setActiveTodo(todo);
    }
  }, [activeTodoId]);
  function AddNewList() {
    if (dispatch && inputText) {
      dispatch({ type: "CREATE_NEW_LIST", payload: inputText });
      setInputText("");
      setModalOpen(false);
    }
  }
  function AddNewTodo() {
    if (dispatch && inputText) {
      dispatch({
        type: "ADD_NEW_TODO",
        payload: { id: activeTodoId, text: inputText },
      });
      setInputText("");
      setTodoModalOpen(false);
    }
  }
  function markComplete(index: number) {
    if (dispatch) {
      dispatch({ type: "MARK_COMPLETE", payload: { id: activeTodoId, index } });
    }
  }
  function markPending(index: number) {
    if (dispatch) {
      dispatch({ type: "MARK_PENDING", payload: { id: activeTodoId, index } });
    }
  }
  return (
    <div>
      <Head>
        <title>Next Todo App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex">
        {/* Section for showing todo lists */}
        <section className="flex flex-col w-2/12 border min-h-screen max-[800px]:w-28">
          <div className="flex items-center py-3 px-4 max-[800px]:flex-col ">
            <Image
              src="/assets/user1.jpg"
              alt="icon"
              width="35"
              height="35"
              className="mr-4 rounded-full shadow-lg max-[800px]:mr-0"
            />
            <p className="flex-1 font-medium">Awais</p>
            <Image
              src={
                colorMode == "light"
                  ? "/assets/search.png"
                  : "/assets/search-white.png"
              }
              width="22"
              height="22"
              alt="search-icon"
              className="cursor-pointer max-[800px]:hidden"
            />
          </div>
          <h1 className="font-medium ml-3 my-4">Your Lists</h1>
          {data.map(
            (
              obj: {
                id: number;
                todos: { text: string; status: "pending" | "complete" }[];
                name: string;
                createdAt: string;
              },
              i: number
            ) => {
              return (
                <div
                  onClick={() => setActiveTodoId(obj.id)}
                  className="flex items-center py-3 px-4 cursor-pointer transition hover:bg-gray-200"
                  key={obj.id}
                >
                  <Image
                    src="/assets/todo1.png"
                    alt="icon"
                    width="25"
                    height="25"
                    className="mr-4 max-[800px]:hidden"
                  />
                  <p className="flex-1">{obj.name}</p>
                  <p>{obj.todos.length > 0 ? obj.todos.length : ""}</p>
                </div>
              );
            }
          )}
          <div
            className="flex items-center py-3 px-4 cursor-pointer hover:underline"
            onClick={() => setModalOpen(true)}
          >
            <Image
              src="/assets/add.png"
              alt="icon"
              width="35"
              height="35"
              className="mr-2 rounded-full"
            />
            <p className="flex-1 font-medium max-[800px]:hidden">
              Add new list
            </p>
          </div>
        </section>

        {/* Section for showing todo items in each list */}
        <section className="p-12 flex-1">
          <div className="flex justify-between w-full">
            <div>
              <h1 className="font-semibold text-3xl">{activeTodo.name}</h1>
              <p className="font-medium text-gray-400 mt-2 text-xs">
                {activeTodo.createdAt}
              </p>
            </div>
            <div className="flex items-center max-[800px]:flex-col-reverse">
              <Button
                onClick={() => setTodoModalOpen(true)}
                className="max-[800px]:-mb-12 max-[800px]:mt-6"
              >
                Add Todo
              </Button>
              <Image
                src={
                  colorMode == "light"
                    ? "/assets/dark.png"
                    : "/assets/light.png"
                }
                alt="toggle-color"
                width={colorMode == "light" ? "30" : "40"}
                height={colorMode == "light" ? "30" : "40"}
                className="ml-3 cursor-pointer transition-all max-[800px]:-mt-12 max-[800px]:-mr-16"
                onClick={toggleColorMode}
              />
            </div>
          </div>
          <div className="mt-12 h-1/2">
            {activeTodo.todos.map(
              (
                item: { text: string; status: "pending" | "complete" },
                index: number
              ) => {
                return item.status == "pending" ? (
                  <div
                    key={index}
                    className="flex items-center px-3 py-2 my-2 w-6/12 cursor-pointer 
                    max-[800px]:w-full"
                  >
                    <Image
                      src="/assets/unchecked.png"
                      alt="unchecked-icon"
                      width="25"
                      height="25"
                      className="mx-3 cursor-pointer"
                      onClick={() => {
                        markComplete(index);
                      }}
                    />
                    <p className="w-full">{item.text}</p>
                    <Image
                      src="/assets/delete.png"
                      alt="icon"
                      width="30"
                      height="30"
                      className="cursor-pointer"
                      onClick={() =>
                        dispatch
                          ? dispatch({
                              type: "DELETE_A_TODO",
                              payload: { id: activeTodoId, index },
                            })
                          : {}
                      }
                    />
                  </div>
                ) : (
                  ""
                );
              }
            )}
            {/* Completed Todos */}
            <h2 className="mt-4 font-semibold">Completed</h2>
            {!activeTodo.todos.find((todo) => todo.status == "complete") && (
              <p className="w-full text-center text-gray-500 font-semibold mt-12">
                No completed tasks
              </p>
            )}
            <div style={{ minHeight: "30vh" }}>
              {activeTodo.todos.map(
                (
                  item: { text: string; status: "pending" | "complete" },
                  index: number
                ) => {
                  return item.status === "complete" ? (
                    <div
                      key={index}
                      className="flex items-center px-3 py-2 my-2 w-6/12 max-[800px]:w-full"
                    >
                      <Image
                        src="/assets/checked.png"
                        alt="unchecked-icon"
                        width="25"
                        height="25"
                        className="mx-3 cursor-pointer"
                        onClick={() => markPending(index)}
                      />
                      <p className="w-full line-through text-gray-500">
                        {item.text}
                      </p>
                      <Image
                        src="/assets/delete.png"
                        alt="icon"
                        width="30"
                        height="30"
                        className="cursor-pointer"
                        onClick={() =>
                          dispatch
                            ? dispatch({
                                type: "DELETE_A_TODO",
                                payload: { id: activeTodoId, index },
                              })
                            : {}
                        }
                      />
                    </div>
                  ) : (
                    ""
                  );
                }
              )}
            </div>
          </div>
        </section>
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Todo List</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                placeholder="Enter new list name.."
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button mr={3} onClick={AddNewList}>
                Add
              </Button>
              <Button variant="ghost" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal isOpen={todoModalOpen} onClose={() => setTodoModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Todo</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                placeholder="Enter Todo Details..."
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button mr={3} onClick={AddNewTodo}>
                Save
              </Button>
              <Button variant="ghost" onClick={() => setTodoModalOpen(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </main>
    </div>
  );
};

export default Home;
