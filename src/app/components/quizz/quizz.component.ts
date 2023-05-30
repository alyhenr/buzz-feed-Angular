import { Component, OnInit } from '@angular/core';

import quizzQuestions from '../../../assets/data/questions.json';

interface Result {
  text: string;
  imgURL: string;
}

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css'],
})
export class QuizzComponent implements OnInit {
  title: string = '';

  questions: any;
  questionSelected: any;
  index: number = 0;

  answers: string[] = [];

  finished: boolean = false;

  result: Result = {
    text: '',
    imgURL: '',
  };

  constructor() {}

  ngOnInit(): void {
    if (quizzQuestions) {
      this.title = quizzQuestions.title;
      this.questions = quizzQuestions.questions;
      this.questionSelected = this.questions[this.index];
    }
  }

  handleClick(value: string): void {
    if (this.finished) return;

    this.answers.push(value);
    this.index++;
    this.finished = this.index === this.questions.length;
    if (this.finished) {
      this.finishGame();
    } else {
      this.questionSelected = this.questions[this.index];
    }
  }

  finishGame(): void {
    const counter: number = this.answers.filter(
      (alias) => alias === 'A'
    ).length;

    const boolResult = counter > this.answers.length / 2;

    this.result = boolResult
      ? quizzQuestions.results.A
      : quizzQuestions.results.B;
  }
}
