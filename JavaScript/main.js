let userId = '';
let userName = '';
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    userId = user.uid;
    userName = user.displayName;
    init();
  } else {
    console.log(user + '' + 'logged out');
  }
});

function init(){
  const token = localStorage.getItem('token');
  if(!token){
    const docId = firebase.firestore().collection('docs')
                                      .doc(userId)
                                      .collection('documents')
                                      .doc().id;
      localStorage.setItem('token', docId);
    }else{
        delay(function(){
          getSingleDocDetails(token);
        }, 1000 );
    }
}


const editor = document.getElementById('editor');
let dos = '';

editor.addEventListener('input', e => {
  dos = e.target.innerHTML;
  delay(function(){
    addDoc(word);
  }, 1000 );
});

var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();


function addDoc(word) {

    const docId = localStorage.getItem('token');
  
      firebase
      .firestore()
      .collection('docs').doc(userId)
      .collection('documents').doc(docId).set({
        name: userName,
        createdAt: new Date(),
        updated: new Date(),
        content: word,
      })
      .then(() => {
        loading.style.display = 'none';
      })

      .catch(function(error) {
        console.error('Error writing document: ', error);
      });
  }