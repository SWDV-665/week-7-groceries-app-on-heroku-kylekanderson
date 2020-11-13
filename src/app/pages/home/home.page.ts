import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { GroceriesService } from '../../services/groceries.service';
import { InputDialogService } from '../../services/input-dialog.service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  title = "Grocery";

  constructor(
    public toastController: ToastController,
    public alertController: AlertController,
    public dataService: GroceriesService,
    public inputDialogService: InputDialogService
  ) { }

  loadItems() {
    return this.dataService.getItems();
  }

  async removeItem(item, index) {
    console.log('removing item: ', item, index);
    const toast = await this.toastController.create({
      message: 'Removing Item - ' + item.name + '...',
      duration: 2000
    });
    toast.present();

    this.dataService.removeItem(index);
  }

  async editItem(item, index) {
    this.inputDialogService.showPrompt(item, index);
  }

  addItem() {
    this.inputDialogService.showPrompt();
  }
}
