import { generate } from 'shortid';

export class SleepData {
	id:string;
	loggedAt:Date;
	type: string;

	constructor() {
		this.id = generate();
		this.loggedAt = new Date();
	}

    setID(id:string){
        this.id = id;
    }

    setLoggedAt(loggedAt:Date){
        this.loggedAt = loggedAt;
    }

	summaryString():string {
		return 'Unknown sleep data';
	}

	dateString():string {
		return this.loggedAt.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
	}
}
