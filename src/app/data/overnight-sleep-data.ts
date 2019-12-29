import { SleepData } from './sleep-data';

export class OvernightSleepData extends SleepData {
	 private sleepStart:Date;
     private sleepEnd:Date;

	constructor(sleepStart:Date, sleepEnd:Date) {
		super();
		this.sleepStart = sleepStart;
		this.sleepEnd = sleepEnd;
		this.type = "Overnight Sleep Log";
	}

	format(time):string
	{
        let hours = time.getHours() > 12 ? time.getHours() - 12 : time.getHours();
        let clock = time.getHours() >= 12 ? "PM" : "AM";
        hours = hours < 10 ? "0" + hours : hours;
        let minutes = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
        return hours + ":" + minutes + " " + clock;
	}

	totalSleepString():string{

        var sleepStart_ms = this.sleepStart.getTime();
        var sleepEnd_ms = this.sleepEnd.getTime();

        // Calculate the difference in milliseconds
        var difference_ms = sleepEnd_ms - sleepStart_ms;

        // Convert to hours and minutes
		return Math.floor(difference_ms / (1000*60*60)) + " hours and " + Math.floor(difference_ms / (1000*60) % 60) + " minutes";
	}

	summaryString():string {
		return "You slept at " + this.format(this.sleepStart) + " and you woke up at " + this.format(this.sleepEnd) + " for a total of " + this.totalSleepString() + " of sleep";
	}

	dateString():string {
		return "Night of " + this.sleepStart.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
	}
}
