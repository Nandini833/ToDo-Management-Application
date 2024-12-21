import React, { useEffect, useState } from 'react';

const Todo = () => {
    const [input, setInput] = useState('');
    const [inputs, setInputs] = useState([]);
    const [showUpdate, setShowUpdate] = useState(false);
    const [updateInput, setUpdateInput] = useState('');
    const [updateIndex, setUpdateIndex] = useState(null);

    const onChange = (e) => {
        setInput(e.target.value);
    };

    const handleAddClick = () => {
        if (input.trim()) {
            const newInputs = [...inputs, input];
            setInputs(newInputs);
            setInput('');
            localStorage.setItem('activities', JSON.stringify(newInputs));
        }
    };

    const deleteActivity = (n) => {
        const del = inputs.filter((_, index) => index !== n);
        setInputs(del);
        localStorage.setItem('activities', JSON.stringify(del));
      
    };

    const updateActivity = (n) => {
        setShowUpdate(true);
        setUpdateIndex(n);
        setUpdateInput(inputs[n]);
    };

    const handleUpdateClick = () => {
        const updatedInputs = inputs.map((item, index) => (index === updateIndex ? updateInput : item));
        setInputs(updatedInputs);
        localStorage.setItem('activities', JSON.stringify(updatedInputs));
        setShowUpdate(false);
        setUpdateInput('');
    };

    useEffect(() => {
        const getLocalData = localStorage.getItem('activities');
              if (getLocalData) {
            setInputs(JSON.parse(getLocalData));
        }
    }, []);

    return (
        <>
            <div className='bg-slate-700 h-screen relative'>
                <div className='flex flex-col justify-center items-center'>
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className='text-white font-semibold text-3xl my-6'>ToDo Application</h1>
                        <div className='flex gap-5'>
                            <input
                                placeholder='Enter your activity here'
                                value={input}
                                onChange={onChange}
                                className='py-2 px-5 w-[350px] rounded-full outline-none'
                            />
                            <button className='bg-green-600 text-white font-semibold px-4 rounded-xl' onClick={handleAddClick}>
                                + Add
                            </button>
                        </div>
                    </div>

                    <div className='text-white my-6 font-semibold'>
                        <ul>
                            {inputs.map((item, index) => (
                                <div key={index} className='bg-orange-400 flex justify-between px-4 py-4 w-[500px] rounded-xl my-3'>
                                    <li className=''>{item}</li>
                                    <div className='flex gap-3'>
                                        <button className='bg-indigo-800 rounded-lg px-4 py-1' onClick={() => updateActivity(index)}>
                                            Update
                                        </button>
                                        <button className='bg-red-700 rounded-lg px-4 py-1' onClick={() => deleteActivity(index)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </ul>
                    </div>

                    {showUpdate && (
                        <div className='bg-white shadow-2xl drop-shadow-2xl w-[350px] h-[250px] absolute top-[170px] text-white rounded-xl'>
                            <div className='flex justify-between my-2'>
                                <p className='text-black font-semibold text-xl pl-16'>Update Activities</p>
                                <button className='text-white bg-red-700 rounded-full px-4 py-1' onClick={() => setShowUpdate(false)}>
                                    X
                                </button>
                            </div>
                            <div className='flex items-center justify-center my-8'>
                                <input
                                    placeholder='Update your activity here'
                                    value={updateInput}
                                    onChange={(e) => setUpdateInput(e.target.value)}
                                    className='py-3 px-5 w-[280px] rounded-full outline-none bg-slate-500'
                                />
                            </div>
                            <div className='flex justify-center gap-6 my-8'>
                                <button className='bg-green-800 rounded-lg px-5 py-2' onClick={handleUpdateClick}>
                                    Update
                                </button>
                                <button className='bg-red-700 rounded-lg px-5 py-2' onClick={() => setShowUpdate(false)}>
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Todo;
