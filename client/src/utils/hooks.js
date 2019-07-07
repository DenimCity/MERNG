import { useState } from 'react';


export const useForm = (callback, initialState = {} ) => {

      const [values, setValues] = useState(initialState)

      const onChange = async (e) => {
            setValues({...values, [e.target.name]: e.target.value })
      }

      const onSubmit = e => {
      e.preventDefault()
      try {
          callback();
      } catch (error) {
            console.log(error.message) 
            }
      }

      return {
            onChange,
            onSubmit,
            values
      }
}