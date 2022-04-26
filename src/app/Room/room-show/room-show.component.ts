import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DecorativeItem } from 'src/app/model/decorative-item';
import { Item } from 'src/app/model/item';
import { Monster } from 'src/app/model/monster';
import { Player } from 'src/app/model/player';
import { Room } from 'src/app/model/room';
import { DecorativeItemService } from 'src/app/Shared/decorative-item.service';
import { ItemService } from 'src/app/Shared/item.service';
import { MonsterService } from 'src/app/Shared/monster.service';
import { PlayerService } from 'src/app/Shared/player.service';
import { RoomService } from 'src/app/Shared/room.service';

@Component({
  selector: 'app-room-show',
  templateUrl: './room-show.component.html',
  styleUrls: ['./room-show.component.css']
})
export class RoomShowComponent implements OnInit {

  room: Room = new Room(0, "")
  monster: Monster = new Monster(0,"-- NONE --","",0,0,0,0,"","")


  roomCreateForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl('')
  });

  constructor(
    private fb: FormBuilder,
    private roomService: RoomService,
    private playerService: PlayerService,
    private monsterService: MonsterService,
    private itemService: ItemService,
    private decoItemService: DecorativeItemService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {

      let id = +params.get("id")!;
      this.roomService.findById(id).subscribe((received) => {
        this.room = received;
        this.loadFormData()
      });

    });

    this.roomCreateForm = this.fb.group({
      name: ['', [Validators.required]],
      monster: [undefined, [Validators.required]],
      players: this.fb.array([]),
      items: this.fb.array([]),
      decoItems: this.fb.array([]),
      exits: this.fb.array([])
    });

    this.itemService.itemSelected.subscribe(item => {
      this.addItem(item)
    })

    this.decoItemService.decoItemSelected.subscribe(decoItem=>{
      this.addDecoItem(decoItem)
    })

    this.playerService.playerSelected.subscribe(player=>{
      console.log(player)
      this.addPlayer(player)
    })

  }

  loadFormData() {

    this.roomCreateForm.patchValue({
      name: this.room.name
    });

    this.items.clear();
    this.room.items.forEach(item => {
      this.items.push(this.newItem(item))
    });

    this.players.clear();
    this.room.players.forEach(player => {
      this.players.push(this.newPlayer(player))
    });

    this.decoItems.clear();
    this.room.decorativeItems.forEach(decoItem => {
      this.decoItems.push(this.newDecoItem(decoItem))
    });
    
    if(this.room.monster != null){
      this.roomCreateForm.value.monster = this.room.monster
    }

    this.monsterService.monsterSelected.subscribe(received=>{
      
      if(received.id != -1){
        this.roomCreateForm.value.monster = received
      }

    })
  
  }

  /// ----------- ITEMS ---------- ///

  get items(): FormArray {
    return this.roomCreateForm.get('items') as FormArray
  }

  removeItem(i: number) {
    this.items.removeAt(i)
  }

  addItem(newItem: Item) {

    let valid = true;
    this.items.value.forEach((item: { item: Item; }) => {

      if (item.item.id == newItem.id) {
        valid = false;
      }
    })

    if ((newItem.id != -1) && valid) {

      return this.items.push(this.newItem(newItem))
    }

  }

  newItem(newItem: Item): FormGroup {
    return this.fb.group({
      item: [newItem, Validators.required]
    })
  }

  /// ----------- Players ---------- ///

  get players(): FormArray {
    return this.roomCreateForm.get('players') as FormArray
  }

  removePlayer(i: number) {
    this.players.removeAt(i)
  }

  addPlayer(newPlayer: Player) {

    let valid = true;

    this.players.value.forEach((player: { player: Player; }) => {

      if (player.player.id == newPlayer.id) {
        valid = false;
      }

    })

    if ((newPlayer.id != -1) && valid) {
      return this.players.push(this.newPlayer(newPlayer))
    }

  }

  newPlayer(newPlayer: Player): FormGroup {
    return this.fb.group({
      player: [newPlayer, Validators.required]
    })
  }

  /// ----------- DecoItems ---------- ///

  get decoItems(): FormArray {
    return this.roomCreateForm.get('decoItems') as FormArray
  }

  removeDecoItem(i: number) {
    this.decoItems.removeAt(i)
  }

  addDecoItem(newDecoItem: DecorativeItem) {

    let valid = true;
    this.decoItems.value.forEach((decoItem: { decoItem: DecorativeItem; }) => {

      if (decoItem.decoItem.id == newDecoItem.id) {
        valid = false;
      }

    })

    if ((newDecoItem.id != -1) && valid) {
      return this.decoItems.push(this.newDecoItem(newDecoItem))
    }

  }

  newDecoItem(newDecoItem: DecorativeItem): FormGroup {
    return this.fb.group({
      decoItem: [newDecoItem, Validators.required]
    })
  }

  removeMonster(){
    this.roomCreateForm.value.monster = undefined;
  }

  save(){

    let roomToSend = new Room(0, "")

    roomToSend.id = this.room.id;
    roomToSend.name = this.roomCreateForm.value.name;
    roomToSend.monster = this.roomCreateForm.value.monster

    this.items.value.forEach((item: { item: Item; }) => {
      roomToSend.items.push(item.item)
    })

    this.players.value.forEach((player: { player: Player; }) => {
      roomToSend.players.push(player.player)
    })

    this.decoItems.value.forEach((decoItem: { decoItem: DecorativeItem; }) => {
      roomToSend.decorativeItems.push(decoItem.decoItem)
    })
    
    console.log(roomToSend)
    this.roomService.save(roomToSend).subscribe(a => console.log(a))
    
  }

}
