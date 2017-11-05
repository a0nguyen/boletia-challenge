import { User } from '../../shared/models/user.model';

export class Event {
    id: string;
    pictureUrl: string
    comissionCard: number
    comissionDeposit: number    
    name: string
    userId: string
    user: User

    deserialize(json: any, id: any) {
        this.id = id;
        this.name = json.name;
        this.userId = json.user_id
        this.comissionDeposit = json.comission_deposit
        this.comissionCard = json.comission_card        
        this.pictureUrl = json.picture_url
        return this;
    }
}