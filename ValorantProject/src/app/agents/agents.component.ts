import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppService } from '../app.service';
import { Agent } from '../agent';
import { FormControl, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-agents',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './agents.component.html',
  styleUrl: './agents.component.css'
})
export class AgentsComponent implements OnInit, OnDestroy {
  
  apiservice = inject(AppService);
  mySub!: Subscription;
  roleSub!: Subscription; 

  agents: Agent[] = [];
  agentsOriginal = <any>[];
  filterForm: UntypedFormGroup;
  filtreCtrl = new FormControl<string>('', { nonNullable: true });
  roles!: string[];

  filterForm2: UntypedFormGroup;
  filtreCtrl2 = new FormControl<string>('', { nonNullable: true });

  ngOnInit(): void {
    this.apiservice.getAgents().subscribe((data: Agent[]) => {
      this.agents = data;           // Ici c'est la variable des agents visibles sur la page selon les filtres
      this.agentsOriginal = data;   // Ici c'est la variable des agents originaux qui ne changent pas
    });

    this.apiservice.getAgents().subscribe((data: Agent[]) => {
      this.roles = Array.from(new Set(data.map(agent => agent.role)));
      console.log('Roles:', this.roles);
    });
  }

  constructor() {
    this.filterForm = new UntypedFormGroup({   // Barre de recherche
      filtre: this.filtreCtrl,
    });

    this.filterForm2 = new UntypedFormGroup({   // Menu déroulant selectionnable 
      filtre2: this.filtreCtrl2,
    });

    this.mySub = this.filtreCtrl.valueChanges.subscribe(() => this.filtrer()); //Subcription pour la barre de recherche, pas besoin de valider avec un bouton
    this.roleSub = this.filtreCtrl2.valueChanges.subscribe(() => this.filtrer()); //Subscription pour le menu déroulant, pareil que au dessus
  }

  filtrer() {   //Filtre des agents avec la case géré
    this.agents = this.agentsOriginal.filter((agent: Agent) => 
      agent.name.toLowerCase().includes(this.filtreCtrl.value.toLowerCase()) &&
      agent.role.toLowerCase().includes(this.filtreCtrl2.value.toLowerCase()) 
    );
  }

  

  ngOnDestroy() {
    this.mySub.unsubscribe();
    this.roleSub.unsubscribe(); 
  }
}
