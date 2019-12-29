import { Component } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import {AlertController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {SocialSharing} from "@ionic-native/social-sharing/ngx";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
    public datas: any;

    constructor(public storage: Storage, public sleepService: SleepService, public alertController: AlertController, private socialSharing: SocialSharing) {
        this.datas = this.allSleepData;
        this.storage.length().then((response) =>{
            if(response === 0){
                this.presentAlert();
            }
        })
    }

    async sendTweet(data) {
        var message = "";

        if (data.type == "Sleepiness Log") {
            message = "On " + data.dateString() + " my energy level was at a " + data.loggedValue + ". I felt " + data.summaryString() + ".";
        }
        else if (data.type == "Overnight Sleep Log") {
            message = data.dateString() + ". I got " + data.totalSleepString() + " of sleep.";
        }

        this.socialSharing.canShareVia('Twitter').then(() => {
            this.socialSharing.shareViaTwitter(message + " -- Tweeted via SleepTrackerApp").then((res) => {
            }).catch((e) => {
                console.log(e);
            })
        }).catch(() => {
        });
    }

    deleteData(data){
        this.sleepService.delete(data.id);
        this.sleepService.refreshData();
        this.datas = this.allSleepData;
    }

    presentAlert() {
        this.alertController.create({
            header: 'Welcome to Sleep Tracker ',
            message: 'To get started press the Red Button to create a Overnight Sleep Log or Sleepiness Log ',
            buttons: ['Got it!']
        }).then((alert) => {
            alert.present();
        });
    }

    ngOnInit(){}

    /* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
    get allSleepData() {
        return SleepService.AllSleepData;
    }
}

