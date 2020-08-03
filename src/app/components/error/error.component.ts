import { Component, OnInit } from '@angular/core';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  providers: [ErrorService],
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(private service: ErrorService) { }

  public res: string;

  ngOnInit() {
    this.service.handle().subscribe(d => {
        this.res = d.toString();
    });
}

}
