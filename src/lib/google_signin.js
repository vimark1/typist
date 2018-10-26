import firebase from 'firebase';

export function signinWithGoogle(setLoading, setError, callback) {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().useDeviceLanguage();
  setLoading(true);
  firebase.auth().signInWithPopup(provider).then(auth => {
    setLoading(false);
    console.log('signup success');
    callback()
  }).catch(function(error) {
    console.log('error', error);
    setError(error);
  });
}
