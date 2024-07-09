// site/src/components/move-quiz/index.tsx
"use client"
import React, { useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { questions } from './Questions';
import { Play } from 'lucide-react';

const StartQuizButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gray-800 px-8 py-3 font-medium text-white transition-all duration-300 ease-out hover:ring-2 hover:ring-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500" onClick={onClick}>
      <span className="absolute inset-0 h-full w-0 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ease-out group-hover:w-full" />
      <span className="relative flex items-center gap-2">
        <Play className="h-5 w-5" />
        <span>Start Quiz</span>
      </span>
    </Button>
  );
};

const MoveLanguageQuizDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const handleNext = () => {
    setShowResult(false);
    setSelectedAnswer('');
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentQuestion(questions.length);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setShowResult(false);
    setScore(0);
    setIsOpen(false);
  };

  const QuizContent = () => {
    if (currentQuestion === questions.length) {
      return (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Quiz Completed!</CardTitle>
            <CardDescription>Your final score:</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{score} / {questions.length}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={resetQuiz}>Restart Quiz</Button>
          </CardFooter>
        </Card>
      );
    }

    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Do you know Move?</CardTitle>
          <CardDescription>Question {currentQuestion + 1} of {questions.length}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{questions[currentQuestion].question}</p>
          <RadioGroup onValueChange={handleAnswer} value={selectedAnswer}>
            {questions[currentQuestion].options.map((option, index) => (
              <div className="flex items-center space-x-2" key={index}>
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
          {showResult && (
            <Alert className="mt-4" variant={selectedAnswer === questions[currentQuestion].correctAnswer ? "default" : "destructive"}>
              {selectedAnswer === questions[currentQuestion].correctAnswer ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertTitle>{selectedAnswer === questions[currentQuestion].correctAnswer ? "Correct!" : "Incorrect"}</AlertTitle>
              <AlertDescription>
                {selectedAnswer === questions[currentQuestion].correctAnswer
                  ? "Great job! You got it right."
                  : `The correct answer is: ${questions[currentQuestion].correctAnswer}`}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {!showResult ? (
            <Button onClick={handleSubmit} disabled={!selectedAnswer}>Submit</Button>
          ) : (
            <Button onClick={handleNext}>
              {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <StartQuizButton onClick={() => setIsOpen(true)} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>The Intro Move Quiz</DialogTitle>
          <DialogDescription>
            Test your knowledge of the Move programming language!
          </DialogDescription>
        </DialogHeader>
        <QuizContent />
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MoveLanguageQuizDialog;