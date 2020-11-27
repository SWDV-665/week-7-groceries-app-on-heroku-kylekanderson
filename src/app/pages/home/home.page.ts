import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { GroceriesService } from '../../services/groceries.service';
import { InputDialogService } from '../../services/input-dialog.service';
import { Plugins } from '@capacitor/core';
const { Share } = Plugins;


@Component({
  selector: 'page-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  title = "Grocery";
  items: any = [];
  errorMessage: string;

  constructor(
    public toastController: ToastController,
    public alertController: AlertController,
    public dataService: GroceriesService,
    public inputDialogService: InputDialogService
  ) {
    this.loadItems();
    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadItems();
    });
  }

  loadItems() {
    this.dataService.getItems().subscribe(response => {
      this.items = response;
      console.log(this.items);
    })
  }

  async removeItem(item, index) {
    console.log('removing item: ', item, index);
    const toast = await this.toastController.create({
      message: 'Removing Item - ' + item.name + '...',
      duration: 2000
    });
    toast.present();

    this.dataService.removeItem(item);
  }

  async shareItem(item, index) {
    console.log('sharing item: ', item, index);
    const toast = await this.toastController.create({
      message: 'Sharing Item - ' + item.name + '...',
      duration: 2000
    });
    let shareRet = await Share.share({
      title: 'Shared via Groceries App',
      text: 'Grocery Item - Name: ' + item.name + ' - Quantity: ' + item.quantity,
      dialogTitle: 'Share'
    })
      .then(() => console.log('Successful share'))
      .catch((error) => console.error('Error sharing', error));
  }

  async editItem(item, index) {
    this.inputDialogService.showPrompt(item, index, item._id);
  }

  addItem() {
    this.inputDialogService.showPrompt();
  }
}
