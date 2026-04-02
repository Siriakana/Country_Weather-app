
import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/country';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
 
@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './country-list.html',
  styleUrl: './country-list.css'
})
export class CountryList implements OnInit {
 
  countries: any[] = [];
  filtered: any[] = [];
  searchText = '';
 
  constructor(private countryService: CountryService) {}
 
  ngOnInit() {
    this.loadCountries();
  }
 
  loadCountries() {
    this.countryService.getCountries().subscribe(data => {
      this.countries = data;
      this.filtered = data;
    });
  }
 
  search() {
    this.filtered = this.countries.filter(c =>
      c.name.common.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
 
 