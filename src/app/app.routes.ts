import { Routes } from '@angular/router';
import { CountryList} from './components/country-list/country-list';
import { CountryDetail } from './components/country-detail/country-detail';

export const routes: Routes = [
  { path: '', component: CountryList },
  { path: 'country/:name', component: CountryDetail }
];