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
    this.apiservice.getRandomAgent().subscribe((data: Agent) => {
      this.agent = data;
      console.log('Agent data:', data);
      this.validation=false;
    });

    this.apiservice.getAgents().subscribe((data: Agent[]) => {
      this.agents = data;
      this.agentsOriginal = data;

      console.log('Agents:', this.agents);
    });

    this.filter1 = 'grayscale(100%)';
    this.filter2 = 'blur(12px)';
    this.filter = this.filter1 + ' ' + this.filter2;
  }

  constructor() {
    this.gameForm = new UntypedFormGroup({
      filtre: this.gameCtrl,
    });

    this.mySub = this.gameCtrl.valueChanges.subscribe(() => this.filtrer());

  }

  
  filtrer() {
    this.agents = this.agentsOriginal.filter((agent: Agent) => 
      agent.name.toLowerCase().includes(this.gameCtrl.value.toLowerCase()) 
    );
  
  }

  verif(): void {
    this.attempts++;
    if (this.gameCtrl.value.toLowerCase() === this.agent.name.toLowerCase()) 
    {
      this.validation = true;
      console.log('Correct guess!');
      if (this.attempts == 1) {
        this.streak++;
        this.filter = 'grayscale(0%) blur(0px)';
      }
      else {
        this.streak = 1;
      }

    }
    else 
    {
      if (this.isHelped)
      {
        const blurValue: number = Math.max(0, 12 - this.attempts * 4);
        this.filter2 = `blur(${blurValue}px)`;
        this.filter=this.filter1+' '+this.filter2;

      }
      this.validation = false;
    }

  }

  restart()
  {
    this.apiservice.getRandomAgent().subscribe((data: Agent) => {
      this.agent = data;
      console.log('Agent data:', data);
    });
    if (this.validation==false) {
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

  toggleColor() {
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

  adjustBlur() {
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
// ajouter barre de recherche avec proposition agent
