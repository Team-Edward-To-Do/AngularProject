import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Team-Edward-Project';

  activeTab = 'home';

  constructor(private route: ActivatedRoute, private sharedService: SharedService) {
    sharedService.changeEmitted$.subscribe(
      text => {
        this.setActiveTab(text);
      });
  }

  setActiveTab(activeTab: string): void {
    this.activeTab = activeTab;
  }
}
