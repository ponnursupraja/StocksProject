export class Registration {
    public name : string ;
    public password : string;
    public email: string;
    public address : string;

    constructor(name : string, email : string , address : string , password : string){
        this.name = name;
        this.email=email;
        this.address=address;
        this.password=password;

    }
}