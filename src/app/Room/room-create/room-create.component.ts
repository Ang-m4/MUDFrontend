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
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.css']
})
export class RoomCreateComponent implements OnInit {

  room: Room = new Room(-1, "")
  monster: Monster = new Monster(0, "", "", 0, 0, 0, 0, "", "")

  roomCreateForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl('')
  });

  constructor(private fb: FormBuilder,
    private roomService: RoomService,
    private playerService: PlayerService,
    private monsterService: MonsterService,
    private itemService: ItemService,
    private decoItemService: DecorativeItemService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.roomCreateForm = this.fb.group({
      name: ['', [Validators.required]],
      monster: [this.monster, [Validators.required]],
      players: this.fb.array([]),
      items: this.fb.array([]),
      decoItems: this.fb.array([]),
      exits: this.fb.array([])
    });

    this.itemService.itemSelected.subscribe(item => {
      this.addItem(item)
    })

    this.decoItemService.decoItemSelected.subscribe(decoItem => {
      this.addDecoItem(decoItem)
    })

    this.playerService.playerSelected.subscribe(player => {
      console.log(player)
      this.addPlayer(player)
    })

    this.monsterService.monsterSelected.subscribe(received => {
      if (received.id != -1) {
        this.roomCreateForm.value.monster = received
        console.log(received)
      }
    })

    this.roomService.roomSelected.subscribe(received => {

      if (received.id != -1) {
        this.addExit(received)
        console.log(received)
      }

    })

  }


  loadFormData() {

    this.roomCreateForm.patchValue({
      name: this.room.name,
      monster: this.room.monster
    });

    this.items.clear();
    this.room.items.forEach(item => {
      this.items.push(this.newItem(item))
    });

    this.decoItems.clear();
    this.room.decorativeItems.forEach(decoItem => {
      this.decoItems.push(this.newDecoItem(decoItem))
    });

  }

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

  /// ----------- Exits ---------- ///
  get exits(): FormArray {
    return this.roomCreateForm.get('exits') as FormArray
  }

  removeExit(i: number) {
    this.exits.removeAt(i)
  }

  addExit(newExit: Room) {

    let valid = true;
    console.log(newExit)

    this.exits.value.forEach((exit: { exit: Room; }) => {
      if (exit.exit.id == newExit.id) {

        valid = false;
      }

    })

    if ((newExit.id != -1) && valid) {
      return this.exits.push(this.newExit(newExit))
    }

  }

  newExit(newExit: Room): FormGroup {
    return this.fb.group({
      exit: [newExit, Validators.required]
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

  removeMonster() {
    this.roomCreateForm.value.monster = undefined;
  }

  save() {

    let roomToSend = new Room(0, "")

    roomToSend.id = this.room.id;
    roomToSend.name = this.roomCreateForm.value.name;
    roomToSend.monster = this.roomCreateForm.value.monster;
    this.items.value.forEach((item: { item: Item; }) => {
      roomToSend.items.push(item.item)
    })

    this.decoItems.value.forEach((decoItem: { decoItem: DecorativeItem; }) => {
      roomToSend.decorativeItems.push(decoItem.decoItem)
    })

    this.exits.value.forEach((exit: { exit: Room; }) => {
      roomToSend.exits.push(new Room(exit.exit.id,""))
    })

    this.roomService.save(roomToSend).subscribe(roomSaved => {
      console.log(roomSaved)
      this.roomService.updateList()
    })

  }

}
