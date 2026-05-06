export async function generateAIResponse(messages: { role: string, content: string }[]) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = process.env.OPENROUTER_MODEL || "z-ai/glm-4.5-air:free";
  const url = "https://openrouter.ai/api/v1/chat/completions";

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': 'https://chatverse.ai',
      'X-Title': 'ChatVerse'
    },
    body: JSON.stringify({
      model: model,
      messages: messages
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("OpenRouter Error:", errorData);
    throw new Error(`OpenRouter API failed: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}
