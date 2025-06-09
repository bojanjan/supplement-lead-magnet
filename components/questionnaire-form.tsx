"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { ChevronRight, ChevronLeft, User, Heart, Dumbbell, Target, Utensils, Brain, DollarSign } from "lucide-react"
import type { UserAnswers } from "./supplement-lead-magnet"

const TOTAL_STEPS = 10

export function QuestionnaireForm({ onComplete }: { onComplete: (answers: UserAnswers) => void }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [answers, setAnswers] = useState<Partial<UserAnswers>>({
    workoutType: [],
    healthGoals: [],
    healthConcerns: [],
  })

  const progress = (currentStep / TOTAL_STEPS) * 100

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete(answers as UserAnswers)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateAnswer = (key: keyof UserAnswers, value: any) => {
    setAnswers((prev) => ({ ...prev, [key]: value }))
  }

  const updateArrayAnswer = (key: keyof UserAnswers, value: string, checked: boolean) => {
    setAnswers((prev) => {
      const currentArray = (prev[key] as string[]) || []
      if (checked) {
        return { ...prev, [key]: [...currentArray, value] }
      } else {
        return { ...prev, [key]: currentArray.filter((item) => item !== value) }
      }
    })
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return answers.name && answers.email
      case 2:
        return answers.age && answers.gender
      case 3:
        return answers.currentFeeling
      case 4:
        return answers.energyLevel
      case 5:
        return answers.workoutFrequency
      case 6:
        return answers.workoutType && answers.workoutType.length > 0
      case 7:
        return answers.healthGoals && answers.healthGoals.length > 0
      case 8:
        return answers.dietType && answers.sleepQuality
      case 9:
        return answers.stressLevel
      case 10:
        return answers.budget
      default:
        return false
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <User className="w-16 h-16 mx-auto text-emerald-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Let's get to know you</h2>
              <p className="text-gray-600 mt-2">We'll create a personalized supplement plan just for you</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">What's your name?</Label>
                <Input
                  id="name"
                  placeholder="Enter your first name"
                  value={answers.name || ""}
                  onChange={(e) => updateAnswer("name", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={answers.email || ""}
                  onChange={(e) => updateAnswer("email", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <User className="w-16 h-16 mx-auto text-emerald-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Tell us about yourself</h2>
            </div>
            <div className="space-y-6">
              <div>
                <Label>What's your age?</Label>
                <RadioGroup value={answers.age} onValueChange={(value) => updateAnswer("age", value)} className="mt-2">
                  {["18-25", "26-35", "36-45", "46-55", "56-65", "65+"].map((age) => (
                    <div key={age} className="flex items-center space-x-2">
                      <RadioGroupItem value={age} id={age} />
                      <Label htmlFor={age}>{age}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div>
                <Label>Gender</Label>
                <RadioGroup
                  value={answers.gender}
                  onValueChange={(value) => updateAnswer("gender", value)}
                  className="mt-2"
                >
                  {["Male", "Female", "Non-binary", "Prefer not to say"].map((gender) => (
                    <div key={gender} className="flex items-center space-x-2">
                      <RadioGroupItem value={gender} id={gender} />
                      <Label htmlFor={gender}>{gender}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Heart className="w-16 h-16 mx-auto text-emerald-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">How are you feeling lately?</h2>
              <p className="text-gray-600 mt-2">Be honest - this helps us understand your current state</p>
            </div>
            <RadioGroup
              value={answers.currentFeeling}
              onValueChange={(value) => updateAnswer("currentFeeling", value)}
              className="space-y-3"
            >
              {[
                "Amazing - I feel great!",
                "Pretty good - just want to optimize",
                "Okay - could be better",
                "Not great - struggling with energy/mood",
                "Terrible - need serious help",
              ].map((feeling) => (
                <div key={feeling} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value={feeling} id={feeling} />
                  <Label htmlFor={feeling} className="flex-1 cursor-pointer">
                    {feeling}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Heart className="w-16 h-16 mx-auto text-emerald-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">What's your energy level like?</h2>
            </div>
            <RadioGroup
              value={answers.energyLevel}
              onValueChange={(value) => updateAnswer("energyLevel", value)}
              className="space-y-3"
            >
              {[
                "High energy all day",
                "Good energy most of the time",
                "Energy crashes in afternoon",
                "Low energy throughout the day",
                "Constantly exhausted",
              ].map((level) => (
                <div key={level} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value={level} id={level} />
                  <Label htmlFor={level} className="flex-1 cursor-pointer">
                    {level}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Dumbbell className="w-16 h-16 mx-auto text-emerald-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">How often do you work out?</h2>
            </div>
            <RadioGroup
              value={answers.workoutFrequency}
              onValueChange={(value) => updateAnswer("workoutFrequency", value)}
              className="space-y-3"
            >
              {[
                "Daily (6-7 times per week)",
                "Very active (4-5 times per week)",
                "Moderately active (2-3 times per week)",
                "Occasionally (1 time per week)",
                "Rarely or never",
              ].map((frequency) => (
                <div key={frequency} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value={frequency} id={frequency} />
                  <Label htmlFor={frequency} className="flex-1 cursor-pointer">
                    {frequency}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Dumbbell className="w-16 h-16 mx-auto text-emerald-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">What type of exercise do you do?</h2>
              <p className="text-gray-600 mt-2">Select all that apply</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Weight lifting/Strength training",
                "Cardio (running, cycling, etc.)",
                "Yoga/Pilates",
                "Sports (basketball, tennis, etc.)",
                "Swimming",
                "Walking/Hiking",
                "CrossFit/HIIT",
                "Dance/Aerobics",
                "Martial arts",
                "Other",
              ].map((type) => (
                <div key={type} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <Checkbox
                    id={type}
                    checked={answers.workoutType?.includes(type) || false}
                    onCheckedChange={(checked) => updateArrayAnswer("workoutType", type, checked as boolean)}
                  />
                  <Label htmlFor={type} className="flex-1 cursor-pointer">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Target className="w-16 h-16 mx-auto text-emerald-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">What are your health goals?</h2>
              <p className="text-gray-600 mt-2">Select all that apply</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Lose weight",
                "Gain muscle mass",
                "Increase energy",
                "Improve sleep quality",
                "Reduce stress/anxiety",
                "Better digestion",
                "Stronger immune system",
                "Improve mental clarity/focus",
                "Better skin/hair/nails",
                "Heart health",
                "Joint health",
                "Anti-aging",
              ].map((goal) => (
                <div key={goal} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <Checkbox
                    id={goal}
                    checked={answers.healthGoals?.includes(goal) || false}
                    onCheckedChange={(checked) => updateArrayAnswer("healthGoals", goal, checked as boolean)}
                  />
                  <Label htmlFor={goal} className="flex-1 cursor-pointer">
                    {goal}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )

      case 8:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Utensils className="w-16 h-16 mx-auto text-emerald-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Lifestyle questions</h2>
            </div>
            <div className="space-y-6">
              <div>
                <Label>What's your diet like?</Label>
                <RadioGroup
                  value={answers.dietType}
                  onValueChange={(value) => updateAnswer("dietType", value)}
                  className="mt-2 space-y-2"
                >
                  {[
                    "Standard/Omnivore",
                    "Vegetarian",
                    "Vegan",
                    "Keto/Low-carb",
                    "Paleo",
                    "Mediterranean",
                    "Intermittent fasting",
                    "Other/Flexible",
                  ].map((diet) => (
                    <div key={diet} className="flex items-center space-x-2">
                      <RadioGroupItem value={diet} id={diet} />
                      <Label htmlFor={diet}>{diet}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div>
                <Label>How's your sleep quality?</Label>
                <RadioGroup
                  value={answers.sleepQuality}
                  onValueChange={(value) => updateAnswer("sleepQuality", value)}
                  className="mt-2 space-y-2"
                >
                  {[
                    "Excellent (7-9 hours, wake up refreshed)",
                    "Good (mostly restful sleep)",
                    "Fair (some nights good, some bad)",
                    "Poor (trouble falling/staying asleep)",
                    "Terrible (chronic insomnia)",
                  ].map((quality) => (
                    <div key={quality} className="flex items-center space-x-2">
                      <RadioGroupItem value={quality} id={quality} />
                      <Label htmlFor={quality}>{quality}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        )

      case 9:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Brain className="w-16 h-16 mx-auto text-emerald-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Final health questions</h2>
            </div>
            <div className="space-y-6">
              <div>
                <Label>What's your stress level?</Label>
                <RadioGroup
                  value={answers.stressLevel}
                  onValueChange={(value) => updateAnswer("stressLevel", value)}
                  className="mt-2 space-y-2"
                >
                  {[
                    "Very low - I feel calm and relaxed",
                    "Low - manageable stress",
                    "Moderate - some stressful periods",
                    "High - frequently stressed",
                    "Very high - constantly overwhelmed",
                  ].map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <RadioGroupItem value={level} id={level} />
                      <Label htmlFor={level}>{level}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div>
                <Label>Any specific health concerns? (Optional)</Label>
                <div className="mt-2 space-y-2">
                  {[
                    "Digestive issues",
                    "Joint pain/inflammation",
                    "Hormonal imbalances",
                    "Anxiety/Depression",
                    "High blood pressure",
                    "High cholesterol",
                    "Blood sugar issues",
                    "Autoimmune conditions",
                  ].map((concern) => (
                    <div key={concern} className="flex items-center space-x-2">
                      <Checkbox
                        id={concern}
                        checked={answers.healthConcerns?.includes(concern) || false}
                        onCheckedChange={(checked) => updateArrayAnswer("healthConcerns", concern, checked as boolean)}
                      />
                      <Label htmlFor={concern}>{concern}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label>Current supplements (if any)</Label>
                <Textarea
                  placeholder="List any supplements you're currently taking..."
                  value={answers.currentSupplements || ""}
                  onChange={(e) => updateAnswer("currentSupplements", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        )

      case 10:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <DollarSign className="w-16 h-16 mx-auto text-emerald-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">What's your monthly supplement budget?</h2>
              <p className="text-gray-600 mt-2">This helps us recommend the most cost-effective options</p>
            </div>
            <RadioGroup
              value={answers.budget}
              onValueChange={(value) => updateAnswer("budget", value)}
              className="space-y-3"
            >
              {["Under $50", "$50 - $100", "$100 - $200", "$200 - $300", "Over $300"].map((budget) => (
                <div key={budget} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value={budget} id={budget} />
                  <Label htmlFor={budget} className="flex-1 cursor-pointer">
                    {budget}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Personalized Supplement Assessment</h1>
          <span className="text-sm text-gray-500">
            {currentStep} of {TOTAL_STEPS}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="shadow-lg">
        <CardContent className="p-8">
          {renderStep()}

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700"
            >
              {currentStep === TOTAL_STEPS ? "Get My Plan" : "Next"}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
