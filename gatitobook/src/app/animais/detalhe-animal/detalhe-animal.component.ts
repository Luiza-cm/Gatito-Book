import { AnimaisService } from './../animais.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Animal } from '../animais';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalhe-animal',
  templateUrl: './detalhe-animal.component.html',
  styleUrls: ['./detalhe-animal.component.css']
})
export class DetalheAnimalComponent implements OnInit {

  animalID!: number;
  animal$!: Observable<Animal>;

  constructor(
    private animaisService: AnimaisService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.animalID = this.activatedRoute.snapshot.params['animalId'];
    this.animal$ = this.animaisService.buscaPorID(this.animalID);
  }

  curtir() {
    this.animaisService.curtir(this.animalID).subscribe({
      next: (curtida) => {
        if (curtida) {
          this.animal$ = this.animaisService.buscaPorID(this.animalID);
        }
      }
    });
  }

  excluir() {
    this.animaisService.excluiAnimal(this.animalID).subscribe({
      next: () => {
        this.router.navigate(['/animais/']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
