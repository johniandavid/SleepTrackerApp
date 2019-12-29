import { Component, OnInit } from '@angular/core';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import {NavController, ToastController} from "@ionic/angular";
import {SleepService} from "../services/sleep.service";
import {Storage} from "@ionic/storage";
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-sleepiness',
  templateUrl: './sleepiness.page.html',
  styleUrls: ['./sleepiness.page.scss'],
})
export class SleepinessPage implements OnInit {
    public loggedValue: number;
    public ScaleValues = [undefined,//Sleepiness scale starts at 1
        'Feeling active, vital, alert, or wide awake', //1
        'Functioning at high levels, but not at peak; able to concentrate', //2
        'Awake, but relaxed; responsive but not fully alert', //3
        'Somewhat foggy, let down', //4
        'Foggy; losing interest in remaining awake; slowed down', //5
        'Sleepy, woozy, fighting sleep; prefer to lie down', //6
        'No longer fighting sleep, sleep onset soon; having dream-like thoughts'];

    constructor(public sleepService:SleepService, public navCtrl : NavController, public storage: Storage, public toastController:ToastController,private localNotifications: LocalNotifications) {
        this.loggedValue = 1;
    }

  ngOnInit() {
  }

  ionViewDidEnter(){
      this.loggedValue = 1;
  }

  handleRange(num){
      this.loggedValue = num;
  }

  buttonClicked(){
        if(this.loggedValue != undefined){
            let data = new StanfordSleepinessData(this.loggedValue);
            this.sleepService.logSleepinessData(data);
            this.storage.set(data.id, data);
            console.log("Created and saved: " + data.id);
            this.storage.keys().then(function (key) {
                console.log("Local Storage " + key);
                console.log("Sleep Service Storage: " + SleepService.AllSleepData);
            })
            this.navCtrl.navigateRoot('/home');
        }
        else{
            this.toastController.create({
                message: 'Please log your energy level',
                position: 'top',
                duration: 1000
            }).then((toast) => {
                toast.present();
            });
        }
  }

    get allSleepData() {
        return SleepService.AllSleepData;
    }

}
