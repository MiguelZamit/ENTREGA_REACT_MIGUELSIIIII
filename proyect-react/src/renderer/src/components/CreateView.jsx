import { useNavigate } from "react-router-dom";
import { useState } from "react";

import "../assets/style.css"

export default function CreateView({ tasks, setTasks, setFilteredTasks, setIds, ids }) {


    function getLastId() {
        if (tasks.length === 0) {
            return 0; 
        }
     
        return Math.max(...tasks.map(task => task.id));
    }

    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        title: "",
        description: "",
        status: "Pending",
        deadline: "",
    });

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    }

    function handleCreateTask(event) {
        event.preventDefault();

        let { deadline } = formValues;

        if (!deadline) {
            const newDeadline = new Date();
            newDeadline.setDate(newDeadline.getDate() + 7);
            deadline = newDeadline.toISOString().split("T")[0];
        }

        var id = getLastId()
        ++id
        const newTask = {
            name: formValues.title,
            description: formValues.description,
            status: formValues.status,
            deadline,
            isChecked: false,
            id: id, 
            date: new Date().toISOString(),
        };


        const newList = [...tasks, newTask];
        setTasks(newList);
        setFilteredTasks(newList);
        setIds(ids);

        window.api.addTask(newTask);

        navigate("/");
    }


    async function handleDiscard() {
        const { title } = formValues;

        window.api
            .openConfirmationDialog(
                title,
                "Are you sure you want to discard this item?"
            )
            .then((confirmed) => {
                if (confirmed) {
                    navigate("/");
                }
            });
    }

    return (
        <>

            <div id="container" >

                <div className="d-flex flex-column align-items-center justify-content-center vh-100">
                    <form action="" onSubmit={handleCreateTask}>
                        <p className="text"> Creation View</p>

                        <div className="d-flex flex-column align-items-center justify-content-center" id="contents">


                            <label>Title</label>

                            <div className="iptTitle">

                                <input
                                    type="text"
                                    id="iptTitle"
                                    name="title"
                                    placeholder="Example: Clean the car..."
                                    value={formValues.title}
                                    onChange={handleInputChange}
                                    required
                                />

                            </div>

                            <label>Description</label>
                            <div className="mb-3">

                                <textarea
                                    id="iptDescription"
                                    name="description"
                                    placeholder="Write anything you want..."
                                    value={formValues.description}
                                    onChange={handleInputChange}
                                ></textarea>
                            </div>

                            <label>Status</label>
                            <div className="mb-3">
                                <select
                                    name="status"
                                    id="iptStatus"
                                    value={formValues.status}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Canceled">Canceled</option>
                                </select>

                            </div>


                            <label>Deadline</label>
                            <div className="mb-3 ">

                                <input
                                    type="date"
                                    id="iptDeadline"
                                    name="deadline"
                                    value={formValues.deadline}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="d-flex align-items-center justify-content-center mb-2" id="createButons">
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>

                                <button type="button" className="btn btn-primary" onClick={handleDiscard}>
                                    Discard
                                </button>
                            </div>


                        </div>
                    </form>

                </div>



            </div>




        </>
    );
}
