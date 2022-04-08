// Funcion para evaluar si tiene los caracteres necesarios, recibe el input completo y minLength
export const minLengthValidation = (inputData, minLength) => {
    const { value } = inputData 
    const inputParent = inputData.parentNode
    removeClassErrorSuccess(inputParent)
    if (value.length >= minLength) {
        inputParent.classList.add('success')
        return true
    }else{
        inputParent.classList.add('error')
        return false
    }
}

//Funcion para validar si es un correo valido, recibe el input completo
export const emailValidation = (inputData) => {
    // eslint-disable-next-line
    const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const { value } = inputData
    const inputParent = inputData.parentNode
    removeClassErrorSuccess(inputParent)
    const resultValidation = emailValid.test(value)

    if(resultValidation){
        inputParent.classList.add('success')
        //inputData.classList.add('success')
        return true
    } else {
        inputParent.classList.add('error')
       // inputData.classList.add('success')
        return false
    }
}

//Funcion para remover la clase de success y error
const removeClassErrorSuccess = (inputData) =>{
    inputData.classList.remove('success')
    inputData.classList.remove('error')
}

