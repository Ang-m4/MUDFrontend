import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Monster } from 'src/app/model/monster';
import { MonsterService } from 'src/app/Shared/monster.service';

@Component({
  selector: 'app-monster-show',
  templateUrl: './monster-show.component.html',
  styleUrls: ['./monster-show.component.css']
})
export class MonsterShowComponent implements OnInit {

  monster: Monster = new Monster(0, "", "", 0, 0, 2, 0, "", "");
  monsterToSend: Monster = new Monster(0, "", "", 0, 0, 0, 0, "", "");

  monsterCreateForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl('')
  });

  constructor(
    private fb: FormBuilder,
    private monsterService: MonsterService,
    private route: ActivatedRoute,
    private router: Router
  ) { };


  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {

      let id = +params.get("id")!;
      this.monsterService.findById(id).subscribe((received) => {
        this.monster = received;
        this.loadFormData()
        //this.loadFormCategories()
      });

    });

    this.monsterCreateForm = this.fb.group({
      name: ['', [Validators.required]],
      last_updated: ['', [Validators.required]],
      attack_level: ['', [Validators.required]],
      defence_slash: ['', [Validators.required]],
      size: ['', [Validators.required]],
      hitpoints: ['', [Validators.required]],
      examine: ['', [Validators.required]],
      wiki_url: ['', [Validators.required]],
      categories: this.fb.array([]),
    });

  };

  get categories(): FormArray {
    return this.monsterCreateForm.get('categories') as FormArray
  }

  newCategory(categorie: string): FormGroup {
    return this.fb.group({
      name: categorie
    })
  }


  removeCategory(i: number) {
    this.categories.removeAt(i);
  }

  loadFormData() {

    this.monsterCreateForm.patchValue({

      name: this.monster.name,
      last_updated: this.monster.last_updated,
      attack_level: this.monster.attack_level,
      defence_slash: this.monster.defence_slash,
      size: this.monster.size,
      hitpoints: this.monster.hitpoints,
      examine: this.monster.examine,
      wiki_url: this.monster.wiki_url,

    })

  }

  addCategory(categorie: string) {
    this.categories.push(this.newCategory(categorie));
  };

  addNewCategory() {
    this.addCategory("");
  };
  
  save() {

    this.monsterToSend.id = this.monster.id;
    this.monsterToSend.name = this.monsterCreateForm.value.name;
    this.monsterToSend.last_updated = this.monsterCreateForm.value.last_updated;
    this.monsterToSend.attack_level = this.monsterCreateForm.value.attack_level;
    this.monsterToSend.defence_slash = this.monsterCreateForm.value.defence_slash;
    this.monsterToSend.size = this.monsterCreateForm.value.size;
    this.monsterToSend.hitpoints = this.monsterCreateForm.value.hitpoints;
    this.monsterToSend.examine = this.monsterCreateForm.value.examine;
    this.monsterToSend.wiki_url = this.monsterCreateForm.value.wiki_url;
    console.log(this.monsterCreateForm.value);

    this.categories.controls.forEach(a=>{

      console.log(a.value.name);

    })

  };

  delete(id: number) {
    this.monsterService.delete(id);
  };


}
