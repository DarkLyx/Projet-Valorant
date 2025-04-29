import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Agent } from '../agent';

@Component({
  selector: 'app-agent-info',
  imports: [],
  templateUrl: './agent-info.component.html',
  styleUrl: './agent-info.component.css'
})

export class AgentInfoComponent implements OnInit {
  agentId: string | null = null;
  apiservice = inject(AppService);
  agent!: Agent;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {    //fetch data des agents sur notre API
    this.agentId = this.route.snapshot.paramMap.get('id');
    if (this.agentId) {
      this.apiservice.getAgentbyId(this.agentId).subscribe((data: Agent) => {
        this.agent = data;
        console.log('Agent data:', data);
      });
    } else {
      console.error('Agent ID is null');
    }
  }
}
