export interface Agent {
    id: string;
    name: string;
    role: string;       // Role = Duelist, Initiator, Sentinel, Controller (Chaque agent a un role selon leur caractéristique, certain agent on le même rôle) )
    roleid:string;
    abilitiesIcon: string[];
    abilitiesName: string[];
    abilitiesDescription: string[];
    image: string;
    smallIcon: string;
    description: string; // Description général de l'agent
}