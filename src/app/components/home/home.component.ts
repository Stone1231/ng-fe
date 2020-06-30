import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';

@Component({
    templateUrl: './home.component.html',
    providers: [HomeService],
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(private service: HomeService) {
    }

    public backend: string;

    ngOnInit() {
        this.service.get().subscribe(d => {
            this.backend = d.toString();
        })
    }

}
