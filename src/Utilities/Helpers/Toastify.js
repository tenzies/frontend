import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastifyOptions = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
}

const showToastify = (statusCode, msg) => {
  switch(statusCode) {
    case 200:
      toast(msg, toastifyOptions)
      break;
    case 201:
      toast.success(msg, toastifyOptions);
      break;
    case 204:
      toast.success(msg, toastifyOptions);
      break;
    case 400:
      toast.warn(msg, toastifyOptions);
      break
    case 404:
      toast.error(msg, toastifyOptions);
      break;
    case 408:
      toast.info(msg, toastifyOptions);
      break;
    default:
      toast.error('Invalid status Code', toastifyOptions)
      break;
  }
}

export default showToastify;