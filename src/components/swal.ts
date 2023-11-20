// swal.ts
import Swal from 'sweetalert2';

const showSuccessAlert = (message: string) => {
  return Swal.fire({
    icon: 'success',
    title: 'Sucesso!',
    text: message,
  });
};

const showErrorAlert = (message: string) => {
  return Swal.fire({
    icon: 'error',
    title: 'Erro!',
    text: message,
  });
};

export { showSuccessAlert, showErrorAlert };
