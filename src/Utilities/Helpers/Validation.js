import showToastify from './Toastify';
import BadWordsFilter from 'bad-words';

const isAcceptedCredentials = ({username, password, confirmPassword}) => {
  
  
  const checkConfirm = password === confirmPassword
  if(checkConfirm) {
    const checkPassLength = (3 <= password.length && password.length <= 20);
    if(checkPassLength) {
      const checkUserLength = (3 <= username.length && username.length <= 8);
      if(checkUserLength) {
        const invalidCharacters = new RegExp('[^a-z0-9_]','ig')
        const isNotAccepted = invalidCharacters.test(username);
        const isUnappropriate = new BadWordsFilter().isProfane(username);
        if(isNotAccepted) {
          showToastify(400, 'Use only letters, numbers, and underscores');
          return false;
        }
        else if(isUnappropriate) {
          showToastify(400, 'Please provide an appropriate username');
          return false;
        }
        else return true
      }
      else {
        showToastify(400, 'Username must have 3 - 8 characters');
        return false
      }
    }
    else {
      showToastify(400, 'Password must have 3 - 16 characters');
      return false;
    }
  }
  else {
    showToastify(400, 'Passwords do not match');
    return false;
  }
}

export default isAcceptedCredentials;