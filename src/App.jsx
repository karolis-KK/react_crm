import { useState } from 'react';

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  const addEmployee = (e) => {
    e.preventDefault();

    let form = e.target.form;
    let name = form.name.value;
    let age = form.age.value;
    let department = form.department.value;

    if (name.trim() !== "" && age.trim() !== "" && department.trim() !== "") {
      setEmployees(prevEmployees => [...prevEmployees, { name, age, department }]);
    }
    form.reset();
  };

  const updateEmployee = (e, index) => {
    e.preventDefault();
    setPopupContent(employees[index]); 
    setEditingIndex(index);
    setIsPopupVisible(true); 
  };

  const removePopup = () => {
    setIsPopupVisible(false);
    setPopupContent(null);
  };

  const editEmployee = (e) => {
    e.preventDefault();

    let name = e.target["name-update"].value;
    let age = e.target["age-update"].value;
    let department = e.target["department-update"].value;

    if (name.trim() !== "" && age.trim() !== "" && department.trim() !== "") {
      setEmployees((prevEmployees) =>
        prevEmployees.map((employee, index) =>
          index === editingIndex ? { name, age, department } : employee
        )
      );
    }
    removePopup();
  };

  return (
    <section id="section" className="flex justify-center h-screen">
      {isPopupVisible && (
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-4 rounded-md flex justify-center flex-col'>
            <button onClick={removePopup} className="mb-4 px-2 py-1 bg-gray-200 rounded">Close</button>
            <div className='flex'>
              <form onSubmit={editEmployee}>
                <input 
                  type="text" 
                  placeholder="Name" 
                  value={popupContent?.name || ''} 
                  name="name-update" 
                  id="name-update"
                  onChange={(e) =>
                    setPopupContent({ ...popupContent, name: e.target.value })
                  }
                />
                <input 
                  type="text" 
                  placeholder="Age" 
                  value={popupContent?.age || ''} 
                  name="age-update" 
                  id="age-update"
                  onChange={(e) =>
                    setPopupContent({ ...popupContent, age: e.target.value })
                  }
                />
                <input 
                  type="text" 
                  placeholder="Department" 
                  value={popupContent?.department || ''} 
                  name="department-update" 
                  id="department-update"
                  onChange={(e) =>
                    setPopupContent({ ...popupContent, department: e.target.value })
                  }
                />
                <button type="submit" className="mt-2 px-4 py-1 bg-blue-500 text-white rounded">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className='flex flex-col justify-start mt-24'>
        <div className='flex gap-4'>
          <form className='gap-4'>
            <input
              className="border border-neutral-500 rounded-md"
              placeholder="Name"
              type="text"
              name="name"
              id=""
            />
            <input
              className="border border-neutral-500 rounded-md"
              placeholder="Age"
              type="text"
              name="age"
              id=""
            />
            <input
              className="border border-neutral-500 rounded-md"
              placeholder="Department"
              type="text"
              name="department"
              id=""
            />
            <button
              className="rounded-md px-2 py-1.5"
              onClick={addEmployee}
              type="button"
            >
              Add Employee
            </button>
          </form>
        </div>
        <div className='text-center'>
          {
            employees.length > 0 ? (
              <table className="border-collapse border border-neutral-500 w-full">
                <thead>
                  <tr className="bg-gray-200 border border-neutral-500">
                    <th className="px-4 py-2 border border-neutral-500">Name</th>
                    <th className="px-4 py-2 border border-neutral-500">Age</th>
                    <th className="px-4 py-2 border border-neutral-500">Department</th>
                    <th className="px-4 py-2 border border-neutral-500">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    employees.map((e, index) => (
                      <tr key={index}>
                        <td className='border border-neutral-500 border-collapse'>{e.name}</td>
                        <td className='border border-neutral-500 border-collapse'>{e.age}</td>
                        <td className='border border-neutral-500 border-collapse'>{e.department}</td>
                        <td className='flex justify-center items-center mt-1.5'>
                          <button onClick={(ev) => updateEmployee(ev, index)} className="px-2 py-1 bg-gray-200 rounded">
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            ) : <h1>No employees</h1>
          }
        </div>
      </div>
    </section>
  );
}
