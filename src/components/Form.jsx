import React from 'react';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import Img from "../assets/mission neb.png"
const StudentRegistrationForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      phone: '',
      email: '',
      province: '',
      suggestion: ''
    }
  });

  const provinces = [
    'Koshi  Province ',
    'Madhesh Province',
    'Bagmati Province',
    'Gandaki Province',
    'Lumbini Province',
    'Karnali Province',
    'Sudurpashchim Province'
  ];

  const onSubmit = async (data) => {
    toast.promise(
      fetch('https://script.google.com/macros/s/AKfycbwgdcPrmGilzAEhUe5SCrIdwauk4Q0tPsepxz-54SKzoPFZlVMkcBC87m6mQv3-_dZO/exec', {
        method: 'POST',
        body: JSON.stringify(data)
      }).then(async (response) => {
        const result = await response.json();
        if (!result.success) {
          throw new Error(result.error || 'Submission failed');
        }
        reset();
        return result;
      }),
      {
        loading: 'Submitting form...',
        success: 'Form submitted successfully!',
        error: (err) => `Error: ${err.message}`
      }
    );
  };
  const showErrors = () => {
    const errorFields = Object.keys(errors);
    if (errorFields.length > 0) {
      const errorMessages = errorFields.map(field => errors[field].message);
      toast.error(
        <div>
          <strong className="block mb-1">Please fix the following errors:</strong>
          <ul className="list-disc pl-4">
            {errorMessages.map((message, index) => (
              <li key={index} className="text-sm">{message}</li>
            ))}
          </ul>
        </div>,
        {
          duration: 4000,
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: '8px',
            background: '#333',
            color: '#fff',
          },
        }}
      />
      
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-4">
            <img
              src={Img}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Student Registration</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit, showErrors)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                {...register("firstName", { 
                  required: "First name is required",
                  minLength: {
                    value: 2,
                    message: "First name must be at least 2 characters"
                  }
                })}
                className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none 
                  ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300'}
                  transition-colors duration-200`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Middle Name
              </label>
              <input
                {...register("middleName")}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                {...register("lastName", { 
                  required: "Last name is required",
                  minLength: {
                    value: 2,
                    message: "Last name must be at least 2 characters"
                  }
                })}
                className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none 
                  ${errors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-300'}
                  transition-colors duration-200`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit phone number"
                  }
                })}
                className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none 
                  ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'}
                  transition-colors duration-200`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address"
                  }
                })}
                className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none 
                  ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'}
                  transition-colors duration-200`}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Province
            </label>
            <select
              {...register("province", {
                required: "Please select a province"
              })}
              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none 
                ${errors.province ? 'border-red-500 bg-red-50' : 'border-gray-300'}
                transition-colors duration-200`}
            >
              <option value="">Select Province</option>
              {provinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Suggestions
            </label>
            <textarea
              {...register("suggestion")}
              rows="4"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentRegistrationForm;