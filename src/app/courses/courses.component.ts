import { Component, OnInit } from '@angular/core';
import {CourseService} from "../services/course.service";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses: any[] = [];

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(
      (data: any) => {
        this.courses = data;
        console.log('Courses loaded:', this.courses);
      },
      (error: any) => {
        console.error('Error loading courses:', error);
      }
    );
  }
}
