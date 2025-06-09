"use server"

import type { UserAnswers, PersonalizedPlan } from "@/components/supplement-lead-magnet"

export async function generatePersonalizedPlan(userAnswers: UserAnswers): Promise<PersonalizedPlan> {
  try {
    const prompt = `You are a certified nutritionist and supplement expert. Create a personalized supplement plan for this person based on their health assessment.

User Profile:
- Name: ${userAnswers.name}
- Age: ${userAnswers.age}
- Gender: ${userAnswers.gender}
- Current feeling: ${userAnswers.currentFeeling}
- Energy level: ${userAnswers.energyLevel}
- Workout frequency: ${userAnswers.workoutFrequency}
- Workout types: ${userAnswers.workoutType?.join(", ")}
- Health goals: ${userAnswers.healthGoals?.join(", ")}
- Diet type: ${userAnswers.dietType}
- Sleep quality: ${userAnswers.sleepQuality}
- Stress level: ${userAnswers.stressLevel}
- Health concerns: ${userAnswers.healthConcerns?.join(", ")}
- Current supplements: ${userAnswers.currentSupplements}
- Budget: ${userAnswers.budget}

Please provide a comprehensive response in the following JSON format:

{
  "summary": "Персонализиран резиме од 2-3 реченици за нивниот здравствен профил и главни области на фокус",
  "recommendations": [
    {
      "name": "Име на суплемент",
      "description": "Краток опис на дејството на суплементот",
      "benefits": ["Придобивка 1", "Придобивка 2", "Придобивка 3"],
      "dosage": "Препорачана доза",
      "timing": "Кога да се земе",
      "link": "https://example-supplement-store.com/product-name",
      "priority": "висок|среден|низок"
    }
  ],
  "lifestyle_tips": [
    "Совет за животен стил 1",
    "Совет за животен стил 2",
    "Совет за животен стил 3"
  ],
  "timeline": "Временска рамка за имплементација на овој план (на пример, започнете со суплементи со висок приоритет 2-4 недели, потоа додадете среден приоритет, итн.)"
}

Guidelines:
- Recommend 4-8 supplements total
- Prioritize based on their specific goals and current state
- Consider their budget when making recommendations
- Include evidence-based supplements only
- Make links realistic (use placeholder supplement store URLs)
- Provide practical, actionable advice
- Consider any health concerns or contraindications
- Make the plan progressive and sustainable

Respond only with valid JSON.`

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a certified nutritionist and supplement expert. Always respond with valid JSON only.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error("OpenAI API Error:", response.status, errorData)
      throw new Error(`OpenAI API request failed: ${response.status}`)
    }

    const data = await response.json()

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error("Unexpected API response structure:", data)
      throw new Error("Invalid response structure from OpenAI API")
    }

    const content = data.choices[0].message.content.trim()

    try {
      const plan = JSON.parse(content) as PersonalizedPlan

      // Validate the response structure
      if (!plan.summary || !plan.recommendations || !plan.lifestyle_tips || !plan.timeline) {
        throw new Error("Invalid plan structure received from AI")
      }

      return plan
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", content)
      throw new Error("Failed to parse AI response")
    }
  } catch (error) {
    console.error("Error generating personalized plan:", error)

    // Fallback plan in case of API failure
    return {
      summary: `Врз основа на вашиот профил, препорачуваме фокусирање на основни суплементи за поддршка на вашите цели за ${userAnswers.healthGoals?.[0]?.toLowerCase()} и подобрување на вашите нивоа на енергија.`,
      recommendations: [
        {
          name: "Висококвалитетен мултивитамин",
          description: "Сеопфатен мултивитамин за пополнување на нутритивните празнини во вашата исхрана",
          benefits: ["Го поддржува целокупното здравје", "Пополнува нутритивни празнини", "Ги зголемува нивоата на енергија"],
          dosage: "1 капсула дневно",
          timing: "Со појадок",
          link: "https://prodavnica-za-suplementi.com/multivitamin",
          priority: "висок",
        },
        {
          name: "Омега-3 рибино масло",
          description: "Есенцијални масни киселини за здравје на срцето, мозокот и зглобовите",
          benefits: ["Го поддржува здравјето на срцето", "Го подобрува функционирањето на мозокот", "Го намалува воспалението"],
          dosage: "1000мг дневно",
          timing: "Со оброци",
          link: "https://prodavnica-za-suplementi.com/omega-3",
          priority: "висок",
        },
        {
          name: "Витамин Д3",
          description: "Есенцијален за здравјето на коските, имунолошкиот систем и расположението",
          benefits: ["Го поддржува здравјето на коските", "Го зајакнува имунолошкиот систем", "Го подобрува расположението"],
          dosage: "2000 ИЕ дневно",
          timing: "Со појадок",
          link: "https://prodavnica-za-suplementi.com/vitamin-d3",
          priority: "среден",
        },
        {
          name: "Магнезиум",
          description: "Важен минерал за мускулна функција, спиење и управување со стресот",
          benefits: ["Го подобрува квалитетот на спиењето", "Го намалува стресот", "Го поддржува мускулното функционирање"],
          dosage: "400мг дневно",
          timing: "Пред спиење",
          link: "https://prodavnica-za-suplementi.com/magnezijum",
          priority: "среден",
        },
      ],
      lifestyle_tips: [
        "Одржувајте постојан распоред на спиење од 7-9 часа на ноќ",
        "Останете хидрирани со пиење на најмалку 8 чаши вода дневно",
        "Вклучете разновидни шарени овошја и зеленчуци во вашата исхрана",
        "Практикувајте техники за управување со стресот, како медитација или длабоко дишење",
      ],
      timeline:
        "Започнете со суплементите со висок приоритет (мултивитамин и омега-3) во првите 2-3 недели. Откако вашето тело ќе се прилагоди, додадете ги суплементите со среден приоритет. Следете како се чувствувате и приспособете ги дозите по потреба.",
    }
  }
}
