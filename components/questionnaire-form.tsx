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
              <h2 className="text-2xl font-bold text-gray-900">Да се запознаеме</h2>
              <p className="text-gray-600 mt-2">Ќе создадеме персонализиран план за суплементи само за вас</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Како се викате?</Label>
                <Input
                  id="name"
                  placeholder="Внесете го вашето име"
                  value={answers.name || ""}
                  onChange={(e) => updateAnswer("name", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Е-пошта</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="vasa@eposta.com"
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
              <h2 className="text-2xl font-bold text-gray-900">Кажете ни за себе</h2>
            </div>
            <div className="space-y-6">
              <div>
                <Label>Колку години имате?</Label>
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
                <Label>Пол</Label>
                <RadioGroup
                  value={answers.gender}
                  onValueChange={(value) => updateAnswer("gender", value)}
                  className="mt-2"
                >
                  {["Машки", "Женски", "Небинерен", "Претпочитам да не кажам"].map((gender) => (
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
              <h2 className="text-2xl font-bold text-gray-900">Како се чувствувате во последно време?</h2>
              <p className="text-gray-600 mt-2">Бидете искрени - ова ни помага да ја разбереме вашата моментална состојба</p>
            </div>
            <RadioGroup
              value={answers.currentFeeling}
              onValueChange={(value) => updateAnswer("currentFeeling", value)}
              className="space-y-3"
            >
              {[
                "Одлично - се чувствувам одлично!",
                "Прилично добро - сакам само да оптимизирам",
                "Добро - може да биде подобро",
                "Не толку добро - имам проблеми со енергија/расположение",
                "Лошо - ми треба сериозна помош",
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
              <h2 className="text-2xl font-bold text-gray-900">Какво е вашето ниво на енергија?</h2>
            </div>
            <RadioGroup
              value={answers.energyLevel}
              onValueChange={(value) => updateAnswer("energyLevel", value)}
              className="space-y-3"
            >
              {[
                "Висока енергија цел ден",
                "Добра енергија поголемиот дел од времето",
                "Пад на енергија попладне",
                "Ниска енергија во текот на денот",
                "Постојано исцрпен",
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
              <h2 className="text-2xl font-bold text-gray-900">Колку често вежбате?</h2>
            </div>
            <RadioGroup
              value={answers.workoutFrequency}
              onValueChange={(value) => updateAnswer("workoutFrequency", value)}
              className="space-y-3"
            >
              {[
                "Дневно (6-7 пати неделно)",
                "Многу активно (4-5 пати неделно)",
                "Умерено активно (2-3 пати неделно)",
                "Повремено (1 пат неделно)",
                "Ретко или никогаш",
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
              <h2 className="text-2xl font-bold text-gray-900">Каков тип на вежбање правите?</h2>
              <p className="text-gray-600 mt-2">Изберете ги сите што се применливи</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Кревање тежини/Тренинг за сила",
                "Кардио (трчање, возење велосипед итн.)",
                "Јога/Пилатес",
                "Спортови (кошарка, тенис итн.)",
                "Пливање",
                "Одење/Пешачење",
                "Кросфит/ХИИТ",
                "Танц/Аеробик",
                "Боречки вештини",
                "Друго",
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
              <h2 className="text-2xl font-bold text-gray-900">Кои се вашите здравствени цели?</h2>
              <p className="text-gray-600 mt-2">Изберете ги сите што се применливи</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Намалување на телесната тежина",
                "Зголемување на мускулната маса",
                "Зголемување oni енергија",
                "Подобрување на квалитетот на спиењето",
                "Намалување на стресот/анксиозноста",
                "Подобро варење",
                "Зајакнување на имунитетот",
                "Подобрување на менталната јасност/фокус",
                "Подобрување на кожата/косата/ноктите",
                "Здравје на срцето",
                "Здравје на зглобовите",
                "Анти-стареење",
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
              <h2 className="text-2xl font-bold text-gray-900">Прашања за животниот стил</h2>
            </div>
            <div className="space-y-6">
              <div>
                <Label>Каква е вашата исхрана?</Label>
                <RadioGroup
                  value={answers.dietType}
                  onValueChange={(value) => updateAnswer("dietType", value)}
                  className="mt-2 space-y-2"
                >
                  {[
                    "Стандардна/Сèјадна",
                    "Вегетаријанска",
                    "Веганска",
                    "Кето/Ниско јаглехидратна",
                    "Палео",
                    "Медитеранска",
                    "Периодичен пост",
                    "Друго/Флексибилно",
                  ].map((diet) => (
                    <div key={diet} className="flex items-center space-x-2">
                      <RadioGroupItem value={diet} id={diet} />
                      <Label htmlFor={diet}>{diet}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div>
                <Label>Каков е квалитетот на вашиот сон?</Label>
                <RadioGroup
                  value={answers.sleepQuality}
                  onValueChange={(value) => updateAnswer("sleepQuality", value)}
                  className="mt-2 space-y-2"
                >
                  {[
                    "Одличен (7-9 часа, се будам освежен)",
                    "Добар (најчесто мирен сон)",
                    "Среден (некои ноќи добри, некои лоши)",
                    "Лош (проблеми со заспивање/останување заспан)",
                    "Многу лош (хронична несоница)",
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
              <h2 className="text-2xl font-bold text-gray-900">Последни здравствени прашања</h2>
            </div>
            <div className="space-y-6">
              <div>
                <Label>Кое е вашето ниво на стрес?</Label>
                <RadioGroup
                  value={answers.stressLevel}
                  onValueChange={(value) => updateAnswer("stressLevel", value)}
                  className="mt-2 space-y-2"
                >
                  {[
                    "Многу ниско - се чувствувам смирено и опуштено",
                    "Ниско - управлив стрес",
                    "Умерено - повремени стресни периоди",
                    "Високо - често сум под стрес",
                    "Многу високо - постојано преоптоварен",
                  ].map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <RadioGroupItem value={level} id={level} />
                      <Label htmlFor={level}>{level}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div>
                <Label>Имате ли специфични здравствени проблеми? (Изборно)</Label>
                <div className="mt-2 space-y-2">
                  {[
                    "Проблеми со варењето",
                    "Болки во зглобовите/воспаление",
                    "Хормонални нарушувања",
                    "Анксиозност/Депресија",
                    "Висок крвен притисок",
                    "Висок холестерол",
                    "Проблеми со шеќерот во крвта",
                    "Автоимуни состојби",
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
                <Label>Моментални суплементи (доколку има)</Label>
                <Textarea
                  placeholder="Наведете ги суплементите што моментално ги земате..."
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
              <h2 className="text-2xl font-bold text-gray-900">Колкав е вашиот месечен буџет за суплементи?</h2>
              <p className="text-gray-600 mt-2">Ова ни помага да препорачаме најисплатливи опции</p>
            </div>
            <RadioGroup
              value={answers.budget}
              onValueChange={(value) => updateAnswer("budget", value)}
              className="space-y-3"
            >
              {["Под 25€", "25€ - 50€", "50€ - 100€", "100€ - 300€", "Над 300€"].map((budget) => (
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
          <h1 className="text-3xl font-bold text-gray-900">Персонализирана проценка за суплементи</h1>
          <span className="text-sm text-gray-500">
            {currentStep} од {TOTAL_STEPS}
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
              Претходно
            </Button>

            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700"
            >
              {currentStep === TOTAL_STEPS ? "Добиј го мојот план" : "Следно"}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
