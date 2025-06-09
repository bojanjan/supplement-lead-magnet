"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Brain, Pill, Target } from "lucide-react"
import { generatePersonalizedPlan } from "@/lib/actions"
import type { UserAnswers, PersonalizedPlan } from "./supplement-lead-magnet"

const loadingMessages = [
  "Анализираме го твојот здравствен профил...",
  "Истражуваме оптимални суплементи за твоите цели...",
  "Креираме персонализиран план...",
  "Ги финализираме препораките...",
]

export function LoadingScreen({
  userAnswers,
  onPlanGenerated,
}: {
  userAnswers: UserAnswers
  onPlanGenerated: (plan: PersonalizedPlan) => void
}) {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % loadingMessages.length)
    }, 2000)

    const generatePlan = async () => {
      try {
        const plan = await generatePersonalizedPlan(userAnswers)
        onPlanGenerated(plan)
      } catch (err) {
        console.error("Error generating plan:", err)
        setError("Не успеавме да го креираме твојот план. Те молиме обиди се повторно.")
      }
    }

    generatePlan()

    return () => clearInterval(messageInterval)
  }, [userAnswers, onPlanGenerated])

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="text-red-600 mb-4">
              <Target className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Упс! Нешто тргна наопаку</h2>
              <p className="mt-2">{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardContent className="p-8">
          <div className="text-center">
            <div className="mb-8">
              <div className="relative">
                <Loader2 className="w-16 h-16 mx-auto text-emerald-600 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Brain className="w-8 h-8 text-emerald-800" />
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Креираме персонализиран план</h2>

            <p className="text-lg text-gray-600 mb-8">{loadingMessages[currentMessage]}</p>

            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="text-center p-4 bg-emerald-50 rounded-lg">
                <Brain className="w-8 h-8 mx-auto text-emerald-600 mb-2" />
                <p className="text-sm text-gray-600">АИ анализа</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Pill className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                <p className="text-sm text-gray-600">Истражување суплементи</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Target className="w-8 h-8 mx-auto text-purple-600 mb-2" />
                <p className="text-sm text-gray-600">Оптимизација на цели</p>
              </div>
            </div>

            <div className="mt-8 text-sm text-gray-500">Ова обично трае 30-60 секунди...</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
