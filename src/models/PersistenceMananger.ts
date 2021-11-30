import ical, { ICalCalendar } from 'ical-generator'
import moment from 'moment'
import Course from './Course'
import Degree from './Degree'
import Exam from './Exam'
import CompactExam from './CompactExam'
import { courseChangeListener, getCourses } from '@/controller/course.controller'
import { degreesChangeListener, getDegrees } from '@/controller/degree.controller'
import { examsChangeListener, getExams } from '@/controller/exam.controller'
import { compactExamChangeListener } from '@/controller/compact-exam.controller'

class PersistenceManager {
  private exams: Exam[] = []
  private courses: Course[] = []
  private degrees: Degree[] = []
  private compactExams: CompactExam[] = []

  public static shared: PersistenceManager = new PersistenceManager()

  async init(): Promise<void> {
    const courses = await getCourses()
    courses.forEach(course => this.addCourse(course))

    const degrees = await getDegrees()
    degrees.forEach(degree => this.addDegree(degree))

    const exams = await getExams()
    exams.forEach(exam => this.addExam(exam))

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

    examsChangeListener((type, exam) => {
      if (type === 'added' || type === 'modified') {
        this.addExam(exam)
      } else if (type === 'removed') {
        this.removeExam(exam.id)
      }
    })

    compactExamChangeListener((type, exam) => {
      if (type === 'added' || type === 'modified') {
        this.addCompactExam(exam)
      } else if (type === 'removed') {
        this.removeCompactExam(exam.id)
      }
    })
  }

  // ========
  // COURSES
  // ========

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

  // =========
  // DEGREES
  // =========

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

  // =========
  // EXAMS
  // =========

  private addExam(exam: Exam) {
    if (!this.doesExamExist(exam.id)) {
      this.exams.push(exam)
    } else {
      const index = this.getExamIndex(exam.id)
      this.exams[index] = exam
    }
  }

  private removeExam(id: string) {
    this.exams = this.exams.filter(exam => exam.id !== id)
  }

  private getExamIndex(id: string): number {
    return this.exams.findIndex(exam => exam.id === id)
  }

  private doesExamExist(id: string): boolean {
    return this.getExamIndex(id) !== -1
  }

  public getExams(): Exam[] {
    return this.exams
  }

  public getExam(id: string): Exam | undefined {
    return this.exams.find(exam => exam.id === id)
  }

  // =========
  // COMPACT EXAMS
  // =========

  private addCompactExam(exam: CompactExam) {
    if (!this.doesCompactExamExist(exam.id)) {
      this.compactExams.push(exam)
    } else {
      const index = this.getCompactExamIndex(exam.id)
      this.compactExams[index] = exam
    }
  }

  private removeCompactExam(id: string) {
    this.compactExams = this.compactExams.filter(exam => exam.id !== id)
  }

  private getCompactExamIndex(id: string): number {
    return this.compactExams.findIndex(exam => exam.id === id)
  }

  private doesCompactExamExist(id: string): boolean {
    return this.getCompactExamIndex(id) !== -1
  }

  public getCompactExams(): CompactExam[] {
    return this.compactExams
  }

  public getCompactExam(id: string): CompactExam | undefined {
    return this.compactExams.find(exam => exam.id === id)
  }

  public getCompactExamsByIds(ids: string[]): CompactExam[] {
    return this.compactExams.filter(exam => ids.includes(exam.id))
  }

  public getCompactExamDegress(): Set<string> {
    return new Set(this.compactExams.map(exam => exam.degree))
  }

  public getCompactExamExaminers(): Set<string> {
    return new Set(this.compactExams.map(exam => exam.examiners).flat())
  }

  /**
   * ICAL
   */

  public createTestCalender(): ICalCalendar {
    const cal = ical({ name: 'Tester' })

    cal.createEvent({
      start: moment().toDate(),
      end: moment().add(1, 'hours').toDate(),
      summary: 'Updating Test Event',
      description:
        'This is a test event which updates automatically every time the calender makes a new request.'
    })

    return cal
  }

  public createCalenderForExams(ids: string[], name: string | undefined = undefined): ICalCalendar {
    const selectedExams = this.getCompactExamsByIds(ids)

    const cal = ical({ name: name || 'HSD Prüfungen' })

    selectedExams.forEach(exam => {
      cal.createEvent({
        start: exam.timestamp,
        end: moment(exam.timestamp).add(exam.duration, 'minutes').toDate(),
        summary: exam.name,
        description: exam.description,
        location: ''
      })
    })

    return cal
  }
}

export default PersistenceManager
