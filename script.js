async function generateTitleAndTags() {
  const topic = document.getElementById('topicInput').value;
  const titleOutput = document.getElementById('titleOutput');
  const tagsOutput = document.getElementById('tagsOutput');

  titleOutput.innerText = 'Generating...';
  tagsOutput.innerText = '';

  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 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"
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: `Generate an SEO-friendly YouTube video title and 5 tags for this topic: "${topic}"`,
      max_tokens: 100,
      temperature: 0.7
    })
  });

  const data = await response.json();
  const resultText = data.choices[0].text.trim();

  const [title, ...tags] = resultText.split("\n").filter(Boolean);
  titleOutput.innerText = title;
  tagsOutput.innerText = tags.join(", ");
}
