import { Injectable } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import {Storage} from "@ionic/storage";

@Injectable({
  providedIn: 'root'
})
export class SleepService {
	private static LoadDefaultData:boolean = true;
	public static AllSleepData:SleepData[] = [];
	public static AllOvernightData:OvernightSleepData[] = [];
	public static AllSleepinessData:StanfordSleepinessData[] = [];

  constructor(private storage: Storage) {
  	if(SleepService.LoadDefaultData) {
      this.refreshData();
  		SleepService.LoadDefaultData = false;
  	}
  }
  public refreshData() {
      SleepService.AllSleepData = [];
      SleepService.AllOvernightData = [];
      SleepService.AllSleepinessData = [];

      this.storage.keys().then(keys =>{
          for(let i = 0; i < keys.length; i++){
              this.storage.get(keys[i]).then(data => {
                  if(data.type == "Overnight Sleep Log"){
                      let entry = new OvernightSleepData(data.sleepStart,data.sleepEnd);
                      entry.setID(data.id);
                      entry.setLoggedAt(data.loggedAt);
                      this.logOvernightData(entry);
                  }
                  else if(data.type == "Sleepiness Log"){
                      let entry = new StanfordSleepinessData(data.loggedValue);
                      entry.setID(data.id);
                      entry.setLoggedAt(data.loggedAt);
                      this.logSleepinessData(entry);
                  }
              });
          }
      });
  }

  public delete(id:string){
      this.storage.remove(id).then(  function(){
          console.log("deleted: " + id);
      });
      this.storage.keys().then((keys) => {
          console.log("Local Storage: " + keys);
      })
  }

  public logOvernightData(sleepData:OvernightSleepData) {
  	SleepService.AllSleepData.push(sleepData);
  	SleepService.AllOvernightData.push(sleepData);
  }

  public logSleepinessData(sleepData:StanfordSleepinessData) {
  	SleepService.AllSleepData.push(sleepData);
  	SleepService.AllSleepinessData.push(sleepData);
  }

}
