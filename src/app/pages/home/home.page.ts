import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  title = "Grocery";

  items = [
    {
      name: "Milk",
      quantity: 2,
    },
    {
      name: "Bread",
      quantity: 1,
    },
    {
      name: "Banana",
      quantity: 3,
    },
    {
      name: "Sugar",
      quantity: 1,
    },
  ];

  constructor(public toastController: ToastController, public alertController: AlertController) { }

  async removeItem(item, index) {
    console.log('removing item: ', item, index);
    const toast = await this.toastController.create({
      message: 'Removing Item - ' + item.name + '...',
      duration: 2000
    });
    toast.present();

    this.items.splice(index, 1);
  }

  addItem() {
    this.presentAlertPrompt();
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Add Item',
      message: 'Please enter item...',
      cssClass: 'my-custom-class',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name'
        },
        {
          name: 'quantity',
          type: 'number',
          placeholder: 'Quantity'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: data => {
            console.log('Confirm Cancel', data);
          }
        }, 
        {
          text: 'Ok',
          handler: item => {
            console.log('Confirm Ok', item);
            this.items.push(item);
          }
        }
      ]
    });
    await alert.present();
  }
}
