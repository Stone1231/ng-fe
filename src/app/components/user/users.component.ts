import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    providers: [UserService],
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    public rows: User[] = [];
    public vType = 0;
    public readId = 0;
    public keyWord = '';
    public imgUrl = environment.IMG_URL;
    constructor(private service: UserService) {
    }

    ngOnInit() {
        // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        // Add 'implements OnInit' to the class.
        this.bindData();
    }

    bindData() {
        this.service.getAll().subscribe(d => {
            this.rows = d;
        });
    }

    queryData() {
        this.service.getQuery(this.keyWord).subscribe(d => {
            this.rows = d;
        });
    }

    readSingle(id: number) {
        this.readId = id;
        this.vType = 1;
    }

    delSingle(id: number) {
        if (!confirm('Are you sure you want to delete this?')) {
            return;
        }
        this.service.delete(id.toString()).subscribe(
            res => {
                this.bindData();
            });
        this.vType = 0;
    }

    createSingle() {
        this.readId = 0;
        this.vType = 1;
    }

    public editBack(date: any): void {
        this.vType = 0;
    }

    public editSave(date: any): void {
        this.bindData();
        this.vType = 0;
    }
}
