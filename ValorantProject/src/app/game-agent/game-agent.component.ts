import { Component, inject, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Agent } from '../agent';
import { FormControl, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game-agent',
  imports: [ReactiveFormsModule],
  templateUrl: './game-agent.component.html',
  styleUrl: './game-agent.component.css'
})
export class GameAgentComponent implements OnInit {

  apiservice = inject(AppService);
  agent!: Agent;
  agents: Agent[] = [];
  agentsOriginal: Agent[] = [];

  mySub!: Subscription;

  validation: boolean | null = null;
  attempts:number = 0;
  streak:number = 0;

  isColorful: boolean = false;
  filter1: string =  '';
  isHelped: boolean = false;
  filter2: string = '';
  filter:string='';

  gameForm: UntypedFormGroup;
  gameCtrl = new FormControl<string>('', { nonNullable: true });

  ngOnInit(): void {
    this.apiservice.getRandomAgent().subscribe((data: Agent) => {   // On choisi un agent aléatoire dans l'api
      this.agent = data;
      console.log('Agent data:', data);
      this.validation=false;
    });

    this.apiservice.getAgents().subscribe((data: Agent[]) => {     // On récupère tous les agents de l'api pour la barre de recherche
      this.agents = data;
      this.agentsOriginal = data;

      console.log('Agents:', this.agents);
    });

    this.filter1 = 'grayscale(100%)';       // On met le filtre gris au début
    this.filter2 = 'blur(12px)';            // On met le filtre flou au début
    this.filter = this.filter1 + ' ' + this.filter2;    // On combine les deux filtres pour l'affichage
  }

  constructor() {
    this.gameForm = new UntypedFormGroup({    // Création de la barre de recherche
      filtre: this.gameCtrl,
    });

    this.mySub = this.gameCtrl.valueChanges.subscribe(() => this.filtrer()); // Subscription pour la barre de recherche, pas besoin de valider avec un bouton

  }

  filtrer() {
    this.agents = this.agentsOriginal.filter((agent: Agent) => 
      agent.name.toLowerCase().includes(this.gameCtrl.value.toLowerCase()) // Filtre des agents avec la case géré
    );
  
  }

  verif(): void {
    this.attempts++;
    if (this.gameCtrl.value.toLowerCase() === this.agent.name.toLowerCase()) //garde la valeur de l'input et la compare avec le nom de l'agent
    {
      this.validation = true;
      console.log('Correct guess!');
      if (this.attempts == 1) { // Si c'est le premier essai, on met la streak à 1 et on enlève le filtre
        this.streak++;
        this.filter = 'grayscale(0%) blur(0px)';
      }
      else {
        this.streak = 1;
      }

    }
    else 
    {
      if (this.isHelped) // Ici on réduit le flou si l'utilisateur a demandé de l'aide
      {
        const blurValue: number = Math.max(0, 12 - this.attempts * 4);
        this.filter2 = `blur(${blurValue}px)`;
        this.filter=this.filter1+' '+this.filter2;

      }
      this.validation = false;
    }

  }

  restart() // Permet de relancer le jeu
  {
    this.apiservice.getRandomAgent().subscribe((data: Agent) => {
      this.agent = data;
      console.log('Agent data:', data);
    });
    if (this.validation==false) { // On enleve la streak si l'utilisateur fait faux une fois
      this.streak=0;
    }
    this.attempts=0;
    this.validation=false;
    const blurValue: number = Math.max(0, 12 - this.attempts * 4);
    if(this.isColorful)
    {
      this.filter1 = 'grayscale(0%)';

    }
    this.filter2 = `blur(${blurValue}px)`;
    this.filter=this.filter1+' '+this.filter2;

  }

  toggleColor() { //Fonction pour changer le filtre de l'agent (niveau couleur)
    this.isColorful = !this.isColorful;
    if (this.isColorful) {
      this.filter1 = 'grayscale(0%)';
    }
    else
    {
      this.filter1 = 'grayscale(100%)';
    }
    this.filter=this.filter1+' '+this.filter2;
  }

  adjustBlur() { // Fonction pour changer le filtre de l'agent (niveau flou)
    this.isHelped = !this.isHelped;
    if (this.isHelped) {
      const blurValue: number = Math.max(0, 12 - this.attempts * 4);
      this.filter2 = `blur(${blurValue}px)`;
    } else {
      this.filter2 = 'blur(12px)';
    }
    this.filter=this.filter1+' '+this.filter2;

  }

}
