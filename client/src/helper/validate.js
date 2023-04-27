import {toast, Toaster} from 'react-hot-toast'

export async function passwordValidate(values){
    const errors = passwordVerify({}, values);
    return errors;
}

function passwordVerify(error = {}, values) {

    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if(!values.password){
        error.password = toast.error('Password Required')
    }else if (values.password.includes(" ")) {
        error.password = toast.error('Invalid Password ')        
    }

    return error;
    
}