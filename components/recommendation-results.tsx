"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Star,
  Clock,
  Target,
  Pill,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Heart,
  Zap,
  RefreshCw,
} from "lucide-react"
import type { PersonalizedPlan, UserAnswers } from "./supplement-lead-magnet"

const priorityColors = {
  high: "bg-red-100 text-red-800 border-red-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  low: "bg-green-100 text-green-800 border-green-200",
}

const priorityIcons = {
  high: AlertCircle,
  medium: Clock,
  low: CheckCircle,
}

export function RecommendationResults({
  plan,
  userAnswers,
  onStartOver,
}: {
  plan: PersonalizedPlan
  userAnswers: UserAnswers
  onStartOver: () => void
}) {
  const highPrioritySupplements = plan.recommendations.filter((r) => r.priority === "high")
  const mediumPrioritySupplements = plan.recommendations.filter((r) => r.priority === "medium")
  const lowPrioritySupplements = plan.recommendations.filter((r) => r.priority === "low")

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-4">
            <Target className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Вашиот персонализиран план за суплементи</h1>
          <p className="text-lg text-gray-600">
            Здраво {userAnswers.name}! Врз основа на вашите одговори, еве го вашиот приспособен план за здравствена оптимизација.
          </p>
        </div>
      </div>

      {/* Summary */}
      <Card className="shadow-lg border-emerald-200">
        <CardHeader className="bg-emerald-50">
          <CardTitle className="flex items-center gap-2 text-emerald-800">
            <TrendingUp className="w-5 h-5" />
            Резиме на вашето здравје и цели
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-700 leading-relaxed">{plan.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {userAnswers.healthGoals?.map((goal) => (
              <Badge key={goal} variant="secondary" className="bg-emerald-100 text-emerald-800">
                {goal}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* High Priority Supplements */}
      {highPrioritySupplements.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-6 h-6 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-900">Есенцијални суплементи (Започнете овде)</h2>
          </div>
          <div className="grid gap-4">
            {highPrioritySupplements.map((supplement, index) => (
              <SupplementCard key={index} supplement={supplement} />
            ))}
          </div>
        </div>
      )}

      {/* Medium Priority Supplements */}
      {mediumPrioritySupplements.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-6 h-6 text-yellow-600" />
            <h2 className="text-2xl font-bold text-gray-900">Препорачани додатоци</h2>
          </div>
          <div className="grid gap-4">
            {mediumPrioritySupplements.map((supplement, index) => (
              <SupplementCard key={index} supplement={supplement} />
            ))}
          </div>
        </div>
      )}

      {/* Low Priority Supplements */}
      {lowPrioritySupplements.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-900">Изборни подобрувања</h2>
          </div>
          <div className="grid gap-4">
            {lowPrioritySupplements.map((supplement, index) => (
              <SupplementCard key={index} supplement={supplement} />
            ))}
          </div>
        </div>
      )}

      {/* Lifestyle Tips */}
      <Card className="shadow-lg border-blue-200">
        <CardHeader className="bg-blue-50">
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Heart className="w-5 h-5" />
            Препораки за животен стил
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ul className="space-y-3">
            {plan.lifestyle_tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card className="shadow-lg border-purple-200">
        <CardHeader className="bg-purple-50">
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <Clock className="w-5 h-5" />
            Временска рамка за имплементација
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-700">{plan.timeline}</p>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="shadow-lg border-emerald-200 bg-gradient-to-r from-emerald-50 to-blue-50">
        <CardContent className="p-8 text-center">
          <Zap className="w-12 h-12 mx-auto text-emerald-600 mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Подготвени да го трансформирате вашето здравје?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Овој персонализиран план е дизајниран специјално за вашите цели и животен стил. Започнете со есенцијалните
            суплементи и постепено додавајте други додека вашето тело се приспособува.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700"
              onClick={() =>
                window.open("mailto:poddrska@vashsuplementprodavnica.com?subject=Мојот персонализиран план", "_blank")
              }
            >
              <Heart className="w-5 h-5 mr-2" />
              Добијте лична консултација
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={onStartOver}
              className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Повторете ја проценката
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function SupplementCard({ supplement }: { supplement: any }) {
  const PriorityIcon = priorityIcons[supplement.priority as keyof typeof priorityIcons]

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-bold text-gray-900">{supplement.name}</h3>
              <Badge className={priorityColors[supplement.priority as keyof typeof priorityColors]}>
                <PriorityIcon className="w-3 h-3 mr-1" />
                {supplement.priority === "high" ? "Висок приоритет" : supplement.priority === "medium" ? "Среден приоритет" : "Низок приоритет"}
              </Badge>
            </div>
            <p className="text-gray-600 mb-4">{supplement.description}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              Клучни придобивки
            </h4>
            <ul className="space-y-1">
              {supplement.benefits.map((benefit: string, index: number) => (
                <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                <Pill className="w-4 h-4 text-blue-500" />
                Дозирање
              </h4>
              <p className="text-sm text-gray-600">{supplement.dosage}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-500" />
                Најдобро време
              </h4>
              <p className="text-sm text-gray-600">{supplement.timing}</p>
            </div>
          </div>

          <Button
            className="w-full bg-emerald-600 hover:bg-emerald-700"
            onClick={() => window.open(supplement.link, "_blank")}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Купи {supplement.name}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
