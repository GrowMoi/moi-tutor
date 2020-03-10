import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { CardComponent } from '../components/card/card.component';
import { ClientsCardComponent } from '../components/clients-card/clients-card.component';
import { RecommendationsCardComponent } from '../components/recommendations-card/recommendations-card.component';
import { MessagesCardComponent } from '../components/messages-card/messages-card.component';
import { QuizzesCardComponent } from '../components/quizzes-card/quizzes-card.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    PipesModule
  ],
  declarations: [
    DashboardPage,
    CardComponent,
    ClientsCardComponent,
    RecommendationsCardComponent,
    MessagesCardComponent,
    QuizzesCardComponent,
  ]
})
export class DashboardPageModule {}
