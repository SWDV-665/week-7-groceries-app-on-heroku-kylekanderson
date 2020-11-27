import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GroceriesService } from './groceries.service';


@Injectable({
  providedIn: 'root'
})
export class InputDialogService {

  constructor(
    public dataService: GroceriesService,
    public alertController: AlertController
  ) { }
  async showPrompt(item?, index?, itemId?) {
    const alert = await this.alertController.create({
      header: item ? 'Edit Item' : 'Add Item',
      message: item ? 'Please edit item...' : 'Please add item',
      cssClass: 'my-custom-class',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name',
          value: item ? item.name : null
        },
        {
          name: 'quantity',
          type: 'number',
          placeholder: 'Quantity',
          value: item ? item.quantity : null
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
            if (index !== undefined) {
              this.dataService.editItem(item, itemId);
            }
            else {
              this.dataService.addItem(item);
            }
          }
        }
      ]
    });
    await alert.present();
  }
}
