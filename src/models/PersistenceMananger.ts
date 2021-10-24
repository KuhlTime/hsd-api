import Course from './Course'
import Degree from './Degree'
import { courseChangeListener, getCourses } from '@/controller/course.controller'
import { degreesChangeListener, getDegrees } from '@/controller/degree.controller'

class PersistenceManager {
  private courses: Course[] = []
  private degrees: Degree[] = []

  public static shared: PersistenceManager = new PersistenceManager()

  async init(): Promise<void> {
    const courses = await getCourses()
    courses.forEach(course => this.addCourse(course))

    const degrees = await getDegrees()
    degrees.forEach(degree => this.addDegree(degree))

    courseChangeListener((type, course) => {
      if (type === 'added' || type === 'modified') {
        this.addCourse(course)
      } else if (type === 'removed') {
        this.removeCourse(course.id)
      }
    })

    degreesChangeListener((type, degree) => {
      if (type === 'added' || type === 'modified') {
        this.addDegree(degree)
      } else if (type === 'removed') {
        this.removeDegree(degree.id)
      }
    })
  }

  private addCourse(course: Course) {
    if (!this.doesCourseExist(course.id)) {
      this.courses.push(course)
    } else {
      const index = this.getCourseIndex(course.id)
      this.courses[index] = course
    }
  }

  private removeCourse(id: string) {
    this.courses = this.courses.filter(course => course.id !== id)
  }

  private getCourseIndex(id: string): number {
    return this.courses.findIndex(course => course.id === id)
  }

  private doesCourseExist(id: string): boolean {
    return this.getCourseIndex(id) !== -1
  }

  public getCourses(): Course[] {
    return this.courses
  }

  public getCourse(id: string): Course | undefined {
    return this.courses.find(course => course.id === id)
  }

  private addDegree(degree: Degree) {
    if (!this.doesDegreeExist(degree.id)) {
      this.degrees.push(degree)
    } else {
      const index = this.getDegreeIndex(degree.id)
      this.degrees[index] = degree
    }
  }

  private removeDegree(id: string) {
    this.degrees = this.degrees.filter(degree => degree.id !== id)
  }

  private getDegreeIndex(id: string): number {
    return this.degrees.findIndex(degree => degree.id === id)
  }

  private doesDegreeExist(id: string): boolean {
    return this.getDegreeIndex(id) !== -1
  }

  public getDegrees(): Degree[] {
    return this.degrees
  }

  public getDegree(id: string): Degree | undefined {
    return this.degrees.find(degree => degree.id === id)
  }
}

export default PersistenceManager
