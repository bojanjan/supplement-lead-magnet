export async function generatePersonalizedPlan(userAnswers: UserAnswers): Promise<PersonalizedPlan> {
  try {
    const prompt = `You are a certified nutritionist and supplement expert with extensive experience in sports nutrition and programming. Create a personalized supplement plan for this person based on their health assessment.

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
  "summary": "A personalized 2-3 sentence summary of their health profile and main focus areas",
  "recommendations": [
    {
      "name": "Supplement Name",
      "description": "Brief description of what this supplement does",
      "benefits": ["Benefit 1", "Benefit 2", "Benefit 3"],
      "dosage": "Recommended dosage",
      "timing": "When to take it",
      "link": "https://example-supplement-store.com/product-name",
      "priority": "high|medium|low"
    }
  ],
  "lifestyle_tips": [
    "Lifestyle tip 1",
    "Lifestyle tip 2",
    "Lifestyle tip 3"
  ],
  "timeline": "A timeline for implementing this plan (e.g., start with high priority supplements for 2-4 weeks, then add medium priority, etc.)"
}

Guidelines:
- Recommend 4-8 supplements total, including foundational options (e.g., Multivitamin, Omega-3, Vitamin D3, Magnesium) and performance-enhancing options (e.g., Creatine, BCAA, Glutamine).
- Prioritize based on their specific goals (e.g., muscle gain, endurance, recovery) and current state (e.g., energy levels, stress, health concerns).
- Consider their budget when making recommendations, suggesting cost-effective alternatives where applicable.
- Include evidence-based supplements only, with a focus on sport performance and recovery (e.g., Creatine Monohydrate for strength, BCAA for muscle recovery, Glutamine for immune support).
- Make links realistic (use placeholder supplement store URLs).
- Provide practical, actionable advice, considering workout frequency and type.
- Account for any health concerns or contraindications (e.g., avoid Creatine if kidney issues are present).
- Make the plan progressive and sustainable, adjusting based on user feedback.

Respond only with valid JSON.`;

    // Останатиот код (fetch, обработка на одговор) останува ист
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
    });

    // Останатата логика за обработка на одговорот останува иста
    if (!response.ok) {
      const errorData = await response.text();
      console.error("OpenAI API Error:", response.status, errorData);
      throw new Error(`OpenAI API request failed: ${response.status}`);
    }

    const data = await response.json();
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error("Unexpected API response structure:", data);
      throw new Error("Invalid response structure from OpenAI API");
    }

    const content = data.choices[0].message.content.trim();
    try {
      const plan = JSON.parse(content) as PersonalizedPlan;
      if (!plan.summary || !plan.recommendations || !plan.lifestyle_tips || !plan.timeline) {
        throw new Error("Invalid plan structure received from AI");
      }
      return plan;
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", content);
      throw new Error("Failed to parse AI response");
    }
  } catch (error) {
    console.error("Error generating personalized plan:", error);
    // Фалов план останува ист, со додавање на Креатин, BCAA, Glutamine во опциите
    return {
      summary: `Based on your profile, we recommend focusing on foundational supplements to support your ${userAnswers.healthGoals?.[0]?.toLowerCase()} goals and improve your overall energy levels.`,
      recommendations: [
        {
          name: "High-Quality Multivitamin",
          description: "A comprehensive multivitamin to fill nutritional gaps in your diet",
          benefits: ["Supports overall health", "Fills nutritional gaps", "Boosts energy levels"],
          dosage: "1 capsule daily",
          timing: "With breakfast",
          link: "https://supplement-store.com/multivitamin",
          priority: "high",
        },
        {
          name: "Omega-3 Fish Oil",
          description: "Essential fatty acids for heart, brain, and joint health",
          benefits: ["Supports heart health", "Improves brain function", "Reduces inflammation"],
          dosage: "1000mg daily",
          timing: "With meals",
          link: "https://supplement-store.com/omega-3",
          priority: "high",
        },
        {
          name: "Vitamin D3",
          description: "Essential for bone health, immune function, and mood",
          benefits: ["Supports bone health", "Boosts immune system", "Improves mood"],
          dosage: "2000 IU daily",
          timing: "With breakfast",
          link: "https://supplement-store.com/vitamin-d3",
          priority: "medium",
        },
        {
          name: "Magnesium",
          description: "Important mineral for muscle function, sleep, and stress management",
          benefits: ["Improves sleep quality", "Reduces stress", "Supports muscle function"],
          dosage: "400mg daily",
          timing: "Before bedtime",
          link: "https://supplement-store.com/magnesium",
          priority: "medium",
        },
        {
          name: "Creatine Monohydrate",
          description: "Supports strength and performance during high-intensity workouts",
          benefits: ["Increases muscle power", "Enhances workout performance", "Aids muscle recovery"],
          dosage: "5g daily",
          timing: "Post-workout",
          link: "https://supplement-store.com/creatine",
          priority: "medium",
        },
        {
          name: "BCAA",
          description: "Essential amino acids for muscle recovery and reducing fatigue",
          benefits: ["Promotes muscle recovery", "Reduces muscle breakdown", "Decreases exercise fatigue"],
          dosage: "5-10g daily",
          timing: "During or post-workout",
          link: "https://supplement-store.com/bcaa",
          priority: "low",
        },
        {
          name: "Glutamine",
          description: "Supports immune health and muscle recovery after intense exercise",
          benefits: ["Boosts immune system", "Aids muscle repair", "Reduces soreness"],
          dosage: "5g daily",
          timing: "Post-workout",
          link: "https://supplement-store.com/glutamine",
          priority: "low",
        },
      ],
      lifestyle_tips: [
        "Maintain a consistent sleep schedule of 7-9 hours per night",
        "Stay hydrated by drinking at least 8 glasses of water daily",
        "Include a variety of colorful fruits and vegetables in your diet",
        "Practice stress management techniques like meditation or deep breathing",
      ],
      timeline:
        "Start with the high-priority supplements (multivitamin and omega-3) for the first 2-3 weeks. Once your body adjusts, add the medium-priority supplements like Vitamin D3 and Creatine. Monitor your progress and introduce BCAA or Glutamine as needed.",
    };
  }
}
