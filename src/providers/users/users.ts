import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../../model/users';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
/*
  Generated class for the UsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsersProvider {
userId:any
userRef:any;
firedata = firebase.database().ref('/users');

  constructor(private db: AngularFireDatabase,private afAuth:AngularFireAuth) {
    this.afAuth.authState.subscribe( user => {
      if (user) { this.userId = user.uid }
    });
    this.userRef = this.db.list<User>(`users/${this.userId}`);
  }
getUser() {
  var promise = new Promise((resolve, reject) => {
    this.firedata.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
      resolve(snapshot.val());
    }).catch((err) => {
      reject(err);
      })
    })
    return promise;
}
addUser(user: User) {
  var promise = new Promise((resolve, reject) => {
    this.firedata.child(firebase.auth().currentUser.uid).set({
      user
    }).catch((err) => {
      reject(err);
      })
    })
    return promise;
}
updateUser(user):Promise<void> {
  return firebase.database().ref(`/users/`).child(firebase.auth().currentUser.uid).update(user);
}
removeUser(user: User) {
  const personRef = firebase.database().ref(`/users/`).child(firebase.auth().currentUser.uid);
  personRef.remove()
}


}
