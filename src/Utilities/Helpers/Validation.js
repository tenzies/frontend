import showToastify from './Toastify';
import BadWordsFilter from 'bad-words';

const isAcceptedCredentials = ({username, password, confirmPassword}) => {
  const isUnappropriate = new BadWordsFilter().isProfane(username);
  const invalidCharacters = new RegExp('[^a-z0-9_]','ig')
  const isNotAccepted = invalidCharacters.test(username);
  const checkConfirm = password === confirmPassword
  if(checkConfirm) {
    const checkUserLength = (3 <= username.length && username.length <= 16);
    const checkPassLength = (3 <= password.length && password.length <= 16);
    if(checkUserLength && checkPassLength) {
      if(isUnappropriate) {
        showToastify(400, 'Please provide an appropriate username');
        return false;
      }
      else if(isNotAccepted) {
        showToastify(400, 'Use only letters, numbers, and underscores');
        return false;
      }
      else return true
    }
    else {
      showToastify(400, 'Credentials must have 3 - 16 characters');
      return false;
    }
  }
  else {
    showToastify(400, 'Passwords do not match');
    return false;
  }
}

export default isAcceptedCredentials;