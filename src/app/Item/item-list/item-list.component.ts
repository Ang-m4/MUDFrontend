import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/model/item';
import { ItemService } from 'src/app/Shared/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {


  items: Item[] = [];

  constructor(private itemService: ItemService) { }
  
  ngOnInit(): void {

    this.loadItems()
  }

  delete(id:number){

    this.itemService.delete(id).subscribe(a=> this.loadItems())    
  }

  loadItems(){
    this.itemService.findAll().subscribe(items=>{this.items = items})
  }

}
