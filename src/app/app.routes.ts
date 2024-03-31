import { Routes } from '@angular/router';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { DetailsComponent } from './details/details.component';


export const routes: Routes = [
    { path: '', component: ToDoListComponent },
    { path: 'details/:Id', component: DetailsComponent }
];
