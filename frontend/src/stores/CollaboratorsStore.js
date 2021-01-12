import { EventEmitter } from 'fbemitter';
import CODES from '../codes.json';
import UserStore from '../stores/UserStore';

const SERVER_URL = process.env.REACT_APP_API_BASEURL;

class CollaboratorsStore {

    constructor() {

        this.collaborators = [];
        this.object = {};
        this.emitter = new EventEmitter();
    }

    
    create(userID, sharedID) {
        if (userID > 0 && sharedID > 0) {
            let collab = {
                userId: parseInt(userID),
                sharedId: parseInt(sharedID)
            };
            try {
                fetch(SERVER_URL + '/collaborators', { 
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(collab)
                });
            } catch (err) {
                console.error(err);
            }
        }
    }

    async getCollaboratorsBySharedId(id) {
        if (id > 0) {
            let response = await fetch(SERVER_URL + `/shared/${id}/collaborators`);
            let data = await response.json();

            let collabs = data;

            let userStore = new UserStore();
            for (let i = 0; i< collabs.length; i++) {
                let user = await userStore.getUserById(collabs[i].userId);
                this.collaborators.push(user);
            }
           

        }
        this.emitter.emit(CODES.CODE_GET_COLLABORATORS);

    }

    async delete(sharedId, userId) {
        fetch(SERVER_URL + `/shared/${sharedId}/collaborators/${userId}`, {
            method: 'DELETE'
        });
        console.log()
        this.getCollaboratorsBySharedId(sharedId);
    }

}


export default CollaboratorsStore;