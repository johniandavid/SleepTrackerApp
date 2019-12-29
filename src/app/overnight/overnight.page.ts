import { Component, OnInit } from '@angular/core';
import {OvernightSleepData} from "../data/overnight-sleep-data";
import {SleepService} from "../services/sleep.service";
import {NavController, ToastController} from "@ionic/angular";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'app-overnight',
  templateUrl: './overnight.page.html',
  styleUrls: ['./overnight.page.scss'],
})

export class OvernightPage implements OnInit {
    private sleepStart: Date;
    private sleepEnd: Date;

    constructor(public sleepService: SleepService, public navCtrl: NavController, public storage: Storage, public toastController: ToastController) {
    }

    ngOnInit() {
    }

    handleSleepStart(sleep) {
        let newSleep = new Date(sleep);
        var yesterday = new Date(newSleep.getTime());
        yesterday.setDate(newSleep.getDate() - 1);
        this.sleepStart = yesterday;

    }

    handleSleepEnd(wake: Date) {
        this.sleepEnd = new Date(wake);
    }

    get allSleepData() {
        return SleepService.AllSleepData;
    }

    buttonClicked() {
        if (this.sleepStart != undefined && this.sleepEnd != undefined) {
            let data = new OvernightSleepData(this.sleepStart, this.sleepEnd);
            this.sleepService.logOvernightData(data);
            this.storage.set(data.id, data);
            console.log("Created and saved: " + data.id);
            this.storage.keys().then((keys) => {
                console.log("Local Storage: " + keys);
            })
            this.navCtrl.navigateRoot('/home');
        }
        else {
            this.toastController.create({
                message: 'Please log your sleep and wake times',
                position: 'top',
                duration: 1000
            }).then((toast) => {
                toast.present();
            });
        }
    }
}
