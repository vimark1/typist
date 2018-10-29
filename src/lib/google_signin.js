import firebase from 'firebase/app';

export function signinWithGoogle(setLoading, setError, callback) {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().useDeviceLanguage();
  setLoading(true);
  firebase.auth().signInWithPopup(provider).then(auth => {
    setLoading(false);
    callback()
  }).catch(function(error) {
    setError(error);
  });
}
