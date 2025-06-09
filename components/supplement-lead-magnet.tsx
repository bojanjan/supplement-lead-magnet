"use client"

import { useState } from "react"
import { QuestionnaireForm } from "./questionnaire-form"
import { RecommendationResults } from "./recommendation-results"
import { LoadingScreen } from "./loading-screen"

export interface UserAnswers {
  name: string
  email: string
  age: string
  gender: string
  currentFeeling: string
  energyLevel: string
  workoutFrequency: string
  workoutType: string[]
  healthGoals: string[]
  currentSupplements: string
  dietType: string
  sleepQuality: string
  stressLevel: string
  healthConcerns: string[]
  budget: string
}

export interface SupplementRecommendation {
  name: string
  description: string
  benefits: string[]
  dosage: string
  timing: string
  link: string
  priority: "high" | "medium" | "low"
}

export interface PersonalizedPlan {
  summary: string
  recommendations: SupplementRecommendation[]
  lifestyle_tips: string[]
  timeline: string
}

export function SupplementLeadMagnet() {
  const [currentStep, setCurrentStep] = useState<"questionnaire" | "loading" | "results">("questionnaire")
  const [userAnswers, setUserAnswers] = useState<UserAnswers | null>(null)
  const [personalizedPlan, setPersonalizedPlan] = useState<PersonalizedPlan | null>(null)

  const handleQuestionnaireComplete = (answers: UserAnswers) => {
    setUserAnswers(answers)
    setCurrentStep("loading")
  }

  const handlePlanGenerated = (plan: PersonalizedPlan) => {
    setPersonalizedPlan(plan)
    setCurrentStep("results")
  }

  const handleStartOver = () => {
    setCurrentStep("questionnaire")
    setUserAnswers(null)
    setPersonalizedPlan(null)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {currentStep === "questionnaire" && <QuestionnaireForm onComplete={handleQuestionnaireComplete} />}

      {currentStep === "loading" && userAnswers && (
        <LoadingScreen userAnswers={userAnswers} onPlanGenerated={handlePlanGenerated} />
      )}

      {currentStep === "results" && personalizedPlan && userAnswers && (
        <RecommendationResults plan={personalizedPlan} userAnswers={userAnswers} onStartOver={handleStartOver} />
      )}
    </div>
  )
}
