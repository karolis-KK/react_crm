import { useState } from 'react';

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);  // To control the popup visibility
  const [popupContent, setPopupContent] = useState(null);  // Store the content for the popup

  const addEmployee = (e) => {
    e.preventDefault();

    const form = e.target.form;
    const name = form.name.value;
    const age = form.age.value;
    const department = form.department.value;

    if (name.trim() !== "" && age.trim() !== "" && department.trim() !== "") {
      setEmployees(prevEmployees => [...prevEmployees, { name, age, department }]);
    }
    form.reset();
  }

  const updateEmployee = (e, index) => {
    setPopupContent(employees[index]);
    setIsPopupVisible(true);
  }

  const removePopup = () => {
    setIsPopupVisible(false);  // Hide the popup
  }

  return (
    <section id="section" className="flex justify-center h-screen">
      {isPopupVisible && (
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 items-center justify-center z-50'>
          <div className='bg-white p-4 rounded-md flex justify-center flex-col'>
            <button onClick={removePopup}>Close</button>
            <h1>{popupContent?.name}</h1>
            <p>Age: {popupContent?.age}</p>
            <p>Department: {popupContent?.department}</p>
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
                          <button onClick={(e) => updateEmployee(e, index)}>
                            <svg className="size-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                            </svg>
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
  )
}
