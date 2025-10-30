import { Component, OnInit } from '@angular/core';
import { Class } from 'src/app/core/models/class';
import { ClassService } from 'src/app/core/services/class.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  classes: Class[] = [];

  constructor(private classService: ClassService) { }

  ngOnInit(): void {
    this.classService.getClasses().subscribe(data => {
      this.classes = data;
    });
  }

}
