import Swal from "sweetalert2";
import toastr from "toastr";

const GLOBAL_TOASTR_SETTINGS = {
    positionClass: 'toast-bottom-right',
    preventDuplicates: false,
    closeButton: true,
    progressBar: true,
    timeOut: 5000,
    extendedTimeOut: 2000,
    escapeHtml: false
};

export const ONLY_CLOSABLE_TOASTR_SETTINGS = {
    timeOut: 0,
    extendedTimeOut: 0,
    closeButton: true,
    tapToDismiss: false,
}


function _convertNewlinesToBr(str) {
    return str.replace(/\n/g, '<br>');
}

export function alertUserWithAPI() {
    Swal.fire({
        title: 'Submit your Github username',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Look up',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
            return fetch(`//api.github.com/users/${login}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText)
                    }
                    return response.json()
                })
                .catch(error => {
                    Swal.showValidationMessage(
                        `Request failed: ${error}`
                    )
                })
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: `${result.value.login}'s avatar`,
                imageUrl: result.value.avatar_url
            })
        }
    })
}

export function alertUserButtonsChoice(
    label = "Choose", showDeny = true, showCancel = true,
    confirmButtonText = 'save', denyButtonText = "reject", cancelButtonText = "cancel") {
    return Swal.fire({
        title: label,
        showDenyButton: showDeny,
        showCancelButton: showCancel,
        confirmButtonText: confirmButtonText,
        denyButtonText: denyButtonText,
        cancelButtonText: cancelButtonText
    }).then((result) => {
        if (result.isConfirmed) {
            return "confirm"
        } else if (result.isDenied) {
            return "deny"
        } else {
            return false
        }
    })
}

export function alertGetUserInput(
    label = "enter input", inputLabel = "input", inputPlaceholder = "input",
    allowCancel = true, confirmButtonText="confirm", cancelButtonText="cancel",
    allowEmptyInput=false, emptyInputFailText="cannot be empty") {
    Swal.fire({
        title: label,
        input: 'text',
        inputLabel: inputLabel,
        inputPlaceholder: inputPlaceholder,
        showCancelButton: allowCancel,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        inputValidator: (value) => {
            if (!allowEmptyInput) {
                if (!value) {
                    return emptyInputFailText
                }
            }
        },
    }).then((result) => {
        if (result.isConfirmed) {
            // The user clicked the "Submit" button and entered some text
            toastSuccess(`You entered: ${result.value}`);
            return result.value
        } else {
            // The user clicked the "Cancel" button
            toastWarning('Input cancelled');
            return false
        }
    });
}

export function alertGetUserInputBool(label="choose", confirmButtonText="yes", cancelButtonText="no") {
    Swal.fire({
        title: label,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
    }).then((result) => {
        if (result.isConfirmed) {
            // The user clicked the "Yes" button
            toastSuccess('Action confirmed');
            return true
        } else {
            // The user clicked the "No" button or clicked outside the dialog
            toastWarning('Action cancelled');
            return false
        }
    });
}

export function toastSuccess(message, options = {}) {
    toastr.success(_convertNewlinesToBr(message), '', {...GLOBAL_TOASTR_SETTINGS, ...options});
}

export function toastError(message, options = {}) {
    toastr.error(_convertNewlinesToBr(message), '', {...GLOBAL_TOASTR_SETTINGS, ...options});
}

export function toastWarning(message, options = {}) {
    toastr.warning(_convertNewlinesToBr(message), '', {...GLOBAL_TOASTR_SETTINGS, ...options});
}

export function toastInfo(message, options = {}) {
    toastr.info(_convertNewlinesToBr(message), '', {...GLOBAL_TOASTR_SETTINGS, ...options});
}