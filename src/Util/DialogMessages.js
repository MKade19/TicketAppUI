import Swal from "sweetalert2";

class DialogMessages {
    successMessage = message => {
        Swal.fire({
            title: message,
            icon: "success",
            toast: true,
            timer: 3000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
        });
    }

    errorMessage = message => {
        Swal.fire({
            title: message,
            icon: "error",
            toast: true,
            timer: 3000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
        });
    }

    confirmMessage = message => {
        return Swal.fire({
            title: "Please confirm",
            text: message,
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: 'No',
            confirmButtonColor: '#007bff',
            customClass: {
                actions: 'my-actions',
                cancelButton: 'order-1 right-gap',
                confirmButton: 'order-2',
                denyButton: 'order-3',
            },
        });
    }
}

const dialogMesages = new DialogMessages();
export default dialogMesages;