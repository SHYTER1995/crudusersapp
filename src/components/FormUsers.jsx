import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const defaultValues = {
    email: '',
    password: '',
    first_name:'',
    last_name:'',
    birthday: '',
}

const FormUsers = ({createUser, userUpdate,updateUser,isShowForm, handleChangeShowModal}) => {

const {handleSubmit, register, reset, formState:{errors}} = useForm()

const submitForm = (data) => {
    if(userUpdate){
        updateUser(userUpdate.id, data)
    }else{
    createUser(data)  
    }
    reset(defaultValues)
};

const regularExpression = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i


const titleForm = userUpdate ? 'Edit User' : 'New User'
const textButton = userUpdate ? 'Edit User' : 'Add new user'

useEffect(() => {
    if(userUpdate){
    reset(userUpdate);
    } else {
        reset(defaultValues)
    }
}, [userUpdate]);   
    
return (
    
<div className={`container-form ${isShowForm ? '':'disable-form'}`}>
    <form className='form' onSubmit={handleSubmit(submitForm)}>
    <i onClick={handleChangeShowModal} className='form_x bx bx-x-circle'></i>
        <h2 className='form_title'>{titleForm}</h2>
        <div className='form_div'>
            <label className='form_label' htmlFor="">Email</label>
            <input className='form_input' placeholder='Enter your email' type="text" {...register('email', {
    required: 'Email is required', 
    minLength: {
        message: 'Email is too short',
        value:1,
    },
    maxLength: {
        message: 'Email is too long',
        value: 150,
    },
    pattern: {
        message: 'Write a valid email',
        value: regularExpression
    }
})}/>
            {
                errors.email && <p>{errors.email.message}</p>    
            }
        </div>
        <div className='form_div'>
            <label className='form_label' htmlFor="">Password</label>
            <input className='form_input' placeholder='Enter your password' type="password" {...register('password')} />
        </div>
        <div className='form_div'>
            <label className='form_label' htmlFor="">First Name</label>
            <input className='form_input' placeholder='Enter your first name' type="text" {...register('first_name')} />
        </div>
        <div className='form_div'>
            <label className='form_label' htmlFor="">Last Name</label>
            <input className='form_input' placeholder='Enter your last name' type="text" {...register('last_name')} />
        </div>
        <div className='form_div'>
            <label className='form_label' htmlFor="">Birthday</label>
            <input className='form_input' type="date" {...register('birthday')} />
        </div>
        <button className='form_btn'>{textButton}</button>
    </form>
</div>
)
}

export default FormUsers
