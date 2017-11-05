
export class User {
    id: string;
    name: string;

    deserialize(json: any, id: any) {
        this.id = id;
        this.name = json.name;
        return this
    }
}